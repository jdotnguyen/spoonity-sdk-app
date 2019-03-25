"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var page_1 = require("ui/page");
var application_1 = require("application");
var dialogs_1 = require("tns-core-modules/ui/dialogs");
var router_1 = require("@angular/router");
var spoonity_sdk_1 = require("../typescript/spoonity.sdk");
var user_model_1 = require("../typescript/user.model");
var vendor_config_1 = require("../shared/vendor.config");
var LoginComponent = /** @class */ (function () {
    function LoginComponent(page, spoonityService, router) {
        this.page = page;
        this.spoonityService = spoonityService;
        this.router = router;
        this.page.enableSwipeBackNavigation = false;
        this.page.actionBarHidden = true;
        this.user = new user_model_1.User();
        this.user.vendor = vendor_config_1.VendorConfig.VENDOR;
        this.processing = false;
        this.appSettings = require("application-settings");
        // Login if we already have a session in storage
        if (this.appSettings.getString("session_key")) {
            this.session = { session_key: this.appSettings.getString("session_key") };
        }
    }
    LoginComponent.prototype.ngOnInit = function () {
        var _this = this;
        if (this.session) {
            this.spoonityService.userValidate(this.session)
                .subscribe(function (data) {
                _this.router.navigate(["/home"]);
            }, function (err) {
                _this.processing = false;
            });
        }
    };
    LoginComponent.prototype.submit = function () {
        var _this = this;
        this.spoonityService.userAuthenticate(this.user)
            .subscribe(function (data) {
            _this.appSettings.setString("session_key", data["session_key"]);
            _this.appSettings.setNumber("vendor_id", data["vendor_id"]);
            _this.appSettings.setString("user_id", data["user_id"]);
            _this.processing = false;
            _this.router.navigate(["/home"]);
        }, function (err) {
            _this.processing = false;
            _this.alert("Unfortunately we could not find your account.");
        });
        this.processing = true;
    };
    LoginComponent.prototype.focusPassword = function () {
        this.password.nativeElement.focus();
    };
    LoginComponent.prototype.onItemLoading = function (args) {
        if (application_1.ios) {
            var cell = args.ios;
            cell.selectionStyle = UITableViewCellSelectionStyle.UITableViewCellSelectionStyleNone;
        }
    };
    LoginComponent.prototype.goToRegister = function () {
        this.router.navigate(["/register"]);
    };
    LoginComponent.prototype.alert = function (message) {
        return dialogs_1.alert({
            title: "Alert",
            okButtonText: "OK",
            message: message
        });
    };
    __decorate([
        core_1.ViewChild("password"),
        __metadata("design:type", core_1.ElementRef)
    ], LoginComponent.prototype, "password", void 0);
    LoginComponent = __decorate([
        core_1.Component({
            selector: "Login",
            moduleId: module.id,
            templateUrl: "./login.component.html",
            styleUrls: ['./login.component.css']
        }),
        __metadata("design:paramtypes", [page_1.Page,
            spoonity_sdk_1.SpoonityService,
            router_1.Router])
    ], LoginComponent);
    return LoginComponent;
}());
exports.LoginComponent = LoginComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibG9naW4uY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibG9naW4uY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQ0Esc0NBQWlFO0FBQ2pFLGdDQUErQjtBQUMvQiwyQ0FBa0M7QUFFbEMsdURBQTREO0FBQzVELDBDQUF5QztBQUN6QywyREFBNkQ7QUFFN0QsdURBQWdEO0FBRWhELHlEQUF1RDtBQVF2RDtJQU9DLHdCQUNTLElBQVUsRUFDVixlQUFnQyxFQUNoQyxNQUFjO1FBRmQsU0FBSSxHQUFKLElBQUksQ0FBTTtRQUNWLG9CQUFlLEdBQWYsZUFBZSxDQUFpQjtRQUNoQyxXQUFNLEdBQU4sTUFBTSxDQUFRO1FBRXRCLElBQUksQ0FBQyxJQUFJLENBQUMseUJBQXlCLEdBQUcsS0FBSyxDQUFDO1FBQzVDLElBQUksQ0FBQyxJQUFJLENBQUMsZUFBZSxHQUFHLElBQUksQ0FBQztRQUNqQyxJQUFJLENBQUMsSUFBSSxHQUFHLElBQUksaUJBQUksRUFBRSxDQUFDO1FBQ3ZCLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxHQUFHLDRCQUFZLENBQUMsTUFBTSxDQUFDO1FBQ3ZDLElBQUksQ0FBQyxVQUFVLEdBQUcsS0FBSyxDQUFDO1FBQ3hCLElBQUksQ0FBQyxXQUFXLEdBQUcsT0FBTyxDQUFDLHNCQUFzQixDQUFDLENBQUM7UUFFbkQsZ0RBQWdEO1FBQ2hELElBQUksSUFBSSxDQUFDLFdBQVcsQ0FBQyxTQUFTLENBQUMsYUFBYSxDQUFDLEVBQUU7WUFDOUMsSUFBSSxDQUFDLE9BQU8sR0FBRyxFQUFDLFdBQVcsRUFBRyxJQUFJLENBQUMsV0FBVyxDQUFDLFNBQVMsQ0FBQyxhQUFhLENBQUMsRUFBQyxDQUFDO1NBQ3pFO0lBQ0YsQ0FBQztJQUVELGlDQUFRLEdBQVI7UUFBQSxpQkFVQztRQVRBLElBQUksSUFBSSxDQUFDLE9BQU8sRUFBRTtZQUNqQixJQUFJLENBQUMsZUFBZSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDO2lCQUM3QyxTQUFTLENBQUMsVUFBQSxJQUFJO2dCQUNkLEtBQUksQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQztZQUNqQyxDQUFDLEVBQ0EsVUFBQSxHQUFHO2dCQUNGLEtBQUksQ0FBQyxVQUFVLEdBQUcsS0FBSyxDQUFDO1lBQ3pCLENBQUMsQ0FBQyxDQUFDO1NBQ0w7SUFDRixDQUFDO0lBRUQsK0JBQU0sR0FBTjtRQUFBLGlCQWNDO1FBYkEsSUFBSSxDQUFDLGVBQWUsQ0FBQyxnQkFBZ0IsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDO2FBQzlDLFNBQVMsQ0FBQyxVQUFBLElBQUk7WUFDZCxLQUFJLENBQUMsV0FBVyxDQUFDLFNBQVMsQ0FBQyxhQUFhLEVBQUUsSUFBSSxDQUFDLGFBQWEsQ0FBQyxDQUFDLENBQUM7WUFDL0QsS0FBSSxDQUFDLFdBQVcsQ0FBQyxTQUFTLENBQUMsV0FBVyxFQUFFLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDO1lBQzNELEtBQUksQ0FBQyxXQUFXLENBQUMsU0FBUyxDQUFDLFNBQVMsRUFBRSxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQztZQUN2RCxLQUFJLENBQUMsVUFBVSxHQUFHLEtBQUssQ0FBQztZQUN4QixLQUFJLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUM7UUFDakMsQ0FBQyxFQUNBLFVBQUEsR0FBRztZQUNGLEtBQUksQ0FBQyxVQUFVLEdBQUcsS0FBSyxDQUFDO1lBQ3hCLEtBQUksQ0FBQyxLQUFLLENBQUMsK0NBQStDLENBQUMsQ0FBQztRQUM3RCxDQUFDLENBQUMsQ0FBQztRQUNMLElBQUksQ0FBQyxVQUFVLEdBQUcsSUFBSSxDQUFDO0lBQ3hCLENBQUM7SUFFRCxzQ0FBYSxHQUFiO1FBQ0MsSUFBSSxDQUFDLFFBQVEsQ0FBQyxhQUFhLENBQUMsS0FBSyxFQUFFLENBQUM7SUFDckMsQ0FBQztJQUVELHNDQUFhLEdBQWIsVUFBYyxJQUFTO1FBQ3RCLElBQUksaUJBQUcsRUFBRTtZQUNSLElBQU0sSUFBSSxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUM7WUFDdEIsSUFBSSxDQUFDLGNBQWMsR0FBRyw2QkFBNkIsQ0FBQyxpQ0FBaUMsQ0FBQztTQUN0RjtJQUNGLENBQUM7SUFFRCxxQ0FBWSxHQUFaO1FBQ0MsSUFBSSxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDO0lBQ3JDLENBQUM7SUFFRCw4QkFBSyxHQUFMLFVBQU0sT0FBZTtRQUNwQixPQUFPLGVBQUssQ0FBQztZQUNaLEtBQUssRUFBRSxPQUFPO1lBQ2QsWUFBWSxFQUFFLElBQUk7WUFDbEIsT0FBTyxFQUFFLE9BQU87U0FDaEIsQ0FBQyxDQUFDO0lBQ0osQ0FBQztJQXJFc0I7UUFBdEIsZ0JBQVMsQ0FBQyxVQUFVLENBQUM7a0NBQVcsaUJBQVU7b0RBQUM7SUFMaEMsY0FBYztRQU4xQixnQkFBUyxDQUFDO1lBQ1YsUUFBUSxFQUFFLE9BQU87WUFDakIsUUFBUSxFQUFFLE1BQU0sQ0FBQyxFQUFFO1lBQ25CLFdBQVcsRUFBRSx3QkFBd0I7WUFDckMsU0FBUyxFQUFFLENBQUMsdUJBQXVCLENBQUM7U0FDcEMsQ0FBQzt5Q0FTYyxXQUFJO1lBQ08sOEJBQWU7WUFDeEIsZUFBTTtPQVZYLGNBQWMsQ0EyRTFCO0lBQUQscUJBQUM7Q0FBQSxBQTNFRCxJQTJFQztBQTNFWSx3Q0FBYyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEl0ZW1FdmVudERhdGEgfSBmcm9tIFwidWkvbGlzdC12aWV3XCJcbmltcG9ydCB7IENvbXBvbmVudCwgRWxlbWVudFJlZiwgVmlld0NoaWxkIH0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcbmltcG9ydCB7IFBhZ2UgfSBmcm9tIFwidWkvcGFnZVwiO1xuaW1wb3J0IHsgaW9zIH0gZnJvbSBcImFwcGxpY2F0aW9uXCI7XG5kZWNsYXJlIHZhciBVSVRhYmxlVmlld0NlbGxTZWxlY3Rpb25TdHlsZTtcbmltcG9ydCB7IGFsZXJ0LCBwcm9tcHQgfSBmcm9tIFwidG5zLWNvcmUtbW9kdWxlcy91aS9kaWFsb2dzXCI7XG5pbXBvcnQgeyBSb3V0ZXIgfSBmcm9tIFwiQGFuZ3VsYXIvcm91dGVyXCI7XG5pbXBvcnQgeyBTcG9vbml0eVNlcnZpY2UgfSBmcm9tIFwiLi4vdHlwZXNjcmlwdC9zcG9vbml0eS5zZGtcIjtcblxuaW1wb3J0IHsgVXNlciB9IGZyb20gXCIuLi90eXBlc2NyaXB0L3VzZXIubW9kZWxcIjtcbmltcG9ydCB7IFNlc3Npb24gfSBmcm9tIFwiLi4vdHlwZXNjcmlwdC9zZXNzaW9uLm1vZGVsXCI7XG5pbXBvcnQgeyBWZW5kb3JDb25maWcgfSBmcm9tICcuLi9zaGFyZWQvdmVuZG9yLmNvbmZpZyc7XG5cbkBDb21wb25lbnQoe1xuXHRzZWxlY3RvcjogXCJMb2dpblwiLFxuXHRtb2R1bGVJZDogbW9kdWxlLmlkLFxuXHR0ZW1wbGF0ZVVybDogXCIuL2xvZ2luLmNvbXBvbmVudC5odG1sXCIsXG5cdHN0eWxlVXJsczogWycuL2xvZ2luLmNvbXBvbmVudC5jc3MnXVxufSlcbmV4cG9ydCBjbGFzcyBMb2dpbkNvbXBvbmVudCB7XG5cdHVzZXI6IFVzZXI7XG5cdHByb2Nlc3Npbmc6IGJvb2xlYW47XG5cdGFwcFNldHRpbmdzOiBhbnk7XG5cdHNlc3Npb246IFNlc3Npb247XG5cdEBWaWV3Q2hpbGQoXCJwYXNzd29yZFwiKSBwYXNzd29yZDogRWxlbWVudFJlZjtcblxuXHRjb25zdHJ1Y3Rvcihcblx0XHRwcml2YXRlIHBhZ2U6IFBhZ2UsXG5cdFx0cHJpdmF0ZSBzcG9vbml0eVNlcnZpY2U6IFNwb29uaXR5U2VydmljZSxcblx0XHRwcml2YXRlIHJvdXRlcjogUm91dGVyXG5cdCkge1xuXHRcdHRoaXMucGFnZS5lbmFibGVTd2lwZUJhY2tOYXZpZ2F0aW9uID0gZmFsc2U7XG5cdFx0dGhpcy5wYWdlLmFjdGlvbkJhckhpZGRlbiA9IHRydWU7XG5cdFx0dGhpcy51c2VyID0gbmV3IFVzZXIoKTtcblx0XHR0aGlzLnVzZXIudmVuZG9yID0gVmVuZG9yQ29uZmlnLlZFTkRPUjtcblx0XHR0aGlzLnByb2Nlc3NpbmcgPSBmYWxzZTtcblx0XHR0aGlzLmFwcFNldHRpbmdzID0gcmVxdWlyZShcImFwcGxpY2F0aW9uLXNldHRpbmdzXCIpO1xuXG5cdFx0Ly8gTG9naW4gaWYgd2UgYWxyZWFkeSBoYXZlIGEgc2Vzc2lvbiBpbiBzdG9yYWdlXG5cdFx0aWYgKHRoaXMuYXBwU2V0dGluZ3MuZ2V0U3RyaW5nKFwic2Vzc2lvbl9rZXlcIikpIHtcblx0XHRcdHRoaXMuc2Vzc2lvbiA9IHtzZXNzaW9uX2tleSA6IHRoaXMuYXBwU2V0dGluZ3MuZ2V0U3RyaW5nKFwic2Vzc2lvbl9rZXlcIil9O1xuXHRcdH1cblx0fVxuXG5cdG5nT25Jbml0KCk6IHZvaWQge1xuXHRcdGlmICh0aGlzLnNlc3Npb24pIHtcblx0XHRcdHRoaXMuc3Bvb25pdHlTZXJ2aWNlLnVzZXJWYWxpZGF0ZSh0aGlzLnNlc3Npb24pXG5cdFx0XHRcdC5zdWJzY3JpYmUoZGF0YSA9PiB7XG5cdFx0XHRcdFx0dGhpcy5yb3V0ZXIubmF2aWdhdGUoW1wiL2hvbWVcIl0pO1xuXHRcdFx0XHR9LFxuXHRcdFx0XHRcdGVyciA9PiB7XG5cdFx0XHRcdFx0XHR0aGlzLnByb2Nlc3NpbmcgPSBmYWxzZTtcblx0XHRcdFx0XHR9KTtcblx0XHR9XG5cdH1cblxuXHRzdWJtaXQoKSB7XG5cdFx0dGhpcy5zcG9vbml0eVNlcnZpY2UudXNlckF1dGhlbnRpY2F0ZSh0aGlzLnVzZXIpXG5cdFx0XHQuc3Vic2NyaWJlKGRhdGEgPT4ge1xuXHRcdFx0XHR0aGlzLmFwcFNldHRpbmdzLnNldFN0cmluZyhcInNlc3Npb25fa2V5XCIsIGRhdGFbXCJzZXNzaW9uX2tleVwiXSk7XG5cdFx0XHRcdHRoaXMuYXBwU2V0dGluZ3Muc2V0TnVtYmVyKFwidmVuZG9yX2lkXCIsIGRhdGFbXCJ2ZW5kb3JfaWRcIl0pO1xuXHRcdFx0XHR0aGlzLmFwcFNldHRpbmdzLnNldFN0cmluZyhcInVzZXJfaWRcIiwgZGF0YVtcInVzZXJfaWRcIl0pO1xuXHRcdFx0XHR0aGlzLnByb2Nlc3NpbmcgPSBmYWxzZTtcblx0XHRcdFx0dGhpcy5yb3V0ZXIubmF2aWdhdGUoW1wiL2hvbWVcIl0pO1xuXHRcdFx0fSxcblx0XHRcdFx0ZXJyID0+IHtcblx0XHRcdFx0XHR0aGlzLnByb2Nlc3NpbmcgPSBmYWxzZTtcblx0XHRcdFx0XHR0aGlzLmFsZXJ0KFwiVW5mb3J0dW5hdGVseSB3ZSBjb3VsZCBub3QgZmluZCB5b3VyIGFjY291bnQuXCIpO1xuXHRcdFx0XHR9KTtcblx0XHR0aGlzLnByb2Nlc3NpbmcgPSB0cnVlO1xuXHR9XG5cblx0Zm9jdXNQYXNzd29yZCgpIHtcblx0XHR0aGlzLnBhc3N3b3JkLm5hdGl2ZUVsZW1lbnQuZm9jdXMoKTtcblx0fVxuXG5cdG9uSXRlbUxvYWRpbmcoYXJnczogYW55KSB7XG5cdFx0aWYgKGlvcykge1xuXHRcdFx0Y29uc3QgY2VsbCA9IGFyZ3MuaW9zO1xuXHRcdFx0Y2VsbC5zZWxlY3Rpb25TdHlsZSA9IFVJVGFibGVWaWV3Q2VsbFNlbGVjdGlvblN0eWxlLlVJVGFibGVWaWV3Q2VsbFNlbGVjdGlvblN0eWxlTm9uZTtcblx0XHR9XG5cdH1cblxuXHRnb1RvUmVnaXN0ZXIoKSB7XG5cdFx0dGhpcy5yb3V0ZXIubmF2aWdhdGUoW1wiL3JlZ2lzdGVyXCJdKTtcblx0fVxuXG5cdGFsZXJ0KG1lc3NhZ2U6IHN0cmluZykge1xuXHRcdHJldHVybiBhbGVydCh7XG5cdFx0XHR0aXRsZTogXCJBbGVydFwiLFxuXHRcdFx0b2tCdXR0b25UZXh0OiBcIk9LXCIsXG5cdFx0XHRtZXNzYWdlOiBtZXNzYWdlXG5cdFx0fSk7XG5cdH1cbn1cbiJdfQ==