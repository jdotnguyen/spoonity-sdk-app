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
var register_routing_module_1 = require("./register-routing.module");
var register_component_1 = require("./register.component");
var RegisterModule = /** @class */ (function () {
    function RegisterModule() {
    }
    RegisterModule = __decorate([
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
                register_routing_module_1.RegisterRoutingModule,
                forms_1.NativeScriptFormsModule
            ],
            declarations: [
                register_component_1.RegisterComponent
            ],
            schemas: [
                core_1.NO_ERRORS_SCHEMA
            ]
        })
    ], RegisterModule);
    return RegisterModule;
}());
exports.RegisterModule = RegisterModule;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVnaXN0ZXIubW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsicmVnaXN0ZXIubW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsc0NBQTJEO0FBQzNELHNEQUF1RTtBQUN2RSw4REFBb0Y7QUFDcEYsNERBQWdGO0FBQ2hGLDREQUFnRjtBQUNoRix5REFBMEU7QUFDMUUsNERBQWdGO0FBQ2hGLGdFQUFnRztBQUNoRyx5REFBMEU7QUFDMUUsb0RBQXFFO0FBRXJFLHFFQUFrRTtBQUNsRSwyREFBeUQ7QUFzQnpEO0lBQUE7SUFBOEIsQ0FBQztJQUFsQixjQUFjO1FBcEIxQixlQUFRLENBQUM7WUFDVCxPQUFPLEVBQUU7Z0JBQ1Isd0NBQThCO2dCQUM5QixzQ0FBNEI7Z0JBQzVCLHNDQUE0QjtnQkFDNUIsbUNBQXlCO2dCQUN6QixzQ0FBNEI7Z0JBQzVCLGtEQUF3QztnQkFDeEMsbUNBQXlCO2dCQUN6QixpQ0FBd0I7Z0JBQ3hCLCtDQUFxQjtnQkFDckIsK0JBQXVCO2FBQ3ZCO1lBQ0QsWUFBWSxFQUFFO2dCQUNiLHNDQUFpQjthQUNqQjtZQUNELE9BQU8sRUFBRTtnQkFDUix1QkFBZ0I7YUFDaEI7U0FDRCxDQUFDO09BQ1csY0FBYyxDQUFJO0lBQUQscUJBQUM7Q0FBQSxBQUEvQixJQUErQjtBQUFsQix3Q0FBYyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE5nTW9kdWxlLCBOT19FUlJPUlNfU0NIRU1BIH0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcbmltcG9ydCB7IE5hdGl2ZVNjcmlwdENvbW1vbk1vZHVsZSB9IGZyb20gXCJuYXRpdmVzY3JpcHQtYW5ndWxhci9jb21tb25cIjtcbmltcG9ydCB7IE5hdGl2ZVNjcmlwdFVJU2lkZURyYXdlck1vZHVsZSB9IGZyb20gXCJuYXRpdmVzY3JpcHQtdWktc2lkZWRyYXdlci9hbmd1bGFyXCI7XG5pbXBvcnQgeyBOYXRpdmVTY3JpcHRVSUxpc3RWaWV3TW9kdWxlIH0gZnJvbSBcIm5hdGl2ZXNjcmlwdC11aS1saXN0dmlldy9hbmd1bGFyXCI7XG5pbXBvcnQgeyBOYXRpdmVTY3JpcHRVSUNhbGVuZGFyTW9kdWxlIH0gZnJvbSBcIm5hdGl2ZXNjcmlwdC11aS1jYWxlbmRhci9hbmd1bGFyXCI7XG5pbXBvcnQgeyBOYXRpdmVTY3JpcHRVSUNoYXJ0TW9kdWxlIH0gZnJvbSBcIm5hdGl2ZXNjcmlwdC11aS1jaGFydC9hbmd1bGFyXCI7XG5pbXBvcnQgeyBOYXRpdmVTY3JpcHRVSURhdGFGb3JtTW9kdWxlIH0gZnJvbSBcIm5hdGl2ZXNjcmlwdC11aS1kYXRhZm9ybS9hbmd1bGFyXCI7XG5pbXBvcnQgeyBOYXRpdmVTY3JpcHRVSUF1dG9Db21wbGV0ZVRleHRWaWV3TW9kdWxlIH0gZnJvbSBcIm5hdGl2ZXNjcmlwdC11aS1hdXRvY29tcGxldGUvYW5ndWxhclwiO1xuaW1wb3J0IHsgTmF0aXZlU2NyaXB0VUlHYXVnZU1vZHVsZSB9IGZyb20gXCJuYXRpdmVzY3JpcHQtdWktZ2F1Z2UvYW5ndWxhclwiO1xuaW1wb3J0IHsgTmF0aXZlU2NyaXB0Rm9ybXNNb2R1bGUgfSBmcm9tIFwibmF0aXZlc2NyaXB0LWFuZ3VsYXIvZm9ybXNcIjtcblxuaW1wb3J0IHsgUmVnaXN0ZXJSb3V0aW5nTW9kdWxlIH0gZnJvbSBcIi4vcmVnaXN0ZXItcm91dGluZy5tb2R1bGVcIjtcbmltcG9ydCB7IFJlZ2lzdGVyQ29tcG9uZW50IH0gZnJvbSBcIi4vcmVnaXN0ZXIuY29tcG9uZW50XCI7XG5cbkBOZ01vZHVsZSh7XG5cdGltcG9ydHM6IFtcblx0XHROYXRpdmVTY3JpcHRVSVNpZGVEcmF3ZXJNb2R1bGUsXG5cdFx0TmF0aXZlU2NyaXB0VUlMaXN0Vmlld01vZHVsZSxcblx0XHROYXRpdmVTY3JpcHRVSUNhbGVuZGFyTW9kdWxlLFxuXHRcdE5hdGl2ZVNjcmlwdFVJQ2hhcnRNb2R1bGUsXG5cdFx0TmF0aXZlU2NyaXB0VUlEYXRhRm9ybU1vZHVsZSxcblx0XHROYXRpdmVTY3JpcHRVSUF1dG9Db21wbGV0ZVRleHRWaWV3TW9kdWxlLFxuXHRcdE5hdGl2ZVNjcmlwdFVJR2F1Z2VNb2R1bGUsXG5cdFx0TmF0aXZlU2NyaXB0Q29tbW9uTW9kdWxlLFxuXHRcdFJlZ2lzdGVyUm91dGluZ01vZHVsZSxcblx0XHROYXRpdmVTY3JpcHRGb3Jtc01vZHVsZVxuXHRdLFxuXHRkZWNsYXJhdGlvbnM6IFtcblx0XHRSZWdpc3RlckNvbXBvbmVudFxuXHRdLFxuXHRzY2hlbWFzOiBbXG5cdFx0Tk9fRVJST1JTX1NDSEVNQVxuXHRdXG59KVxuZXhwb3J0IGNsYXNzIFJlZ2lzdGVyTW9kdWxlIHsgfSJdfQ==