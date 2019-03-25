import { Component, OnInit } from "@angular/core";
import { Page } from "ui/page";
import { Observable } from "rxjs";
import { SpoonityService } from "../typescript/spoonity.sdk";
import { alert } from "tns-core-modules/ui/dialogs";

@Component({
    selector: "Transaction",
    moduleId: module.id,
    templateUrl: "./transaction.component.html",
    styleUrls: ['./transaction.component.css']
})
export class TransactionComponent implements OnInit {
    // Storage
    appSettings: any;

    // Data
    params$: Observable<any>;
    transaction_data: any;

    // Utilities
    dialogs: any;

    constructor(
        private page: Page,
        private spoonityService: SpoonityService
    ) {
        //Start at home
        this.page.enableSwipeBackNavigation = true;
        this.page.actionBarHidden = false;
        this.dialogs = require("tns-core-modules/ui/dialogs");
        this.appSettings = require("application-settings");
    }

    ngOnInit(): void {
        this.transaction_data = JSON.parse(this.appSettings.getString("transaction"));
        this.refreshUI(false);
    }

    rateTransaction() {
        var _this = this;
        this.dialogs.action({
            message: "How would you rate your experience?",
            cancelButtonText: "Cancel",
            actions: ["1 Star", "2 Star", "3 Star", "4 Star", "5 Star"]
        }).then(function (result) {
            if (result == "1 Star") {
                _this.setRating(20);
            } else if (result == "2 Star") {
                _this.setRating(40);
            } else if (result == "3 Star") {
                _this.setRating(60);
            } else if (result == "4 Star") {
                _this.setRating(80);
            } else if (result == "4 Star") {
                _this.setRating(100);
            }
        })
    }

    setRating(rating: number) {
        var transaction_data = {
            transaction: this.transaction_data.id,
            rating: rating,
            comment: '',
            session_key: this.appSettings.getString("session_key")
        };
        this.spoonityService.userSendRating(transaction_data)
            .subscribe(data => {
                console.log(data);
                alert('Rating successfully sent!');
                this.refreshUI(true);
            },
                err => { alert(err.error.error.errors[0].message); });
    }
    
    tipTransaction() {
        var _this = this;
        this.dialogs.action({
            message: "How much would you like to tip?",
            cancelButtonText: "Cancel",
            actions: ["No Tip", "$1.00", "$2.00", "$3.00", "$4.00"]
        }).then(function (result) {
            if (result == "No Tip") {
                _this.setTip(0);
            } else if (result == "$1.00") {
                _this.setTip(1);
            } else if (result == "$2.00") {
                _this.setTip(2);
            } else if (result == "$3.00") {
                _this.setTip(3);
            } else if (result == "$4.00") {
                _this.setTip(4);
            }
        })
    }

    setTip(amount: number) {
        var _this = this;
        var transaction_data = {
            transaction: this.transaction_data.id,
            amount: amount,
            session_key: this.appSettings.getString("session_key")
        };
        this.dialogs.confirm({
            title: "Confirmation",
            message: "Are you sure you want to tip this amount?",
            okButtonText: "Yes",
            cancelButtonText: "Cancel"
        }).then(function (result) {
            if (result) {
                _this.spoonityService.userSendTip(transaction_data)
                    .subscribe(data => {
                        alert('Tip successfully sent!');
                        _this.refreshUI(true);
                    },
                        err => { alert(err.error.error.errors[0].message); });
            }
        });
    }

    refreshUI(api: boolean) {
        if (api) {
            var session_data = {session_key: this.appSettings.getString("session_key")};
            this.spoonityService.userGetTransactions(session_data)
                .subscribe(data => {
                    for (var i in data) {
                        if (data[i]["id"] == this.transaction_data.id) {
                            this.transaction_data.id = data[i];
                        }
                    };
                },
                err => { alert(err.error.error.errors[0].message); });
        }

        // Update rating text
        switch (this.transaction_data.rating.value) {
            case 20:
                this.transaction_data.starText = '&#8902;';
                break;
            case 40:
                this.transaction_data.starText = '&#8902;&#8902;';
                break;
            case 60:
                this.transaction_data.starText = '&#8902;&#8902;&#8902;';
                break;
            case 80:
                this.transaction_data.starText = '&#8902;&#8902;&#8902;&#8902;';
                break;
            case 1000:
                this.transaction_data.starText = '&#8902;&#8902;&#8902;&#8902;&#8902;';
                break;
            default:
                this.transaction_data.starText = undefined;
                break;
        }
    }

    alert(message: string) {
		return alert({
			title: "Alert",
			okButtonText: "OK",
			message: message
		});
    }
}
