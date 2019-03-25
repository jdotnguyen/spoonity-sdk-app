"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var common_1 = require("nativescript-angular/common");
var forms_1 = require("nativescript-angular/forms");
var bottomBar_component_1 = require("./bottomBar.component");
var BottomBarModule = /** @class */ (function () {
    function BottomBarModule() {
    }
    BottomBarModule = __decorate([
        core_1.NgModule({
            imports: [
                common_1.NativeScriptCommonModule,
                forms_1.NativeScriptFormsModule
            ],
            declarations: [
                bottomBar_component_1.BottomBarComponent
            ],
            exports: [
                bottomBar_component_1.BottomBarComponent
            ],
            schemas: [
                core_1.NO_ERRORS_SCHEMA
            ]
        })
    ], BottomBarModule);
    return BottomBarModule;
}());
exports.BottomBarModule = BottomBarModule;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYm90dG9tQmFyLm1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImJvdHRvbUJhci5tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxzQ0FBMkQ7QUFDM0Qsc0RBQXVFO0FBQ3ZFLG9EQUFxRTtBQUVyRSw2REFBMkQ7QUFpQjNEO0lBQUE7SUFBK0IsQ0FBQztJQUFuQixlQUFlO1FBZjNCLGVBQVEsQ0FBQztZQUNULE9BQU8sRUFBRTtnQkFDUixpQ0FBd0I7Z0JBQ3hCLCtCQUF1QjthQUN2QjtZQUNELFlBQVksRUFBRTtnQkFDYix3Q0FBa0I7YUFDbEI7WUFDRCxPQUFPLEVBQUU7Z0JBQ1Isd0NBQWtCO2FBQ2xCO1lBQ0QsT0FBTyxFQUFFO2dCQUNSLHVCQUFnQjthQUNoQjtTQUNELENBQUM7T0FDVyxlQUFlLENBQUk7SUFBRCxzQkFBQztDQUFBLEFBQWhDLElBQWdDO0FBQW5CLDBDQUFlIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgTmdNb2R1bGUsIE5PX0VSUk9SU19TQ0hFTUEgfSBmcm9tIFwiQGFuZ3VsYXIvY29yZVwiO1xuaW1wb3J0IHsgTmF0aXZlU2NyaXB0Q29tbW9uTW9kdWxlIH0gZnJvbSBcIm5hdGl2ZXNjcmlwdC1hbmd1bGFyL2NvbW1vblwiO1xuaW1wb3J0IHsgTmF0aXZlU2NyaXB0Rm9ybXNNb2R1bGUgfSBmcm9tIFwibmF0aXZlc2NyaXB0LWFuZ3VsYXIvZm9ybXNcIjtcblxuaW1wb3J0IHsgQm90dG9tQmFyQ29tcG9uZW50IH0gZnJvbSBcIi4vYm90dG9tQmFyLmNvbXBvbmVudFwiO1xuXG5ATmdNb2R1bGUoe1xuXHRpbXBvcnRzOiBbXG5cdFx0TmF0aXZlU2NyaXB0Q29tbW9uTW9kdWxlLFxuXHRcdE5hdGl2ZVNjcmlwdEZvcm1zTW9kdWxlXG5cdF0sXG5cdGRlY2xhcmF0aW9uczogW1xuXHRcdEJvdHRvbUJhckNvbXBvbmVudFxuXHRdLFxuXHRleHBvcnRzOiBbXG5cdFx0Qm90dG9tQmFyQ29tcG9uZW50XG5cdF0sXG5cdHNjaGVtYXM6IFtcblx0XHROT19FUlJPUlNfU0NIRU1BXG5cdF1cbn0pXG5leHBvcnQgY2xhc3MgQm90dG9tQmFyTW9kdWxlIHsgfSJdfQ==