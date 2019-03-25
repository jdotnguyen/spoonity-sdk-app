"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var common_1 = require("nativescript-angular/common");
var angular_1 = require("nativescript-ui-sidedrawer/angular");
var angular_2 = require("nativescript-ui-listview/angular");
var angular_3 = require("nativescript-ui-calendar/angular");
var angular_4 = require("nativescript-ui-chart/angular");
var angular_5 = require("nativescript-ui-dataform/angular");
var angular_6 = require("nativescript-ui-autocomplete/angular");
var angular_7 = require("nativescript-ui-gauge/angular");
var forms_1 = require("nativescript-angular/forms");
var login_routing_module_1 = require("./login-routing.module");
var login_component_1 = require("./login.component");
var LoginModule = /** @class */ (function () {
    function LoginModule() {
    }
    LoginModule = __decorate([
        core_1.NgModule({
            imports: [
                angular_1.NativeScriptUISideDrawerModule,
                angular_2.NativeScriptUIListViewModule,
                angular_3.NativeScriptUICalendarModule,
                angular_4.NativeScriptUIChartModule,
                angular_5.NativeScriptUIDataFormModule,
                angular_6.NativeScriptUIAutoCompleteTextViewModule,
                angular_7.NativeScriptUIGaugeModule,
                common_1.NativeScriptCommonModule,
                login_routing_module_1.LoginRoutingModule,
                forms_1.NativeScriptFormsModule
            ],
            declarations: [
                login_component_1.LoginComponent
            ],
            schemas: [
                core_1.NO_ERRORS_SCHEMA
            ]
        })
    ], LoginModule);
    return LoginModule;
}());
exports.LoginModule = LoginModule;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibG9naW4ubW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibG9naW4ubW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsc0NBQTJEO0FBQzNELHNEQUF1RTtBQUN2RSw4REFBb0Y7QUFDcEYsNERBQWdGO0FBQ2hGLDREQUFnRjtBQUNoRix5REFBMEU7QUFDMUUsNERBQWdGO0FBQ2hGLGdFQUFnRztBQUNoRyx5REFBMEU7QUFDMUUsb0RBQXFFO0FBRXJFLCtEQUE0RDtBQUM1RCxxREFBbUQ7QUFzQm5EO0lBQUE7SUFBMkIsQ0FBQztJQUFmLFdBQVc7UUFwQnZCLGVBQVEsQ0FBQztZQUNULE9BQU8sRUFBRTtnQkFDUix3Q0FBOEI7Z0JBQzlCLHNDQUE0QjtnQkFDNUIsc0NBQTRCO2dCQUM1QixtQ0FBeUI7Z0JBQ3pCLHNDQUE0QjtnQkFDNUIsa0RBQXdDO2dCQUN4QyxtQ0FBeUI7Z0JBQ3pCLGlDQUF3QjtnQkFDeEIseUNBQWtCO2dCQUNsQiwrQkFBdUI7YUFDdkI7WUFDRCxZQUFZLEVBQUU7Z0JBQ2IsZ0NBQWM7YUFDZDtZQUNELE9BQU8sRUFBRTtnQkFDUix1QkFBZ0I7YUFDaEI7U0FDRCxDQUFDO09BQ1csV0FBVyxDQUFJO0lBQUQsa0JBQUM7Q0FBQSxBQUE1QixJQUE0QjtBQUFmLGtDQUFXIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgTmdNb2R1bGUsIE5PX0VSUk9SU19TQ0hFTUEgfSBmcm9tIFwiQGFuZ3VsYXIvY29yZVwiO1xuaW1wb3J0IHsgTmF0aXZlU2NyaXB0Q29tbW9uTW9kdWxlIH0gZnJvbSBcIm5hdGl2ZXNjcmlwdC1hbmd1bGFyL2NvbW1vblwiO1xuaW1wb3J0IHsgTmF0aXZlU2NyaXB0VUlTaWRlRHJhd2VyTW9kdWxlIH0gZnJvbSBcIm5hdGl2ZXNjcmlwdC11aS1zaWRlZHJhd2VyL2FuZ3VsYXJcIjtcbmltcG9ydCB7IE5hdGl2ZVNjcmlwdFVJTGlzdFZpZXdNb2R1bGUgfSBmcm9tIFwibmF0aXZlc2NyaXB0LXVpLWxpc3R2aWV3L2FuZ3VsYXJcIjtcbmltcG9ydCB7IE5hdGl2ZVNjcmlwdFVJQ2FsZW5kYXJNb2R1bGUgfSBmcm9tIFwibmF0aXZlc2NyaXB0LXVpLWNhbGVuZGFyL2FuZ3VsYXJcIjtcbmltcG9ydCB7IE5hdGl2ZVNjcmlwdFVJQ2hhcnRNb2R1bGUgfSBmcm9tIFwibmF0aXZlc2NyaXB0LXVpLWNoYXJ0L2FuZ3VsYXJcIjtcbmltcG9ydCB7IE5hdGl2ZVNjcmlwdFVJRGF0YUZvcm1Nb2R1bGUgfSBmcm9tIFwibmF0aXZlc2NyaXB0LXVpLWRhdGFmb3JtL2FuZ3VsYXJcIjtcbmltcG9ydCB7IE5hdGl2ZVNjcmlwdFVJQXV0b0NvbXBsZXRlVGV4dFZpZXdNb2R1bGUgfSBmcm9tIFwibmF0aXZlc2NyaXB0LXVpLWF1dG9jb21wbGV0ZS9hbmd1bGFyXCI7XG5pbXBvcnQgeyBOYXRpdmVTY3JpcHRVSUdhdWdlTW9kdWxlIH0gZnJvbSBcIm5hdGl2ZXNjcmlwdC11aS1nYXVnZS9hbmd1bGFyXCI7XG5pbXBvcnQgeyBOYXRpdmVTY3JpcHRGb3Jtc01vZHVsZSB9IGZyb20gXCJuYXRpdmVzY3JpcHQtYW5ndWxhci9mb3Jtc1wiO1xuXG5pbXBvcnQgeyBMb2dpblJvdXRpbmdNb2R1bGUgfSBmcm9tIFwiLi9sb2dpbi1yb3V0aW5nLm1vZHVsZVwiO1xuaW1wb3J0IHsgTG9naW5Db21wb25lbnQgfSBmcm9tIFwiLi9sb2dpbi5jb21wb25lbnRcIjtcblxuQE5nTW9kdWxlKHtcblx0aW1wb3J0czogW1xuXHRcdE5hdGl2ZVNjcmlwdFVJU2lkZURyYXdlck1vZHVsZSxcblx0XHROYXRpdmVTY3JpcHRVSUxpc3RWaWV3TW9kdWxlLFxuXHRcdE5hdGl2ZVNjcmlwdFVJQ2FsZW5kYXJNb2R1bGUsXG5cdFx0TmF0aXZlU2NyaXB0VUlDaGFydE1vZHVsZSxcblx0XHROYXRpdmVTY3JpcHRVSURhdGFGb3JtTW9kdWxlLFxuXHRcdE5hdGl2ZVNjcmlwdFVJQXV0b0NvbXBsZXRlVGV4dFZpZXdNb2R1bGUsXG5cdFx0TmF0aXZlU2NyaXB0VUlHYXVnZU1vZHVsZSxcblx0XHROYXRpdmVTY3JpcHRDb21tb25Nb2R1bGUsXG5cdFx0TG9naW5Sb3V0aW5nTW9kdWxlLFxuXHRcdE5hdGl2ZVNjcmlwdEZvcm1zTW9kdWxlXG5cdF0sXG5cdGRlY2xhcmF0aW9uczogW1xuXHRcdExvZ2luQ29tcG9uZW50XG5cdF0sXG5cdHNjaGVtYXM6IFtcblx0XHROT19FUlJPUlNfU0NIRU1BXG5cdF1cbn0pXG5leHBvcnQgY2xhc3MgTG9naW5Nb2R1bGUgeyB9Il19