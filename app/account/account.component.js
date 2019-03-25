"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var page_1 = require("ui/page");
var AccountComponent = /** @class */ (function () {
    function AccountComponent(page) {
        this.page = page;
        //Start at home
        this.page.enableSwipeBackNavigation = true;
        this.page.actionBarHidden = false;
        this.appSettings = require("application-settings");
        this.dialogs = require("tns-core-modules/ui/dialogs");
    }
    AccountComponent.prototype.ngOnInit = function () {
        this.account_data = JSON.parse(this.appSettings.getString("account"));
    };
    AccountComponent.prototype.copyClipboard = function (text) {
    };
    AccountComponent = __decorate([
        core_1.Component({
            selector: "Account",
            moduleId: module.id,
            templateUrl: "./account.component.html",
            styleUrls: ['./account.component.css']
        }),
        __metadata("design:paramtypes", [page_1.Page])
    ], AccountComponent);
    return AccountComponent;
}());
exports.AccountComponent = AccountComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWNjb3VudC5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJhY2NvdW50LmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLHNDQUFrRDtBQUNsRCxnQ0FBK0I7QUFTL0I7SUFXSSwwQkFDWSxJQUFVO1FBQVYsU0FBSSxHQUFKLElBQUksQ0FBTTtRQUVsQixlQUFlO1FBQ2YsSUFBSSxDQUFDLElBQUksQ0FBQyx5QkFBeUIsR0FBRyxJQUFJLENBQUM7UUFDM0MsSUFBSSxDQUFDLElBQUksQ0FBQyxlQUFlLEdBQUcsS0FBSyxDQUFDO1FBQ2xDLElBQUksQ0FBQyxXQUFXLEdBQUcsT0FBTyxDQUFDLHNCQUFzQixDQUFDLENBQUM7UUFDbkQsSUFBSSxDQUFDLE9BQU8sR0FBRyxPQUFPLENBQUMsNkJBQTZCLENBQUMsQ0FBQztJQUMxRCxDQUFDO0lBRUQsbUNBQVEsR0FBUjtRQUNJLElBQUksQ0FBQyxZQUFZLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLFNBQVMsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDO0lBQzFFLENBQUM7SUFFRCx3Q0FBYSxHQUFiLFVBQWMsSUFBWTtJQUUxQixDQUFDO0lBM0JRLGdCQUFnQjtRQU41QixnQkFBUyxDQUFDO1lBQ1AsUUFBUSxFQUFFLFNBQVM7WUFDbkIsUUFBUSxFQUFFLE1BQU0sQ0FBQyxFQUFFO1lBQ25CLFdBQVcsRUFBRSwwQkFBMEI7WUFDdkMsU0FBUyxFQUFFLENBQUMseUJBQXlCLENBQUM7U0FDekMsQ0FBQzt5Q0Fhb0IsV0FBSTtPQVpiLGdCQUFnQixDQTRCNUI7SUFBRCx1QkFBQztDQUFBLEFBNUJELElBNEJDO0FBNUJZLDRDQUFnQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgT25Jbml0IH0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcbmltcG9ydCB7IFBhZ2UgfSBmcm9tIFwidWkvcGFnZVwiO1xuaW1wb3J0IHsgT2JzZXJ2YWJsZSB9IGZyb20gXCJyeGpzXCI7XG5cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiBcIkFjY291bnRcIixcbiAgICBtb2R1bGVJZDogbW9kdWxlLmlkLFxuICAgIHRlbXBsYXRlVXJsOiBcIi4vYWNjb3VudC5jb21wb25lbnQuaHRtbFwiLFxuICAgIHN0eWxlVXJsczogWycuL2FjY291bnQuY29tcG9uZW50LmNzcyddXG59KVxuZXhwb3J0IGNsYXNzIEFjY291bnRDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xuICAgIC8vIFN0b3JhZ2VcbiAgICBhcHBTZXR0aW5nczogYW55O1xuXG4gICAgLy8gRGF0YVxuICAgIHBhcmFtcyQ6IE9ic2VydmFibGU8YW55PjtcbiAgICBhY2NvdW50X2RhdGE6IGFueTtcblxuICAgIC8vIFV0aWxzXG4gICAgZGlhbG9nczogYW55O1xuXG4gICAgY29uc3RydWN0b3IoXG4gICAgICAgIHByaXZhdGUgcGFnZTogUGFnZSxcbiAgICApIHtcbiAgICAgICAgLy9TdGFydCBhdCBob21lXG4gICAgICAgIHRoaXMucGFnZS5lbmFibGVTd2lwZUJhY2tOYXZpZ2F0aW9uID0gdHJ1ZTtcbiAgICAgICAgdGhpcy5wYWdlLmFjdGlvbkJhckhpZGRlbiA9IGZhbHNlO1xuICAgICAgICB0aGlzLmFwcFNldHRpbmdzID0gcmVxdWlyZShcImFwcGxpY2F0aW9uLXNldHRpbmdzXCIpO1xuICAgICAgICB0aGlzLmRpYWxvZ3MgPSByZXF1aXJlKFwidG5zLWNvcmUtbW9kdWxlcy91aS9kaWFsb2dzXCIpO1xuICAgIH1cblxuICAgIG5nT25Jbml0KCk6IHZvaWQge1xuICAgICAgICB0aGlzLmFjY291bnRfZGF0YSA9IEpTT04ucGFyc2UodGhpcy5hcHBTZXR0aW5ncy5nZXRTdHJpbmcoXCJhY2NvdW50XCIpKTtcbiAgICB9XG5cbiAgICBjb3B5Q2xpcGJvYXJkKHRleHQ6IHN0cmluZykge1xuICAgICAgICBcbiAgICB9XG59XG4iXX0=