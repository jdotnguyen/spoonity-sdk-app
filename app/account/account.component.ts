import { Component, OnInit } from "@angular/core";
import { Page } from "ui/page";
import { Observable } from "rxjs";

@Component({
    selector: "Account",
    moduleId: module.id,
    templateUrl: "./account.component.html",
    styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit {
    // Storage
    appSettings: any;

    // Data
    params$: Observable<any>;
    account_data: any;

    // Utils
    dialogs: any;

    constructor(
        private page: Page,
    ) {
        //Start at home
        this.page.enableSwipeBackNavigation = true;
        this.page.actionBarHidden = false;
        this.appSettings = require("application-settings");
        this.dialogs = require("tns-core-modules/ui/dialogs");
    }

    ngOnInit(): void {
        this.account_data = JSON.parse(this.appSettings.getString("account"));
    }

    copyClipboard(text: string) {
        
    }
}
