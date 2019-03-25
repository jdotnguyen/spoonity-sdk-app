import { Component, OnInit } from "@angular/core";
import { Page } from "ui/page";
import { ActivatedRoute } from "@angular/router";
import { Observable } from "rxjs";

@Component({
    selector: "Location",
    moduleId: module.id,
    templateUrl: "./location.component.html",
    styleUrls: ['./location.component.css']
})
export class LocationComponent implements OnInit {
    // Storage
    appSettings: any;

    // Data
    params$: Observable<any>;
    location_data: any;
    orderingUrl: any;
    user_data: any;

    // Utilities
    utils: any;

    constructor(
        private page: Page,
        private route: ActivatedRoute,
    ) {
        //Start at home
        this.page.enableSwipeBackNavigation = true;
        this.page.actionBarHidden = false;
        this.appSettings = require("application-settings");
        this.utils = require("tns-core-modules/utils/utils");
        this.user_data = this.appSettings.getString("account");
    }

    ngOnInit(): void {
        this.location_data = JSON.parse(this.appSettings.getString("location"));
        this.location_data.html = '<iframe src="https://maps.google.com/maps?q=' + this.location_data.latitude + ',' + this.location_data.longitude + '&hl=es;z=14&amp;output=embed" width="100%" height="300" frameborder="0" style="border:0"></iframe>';
    }

    openEmail() {
        this.utils.openUrl('mailto:' + this.location_data.email_address);
    }

    openPhone() {
        this.utils.openUrl('tel:' + this.location_data.phone_number);
    }

    goToLocation(location: any) {
        this.utils.openUrl("https://www.google.com/maps/search/?api=1&query=" + location.latitude + ',' + location.longitude);
    }

    openMobileOrdering(location: any) {
        // Get mobile ordering URL
        for (var i in location.vendor_attribute) {
            if (location.vendor_attribute[i].label == "Order Online") {
                this.orderingUrl = location.vendor_attribute[i].link; 
            }
        }

        if (this.orderingUrl) {
            this.utils.openUrl(this.orderingUrl + '&user_token=spoonity:' +  this.user_data.online_order_token + '&user_token=spoonityloyalty:' + this.user_data.online_order_token + '&user_token=spoonitycredit:' + this.user_data.online_order_token);
        }
    }
}
