"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var page_1 = require("ui/page");
var router_1 = require("@angular/router");
var LocationComponent = /** @class */ (function () {
    function LocationComponent(page, route) {
        this.page = page;
        this.route = route;
        //Start at home
        this.page.enableSwipeBackNavigation = true;
        this.page.actionBarHidden = false;
        this.appSettings = require("application-settings");
        this.utils = require("tns-core-modules/utils/utils");
        this.user_data = this.appSettings.getString("account");
    }
    LocationComponent.prototype.ngOnInit = function () {
        this.location_data = JSON.parse(this.appSettings.getString("location"));
        this.location_data.html = '<iframe src="https://maps.google.com/maps?q=' + this.location_data.latitude + ',' + this.location_data.longitude + '&hl=es;z=14&amp;output=embed" width="100%" height="300" frameborder="0" style="border:0"></iframe>';
    };
    LocationComponent.prototype.openEmail = function () {
        this.utils.openUrl('mailto:' + this.location_data.email_address);
    };
    LocationComponent.prototype.openPhone = function () {
        this.utils.openUrl('tel:' + this.location_data.phone_number);
    };
    LocationComponent.prototype.goToLocation = function (location) {
        this.utils.openUrl("https://www.google.com/maps/search/?api=1&query=" + location.latitude + ',' + location.longitude);
    };
    LocationComponent.prototype.openMobileOrdering = function (location) {
        // Get mobile ordering URL
        for (var i in location.vendor_attribute) {
            if (location.vendor_attribute[i].label == "Order Online") {
                this.orderingUrl = location.vendor_attribute[i].link;
            }
        }
        if (this.orderingUrl) {
            this.utils.openUrl(this.orderingUrl + '&user_token=spoonity:' + this.user_data.online_order_token + '&user_token=spoonityloyalty:' + this.user_data.online_order_token + '&user_token=spoonitycredit:' + this.user_data.online_order_token);
        }
    };
    LocationComponent = __decorate([
        core_1.Component({
            selector: "Location",
            moduleId: module.id,
            templateUrl: "./location.component.html",
            styleUrls: ['./location.component.css']
        }),
        __metadata("design:paramtypes", [page_1.Page,
            router_1.ActivatedRoute])
    ], LocationComponent);
    return LocationComponent;
}());
exports.LocationComponent = LocationComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibG9jYXRpb24uY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibG9jYXRpb24uY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsc0NBQWtEO0FBQ2xELGdDQUErQjtBQUMvQiwwQ0FBaUQ7QUFTakQ7SUFhSSwyQkFDWSxJQUFVLEVBQ1YsS0FBcUI7UUFEckIsU0FBSSxHQUFKLElBQUksQ0FBTTtRQUNWLFVBQUssR0FBTCxLQUFLLENBQWdCO1FBRTdCLGVBQWU7UUFDZixJQUFJLENBQUMsSUFBSSxDQUFDLHlCQUF5QixHQUFHLElBQUksQ0FBQztRQUMzQyxJQUFJLENBQUMsSUFBSSxDQUFDLGVBQWUsR0FBRyxLQUFLLENBQUM7UUFDbEMsSUFBSSxDQUFDLFdBQVcsR0FBRyxPQUFPLENBQUMsc0JBQXNCLENBQUMsQ0FBQztRQUNuRCxJQUFJLENBQUMsS0FBSyxHQUFHLE9BQU8sQ0FBQyw4QkFBOEIsQ0FBQyxDQUFDO1FBQ3JELElBQUksQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDLFdBQVcsQ0FBQyxTQUFTLENBQUMsU0FBUyxDQUFDLENBQUM7SUFDM0QsQ0FBQztJQUVELG9DQUFRLEdBQVI7UUFDSSxJQUFJLENBQUMsYUFBYSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxTQUFTLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQztRQUN4RSxJQUFJLENBQUMsYUFBYSxDQUFDLElBQUksR0FBRyw4Q0FBOEMsR0FBRyxJQUFJLENBQUMsYUFBYSxDQUFDLFFBQVEsR0FBRyxHQUFHLEdBQUcsSUFBSSxDQUFDLGFBQWEsQ0FBQyxTQUFTLEdBQUcsb0dBQW9HLENBQUM7SUFDdlAsQ0FBQztJQUVELHFDQUFTLEdBQVQ7UUFDSSxJQUFJLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDLGFBQWEsQ0FBQyxhQUFhLENBQUMsQ0FBQztJQUNyRSxDQUFDO0lBRUQscUNBQVMsR0FBVDtRQUNJLElBQUksQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUMsYUFBYSxDQUFDLFlBQVksQ0FBQyxDQUFDO0lBQ2pFLENBQUM7SUFFRCx3Q0FBWSxHQUFaLFVBQWEsUUFBYTtRQUN0QixJQUFJLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxrREFBa0QsR0FBRyxRQUFRLENBQUMsUUFBUSxHQUFHLEdBQUcsR0FBRyxRQUFRLENBQUMsU0FBUyxDQUFDLENBQUM7SUFDMUgsQ0FBQztJQUVELDhDQUFrQixHQUFsQixVQUFtQixRQUFhO1FBQzVCLDBCQUEwQjtRQUMxQixLQUFLLElBQUksQ0FBQyxJQUFJLFFBQVEsQ0FBQyxnQkFBZ0IsRUFBRTtZQUNyQyxJQUFJLFFBQVEsQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLElBQUksY0FBYyxFQUFFO2dCQUN0RCxJQUFJLENBQUMsV0FBVyxHQUFHLFFBQVEsQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUM7YUFDeEQ7U0FDSjtRQUVELElBQUksSUFBSSxDQUFDLFdBQVcsRUFBRTtZQUNsQixJQUFJLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsV0FBVyxHQUFHLHVCQUF1QixHQUFJLElBQUksQ0FBQyxTQUFTLENBQUMsa0JBQWtCLEdBQUcsOEJBQThCLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxrQkFBa0IsR0FBRyw2QkFBNkIsR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLGtCQUFrQixDQUFDLENBQUM7U0FDaFA7SUFDTCxDQUFDO0lBckRRLGlCQUFpQjtRQU43QixnQkFBUyxDQUFDO1lBQ1AsUUFBUSxFQUFFLFVBQVU7WUFDcEIsUUFBUSxFQUFFLE1BQU0sQ0FBQyxFQUFFO1lBQ25CLFdBQVcsRUFBRSwyQkFBMkI7WUFDeEMsU0FBUyxFQUFFLENBQUMsMEJBQTBCLENBQUM7U0FDMUMsQ0FBQzt5Q0Flb0IsV0FBSTtZQUNILHVCQUFjO09BZnhCLGlCQUFpQixDQXNEN0I7SUFBRCx3QkFBQztDQUFBLEFBdERELElBc0RDO0FBdERZLDhDQUFpQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgT25Jbml0IH0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcbmltcG9ydCB7IFBhZ2UgfSBmcm9tIFwidWkvcGFnZVwiO1xuaW1wb3J0IHsgQWN0aXZhdGVkUm91dGUgfSBmcm9tIFwiQGFuZ3VsYXIvcm91dGVyXCI7XG5pbXBvcnQgeyBPYnNlcnZhYmxlIH0gZnJvbSBcInJ4anNcIjtcblxuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6IFwiTG9jYXRpb25cIixcbiAgICBtb2R1bGVJZDogbW9kdWxlLmlkLFxuICAgIHRlbXBsYXRlVXJsOiBcIi4vbG9jYXRpb24uY29tcG9uZW50Lmh0bWxcIixcbiAgICBzdHlsZVVybHM6IFsnLi9sb2NhdGlvbi5jb21wb25lbnQuY3NzJ11cbn0pXG5leHBvcnQgY2xhc3MgTG9jYXRpb25Db21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xuICAgIC8vIFN0b3JhZ2VcbiAgICBhcHBTZXR0aW5nczogYW55O1xuXG4gICAgLy8gRGF0YVxuICAgIHBhcmFtcyQ6IE9ic2VydmFibGU8YW55PjtcbiAgICBsb2NhdGlvbl9kYXRhOiBhbnk7XG4gICAgb3JkZXJpbmdVcmw6IGFueTtcbiAgICB1c2VyX2RhdGE6IGFueTtcblxuICAgIC8vIFV0aWxpdGllc1xuICAgIHV0aWxzOiBhbnk7XG5cbiAgICBjb25zdHJ1Y3RvcihcbiAgICAgICAgcHJpdmF0ZSBwYWdlOiBQYWdlLFxuICAgICAgICBwcml2YXRlIHJvdXRlOiBBY3RpdmF0ZWRSb3V0ZSxcbiAgICApIHtcbiAgICAgICAgLy9TdGFydCBhdCBob21lXG4gICAgICAgIHRoaXMucGFnZS5lbmFibGVTd2lwZUJhY2tOYXZpZ2F0aW9uID0gdHJ1ZTtcbiAgICAgICAgdGhpcy5wYWdlLmFjdGlvbkJhckhpZGRlbiA9IGZhbHNlO1xuICAgICAgICB0aGlzLmFwcFNldHRpbmdzID0gcmVxdWlyZShcImFwcGxpY2F0aW9uLXNldHRpbmdzXCIpO1xuICAgICAgICB0aGlzLnV0aWxzID0gcmVxdWlyZShcInRucy1jb3JlLW1vZHVsZXMvdXRpbHMvdXRpbHNcIik7XG4gICAgICAgIHRoaXMudXNlcl9kYXRhID0gdGhpcy5hcHBTZXR0aW5ncy5nZXRTdHJpbmcoXCJhY2NvdW50XCIpO1xuICAgIH1cblxuICAgIG5nT25Jbml0KCk6IHZvaWQge1xuICAgICAgICB0aGlzLmxvY2F0aW9uX2RhdGEgPSBKU09OLnBhcnNlKHRoaXMuYXBwU2V0dGluZ3MuZ2V0U3RyaW5nKFwibG9jYXRpb25cIikpO1xuICAgICAgICB0aGlzLmxvY2F0aW9uX2RhdGEuaHRtbCA9ICc8aWZyYW1lIHNyYz1cImh0dHBzOi8vbWFwcy5nb29nbGUuY29tL21hcHM/cT0nICsgdGhpcy5sb2NhdGlvbl9kYXRhLmxhdGl0dWRlICsgJywnICsgdGhpcy5sb2NhdGlvbl9kYXRhLmxvbmdpdHVkZSArICcmaGw9ZXM7ej0xNCZhbXA7b3V0cHV0PWVtYmVkXCIgd2lkdGg9XCIxMDAlXCIgaGVpZ2h0PVwiMzAwXCIgZnJhbWVib3JkZXI9XCIwXCIgc3R5bGU9XCJib3JkZXI6MFwiPjwvaWZyYW1lPic7XG4gICAgfVxuXG4gICAgb3BlbkVtYWlsKCkge1xuICAgICAgICB0aGlzLnV0aWxzLm9wZW5VcmwoJ21haWx0bzonICsgdGhpcy5sb2NhdGlvbl9kYXRhLmVtYWlsX2FkZHJlc3MpO1xuICAgIH1cblxuICAgIG9wZW5QaG9uZSgpIHtcbiAgICAgICAgdGhpcy51dGlscy5vcGVuVXJsKCd0ZWw6JyArIHRoaXMubG9jYXRpb25fZGF0YS5waG9uZV9udW1iZXIpO1xuICAgIH1cblxuICAgIGdvVG9Mb2NhdGlvbihsb2NhdGlvbjogYW55KSB7XG4gICAgICAgIHRoaXMudXRpbHMub3BlblVybChcImh0dHBzOi8vd3d3Lmdvb2dsZS5jb20vbWFwcy9zZWFyY2gvP2FwaT0xJnF1ZXJ5PVwiICsgbG9jYXRpb24ubGF0aXR1ZGUgKyAnLCcgKyBsb2NhdGlvbi5sb25naXR1ZGUpO1xuICAgIH1cblxuICAgIG9wZW5Nb2JpbGVPcmRlcmluZyhsb2NhdGlvbjogYW55KSB7XG4gICAgICAgIC8vIEdldCBtb2JpbGUgb3JkZXJpbmcgVVJMXG4gICAgICAgIGZvciAodmFyIGkgaW4gbG9jYXRpb24udmVuZG9yX2F0dHJpYnV0ZSkge1xuICAgICAgICAgICAgaWYgKGxvY2F0aW9uLnZlbmRvcl9hdHRyaWJ1dGVbaV0ubGFiZWwgPT0gXCJPcmRlciBPbmxpbmVcIikge1xuICAgICAgICAgICAgICAgIHRoaXMub3JkZXJpbmdVcmwgPSBsb2NhdGlvbi52ZW5kb3JfYXR0cmlidXRlW2ldLmxpbms7IFxuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHRoaXMub3JkZXJpbmdVcmwpIHtcbiAgICAgICAgICAgIHRoaXMudXRpbHMub3BlblVybCh0aGlzLm9yZGVyaW5nVXJsICsgJyZ1c2VyX3Rva2VuPXNwb29uaXR5OicgKyAgdGhpcy51c2VyX2RhdGEub25saW5lX29yZGVyX3Rva2VuICsgJyZ1c2VyX3Rva2VuPXNwb29uaXR5bG95YWx0eTonICsgdGhpcy51c2VyX2RhdGEub25saW5lX29yZGVyX3Rva2VuICsgJyZ1c2VyX3Rva2VuPXNwb29uaXR5Y3JlZGl0OicgKyB0aGlzLnVzZXJfZGF0YS5vbmxpbmVfb3JkZXJfdG9rZW4pO1xuICAgICAgICB9XG4gICAgfVxufVxuIl19