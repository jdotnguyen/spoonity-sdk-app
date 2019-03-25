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
var RegisterComponent = /** @class */ (function () {
    function RegisterComponent(page, spoonityService, router) {
        this.page = page;
        this.spoonityService = spoonityService;
        this.router = router;
        this.page.actionBarHidden = false;
        this.user = new user_model_1.User();
        this.user.vendor = vendor_config_1.VendorConfig.VENDOR;
        this.user.language = 1;
        this.user.phone_number = {};
        this.processing = false;
        this.appSettings = require("application-settings");
    }
    RegisterComponent.prototype.ngOnInit = function () {
    };
    RegisterComponent.prototype.submit = function () {
        var _this = this;
        this.processing = true;
        this.spoonityService.userRegister(this.user)
            .subscribe(function (data) {
            _this.processing = false;
            _this.spoonityService.userAuthenticate(_this.user)
                .subscribe(function (data) {
                _this.appSettings.setString("session_key", data["session_key"]);
                _this.appSettings.setNumber("vendor_id", data["vendor_id"]);
                _this.appSettings.setString("user_id", data["user_id"]);
                _this.router.navigate(["/home"]);
            }, function (err) {
                _this.alert("There was an error upon authentication.");
            });
        }, function (err) {
            _this.processing = false;
            _this.alert("There was an error upon registration.");
        });
    };
    RegisterComponent.prototype.onItemLoading = function (args) {
        if (application_1.ios) {
            var cell = args.ios;
            cell.selectionStyle = UITableViewCellSelectionStyle.UITableViewCellSelectionStyleNone;
        }
    };
    RegisterComponent.prototype.tosCheck = function (event) {
        var tosSwitch = event.object;
        if (tosSwitch.checked) {
            this.user.terms = 1;
        }
        else {
            this.user.terms = 0;
        }
    };
    RegisterComponent.prototype.alert = function (message) {
        return dialogs_1.alert({
            title: "Alert",
            okButtonText: "OK",
            message: message
        });
    };
    __decorate([
        core_1.ViewChild("password"),
        __metadata("design:type", core_1.ElementRef)
    ], RegisterComponent.prototype, "password", void 0);
    RegisterComponent = __decorate([
        core_1.Component({
            selector: "Register",
            moduleId: module.id,
            templateUrl: "./register.component.html",
            styleUrls: ['./register.component.css']
        }),
        __metadata("design:paramtypes", [page_1.Page,
            spoonity_sdk_1.SpoonityService,
            router_1.Router])
    ], RegisterComponent);
    return RegisterComponent;
}());
exports.RegisterComponent = RegisterComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVnaXN0ZXIuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsicmVnaXN0ZXIuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQ0Esc0NBQWlFO0FBQ2pFLGdDQUErQjtBQUUvQiwyQ0FBa0M7QUFFbEMsdURBQTREO0FBRTVELDBDQUF5QztBQUN6QywyREFBNkQ7QUFFN0QsdURBQWdEO0FBQ2hELHlEQUF1RDtBQVF2RDtJQVNDLDJCQUNTLElBQVUsRUFDVixlQUFnQyxFQUNoQyxNQUFjO1FBRmQsU0FBSSxHQUFKLElBQUksQ0FBTTtRQUNWLG9CQUFlLEdBQWYsZUFBZSxDQUFpQjtRQUNoQyxXQUFNLEdBQU4sTUFBTSxDQUFRO1FBRXRCLElBQUksQ0FBQyxJQUFJLENBQUMsZUFBZSxHQUFHLEtBQUssQ0FBQztRQUNsQyxJQUFJLENBQUMsSUFBSSxHQUFHLElBQUksaUJBQUksRUFBRSxDQUFDO1FBQ3ZCLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxHQUFHLDRCQUFZLENBQUMsTUFBTSxDQUFDO1FBQ3ZDLElBQUksQ0FBQyxJQUFJLENBQUMsUUFBUSxHQUFHLENBQUMsQ0FBQztRQUN2QixJQUFJLENBQUMsSUFBSSxDQUFDLFlBQVksR0FBRyxFQUFFLENBQUM7UUFDNUIsSUFBSSxDQUFDLFVBQVUsR0FBRyxLQUFLLENBQUM7UUFDeEIsSUFBSSxDQUFDLFdBQVcsR0FBRyxPQUFPLENBQUMsc0JBQXNCLENBQUMsQ0FBQztJQUNwRCxDQUFDO0lBRUQsb0NBQVEsR0FBUjtJQUNBLENBQUM7SUFFRCxrQ0FBTSxHQUFOO1FBQUEsaUJBb0JDO1FBbkJBLElBQUksQ0FBQyxVQUFVLEdBQUcsSUFBSSxDQUFDO1FBQ3ZCLElBQUksQ0FBQyxlQUFlLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUM7YUFDMUMsU0FBUyxDQUFDLFVBQUEsSUFBSTtZQUNkLEtBQUksQ0FBQyxVQUFVLEdBQUcsS0FBSyxDQUFDO1lBQ3hCLEtBQUksQ0FBQyxlQUFlLENBQUMsZ0JBQWdCLENBQUMsS0FBSSxDQUFDLElBQUksQ0FBQztpQkFDOUMsU0FBUyxDQUFDLFVBQUEsSUFBSTtnQkFDZCxLQUFJLENBQUMsV0FBVyxDQUFDLFNBQVMsQ0FBQyxhQUFhLEVBQUUsSUFBSSxDQUFDLGFBQWEsQ0FBQyxDQUFDLENBQUM7Z0JBQy9ELEtBQUksQ0FBQyxXQUFXLENBQUMsU0FBUyxDQUFDLFdBQVcsRUFBRSxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQztnQkFDM0QsS0FBSSxDQUFDLFdBQVcsQ0FBQyxTQUFTLENBQUMsU0FBUyxFQUFFLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDO2dCQUN2RCxLQUFJLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUM7WUFDakMsQ0FBQyxFQUNBLFVBQUEsR0FBRztnQkFDRixLQUFJLENBQUMsS0FBSyxDQUFDLHlDQUF5QyxDQUFDLENBQUM7WUFDdkQsQ0FBQyxDQUFDLENBQUM7UUFDTixDQUFDLEVBQ0EsVUFBQSxHQUFHO1lBQ0YsS0FBSSxDQUFDLFVBQVUsR0FBRyxLQUFLLENBQUM7WUFDeEIsS0FBSSxDQUFDLEtBQUssQ0FBQyx1Q0FBdUMsQ0FBQyxDQUFDO1FBQ3JELENBQUMsQ0FBQyxDQUFDO0lBQ04sQ0FBQztJQUVELHlDQUFhLEdBQWIsVUFBYyxJQUFTO1FBQ3RCLElBQUksaUJBQUcsRUFBRTtZQUNSLElBQU0sSUFBSSxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUM7WUFDdEIsSUFBSSxDQUFDLGNBQWMsR0FBRyw2QkFBNkIsQ0FBQyxpQ0FBaUMsQ0FBQztTQUN0RjtJQUNGLENBQUM7SUFFRCxvQ0FBUSxHQUFSLFVBQVMsS0FBSztRQUNiLElBQUksU0FBUyxHQUFXLEtBQUssQ0FBQyxNQUFNLENBQUM7UUFDckMsSUFBSSxTQUFTLENBQUMsT0FBTyxFQUFFO1lBQ3RCLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxHQUFHLENBQUMsQ0FBQztTQUNwQjthQUFNO1lBQ04sSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLEdBQUcsQ0FBQyxDQUFDO1NBQ3BCO0lBQ0YsQ0FBQztJQUVELGlDQUFLLEdBQUwsVUFBTSxPQUFlO1FBQ3BCLE9BQU8sZUFBSyxDQUFDO1lBQ1osS0FBSyxFQUFFLE9BQU87WUFDZCxZQUFZLEVBQUUsSUFBSTtZQUNsQixPQUFPLEVBQUUsT0FBTztTQUNoQixDQUFDLENBQUM7SUFDSixDQUFDO0lBL0RzQjtRQUF0QixnQkFBUyxDQUFDLFVBQVUsQ0FBQztrQ0FBVyxpQkFBVTt1REFBQztJQVBoQyxpQkFBaUI7UUFON0IsZ0JBQVMsQ0FBQztZQUNWLFFBQVEsRUFBRSxVQUFVO1lBQ3BCLFFBQVEsRUFBRSxNQUFNLENBQUMsRUFBRTtZQUNuQixXQUFXLEVBQUUsMkJBQTJCO1lBQ3hDLFNBQVMsRUFBRSxDQUFDLDBCQUEwQixDQUFDO1NBQ3ZDLENBQUM7eUNBV2MsV0FBSTtZQUNPLDhCQUFlO1lBQ3hCLGVBQU07T0FaWCxpQkFBaUIsQ0F1RTdCO0lBQUQsd0JBQUM7Q0FBQSxBQXZFRCxJQXVFQztBQXZFWSw4Q0FBaUIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJdGVtRXZlbnREYXRhIH0gZnJvbSBcInVpL2xpc3Qtdmlld1wiXG5pbXBvcnQgeyBDb21wb25lbnQsIEVsZW1lbnRSZWYsIFZpZXdDaGlsZCB9IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XG5pbXBvcnQgeyBQYWdlIH0gZnJvbSBcInVpL3BhZ2VcIjtcbmltcG9ydCB7IFN3aXRjaCB9IGZyb20gXCJ0bnMtY29yZS1tb2R1bGVzL3VpL3N3aXRjaFwiO1xuaW1wb3J0IHsgaW9zIH0gZnJvbSBcImFwcGxpY2F0aW9uXCI7XG5kZWNsYXJlIHZhciBVSVRhYmxlVmlld0NlbGxTZWxlY3Rpb25TdHlsZTtcbmltcG9ydCB7IGFsZXJ0LCBwcm9tcHQgfSBmcm9tIFwidG5zLWNvcmUtbW9kdWxlcy91aS9kaWFsb2dzXCI7XG5pbXBvcnQgeyBEYXRlUGlja2VyIH0gZnJvbSBcInRucy1jb3JlLW1vZHVsZXMvdWkvZGF0ZS1waWNrZXJcIjtcbmltcG9ydCB7IFJvdXRlciB9IGZyb20gXCJAYW5ndWxhci9yb3V0ZXJcIjtcbmltcG9ydCB7IFNwb29uaXR5U2VydmljZSB9IGZyb20gXCIuLi90eXBlc2NyaXB0L3Nwb29uaXR5LnNka1wiO1xuXG5pbXBvcnQgeyBVc2VyIH0gZnJvbSBcIi4uL3R5cGVzY3JpcHQvdXNlci5tb2RlbFwiO1xuaW1wb3J0IHsgVmVuZG9yQ29uZmlnIH0gZnJvbSAnLi4vc2hhcmVkL3ZlbmRvci5jb25maWcnO1xuXG5AQ29tcG9uZW50KHtcblx0c2VsZWN0b3I6IFwiUmVnaXN0ZXJcIixcblx0bW9kdWxlSWQ6IG1vZHVsZS5pZCxcblx0dGVtcGxhdGVVcmw6IFwiLi9yZWdpc3Rlci5jb21wb25lbnQuaHRtbFwiLFxuXHRzdHlsZVVybHM6IFsnLi9yZWdpc3Rlci5jb21wb25lbnQuY3NzJ11cbn0pXG5leHBvcnQgY2xhc3MgUmVnaXN0ZXJDb21wb25lbnQge1xuXHR1c2VyOiBVc2VyO1xuXHRwcm9jZXNzaW5nOiBib29sZWFuO1xuXHRhcHBTZXR0aW5nczogYW55O1xuXHRzZXNzaW9uOiBhbnk7XG5cdGJpcnRoZGF5OiBhbnk7XG5cdGJkYXk6IGFueTtcblx0QFZpZXdDaGlsZChcInBhc3N3b3JkXCIpIHBhc3N3b3JkOiBFbGVtZW50UmVmO1xuXG5cdGNvbnN0cnVjdG9yKFxuXHRcdHByaXZhdGUgcGFnZTogUGFnZSxcblx0XHRwcml2YXRlIHNwb29uaXR5U2VydmljZTogU3Bvb25pdHlTZXJ2aWNlLFxuXHRcdHByaXZhdGUgcm91dGVyOiBSb3V0ZXJcblx0KSB7XG5cdFx0dGhpcy5wYWdlLmFjdGlvbkJhckhpZGRlbiA9IGZhbHNlO1xuXHRcdHRoaXMudXNlciA9IG5ldyBVc2VyKCk7XG5cdFx0dGhpcy51c2VyLnZlbmRvciA9IFZlbmRvckNvbmZpZy5WRU5ET1I7XG5cdFx0dGhpcy51c2VyLmxhbmd1YWdlID0gMTtcblx0XHR0aGlzLnVzZXIucGhvbmVfbnVtYmVyID0ge307XG5cdFx0dGhpcy5wcm9jZXNzaW5nID0gZmFsc2U7XG5cdFx0dGhpcy5hcHBTZXR0aW5ncyA9IHJlcXVpcmUoXCJhcHBsaWNhdGlvbi1zZXR0aW5nc1wiKTtcblx0fVxuXG5cdG5nT25Jbml0KCk6IHZvaWQge1xuXHR9XG5cblx0c3VibWl0KCkge1xuXHRcdHRoaXMucHJvY2Vzc2luZyA9IHRydWU7XG5cdFx0dGhpcy5zcG9vbml0eVNlcnZpY2UudXNlclJlZ2lzdGVyKHRoaXMudXNlcilcblx0XHRcdC5zdWJzY3JpYmUoZGF0YSA9PiB7XG5cdFx0XHRcdHRoaXMucHJvY2Vzc2luZyA9IGZhbHNlO1xuXHRcdFx0XHR0aGlzLnNwb29uaXR5U2VydmljZS51c2VyQXV0aGVudGljYXRlKHRoaXMudXNlcilcblx0XHRcdFx0XHQuc3Vic2NyaWJlKGRhdGEgPT4ge1xuXHRcdFx0XHRcdFx0dGhpcy5hcHBTZXR0aW5ncy5zZXRTdHJpbmcoXCJzZXNzaW9uX2tleVwiLCBkYXRhW1wic2Vzc2lvbl9rZXlcIl0pO1xuXHRcdFx0XHRcdFx0dGhpcy5hcHBTZXR0aW5ncy5zZXROdW1iZXIoXCJ2ZW5kb3JfaWRcIiwgZGF0YVtcInZlbmRvcl9pZFwiXSk7XG5cdFx0XHRcdFx0XHR0aGlzLmFwcFNldHRpbmdzLnNldFN0cmluZyhcInVzZXJfaWRcIiwgZGF0YVtcInVzZXJfaWRcIl0pO1xuXHRcdFx0XHRcdFx0dGhpcy5yb3V0ZXIubmF2aWdhdGUoW1wiL2hvbWVcIl0pO1xuXHRcdFx0XHRcdH0sXG5cdFx0XHRcdFx0XHRlcnIgPT4ge1xuXHRcdFx0XHRcdFx0XHR0aGlzLmFsZXJ0KFwiVGhlcmUgd2FzIGFuIGVycm9yIHVwb24gYXV0aGVudGljYXRpb24uXCIpO1xuXHRcdFx0XHRcdFx0fSk7XG5cdFx0XHR9LFxuXHRcdFx0XHRlcnIgPT4ge1xuXHRcdFx0XHRcdHRoaXMucHJvY2Vzc2luZyA9IGZhbHNlO1xuXHRcdFx0XHRcdHRoaXMuYWxlcnQoXCJUaGVyZSB3YXMgYW4gZXJyb3IgdXBvbiByZWdpc3RyYXRpb24uXCIpO1xuXHRcdFx0XHR9KTtcblx0fVxuXG5cdG9uSXRlbUxvYWRpbmcoYXJnczogYW55KSB7XG5cdFx0aWYgKGlvcykge1xuXHRcdFx0Y29uc3QgY2VsbCA9IGFyZ3MuaW9zO1xuXHRcdFx0Y2VsbC5zZWxlY3Rpb25TdHlsZSA9IFVJVGFibGVWaWV3Q2VsbFNlbGVjdGlvblN0eWxlLlVJVGFibGVWaWV3Q2VsbFNlbGVjdGlvblN0eWxlTm9uZTtcblx0XHR9XG5cdH1cblxuXHR0b3NDaGVjayhldmVudCkge1xuXHRcdGxldCB0b3NTd2l0Y2ggPSA8U3dpdGNoPmV2ZW50Lm9iamVjdDtcblx0XHRpZiAodG9zU3dpdGNoLmNoZWNrZWQpIHtcblx0XHRcdHRoaXMudXNlci50ZXJtcyA9IDE7XG5cdFx0fSBlbHNlIHtcblx0XHRcdHRoaXMudXNlci50ZXJtcyA9IDA7XG5cdFx0fVxuXHR9XG5cblx0YWxlcnQobWVzc2FnZTogc3RyaW5nKSB7XG5cdFx0cmV0dXJuIGFsZXJ0KHtcblx0XHRcdHRpdGxlOiBcIkFsZXJ0XCIsXG5cdFx0XHRva0J1dHRvblRleHQ6IFwiT0tcIixcblx0XHRcdG1lc3NhZ2U6IG1lc3NhZ2Vcblx0XHR9KTtcblx0fVxufVxuIl19