import { Component, OnInit } from "@angular/core";
import { Page } from "ui/page";
import { ActivatedRoute } from "@angular/router";
import { Observable } from "rxjs";

@Component({
    selector: "Message",
    moduleId: module.id,
    templateUrl: "./message.component.html",
    styleUrls: ['./message.component.css']
})
export class MessageComponent implements OnInit {
    // Storage
    appSettings: any;

    // Data
    params$: Observable<any>;
    message_data: any;

    constructor(
        private page: Page,
        private route: ActivatedRoute,
    ) {
        //Start at home
        this.page.enableSwipeBackNavigation = true;
        this.page.actionBarHidden = false;
        this.appSettings = require("application-settings");
    }

    ngOnInit(): void {
        this.message_data = JSON.parse(this.appSettings.getString("message"));
    }
}
