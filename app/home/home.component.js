"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var page_1 = require("ui/page");
var vendor_config_1 = require("../shared/vendor.config");
var application_1 = require("application");
var dialogs_1 = require("tns-core-modules/ui/dialogs");
var spoonity_sdk_1 = require("../typescript/spoonity.sdk");
var router_1 = require("@angular/router");
var HomeComponent = /** @class */ (function () {
    function HomeComponent(page, spoonityService, router) {
        this.page = page;
        this.spoonityService = spoonityService;
        this.router = router;
        this.messageCounter = new core_1.EventEmitter();
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
        }
        else {
            this.router.navigate(["/login"]);
        }
    }
    HomeComponent.prototype.onItemTap = function (args) {
    };
    HomeComponent.prototype.ngOnInit = function () {
        var _this_1 = this;
        // Check if session is stored and valid, otherwise boot to login
        if (this.session_data.hasOwnProperty("session_key")) {
            this.spoonityService.userValidate(this.session_data)
                .subscribe(function (data) {
                _this_1.spoonityService.userGetProfile(_this_1.session_data)
                    .subscribe(function (data) {
                    _this_1.user_data = data;
                    _this_1.appSettings.setString("account", JSON.stringify(_this_1.user_data));
                }, function (err) {
                    _this_1.router.navigate(["/login"]);
                });
            }, function (err) {
                // If there's an error, boot the user
                _this_1.router.navigate(["/login"]);
            });
        }
        else {
            this.router.navigate(["/login"]);
        }
        // Get message data
        this.loadAssets(1);
        this.loadAssets(this.appSettings.getNumber("content_page"));
    };
    HomeComponent.prototype.loadAssets = function (content) {
        var _this_1 = this;
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
                        .subscribe(function (data) {
                        _this_1.token = data;
                    }, function (err) {
                    });
                }
                // Get quickpay balance
                if (!this.quickpay) {
                    this.spoonityService.userGetQuickPayBalance(this.session_data)
                        .subscribe(function (data) {
                        _this_1.quickpay = data;
                    }, function (err) {
                    });
                }
                // Get reward data
                if (!this.rewards) {
                    this.spoonityService.userGetRewards(this.session_data)
                        .subscribe(function (data) {
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
                            ];
                        }
                        ;
                        _this_1.rewards = data;
                    }, function (err) {
                    });
                }
                break;
            case 1:
                // Get user messages
                this.message_amount = 0;
                this.spoonityService.userGetMessages(this.session_data)
                    .subscribe(function (data) {
                    data.sort(function (a, b) {
                        return b.message.publish_date - a.message.publish_date;
                    });
                    _this_1.messages = data;
                    // Get message counter
                    for (var i in data) {
                        if (!data[i].read) {
                            _this_1.message_amount++;
                        }
                    }
                    _this_1.messageCounter.emit(_this_1.message_amount);
                }, function (err) {
                });
                break;
            case 2:
                // Get store locations
                this.vendor_data = { vendor_id: vendor_config_1.VendorConfig.VENDOR };
                if (!this.locations) {
                    this.spoonityService.vendorGetStoreList(this.vendor_data)
                        .subscribe(function (data) {
                        _this_1.locations = data;
                        _this_1.spoonityService.userGetFavoriteStoreList(_this_1.session_data)
                            .subscribe(function (data) {
                            for (var i in _this_1.locations.data) {
                                _this_1.locations.data[i].html = '<iframe src="https://maps.google.com/maps?q=' + _this_1.locations.data[i].latitude + ',' + _this_1.locations.data[i].longitude + '&hl=es;z=14&amp;output=embed" width="305" height="180" frameborder="0" style="border:0"></iframe>';
                                for (var j in data["items"]) {
                                    if (_this_1.locations.data[i].id == data["items"][j].vendor.id) {
                                        data["items"][j].name = _this_1.locations.data[i].name;
                                        data["items"][j].address_line_1 = _this_1.locations.data[i].address_line_1;
                                        data["items"][j].is_open = _this_1.locations.data[i].is_open;
                                        data["items"][j].latitude = _this_1.locations.data[i].latitude;
                                        data["items"][j].longitude = _this_1.locations.data[i].longitude;
                                        data["items"][j].html = _this_1.locations.data[i].html;
                                        for (var k in _this_1.locations.data[i].vendor_attribute) {
                                            if (_this_1.locations.data[i].vendor_attribute[k].label == "Order Online") {
                                                data["items"][j].vendor_attribute = [{ label: "Order Online", link: _this_1.locations.data[i].vendor_attribute[k].link }];
                                            }
                                        }
                                        _this_1.favorite_stores.push(data["items"][j]);
                                    }
                                }
                            }
                        }, function (err) {
                        });
                    }, function (err) {
                    });
                }
                break;
            case 3:
                // Get transaction history
                if (!this.transactions) {
                    this.spoonityService.userGetTransactions(this.session_data)
                        .subscribe(function (data) {
                        _this_1.transactions = data;
                    }, function (err) {
                    });
                }
                break;
            case 4:
                break;
        }
        this.doneLoading = true;
    };
    /*
     *
     * INBOX PAGE
     *
     */
    HomeComponent.prototype.openMessage = function (message) {
        var _this_1 = this;
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
            .subscribe(function (data) {
            // Update UI with status
            _this_1.loadAssets(1);
            _this_1.router.navigate(["/message"]);
        }, function (err) {
        });
    };
    HomeComponent.prototype.deleteMessage = function (message) {
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
    };
    HomeComponent.prototype.longPressMessage = function (message) {
        var _this = this;
        var option1 = message.read ? 'Mark as Unread' : 'Mark as Read';
        this.dialogs.action({
            message: "What do you want to do?",
            cancelButtonText: "Cancel",
            actions: [option1, "Delete"]
        }).then(function (result) {
            if (result == "Mark as Unread") {
                _this.updateMessageStatus(message, 1, false);
            }
            else if (result == "Mark as Read") {
                _this.updateMessageStatus(message, 1, true);
            }
            else if (result == "Delete") {
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
        });
    };
    HomeComponent.prototype.updateMessageStatus = function (message, status, read) {
        var _this_1 = this;
        this.message_data = {
            user_message: message.user_message_id,
            read: read,
            status_id: status,
            session_key: this.session_data.session_key
        };
        this.spoonityService.userUpdateMessageStatus(this.message_data)
            .subscribe(function (data) {
            // Update UI with status
            _this_1.loadAssets(1);
        }, function (err) {
        });
    };
    /*
     *
     * LOCATIONS PAGE
     *
     */
    HomeComponent.prototype.goToLocation = function (location) {
        this.utils.openUrl("https://www.google.com/maps/search/?api=1&query=" + location.latitude + ',' + location.longitude);
    };
    HomeComponent.prototype.openLocation = function (location) {
        this.appSettings.setString("location", JSON.stringify(location));
        this.router.navigate(["/location"]);
    };
    HomeComponent.prototype.openMobileOrdering = function (location) {
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
    /*
     *
     * TRANSACTION PAGE
     *
     */
    HomeComponent.prototype.openTransaction = function (transaction) {
        this.appSettings.setString("transaction", JSON.stringify(transaction));
        this.router.navigate(["/transaction"]);
    };
    /*
     *
     * ACCOUNT PAGE
     *
     */
    HomeComponent.prototype.goToAccountInfo = function () {
        this.router.navigate(["/account"]);
    };
    HomeComponent.prototype.deleteAccount = function () {
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
                    .subscribe(function (data) {
                    _this.alert('A confirmation email has been sent to your email address with instructions on how to delete your account.');
                }, function (err) {
                });
            }
        });
    };
    HomeComponent.prototype.logOut = function () {
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
    };
    /* GENERAL */
    HomeComponent.prototype.onItemLoading = function (args) {
        if (application_1.ios) {
            var cell = args.ios;
            cell.selectionStyle = UITableViewCellSelectionStyle.UITableViewCellSelectionStyleNone;
        }
    };
    HomeComponent.prototype.tabSelected = function (args) {
        this.showContent = args;
        this.loadAssets(args);
    };
    HomeComponent.prototype.alert = function (message) {
        return dialogs_1.alert({
            title: "Alert",
            okButtonText: "OK",
            message: message
        });
    };
    HomeComponent.prototype.prompt = function (message) {
        return dialogs_1.prompt({
            title: "Your title",
            message: message,
            okButtonText: "Delete",
            cancelButtonText: "Cancel ",
            inputType: this.dialogs.inputType.text
        }).then(function (value) {
        });
    };
    __decorate([
        core_1.Output(),
        __metadata("design:type", Object)
    ], HomeComponent.prototype, "messageCounter", void 0);
    HomeComponent = __decorate([
        core_1.Component({
            selector: "Home",
            moduleId: module.id,
            templateUrl: "./home.component.html",
            styleUrls: ['./home.component.css']
        }),
        __metadata("design:paramtypes", [page_1.Page,
            spoonity_sdk_1.SpoonityService,
            router_1.Router])
    ], HomeComponent);
    return HomeComponent;
}());
exports.HomeComponent = HomeComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaG9tZS5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJob21lLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUNBLHNDQUF3RTtBQUN4RSxnQ0FBK0I7QUFHL0IseURBQXVEO0FBQ3ZELDJDQUFrQztBQUNsQyx1REFBNEQ7QUFFNUQsMkRBQTZEO0FBQzdELDBDQUF5QztBQVN6QztJQXFDSSx1QkFDWSxJQUFVLEVBQ1YsZUFBZ0MsRUFDaEMsTUFBYztRQUZkLFNBQUksR0FBSixJQUFJLENBQU07UUFDVixvQkFBZSxHQUFmLGVBQWUsQ0FBaUI7UUFDaEMsV0FBTSxHQUFOLE1BQU0sQ0FBUTtRQStDaEIsbUJBQWMsR0FBRyxJQUFJLG1CQUFZLEVBQVUsQ0FBQztRQTdDbEQsZUFBZTtRQUNmLElBQUksQ0FBQyxXQUFXLEdBQUcsQ0FBQyxDQUFDO1FBQ3JCLElBQUksQ0FBQyxJQUFJLENBQUMseUJBQXlCLEdBQUcsS0FBSyxDQUFDO1FBQzVDLElBQUksQ0FBQyxJQUFJLENBQUMsZUFBZSxHQUFHLElBQUksQ0FBQztRQUNqQyxJQUFJLENBQUMsV0FBVyxHQUFHLE9BQU8sQ0FBQyxzQkFBc0IsQ0FBQyxDQUFDO1FBQ25ELElBQUksQ0FBQyxXQUFXLEdBQUcsS0FBSyxDQUFDO1FBQ3pCLElBQUksQ0FBQyxLQUFLLEdBQUcsT0FBTyxDQUFDLDhCQUE4QixDQUFDLENBQUM7UUFDckQsSUFBSSxDQUFDLE9BQU8sR0FBRyxPQUFPLENBQUMsNkJBQTZCLENBQUMsQ0FBQztRQUN0RCxJQUFJLENBQUMsY0FBYyxHQUFHLENBQUMsQ0FBQztRQUN4QixJQUFJLENBQUMsZUFBZSxHQUFHLEVBQUUsQ0FBQztRQUUxQixnREFBZ0Q7UUFDaEQsSUFBSSxJQUFJLENBQUMsV0FBVyxDQUFDLFNBQVMsQ0FBQyxhQUFhLENBQUMsRUFBRTtZQUMzQyxJQUFJLENBQUMsWUFBWSxHQUFHLEVBQUUsV0FBVyxFQUFFLElBQUksQ0FBQyxXQUFXLENB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bnREYXRhIH0gZnJvbSBcInVpL2xpc3Qtdmlld1wiXG5pbXBvcnQgeyBDb21wb25lbnQsIE9uSW5pdCwgT3V0cHV0LCBFdmVudEVtaXR0ZXIgfSBmcm9tIFwiQGFuZ3VsYXIvY29yZVwiO1xuaW1wb3J0IHsgUGFnZSB9IGZyb20gXCJ1aS9wYWdlXCI7XG5pbXBvcnQgeyBTZXNzaW9uIH0gZnJvbSBcIi4uL3R5cGVzY3JpcHQvc2Vzc2lvbi5tb2RlbFwiO1xuaW1wb3J0IHsgVG9rZW4gfSBmcm9tIFwiLi4vdHlwZXNjcmlwdC90b2tlbi5tb2RlbFwiO1xuaW1wb3J0IHsgVmVuZG9yQ29uZmlnIH0gZnJvbSAnLi4vc2hhcmVkL3ZlbmRvci5jb25maWcnO1xuaW1wb3J0IHsgaW9zIH0gZnJvbSBcImFwcGxpY2F0aW9uXCI7XG5pbXBvcnQgeyBhbGVydCwgcHJvbXB0IH0gZnJvbSBcInRucy1jb3JlLW1vZHVsZXMvdWkvZGlhbG9nc1wiO1xuZGVjbGFyZSB2YXIgVUlUYWJsZVZpZXdDZWxsU2VsZWN0aW9uU3R5bGU7XG5pbXBvcnQgeyBTcG9vbml0eVNlcnZpY2UgfSBmcm9tIFwiLi4vdHlwZXNjcmlwdC9zcG9vbml0eS5zZGtcIjtcbmltcG9ydCB7IFJvdXRlciB9IGZyb20gXCJAYW5ndWxhci9yb3V0ZXJcIjtcbmltcG9ydCB7IE1lc3NhZ2UgfSBmcm9tIFwifi90eXBlc2NyaXB0L21lc3NhZ2UubW9kZWxcIjtcblxuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6IFwiSG9tZVwiLFxuICAgIG1vZHVsZUlkOiBtb2R1bGUuaWQsXG4gICAgdGVtcGxhdGVVcmw6IFwiLi9ob21lLmNvbXBvbmVudC5odG1sXCIsXG4gICAgc3R5bGVVcmxzOiBbJy4vaG9tZS5jb21wb25lbnQuY3NzJ11cbn0pXG5leHBvcnQgY2xhc3MgSG9tZUNvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XG4gICAgLy8gU3RvcmFnZVxuICAgIGFwcFNldHRpbmdzOiBhbnk7XG5cbiAgICAvLyBEYXRhIG1vZGVsc1xuICAgIHNlc3Npb25fZGF0YTogU2Vzc2lvbjtcbiAgICB0b2tlbl9kYXRhOiBUb2tlbjtcbiAgICBtZXNzYWdlX2RhdGE6IE1lc3NhZ2U7XG5cbiAgICAvLyBEYXRhIGZvciBIVE1MXG4gICAgc2Vzc2lvbjogYW55O1xuICAgIHVzZXJfZGF0YTogYW55O1xuICAgIHRva2VuOiBhbnk7XG4gICAgdXNlcjogYW55O1xuICAgIHJld2FyZHM6IGFueTtcbiAgICBxdWlja3BheTogYW55O1xuICAgIHRyYW5zYWN0aW9uczogYW55O1xuICAgIGxvY2F0aW9uczogYW55O1xuICAgIHZlbmRvcl9kYXRhOiBhbnk7XG4gICAgb3JkZXJpbmdVcmw6IGFueTtcbiAgICBtZXNzYWdlczogYW55O1xuICAgIGZhdm9yaXRlX3N0b3JlczogYW55O1xuICAgIG1lc3NhZ2VfYW1vdW50OiBhbnk7XG4gICAgaHRtbF9kYXRhOiBhbnk7XG5cbiAgICAvLyBTdGF0ZXNcbiAgICBzaG93Q29udGVudDogbnVtYmVyO1xuICAgIGRvbmVMb2FkaW5nOiBib29sZWFuO1xuXG4gICAgLy8gVXRpbGl0aWVzXG4gICAgdXRpbHM6IGFueTtcbiAgICBpbmFwcGJyb3dzZXI6IGFueTtcbiAgICBkaWFsb2dzOiBhbnk7XG5cbiAgICBvbkl0ZW1UYXAoYXJnczogSXRlbUV2ZW50RGF0YSk6IHZvaWQge1xuICAgIH1cblxuICAgIGNvbnN0cnVjdG9yKFxuICAgICAgICBwcml2YXRlIHBhZ2U6IFBhZ2UsXG4gICAgICAgIHByaXZhdGUgc3Bvb25pdHlTZXJ2aWNlOiBTcG9vbml0eVNlcnZpY2UsXG4gICAgICAgIHByaXZhdGUgcm91dGVyOiBSb3V0ZXJcbiAgICApIHtcbiAgICAgICAgLy9TdGFydCBhdCBob21lXG4gICAgICAgIHRoaXMuc2hvd0NvbnRlbnQgPSAwO1xuICAgICAgICB0aGlzLnBhZ2UuZW5hYmxlU3dpcGVCYWNrTmF2aWdhdGlvbiA9IGZhbHNlO1xuICAgICAgICB0aGlzLnBhZ2UuYWN0aW9uQmFySGlkZGVuID0gdHJ1ZTtcbiAgICAgICAgdGhpcy5hcHBTZXR0aW5ncyA9IHJlcXVpcmUoXCJhcHBsaWNhdGlvbi1zZXR0aW5nc1wiKTtcbiAgICAgICAgdGhpcy5kb25lTG9hZGluZyA9IGZhbHNlO1xuICAgICAgICB0aGlzLnV0aWxzID0gcmVxdWlyZShcInRucy1jb3JlLW1vZHVsZXMvdXRpbHMvdXRpbHNcIik7XG4gICAgICAgIHRoaXMuZGlhbG9ncyA9IHJlcXVpcmUoXCJ0bnMtY29yZS1tb2R1bGVzL3VpL2RpYWxvZ3NcIik7XG4gICAgICAgIHRoaXMubWVzc2FnZV9hbW91bnQgPSAwO1xuICAgICAgICB0aGlzLmZhdm9yaXRlX3N0b3JlcyA9IFtdO1xuXG4gICAgICAgIC8vIExvZ2luIGlmIHdlIGFscmVhZHkgaGF2ZSBhIHNlc3Npb24gaW4gc3RvcmFnZVxuICAgICAgICBpZiAodGhpcy5hcHBTZXR0aW5ncy5nZXRTdHJpbmcoXCJzZXNzaW9uX2tleVwiKSkge1xuICAgICAgICAgICAgdGhpcy5zZXNzaW9uX2RhdGEgPSB7IHNlc3Npb25fa2V5OiB0aGlzLmFwcFNldHRpbmdzLmdldFN0cmluZyhcInNlc3Npb25fa2V5XCIpIH07XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLnJvdXRlci5uYXZpZ2F0ZShbXCIvbG9naW5cIl0pO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgbmdPbkluaXQoKTogdm9pZCB7XG4gICAgICAgIC8vIENoZWNrIGlmIHNlc3Npb24gaXMgc3RvcmVkIGFuZCB2YWxpZCwgb3RoZXJ3aXNlIGJvb3QgdG8gbG9naW5cbiAgICAgICAgaWYgKHRoaXMuc2Vzc2lvbl9kYXRhLmhhc093blByb3BlcnR5KFwic2Vzc2lvbl9rZXlcIikpIHtcbiAgICAgICAgICAgIHRoaXMuc3Bvb25pdHlTZXJ2aWNlLnVzZXJWYWxpZGF0ZSh0aGlzLnNlc3Npb25fZGF0YSlcbiAgICAgICAgICAgICAgICAuc3Vic2NyaWJlKGRhdGEgPT4ge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnNwb29uaXR5U2VydmljZS51c2VyR2V0UHJvZmlsZSh0aGlzLnNlc3Npb25fZGF0YSlcbiAgICAgICAgICAgICAgICAgICAgICAgIC5zdWJzY3JpYmUoZGF0YSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy51c2VyX2RhdGEgPSBkYXRhO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuYXBwU2V0dGluZ3Muc2V0U3RyaW5nKFwiYWNjb3VudFwiLCBKU09OLnN0cmluZ2lmeSh0aGlzLnVzZXJfZGF0YSkpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgIGVyciA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5yb3V0ZXIubmF2aWdhdGUoW1wiL2xvZ2luXCJdKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgIGVyciA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBJZiB0aGVyZSdzIGFuIGVycm9yLCBib290IHRoZSB1c2VyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnJvdXRlci5uYXZpZ2F0ZShbXCIvbG9naW5cIl0pO1xuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMucm91dGVyLm5hdmlnYXRlKFtcIi9sb2dpblwiXSk7XG4gICAgICAgIH1cbiAgICAgICAgLy8gR2V0IG1lc3NhZ2UgZGF0YVxuICAgICAgICB0aGlzLmxvYWRBc3NldHMoMSk7XG4gICAgICAgIHRoaXMubG9hZEFzc2V0cyh0aGlzLmFwcFNldHRpbmdzLmdldE51bWJlcihcImNvbnRlbnRfcGFnZVwiKSk7XG4gICAgfVxuXG4gICAgQE91dHB1dCgpIG1lc3NhZ2VDb3VudGVyID0gbmV3IEV2ZW50RW1pdHRlcjxudW1iZXI+KCk7XG5cbiAgICBsb2FkQXNzZXRzKGNvbnRlbnQ6IG51bWJlcikge1xuICAgICAgICB0aGlzLmRvbmVMb2FkaW5nID0gZmFsc2U7XG4gICAgICAgIHRoaXMuYXBwU2V0dGluZ3Muc2V0TnVtYmVyKFwiY29udGVudF9wYWdlXCIsIHRoaXMuc2hvd0NvbnRlbnQpO1xuICAgICAgICBzd2l0Y2ggKGNvbnRlbnQpIHtcbiAgICAgICAgICAgIGNhc2UgMDpcbiAgICAgICAgICAgICAgICAvLyBHZXQgdG9rZW4gZGF0YVxuICAgICAgICAgICAgICAgIHRoaXMudG9rZW5fZGF0YSA9IHtcbiAgICAgICAgICAgICAgICAgICAgdG9rZW5fdHlwZTogMSxcbiAgICAgICAgICAgICAgICAgICAgc2Vzc2lvbl9rZXk6IHRoaXMuc2Vzc2lvbl9kYXRhLnNlc3Npb25fa2V5XG4gICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICBpZiAoIXRoaXMudG9rZW4pIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zcG9vbml0eVNlcnZpY2UudXNlckdldFRva2VuKHRoaXMudG9rZW5fZGF0YSlcbiAgICAgICAgICAgICAgICAgICAgICAgIC5zdWJzY3JpYmUoZGF0YSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy50b2tlbiA9IGRhdGE7XG4gICAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVyciA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgLy8gR2V0IHF1aWNrcGF5IGJhbGFuY2VcbiAgICAgICAgICAgICAgICBpZiAoIXRoaXMucXVpY2twYXkpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zcG9vbml0eVNlcnZpY2UudXNlckdldFF1aWNrUGF5QmFsYW5jZSh0aGlzLnNlc3Npb25fZGF0YSlcbiAgICAgICAgICAgICAgICAgICAgICAgIC5zdWJzY3JpYmUoZGF0YSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5xdWlja3BheSA9IGRhdGE7XG4gICAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVyciA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgIC8vIEdldCByZXdhcmQgZGF0YVxuICAgICAgICAgICAgICAgIGlmICghdGhpcy5yZXdhcmRzKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc3Bvb25pdHlTZXJ2aWNlLnVzZXJHZXRSZXdhcmRzKHRoaXMuc2Vzc2lvbl9kYXRhKVxuICAgICAgICAgICAgICAgICAgICAgICAgLnN1YnNjcmliZShkYXRhID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBmb3IgKHZhciBpIGluIGRhdGFbXCJkYXRhXCJdKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRhdGFbXCJkYXRhXCJdW2ldLnBpZSA9IFtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBSZXdhcmQ6IGRhdGFbXCJkYXRhXCJdW2ldLnByb2dyZXNzICsgXCIgUG9pbnRzIEVhcm5lZFwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIEFtb3VudDogZGF0YVtcImRhdGFcIl1baV0ucHJvZ3Jlc3MsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFJld2FyZDogKGRhdGFbXCJkYXRhXCJdW2ldLmNvc3QgLSBkYXRhW1wiZGF0YVwiXVtpXS5wcm9ncmVzcykgKyBcIiBQb2ludHMgTGVmdFwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIEFtb3VudDogKGRhdGFbXCJkYXRhXCJdW2ldLmNvc3QgLSBkYXRhW1wiZGF0YVwiXVtpXS5wcm9ncmVzcylcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5yZXdhcmRzID0gZGF0YTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZXJyID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIDE6XG4gICAgICAgICAgICAgICAgLy8gR2V0IHVzZXIgbWVzc2FnZXNcbiAgICAgICAgICAgICAgICB0aGlzLm1lc3NhZ2VfYW1vdW50ID0gMDtcbiAgICAgICAgICAgICAgICB0aGlzLnNwb29uaXR5U2VydmljZS51c2VyR2V0TWVzc2FnZXModGhpcy5zZXNzaW9uX2RhdGEpXG4gICAgICAgICAgICAgICAgICAgIC5zdWJzY3JpYmUoZGF0YSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBkYXRhLnNvcnQoZnVuY3Rpb24gKGEsYikge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBiLm1lc3NhZ2UucHVibGlzaF9kYXRlIC0gYS5tZXNzYWdlLnB1Ymxpc2hfZGF0ZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5tZXNzYWdlcyA9IGRhdGE7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIEdldCBtZXNzYWdlIGNvdW50ZXJcbiAgICAgICAgICAgICAgICAgICAgICAgIGZvciAodmFyIGkgaW4gZGF0YSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICghZGF0YVtpXS5yZWFkKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMubWVzc2FnZV9hbW91bnQrKztcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLm1lc3NhZ2VDb3VudGVyLmVtaXQodGhpcy5tZXNzYWdlX2Ftb3VudCk7XG4gICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgIGVyciA9PiB7XG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSAyOlxuICAgICAgICAgICAgICAgIC8vIEdldCBzdG9yZSBsb2NhdGlvbnNcbiAgICAgICAgICAgICAgICB0aGlzLnZlbmRvcl9kYXRhID0geyB2ZW5kb3JfaWQ6IFZlbmRvckNvbmZpZy5WRU5ET1IgfTtcbiAgICAgICAgICAgICAgICBpZiAoIXRoaXMubG9jYXRpb25zKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc3Bvb25pdHlTZXJ2aWNlLnZlbmRvckdldFN0b3JlTGlzdCh0aGlzLnZlbmRvcl9kYXRhKVxuICAgICAgICAgICAgICAgICAgICAgICAgLnN1YnNjcmliZShkYXRhID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmxvY2F0aW9ucyA9IGRhdGE7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zcG9vbml0eVNlcnZpY2UudXNlckdldEZhdm9yaXRlU3RvcmVMaXN0KHRoaXMuc2Vzc2lvbl9kYXRhKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuc3Vic2NyaWJlKGRhdGEgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZm9yICh2YXIgaSBpbiB0aGlzLmxvY2F0aW9ucy5kYXRhKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5sb2NhdGlvbnMuZGF0YVtpXS5odG1sID0gJzxpZnJhbWUgc3JjPVwiaHR0cHM6Ly9tYXBzLmdvb2dsZS5jb20vbWFwcz9xPScgKyB0aGlzLmxvY2F0aW9ucy5kYXRhW2ldLmxhdGl0dWRlICsgJywnICsgdGhpcy5sb2NhdGlvbnMuZGF0YVtpXS5sb25naXR1ZGUgKyAnJmhsPWVzO3o9MTQmYW1wO291dHB1dD1lbWJlZFwiIHdpZHRoPVwiMzA1XCIgaGVpZ2h0PVwiMTgwXCIgZnJhbWVib3JkZXI9XCIwXCIgc3R5bGU9XCJib3JkZXI6MFwiPjwvaWZyYW1lPic7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZm9yICh2YXIgaiBpbiBkYXRhW1wiaXRlbXNcIl0pIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMubG9jYXRpb25zLmRhdGFbaV0uaWQgPT0gZGF0YVtcIml0ZW1zXCJdW2pdLnZlbmRvci5pZCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGF0YVtcIml0ZW1zXCJdW2pdLm5hbWUgPSB0aGlzLmxvY2F0aW9ucy5kYXRhW2ldLm5hbWU7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkYXRhW1wiaXRlbXNcIl1bal0uYWRkcmVzc19saW5lXzEgPSB0aGlzLmxvY2F0aW9ucy5kYXRhW2ldLmFkZHJlc3NfbGluZV8xO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGF0YVtcIml0ZW1zXCJdW2pdLmlzX29wZW4gPSB0aGlzLmxvY2F0aW9ucy5kYXRhW2ldLmlzX29wZW47XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkYXRhW1wiaXRlbXNcIl1bal0ubGF0aXR1ZGUgPSB0aGlzLmxvY2F0aW9ucy5kYXRhW2ldLmxhdGl0dWRlO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGF0YVtcIml0ZW1zXCJdW2pdLmxvbmdpdHVkZSA9IHRoaXMubG9jYXRpb25zLmRhdGFbaV0ubG9uZ2l0dWRlO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGF0YVtcIml0ZW1zXCJdW2pdLmh0bWwgPSB0aGlzLmxvY2F0aW9ucy5kYXRhW2ldLmh0bWw7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmb3IgKHZhciBrIGluIHRoaXMubG9jYXRpb25zLmRhdGFbaV0udmVuZG9yX2F0dHJpYnV0ZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLmxvY2F0aW9ucy5kYXRhW2ldLnZlbmRvcl9hdHRyaWJ1dGVba10ubGFiZWwgPT0gXCJPcmRlciBPbmxpbmVcIikge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkYXRhW1wiaXRlbXNcIl1bal0udmVuZG9yX2F0dHJpYnV0ZSA9IFt7bGFiZWw6IFwiT3JkZXIgT25saW5lXCIsIGxpbms6IHRoaXMubG9jYXRpb25zLmRhdGFbaV0udmVuZG9yX2F0dHJpYnV0ZVtrXS5saW5rfV07XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmZhdm9yaXRlX3N0b3Jlcy5wdXNoKGRhdGFbXCJpdGVtc1wiXVtqXSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sIFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBlcnIgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZXJyID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIDM6XG4gICAgICAgICAgICAgICAgLy8gR2V0IHRyYW5zYWN0aW9uIGhpc3RvcnlcbiAgICAgICAgICAgICAgICBpZiAoIXRoaXMudHJhbnNhY3Rpb25zKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc3Bvb25pdHlTZXJ2aWNlLnVzZXJHZXRUcmFuc2FjdGlvbnModGhpcy5zZXNzaW9uX2RhdGEpXG4gICAgICAgICAgICAgICAgICAgICAgICAuc3Vic2NyaWJlKGRhdGEgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMudHJhbnNhY3Rpb25zID0gZGF0YTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZXJyID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIDQ6XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5kb25lTG9hZGluZyA9IHRydWU7XG4gICAgfVxuXG5cbiAgICAvKlxuICAgICAqXG4gICAgICogSU5CT1ggUEFHRVxuICAgICAqIFxuICAgICAqL1xuICAgIG9wZW5NZXNzYWdlKG1lc3NhZ2U6IGFueSkge1xuICAgICAgICAvLyBTdG9yZSBkYXRhIGluIHN0b3JhZ2UgZm9yIG5leHQgcGFnZVxuICAgICAgICB0aGlzLmFwcFNldHRpbmdzLnNldFN0cmluZyhcIm1lc3NhZ2VcIiwgSlNPTi5zdHJpbmdpZnkobWVzc2FnZSkpO1xuXG4gICAgICAgIC8vIFNldCBtZXNzYWdlIHRvIHJlYWRcbiAgICAgICAgdGhpcy5tZXNzYWdlX2RhdGEgPSB7XG4gICAgICAgICAgICB1c2VyX21lc3NhZ2U6IG1lc3NhZ2UudXNlcl9tZXNzYWdlX2lkLFxuICAgICAgICAgICAgcmVhZDogdHJ1ZSxcbiAgICAgICAgICAgIHN0YXR1c19pZDogMSxcbiAgICAgICAgICAgIHNlc3Npb25fa2V5OiB0aGlzLnNlc3Npb25fZGF0YS5zZXNzaW9uX2tleVxuICAgICAgICB9O1xuICAgICAgICB0aGlzLnNwb29uaXR5U2VydmljZS51c2VyVXBkYXRlTWVzc2FnZVN0YXR1cyh0aGlzLm1lc3NhZ2VfZGF0YSlcbiAgICAgICAgICAgIC5zdWJzY3JpYmUoZGF0YSA9PiB7XG4gICAgICAgICAgICAgICAgLy8gVXBkYXRlIFVJIHdpdGggc3RhdHVzXG4gICAgICAgICAgICAgICAgdGhpcy5sb2FkQXNzZXRzKDEpO1xuICAgICAgICAgICAgICAgIHRoaXMucm91dGVyLm5hdmlnYXRlKFtcIi9tZXNzYWdlXCJdKTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBlcnIgPT4ge1xuICAgICAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgZGVsZXRlTWVzc2FnZShtZXNzYWdlOiBhbnkpIHtcbiAgICAgICAgdmFyIF90aGlzID0gdGhpcztcbiAgICAgICAgaWYgKG1lc3NhZ2UucmVhZCkge1xuICAgICAgICAgICAgdGhpcy5kaWFsb2dzLmNvbmZpcm0oe1xuICAgICAgICAgICAgICAgIHRpdGxlOiBcIkNvbmZpcm1hdGlvblwiLFxuICAgICAgICAgICAgICAgIG1lc3NhZ2U6IFwiQXJlIHlvdSBzdXJlIHlvdSB3YW50IHRvIG1hcmsgdGhpcyBtZXNzYWdlIGFzIHVucmVhZD9cIixcbiAgICAgICAgICAgICAgICBva0J1dHRvblRleHQ6IFwiTWFyayBVbnJlYWRcIixcbiAgICAgICAgICAgICAgICBjYW5jZWxCdXR0b25UZXh0OiBcIkNhbmNlbFwiXG4gICAgICAgICAgICB9KS50aGVuKGZ1bmN0aW9uIChyZXN1bHQpIHtcbiAgICAgICAgICAgICAgICBpZiAocmVzdWx0KSB7XG4gICAgICAgICAgICAgICAgICAgIF90aGlzLnVwZGF0ZU1lc3NhZ2VTdGF0dXMobWVzc2FnZSwgMSwgZmFsc2UpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgbG9uZ1ByZXNzTWVzc2FnZShtZXNzYWdlOiBhbnkpIHtcbiAgICAgICAgdmFyIF90aGlzID0gdGhpcztcbiAgICAgICAgdmFyIG9wdGlvbjEgPSBtZXNzYWdlLnJlYWQgPyAnTWFyayBhcyBVbnJlYWQnIDogJ01hcmsgYXMgUmVhZCc7XG4gICAgICAgIHRoaXMuZGlhbG9ncy5hY3Rpb24oe1xuICAgICAgICAgICAgbWVzc2FnZTogXCJXaGF0IGRvIHlvdSB3YW50IHRvIGRvP1wiLFxuICAgICAgICAgICAgY2FuY2VsQnV0dG9uVGV4dDogXCJDYW5jZWxcIixcbiAgICAgICAgICAgIGFjdGlvbnM6IFtvcHRpb24xLCBcIkRlbGV0ZVwiXVxuICAgICAgICB9KS50aGVuKGZ1bmN0aW9uIChyZXN1bHQpIHtcbiAgICAgICAgICAgIGlmIChyZXN1bHQgPT0gXCJNYXJrIGFzIFVucmVhZFwiKSB7XG4gICAgICAgICAgICAgICAgX3RoaXMudXBkYXRlTWVzc2FnZVN0YXR1cyhtZXNzYWdlLCAxLCBmYWxzZSk7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKHJlc3VsdCA9PSBcIk1hcmsgYXMgUmVhZFwiKSB7XG4gICAgICAgICAgICAgICAgX3RoaXMudXBkYXRlTWVzc2FnZVN0YXR1cyhtZXNzYWdlLCAxLCB0cnVlKTtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAocmVzdWx0ID09IFwiRGVsZXRlXCIpIHtcbiAgICAgICAgICAgICAgICBfdGhpcy5kaWFsb2dzLmNvbmZpcm0oe1xuICAgICAgICAgICAgICAgICAgICB0aXRsZTogXCJDb25maXJtYXRpb25cIixcbiAgICAgICAgICAgICAgICAgICAgbWVzc2FnZTogXCJBcmUgeW91IHN1cmUgeW91IHdhbnQgdG8gZGVsZXRlIHRoaXMgbWVzc2FnZT9cIixcbiAgICAgICAgICAgICAgICAgICAgb2tCdXR0b25UZXh0OiBcIkRlbGV0ZVwiLFxuICAgICAgICAgICAgICAgICAgICBjYW5jZWxCdXR0b25UZXh0OiBcIkNhbmNlbFwiXG4gICAgICAgICAgICAgICAgfSkudGhlbihmdW5jdGlvbiAocmVzdWx0KSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChyZXN1bHQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIF90aGlzLnVwZGF0ZU1lc3NhZ2VTdGF0dXMobWVzc2FnZSwgNCwgdHJ1ZSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSlcbiAgICB9XG5cbiAgICB1cGRhdGVNZXNzYWdlU3RhdHVzKG1lc3NhZ2U6IGFueSwgc3RhdHVzOiBudW1iZXIsIHJlYWQ6IGJvb2xlYW4pIHtcbiAgICAgICAgdGhpcy5tZXNzYWdlX2RhdGEgPSB7XG4gICAgICAgICAgICB1c2VyX21lc3NhZ2U6IG1lc3NhZ2UudXNlcl9tZXNzYWdlX2lkLFxuICAgICAgICAgICAgcmVhZDogcmVhZCxcbiAgICAgICAgICAgIHN0YXR1c19pZDogc3RhdHVzLFxuICAgICAgICAgICAgc2Vzc2lvbl9rZXk6IHRoaXMuc2Vzc2lvbl9kYXRhLnNlc3Npb25fa2V5XG4gICAgICAgIH07XG4gICAgICAgIHRoaXMuc3Bvb25pdHlTZXJ2aWNlLnVzZXJVcGRhdGVNZXNzYWdlU3RhdHVzKHRoaXMubWVzc2FnZV9kYXRhKVxuICAgICAgICAgICAgLnN1YnNjcmliZShkYXRhID0+IHtcbiAgICAgICAgICAgICAgICAvLyBVcGRhdGUgVUkgd2l0aCBzdGF0dXNcbiAgICAgICAgICAgICAgICB0aGlzLmxvYWRBc3NldHMoMSk7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgZXJyID0+IHtcbiAgICAgICAgICAgIH0pO1xuICAgIH1cblxuXG4gICAgLypcbiAgICAgKlxuICAgICAqIExPQ0FUSU9OUyBQQUdFXG4gICAgICogXG4gICAgICovXG4gICAgZ29Ub0xvY2F0aW9uKGxvY2F0aW9uOiBhbnkpIHtcbiAgICAgICAgdGhpcy51dGlscy5vcGVuVXJsKFwiaHR0cHM6Ly93d3cuZ29vZ2xlLmNvbS9tYXBzL3NlYXJjaC8/YXBpPTEmcXVlcnk9XCIgKyBsb2NhdGlvbi5sYXRpdHVkZSArICcsJyArIGxvY2F0aW9uLmxvbmdpdHVkZSk7XG4gICAgfVxuXG4gICAgb3BlbkxvY2F0aW9uKGxvY2F0aW9uOiBhbnkpIHtcbiAgICAgICAgdGhpcy5hcHBTZXR0aW5ncy5zZXRTdHJpbmcoXCJsb2NhdGlvblwiLCBKU09OLnN0cmluZ2lmeShsb2NhdGlvbikpO1xuICAgICAgICB0aGlzLnJvdXRlci5uYXZpZ2F0ZShbXCIvbG9jYXRpb25cIl0pO1xuICAgIH1cblxuICAgIG9wZW5Nb2JpbGVPcmRlcmluZyhsb2NhdGlvbjogYW55KSB7XG4gICAgICAgIC8vIEdldCBtb2JpbGUgb3JkZXJpbmcgVVJMXG4gICAgICAgIGZvciAodmFyIGkgaW4gbG9jYXRpb24udmVuZG9yX2F0dHJpYnV0ZSkge1xuICAgICAgICAgICAgaWYgKGxvY2F0aW9uLnZlbmRvcl9hdHRyaWJ1dGVbaV0ubGFiZWwgPT0gXCJPcmRlciBPbmxpbmVcIikge1xuICAgICAgICAgICAgICAgIHRoaXMub3JkZXJpbmdVcmwgPSBsb2NhdGlvbi52ZW5kb3JfYXR0cmlidXRlW2ldLmxpbms7IFxuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHRoaXMub3JkZXJpbmdVcmwpIHtcbiAgICAgICAgICAgIHRoaXMudXRpbHMub3BlblVybCh0aGlzLm9yZGVyaW5nVXJsICsgJyZ1c2VyX3Rva2VuPXNwb29uaXR5OicgKyAgdGhpcy51c2VyX2RhdGEub25saW5lX29yZGVyX3Rva2VuICsgJyZ1c2VyX3Rva2VuPXNwb29uaXR5bG95YWx0eTonICsgdGhpcy51c2VyX2RhdGEub25saW5lX29yZGVyX3Rva2VuICsgJyZ1c2VyX3Rva2VuPXNwb29uaXR5Y3JlZGl0OicgKyB0aGlzLnVzZXJfZGF0YS5vbmxpbmVfb3JkZXJfdG9rZW4pO1xuICAgICAgICB9XG4gICAgfVxuXG5cbiAgICAvKlxuICAgICAqXG4gICAgICogVFJBTlNBQ1RJT04gUEFHRVxuICAgICAqIFxuICAgICAqL1xuICAgIG9wZW5UcmFuc2FjdGlvbih0cmFuc2FjdGlvbjogYW55KSB7XG4gICAgICAgIHRoaXMuYXBwU2V0dGluZ3Muc2V0U3RyaW5nKFwidHJhbnNhY3Rpb25cIiwgSlNPTi5zdHJpbmdpZnkodHJhbnNhY3Rpb24pKTtcbiAgICAgICAgdGhpcy5yb3V0ZXIubmF2aWdhdGUoW1wiL3RyYW5zYWN0aW9uXCJdKTtcbiAgICB9XG5cbiAgICBcbiAgICAvKlxuICAgICAqXG4gICAgICogQUNDT1VOVCBQQUdFXG4gICAgICogXG4gICAgICovXG4gICAgZ29Ub0FjY291bnRJbmZvKCkge1xuICAgICAgICB0aGlzLnJvdXRlci5uYXZpZ2F0ZShbXCIvYWNjb3VudFwiXSk7XG4gICAgfVxuXG4gICAgZGVsZXRlQWNjb3VudCgpIHtcbiAgICAgICAgLy8gRGVsZXRlIGFjY291bnRcbiAgICAgICAgdmFyIF90aGlzID0gdGhpcztcbiAgICAgICAgdGhpcy51c2VyID0ge1xuICAgICAgICAgICAgaWQ6IHRoaXMuYXBwU2V0dGluZ3MuZ2V0U3RyaW5nKFwidXNlcl9pZFwiKSxcbiAgICAgICAgICAgIHZlbmRvcl9pZDogdGhpcy5hcHBTZXR0aW5ncy5nZXRTdHJpbmcoXCJ2ZW5kb3JfaWRcIiksXG4gICAgICAgICAgICBzZXNzaW9uX2tleTogdGhpcy5hcHBTZXR0aW5ncy5nZXRTdHJpbmcoXCJzZXNzaW9uX2tleVwiKVxuICAgICAgICB9O1xuICAgICAgICB0aGlzLmRpYWxvZ3MuY29uZmlybSh7XG4gICAgICAgICAgICB0aXRsZTogXCJDb25maXJtYXRpb25cIixcbiAgICAgICAgICAgIG1lc3NhZ2U6IFwiQXJlIHlvdSBzdXJlIHlvdSB3YW50IHRvIGRlbGV0ZSB0aGlzIGFjY291bnQ/XCIsXG4gICAgICAgICAgICBva0J1dHRvblRleHQ6IFwiWWVzXCIsXG4gICAgICAgICAgICBjYW5jZWxCdXR0b25UZXh0OiBcIkNhbmNlbFwiXG4gICAgICAgIH0pLnRoZW4oZnVuY3Rpb24gKHJlc3VsdCkge1xuICAgICAgICAgICAgaWYgKHJlc3VsdCkge1xuICAgICAgICAgICAgICAgIF90aGlzLnNwb29uaXR5U2VydmljZS52ZW5kb3JEZWxldGVVc2VyRW1haWwoX3RoaXMudXNlcilcbiAgICAgICAgICAgICAgICAgICAgLnN1YnNjcmliZShkYXRhID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIF90aGlzLmFsZXJ0KCdBIGNvbmZpcm1hdGlvbiBlbWFpbCBoYXMgYmVlbiBzZW50IHRvIHlvdXIgZW1haWwgYWRkcmVzcyB3aXRoIGluc3RydWN0aW9ucyBvbiBob3cgdG8gZGVsZXRlIHlvdXIgYWNjb3VudC4nKTtcbiAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgIGVyciA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICAgIFxuICAgIH1cblxuICAgIGxvZ091dCgpIHtcbiAgICAgICAgdmFyIF90aGlzID0gdGhpcztcbiAgICAgICAgdGhpcy5kaWFsb2dzLmNvbmZpcm0oe1xuICAgICAgICAgICAgdGl0bGU6IFwiQ29uZmlybWF0aW9uXCIsXG4gICAgICAgICAgICBtZXNzYWdlOiBcIkFyZSB5b3Ugc3VyZSB5b3Ugd2FudCB0byBsb2cgb3V0P1wiLFxuICAgICAgICAgICAgb2tCdXR0b25UZXh0OiBcIlllc1wiLFxuICAgICAgICAgICAgY2FuY2VsQnV0dG9uVGV4dDogXCJDYW5jZWxcIlxuICAgICAgICB9KS50aGVuKGZ1bmN0aW9uIChyZXN1bHQpIHtcbiAgICAgICAgICAgIGlmIChyZXN1bHQpIHtcbiAgICAgICAgICAgICAgICBfdGhpcy5hcHBTZXR0aW5ncy5jbGVhcigpO1xuICAgICAgICAgICAgICAgIF90aGlzLnJvdXRlci5uYXZpZ2F0ZShbXCIvbG9naW5cIl0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICAvKiBHRU5FUkFMICovXG5cbiAgICBvbkl0ZW1Mb2FkaW5nKGFyZ3M6IGFueSkge1xuICAgICAgICBpZiAoaW9zKSB7XG4gICAgICAgICAgICBjb25zdCBjZWxsID0gYXJncy5pb3M7XG4gICAgICAgICAgICBjZWxsLnNlbGVjdGlvblN0eWxlID0gVUlUYWJsZVZpZXdDZWxsU2VsZWN0aW9uU3R5bGUuVUlUYWJsZVZpZXdDZWxsU2VsZWN0aW9uU3R5bGVOb25lO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgdGFiU2VsZWN0ZWQoYXJnczogbnVtYmVyKSB7XG4gICAgICAgIHRoaXMuc2hvd0NvbnRlbnQgPSBhcmdzO1xuICAgICAgICB0aGlzLmxvYWRBc3NldHMoYXJncyk7XG4gICAgfVxuXG4gICAgYWxlcnQobWVzc2FnZTogc3RyaW5nKSB7XG5cdFx0cmV0dXJuIGFsZXJ0KHtcblx0XHRcdHRpdGxlOiBcIkFsZXJ0XCIsXG5cdFx0XHRva0J1dHRvblRleHQ6IFwiT0tcIixcblx0XHRcdG1lc3NhZ2U6IG1lc3NhZ2Vcblx0XHR9KTtcbiAgICB9XG4gICAgXG4gICAgcHJvbXB0KG1lc3NhZ2U6IHN0cmluZykge1xuXHRcdHJldHVybiBwcm9tcHQoe1xuXHRcdFx0dGl0bGU6IFwiWW91ciB0aXRsZVwiLFxuICAgICAgICAgICAgbWVzc2FnZTogbWVzc2FnZSxcbiAgICAgICAgICAgIG9rQnV0dG9uVGV4dDogXCJEZWxldGVcIixcbiAgICAgICAgICAgIGNhbmNlbEJ1dHRvblRleHQ6IFwiQ2FuY2VsIFwiLFxuICAgICAgICAgICAgaW5wdXRUeXBlOiB0aGlzLmRpYWxvZ3MuaW5wdXRUeXBlLnRleHRcblx0XHR9KS50aGVuKGZ1bmN0aW9uKHZhbHVlKSB7XG4gICAgICAgIH0pO1xuXHR9XG59XG4iXX0=