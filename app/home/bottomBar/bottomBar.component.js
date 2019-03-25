"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var geoLocation = require("nativescript-geolocation");
var core_1 = require("@angular/core");
var BottomBarComponent = /** @class */ (function () {
    function BottomBarComponent() {
        this.selectedTab = 0;
        this.tabSelected = new core_1.EventEmitter();
    }
    BottomBarComponent.prototype.enableLocationServices = function () {
        var _this = this;
        geoLocation.isEnabled().then(function (enabled) {
            if (!enabled) {
                geoLocation.enableLocationRequest().then(function () { return _this.showLocation(); });
            }
            else {
                _this.showLocation();
            }
        });
    };
    BottomBarComponent.prototype.showLocation = function () {
        var _this = this;
        geoLocation.watchLocation(function (location) {
            _this.currentGeoLocation = location;
        }, function (error) {
            alert(error);
        }, {
            desiredAccuracy: 3,
            updateDistance: 10,
            minimumUpdateTime: 1000 * 1
        });
    };
    BottomBarComponent.prototype.ngOnInit = function () {
    };
    BottomBarComponent.prototype.ngAfterViewInit = function () {
    };
    BottomBarComponent.prototype.selectTab = function (index) {
        if (index != this.selectedTab) {
            this.selectedTab = index;
            this.tabSelected.emit(this.selectedTab);
        }
    };
    BottomBarComponent.prototype.messageCounter = function (count) {
        this.message_count = count;
        console.log('justin', this.message_count);
    };
    __decorate([
        core_1.ViewChild('image1'),
        __metadata("design:type", core_1.ElementRef)
    ], BottomBarComponent.prototype, "image1", void 0);
    __decorate([
        core_1.ViewChild('image2'),
        __metadata("design:type", core_1.ElementRef)
    ], BottomBarComponent.prototype, "image2", void 0);
    __decorate([
        core_1.ViewChild('image3'),
        __metadata("design:type", core_1.ElementRef)
    ], BottomBarComponent.prototype, "image3", void 0);
    __decorate([
        core_1.ViewChild('image4'),
        __metadata("design:type", core_1.ElementRef)
    ], BottomBarComponent.prototype, "image4", void 0);
    __decorate([
        core_1.ViewChild('image5'),
        __metadata("design:type", core_1.ElementRef)
    ], BottomBarComponent.prototype, "image5", void 0);
    __decorate([
        core_1.Output(),
        __metadata("design:type", Object)
    ], BottomBarComponent.prototype, "tabSelected", void 0);
    BottomBarComponent = __decorate([
        core_1.Component({
            selector: "BottomBar",
            moduleId: module.id,
            templateUrl: "./bottomBar.component.html",
            styleUrls: ['./bottomBar.component.css']
        }),
        __metadata("design:paramtypes", [])
    ], BottomBarComponent);
    return BottomBarComponent;
}());
exports.BottomBarComponent = BottomBarComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYm90dG9tQmFyLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImJvdHRvbUJhci5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxzREFBd0Q7QUFDeEQsc0NBQStGO0FBUS9GO0lBb0NDO1FBVkEsZ0JBQVcsR0FBVyxDQUFDLENBQUM7UUFRZCxnQkFBVyxHQUFHLElBQUksbUJBQVksRUFBVSxDQUFDO0lBR25ELENBQUM7SUFqQ0UsbURBQXNCLEdBQXRCO1FBQUEsaUJBUUM7UUFQRyxXQUFXLENBQUMsU0FBUyxFQUFFLENBQUMsSUFBSSxDQUFDLFVBQUEsT0FBTztZQUNoQyxJQUFJLENBQUMsT0FBTyxFQUFFO2dCQUNWLFdBQVcsQ0FBQyxxQkFBcUIsRUFBRSxDQUFDLElBQUksQ0FBQyxjQUFNLE9BQUEsS0FBSSxDQUFDLFlBQVksRUFBRSxFQUFuQixDQUFtQixDQUFDLENBQUM7YUFDdkU7aUJBQU07Z0JBQ0gsS0FBSSxDQUFDLFlBQVksRUFBRSxDQUFDO2FBQ3ZCO1FBQ0wsQ0FBQyxDQUFDLENBQUM7SUFDUCxDQUFDO0lBRU8seUNBQVksR0FBcEI7UUFBQSxpQkFVQztRQVRHLFdBQVcsQ0FBQyxhQUFhLENBQUMsVUFBQSxRQUFRO1lBQzlCLEtBQUksQ0FBQyxrQkFBa0IsR0FBRyxRQUFRLENBQUM7UUFDdkMsQ0FBQyxFQUFFLFVBQUEsS0FBSztZQUNKLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUNqQixDQUFDLEVBQUU7WUFDSyxlQUFlLEVBQUUsQ0FBQztZQUNsQixjQUFjLEVBQUUsRUFBRTtZQUNsQixpQkFBaUIsRUFBRSxJQUFJLEdBQUcsQ0FBQztTQUM5QixDQUFDLENBQUM7SUFDWCxDQUFDO0lBZUoscUNBQVEsR0FBUjtJQUNBLENBQUM7SUFFRCw0Q0FBZSxHQUFmO0lBQ0EsQ0FBQztJQUVELHNDQUFTLEdBQVQsVUFBVSxLQUFhO1FBQ3RCLElBQUksS0FBSyxJQUFJLElBQUksQ0FBQyxXQUFXLEVBQUU7WUFDOUIsSUFBSSxDQUFDLFdBQVcsR0FBRyxLQUFLLENBQUM7WUFDekIsSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDO1NBQ3hDO0lBQ0YsQ0FBQztJQUVELDJDQUFjLEdBQWQsVUFBZSxLQUFhO1FBQzNCLElBQUksQ0FBQyxhQUFhLEdBQUcsS0FBSyxDQUFDO1FBQzNCLE9BQU8sQ0FBQyxHQUFHLENBQUMsUUFBUSxFQUFFLElBQUksQ0FBQyxhQUFhLENBQUMsQ0FBQztJQUMzQyxDQUFDO0lBM0JvQjtRQUFwQixnQkFBUyxDQUFDLFFBQVEsQ0FBQztrQ0FBUyxpQkFBVTtzREFBQztJQUNuQjtRQUFwQixnQkFBUyxDQUFDLFFBQVEsQ0FBQztrQ0FBUyxpQkFBVTtzREFBQztJQUNuQjtRQUFwQixnQkFBUyxDQUFDLFFBQVEsQ0FBQztrQ0FBUyxpQkFBVTtzREFBQztJQUNuQjtRQUFwQixnQkFBUyxDQUFDLFFBQVEsQ0FBQztrQ0FBUyxpQkFBVTtzREFBQztJQUNuQjtRQUFwQixnQkFBUyxDQUFDLFFBQVEsQ0FBQztrQ0FBUyxpQkFBVTtzREFBQztJQUU5QjtRQUFULGFBQU0sRUFBRTs7MkRBQTBDO0lBbEN2QyxrQkFBa0I7UUFOOUIsZ0JBQVMsQ0FBQztZQUNWLFFBQVEsRUFBRSxXQUFXO1lBQ3JCLFFBQVEsRUFBRSxNQUFNLENBQUMsRUFBRTtZQUNuQixXQUFXLEVBQUUsNEJBQTRCO1lBQ3pDLFNBQVMsRUFBRSxDQUFDLDJCQUEyQixDQUFDO1NBQ3hDLENBQUM7O09BQ1csa0JBQWtCLENBeUQ5QjtJQUFELHlCQUFDO0NBQUEsQUF6REQsSUF5REM7QUF6RFksZ0RBQWtCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0ICogYXMgZ2VvTG9jYXRpb24gZnJvbSBcIm5hdGl2ZXNjcmlwdC1nZW9sb2NhdGlvblwiO1xuaW1wb3J0IHsgQ29tcG9uZW50LCBPbkluaXQsIFZpZXdDaGlsZCwgRWxlbWVudFJlZiwgT3V0cHV0LCBFdmVudEVtaXR0ZXIgfSBmcm9tIFwiQGFuZ3VsYXIvY29yZVwiO1xuXG5AQ29tcG9uZW50KHtcblx0c2VsZWN0b3I6IFwiQm90dG9tQmFyXCIsXG5cdG1vZHVsZUlkOiBtb2R1bGUuaWQsXG5cdHRlbXBsYXRlVXJsOiBcIi4vYm90dG9tQmFyLmNvbXBvbmVudC5odG1sXCIsXG5cdHN0eWxlVXJsczogWycuL2JvdHRvbUJhci5jb21wb25lbnQuY3NzJ11cbn0pXG5leHBvcnQgY2xhc3MgQm90dG9tQmFyQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcblx0Y3VycmVudEdlb0xvY2F0aW9uOiBhbnk7XG5cdG1lc3NhZ2VfY291bnQ6IGFueTtcblxuICAgIGVuYWJsZUxvY2F0aW9uU2VydmljZXMoKTogdm9pZCB7XG4gICAgICAgIGdlb0xvY2F0aW9uLmlzRW5hYmxlZCgpLnRoZW4oZW5hYmxlZCA9PiB7XG4gICAgICAgICAgICBpZiAoIWVuYWJsZWQpIHtcbiAgICAgICAgICAgICAgICBnZW9Mb2NhdGlvbi5lbmFibGVMb2NhdGlvblJlcXVlc3QoKS50aGVuKCgpID0+IHRoaXMuc2hvd0xvY2F0aW9uKCkpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICB0aGlzLnNob3dMb2NhdGlvbigpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBwcml2YXRlIHNob3dMb2NhdGlvbigpOiB2b2lkIHtcbiAgICAgICAgZ2VvTG9jYXRpb24ud2F0Y2hMb2NhdGlvbihsb2NhdGlvbiA9PiB7XG4gICAgICAgICAgICB0aGlzLmN1cnJlbnRHZW9Mb2NhdGlvbiA9IGxvY2F0aW9uO1xuICAgICAgICB9LCBlcnJvciA9PiB7XG4gICAgICAgICAgICBhbGVydChlcnJvcik7XG4gICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgICBkZXNpcmVkQWNjdXJhY3k6IDMsXG4gICAgICAgICAgICAgICAgdXBkYXRlRGlzdGFuY2U6IDEwLFxuICAgICAgICAgICAgICAgIG1pbmltdW1VcGRhdGVUaW1lOiAxMDAwICogMVxuICAgICAgICAgICAgfSk7XG4gICAgfVxuXG5cdHNlbGVjdGVkVGFiOiBudW1iZXIgPSAwO1xuXG5cdEBWaWV3Q2hpbGQoJ2ltYWdlMScpIGltYWdlMTogRWxlbWVudFJlZjtcblx0QFZpZXdDaGlsZCgnaW1hZ2UyJykgaW1hZ2UyOiBFbGVtZW50UmVmO1xuXHRAVmlld0NoaWxkKCdpbWFnZTMnKSBpbWFnZTM6IEVsZW1lbnRSZWY7XG5cdEBWaWV3Q2hpbGQoJ2ltYWdlNCcpIGltYWdlNDogRWxlbWVudFJlZjtcblx0QFZpZXdDaGlsZCgnaW1hZ2U1JykgaW1hZ2U1OiBFbGVtZW50UmVmO1xuXG5cdEBPdXRwdXQoKSB0YWJTZWxlY3RlZCA9IG5ldyBFdmVudEVtaXR0ZXI8bnVtYmVyPigpO1xuXG5cdGNvbnN0cnVjdG9yKCkge1xuXHR9XG5cblx0bmdPbkluaXQoKTogdm9pZCB7XG5cdH1cblxuXHRuZ0FmdGVyVmlld0luaXQoKSB7XG5cdH1cblxuXHRzZWxlY3RUYWIoaW5kZXg6IG51bWJlcikge1xuXHRcdGlmIChpbmRleCAhPSB0aGlzLnNlbGVjdGVkVGFiKSB7XG5cdFx0XHR0aGlzLnNlbGVjdGVkVGFiID0gaW5kZXg7XG5cdFx0XHR0aGlzLnRhYlNlbGVjdGVkLmVtaXQodGhpcy5zZWxlY3RlZFRhYik7XG5cdFx0fVxuXHR9XG5cblx0bWVzc2FnZUNvdW50ZXIoY291bnQ6IG51bWJlcikge1xuXHRcdHRoaXMubWVzc2FnZV9jb3VudCA9IGNvdW50O1xuXHRcdGNvbnNvbGUubG9nKCdqdXN0aW4nLCB0aGlzLm1lc3NhZ2VfY291bnQpO1xuXHR9XG5cbn0iXX0=