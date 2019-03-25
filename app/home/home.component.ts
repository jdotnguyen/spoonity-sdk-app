import { ItemEventData } from "ui/list-view"
import { Component, OnInit, Output, EventEmitter } from "@angular/core";
import { Page } from "ui/page";
import { Session } from "../typescript/session.model";
import { Token } from "../typescript/token.model";
import { VendorConfig } from '../shared/vendor.config';
import { ios } from "application";
import { alert, prompt } from "tns-core-modules/ui/dialogs";
declare var UITableViewCellSelectionStyle;
import { SpoonityService } from "../typescript/spoonity.sdk";
import { Router } from "@angular/router";
import { Message } from "~/typescript/message.model";

@Component({
    selector: "Home",
    moduleId: module.id,
    templateUrl: "./home.component.html",
    styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
    // Storage
    appSettings: any;

    // Data models
    session_data: Session;
    token_data: Token;
    message_data: Message;

    // Data for HTML
    session: any;
    user_data: any;
    token: any;
    user: any;
    rewards: any;
    quickpay: any;
    transactions: any;
    locations: any;
    vendor_data: any;
    orderingUrl: any;
    messages: any;
    favorite_stores: any;
    message_amount: any;
    html_data: any;

    // States
    showContent: number;
    doneLoading: boolean;

    // Utilities
    utils: any;
    inappbrowser: any;
    dialogs: any;

    onItemTap(args: ItemEventData): void {
    }

    constructor(
        private page: Page,
        private spoonityService: SpoonityService,
        private router: Router
    ) {
        //Start at home
        this.showContent = 0;
        this.page.enableSwipeBackNavigation = false;
        this.page.actionBarHidden = true;
        this.appSettings = require("application-settings");
        this.doneLoading = false;
        this.utils = require("tns-core-modules/utils/utils");
        this.dialogs = require("tns-core-modules/ui/dialogs");
        this.message_amount = 0;
        this.favorite_stores = [];

        // Login if we already have a session in storage
        if (this.appSettings.getString("session_key")) {
            this.session_data = { session_key: this.appSettings.getString("session_key") };
        } else {
            this.router.navigate(["/login"]);
        }
    }

    ngOnInit(): void {
        // Check if session is stored and valid, otherwise boot to login
        if (this.session_data.hasOwnProperty("session_key")) {
            this.spoonityService.userValidate(this.session_data)
                .subscribe(data => {
                    this.spoonityService.userGetProfile(this.session_data)
                        .subscribe(data => {
                            this.user_data = data;
                            this.appSettings.setString("account", JSON.stringify(this.user_data));
                        },
                        err => {
                            this.router.navigate(["/login"]);
                        });
                },
                    err => {
                        // If there's an error, boot the user
                        this.router.navigate(["/login"]);
                    });
        } else {
            this.router.navigate(["/login"]);
        }
        // Get message data
        this.loadAssets(1);
        this.loadAssets(this.appSettings.getNumber("content_page"));
    }

    @Output() messageCounter = new EventEmitter<number>();

    loadAssets(content: number) {
        this.doneLoading = false;
        this.appSettings.setNumber("content_page", this.showContent);
        switch (content) {
            case 0:
                // Get token data
                this.token_data = {
                    token_type: 1,
                    session_key: this.session_data.session_key
                };
                if (!this.token) {
                    this.spoonityService.userGetToken(this.token_data)
                        .subscribe(data => {
                            this.token = data;
                        },
                            err => {
                            });
                }

                // Get quickpay balance
                if (!this.quickpay) {
                    this.spoonityService.userGetQuickPayBalance(this.session_data)
                        .subscribe(data => {
                            this.quickpay = data;
                        },
                            err => {
                            });
                }
                
                // Get reward data
                if (!this.rewards) {
                    this.spoonityService.userGetRewards(this.session_data)
                        .subscribe(data => {
                            for (var i in data["data"]) {
                                data["data"][i].pie = [
                                    {
                                        Reward: data["data"][i].progress + " Points Earned",
                                        Amount: data["data"][i].progress,
                                    },
                                    {
                                        Reward: (data["data"][i].cost - data["data"][i].progress) + " Points Left",
                                        Amount: (data["data"][i].cost - data["data"][i].progress)
                                    }
                                ]
                            };
                            this.rewards = data;
                        },
                            err => {
                            });
                }
                break;
            case 1:
                // Get user messages
                this.message_amount = 0;
                this.spoonityService.userGetMessages(this.session_data)
                    .subscribe(data => {
                        data.sort(function (a,b) {
                            return b.message.publish_date - a.message.publish_date;
                        });
                        this.messages = data;

                        // Get message counter
                        for (var i in data) {
                            if (!data[i].read) {
                                this.message_amount++;
                            }
                        }
                        this.messageCounter.emit(this.message_amount);
                    },
                    err => {
                    });
                break;
            case 2:
                // Get store locations
                this.vendor_data = { vendor_id: VendorConfig.VENDOR };
                if (!this.locations) {
                    this.spoonityService.vendorGetStoreList(this.vendor_data)
                        .subscribe(data => {
                            this.locations = data;
                            this.spoonityService.userGetFavoriteStoreList(this.session_data)
                                .subscribe(data => {
                                    for (var i in this.locations.data) {
                                        this.locations.data[i].html = '<iframe src="https://maps.google.com/maps?q=' + this.locations.data[i].latitude + ',' + this.locations.data[i].longitude + '&hl=es;z=14&amp;output=embed" width="305" height="180" frameborder="0" style="border:0"></iframe>';
                                        for (var j in data["items"]) {
                                            if (this.locations.data[i].id == data["items"][j].vendor.id) {
                                                data["items"][j].name = this.locations.data[i].name;
                                                data["items"][j].address_line_1 = this.locations.data[i].address_line_1;
                                                data["items"][j].is_open = this.locations.data[i].is_open;
                                                data["items"][j].latitude = this.locations.data[i].latitude;
                                                data["items"][j].longitude = this.locations.data[i].longitude;
                                                data["items"][j].html = this.locations.data[i].html;
                                                for (var k in this.locations.data[i].vendor_attribute) {
                                                    if (this.locations.data[i].vendor_attribute[k].label == "Order Online") {
                                                        data["items"][j].vendor_attribute = [{label: "Order Online", link: this.locations.data[i].vendor_attribute[k].link}];
                                                    }
                                                }
                                                
                                                this.favorite_stores.push(data["items"][j]);
                                            }
                                        }
                                    }
                                }, 
                                err => {
                                });
                        },
                            err => {
                            });
                }
                break;
            case 3:
                // Get transaction history
                if (!this.transactions) {
                    this.spoonityService.userGetTransactions(this.session_data)
                        .subscribe(data => {
                            this.transactions = data;
                        },
                            err => {
                            });
                }
                break;
            case 4:
                break;
        }
        this.doneLoading = true;
    }


    /*
     *
     * INBOX PAGE
     * 
     */
    openMessage(message: any) {
        // Store data in storage for next page
        this.appSettings.setString("message", JSON.stringify(message));

        // Set message to read
        this.message_data = {
            user_message: message.user_message_id,
            read: true,
            status_id: 1,
            session_key: this.session_data.session_key
        };
        this.spoonityService.userUpdateMessageStatus(this.message_data)
            .subscribe(data => {
                // Update UI with status
                this.loadAssets(1);
                this.router.navigate(["/message"]);
            },
            err => {
            });
    }

    deleteMessage(message: any) {
        var _this = this;
        if (message.read) {
            this.dialogs.confirm({
                title: "Confirmation",
                message: "Are you sure you want to mark this message as unread?",
                okButtonText: "Mark Unread",
                cancelButtonText: "Cancel"
            }).then(function (result) {
                if (result) {
                    _this.updateMessageStatus(message, 1, false);
                }
            });
        }
    }

    longPressMessage(message: any) {
        var _this = this;
        var option1 = message.read ? 'Mark as Unread' : 'Mark as Read';
        this.dialogs.action({
            message: "What do you want to do?",
            cancelButtonText: "Cancel",
            actions: [option1, "Delete"]
        }).then(function (result) {
            if (result == "Mark as Unread") {
                _this.updateMessageStatus(message, 1, false);
            } else if (result == "Mark as Read") {
                _this.updateMessageStatus(message, 1, true);
            } else if (result == "Delete") {
                _this.dialogs.confirm({
                    title: "Confirmation",
                    message: "Are you sure you want to delete this message?",
                    okButtonText: "Delete",
                    cancelButtonText: "Cancel"
                }).then(function (result) {
                    if (result) {
                        _this.updateMessageStatus(message, 4, true);
                    }
                });
            }
        })
    }

    updateMessageStatus(message: any, status: number, read: boolean) {
        this.message_data = {
            user_message: message.user_message_id,
            read: read,
            status_id: status,
            session_key: this.session_data.session_key
        };
        this.spoonityService.userUpdateMessageStatus(this.message_data)
            .subscribe(data => {
                // Update UI with status
                this.loadAssets(1);
            },
            err => {
            });
    }


    /*
     *
     * LOCATIONS PAGE
     * 
     */
    goToLocation(location: any) {
        this.utils.openUrl("https://www.google.com/maps/search/?api=1&query=" + location.latitude + ',' + location.longitude);
    }

    openLocation(location: any) {
        this.appSettings.setString("location", JSON.stringify(location));
        this.router.navigate(["/location"]);
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


    /*
     *
     * TRANSACTION PAGE
     * 
     */
    openTransaction(transaction: any) {
        this.appSettings.setString("transaction", JSON.stringify(transaction));
        this.router.navigate(["/transaction"]);
    }

    
    /*
     *
     * ACCOUNT PAGE
     * 
     */
    goToAccountInfo() {
        this.router.navigate(["/account"]);
    }

    deleteAccount() {
        // Delete account
        var _this = this;
        this.user = {
            id: this.appSettings.getString("user_id"),
            vendor_id: this.appSettings.getString("vendor_id"),
            session_key: this.appSettings.getString("session_key")
        };
        this.dialogs.confirm({
            title: "Confirmation",
            message: "Are you sure you want to delete this account?",
            okButtonText: "Yes",
            cancelButtonText: "Cancel"
        }).then(function (result) {
            if (result) {
                _this.spoonityService.vendorDeleteUserEmail(_this.user)
                    .subscribe(data => {
                        _this.alert('A confirmation email has been sent to your email address with instructions on how to delete your account.');
                    },
                        err => {
                        });
            }
        });
        
    }

    logOut() {
        var _this = this;
        this.dialogs.confirm({
            title: "Confirmation",
            message: "Are you sure you want to log out?",
            okButtonText: "Yes",
            cancelButtonText: "Cancel"
        }).then(function (result) {
            if (result) {
                _this.appSettings.clear();
                _this.router.navigate(["/login"]);
            }
        });
    }

    /* GENERAL */

    onItemLoading(args: any) {
        if (ios) {
            const cell = args.ios;
            cell.selectionStyle = UITableViewCellSelectionStyle.UITableViewCellSelectionStyleNone;
        }
    }

    tabSelected(args: number) {
        this.showContent = args;
        this.loadAssets(args);
    }

    alert(message: string) {
		return alert({
			title: "Alert",
			okButtonText: "OK",
			message: message
		});
    }
    
    prompt(message: string) {
		return prompt({
			title: "Your title",
            message: message,
            okButtonText: "Delete",
            cancelButtonText: "Cancel ",
            inputType: this.dialogs.inputType.text
		}).then(function(value) {
        });
	}
}
