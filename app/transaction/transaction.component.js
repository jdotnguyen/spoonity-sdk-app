"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var page_1 = require("ui/page");
var spoonity_sdk_1 = require("../typescript/spoonity.sdk");
var dialogs_1 = require("tns-core-modules/ui/dialogs");
var TransactionComponent = /** @class */ (function () {
    function TransactionComponent(page, spoonityService) {
        this.page = page;
        this.spoonityService = spoonityService;
        //Start at home
        this.page.enableSwipeBackNavigation = true;
        this.page.actionBarHidden = false;
        this.dialogs = require("tns-core-modules/ui/dialogs");
        this.appSettings = require("application-settings");
    }
    TransactionComponent.prototype.ngOnInit = function () {
        this.transaction_data = JSON.parse(this.appSettings.getString("transaction"));
        this.refreshUI(false);
    };
    TransactionComponent.prototype.rateTransaction = function () {
        var _this = this;
        this.dialogs.action({
            message: "How would you rate your experience?",
            cancelButtonText: "Cancel",
            actions: ["1 Star", "2 Star", "3 Star", "4 Star", "5 Star"]
        }).then(function (result) {
            if (result == "1 Star") {
                _this.setRating(20);
            }
            else if (result == "2 Star") {
                _this.setRating(40);
            }
            else if (result == "3 Star") {
                _this.setRating(60);
            }
            else if (result == "4 Star") {
                _this.setRating(80);
            }
            else if (result == "4 Star") {
                _this.setRating(100);
            }
        });
    };
    TransactionComponent.prototype.setRating = function (rating) {
        var _this_1 = this;
        var transaction_data = {
            transaction: this.transaction_data.id,
            rating: rating,
            comment: '',
            session_key: this.appSettings.getString("session_key")
        };
        this.spoonityService.userSendRating(transaction_data)
            .subscribe(function (data) {
            console.log(data);
            dialogs_1.alert('Rating successfully sent!');
            _this_1.refreshUI(true);
        }, function (err) { dialogs_1.alert(err.error.error.errors[0].message); });
    };
    TransactionComponent.prototype.tipTransaction = function () {
        var _this = this;
        this.dialogs.action({
            message: "How much would you like to tip?",
            cancelButtonText: "Cancel",
            actions: ["No Tip", "$1.00", "$2.00", "$3.00", "$4.00"]
        }).then(function (result) {
            if (result == "No Tip") {
                _this.setTip(0);
            }
            else if (result == "$1.00") {
                _this.setTip(1);
            }
            else if (result == "$2.00") {
                _this.setTip(2);
            }
            else if (result == "$3.00") {
                _this.setTip(3);
            }
            else if (result == "$4.00") {
                _this.setTip(4);
            }
        });
    };
    TransactionComponent.prototype.setTip = function (amount) {
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
                    .subscribe(function (data) {
                    dialogs_1.alert('Tip successfully sent!');
                    _this.refreshUI(true);
                }, function (err) { dialogs_1.alert(err.error.error.errors[0].message); });
            }
        });
    };
    TransactionComponent.prototype.refreshUI = function (api) {
        var _this_1 = this;
        if (api) {
            var session_data = { session_key: this.appSettings.getString("session_key") };
            this.spoonityService.userGetTransactions(session_data)
                .subscribe(function (data) {
                for (var i in data) {
                    if (data[i]["id"] == _this_1.transaction_data.id) {
                        _this_1.transaction_data.id = data[i];
                    }
                }
                ;
            }, function (err) { dialogs_1.alert(err.error.error.errors[0].message); });
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
    };
    TransactionComponent.prototype.alert = function (message) {
        return dialogs_1.alert({
            title: "Alert",
            okButtonText: "OK",
            message: message
        });
    };
    TransactionComponent = __decorate([
        core_1.Component({
            selector: "Transaction",
            moduleId: module.id,
            templateUrl: "./transaction.component.html",
            styleUrls: ['./transaction.component.css']
        }),
        __metadata("design:paramtypes", [page_1.Page,
            spoonity_sdk_1.SpoonityService])
    ], TransactionComponent);
    return TransactionComponent;
}());
exports.TransactionComponent = TransactionComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHJhbnNhY3Rpb24uY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsidHJhbnNhY3Rpb24uY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsc0NBQWtEO0FBQ2xELGdDQUErQjtBQUUvQiwyREFBNkQ7QUFDN0QsdURBQW9EO0FBUXBEO0lBV0ksOEJBQ1ksSUFBVSxFQUNWLGVBQWdDO1FBRGhDLFNBQUksR0FBSixJQUFJLENBQU07UUFDVixvQkFBZSxHQUFmLGVBQWUsQ0FBaUI7UUFFeEMsZUFBZTtRQUNmLElBQUksQ0FBQyxJQUFJLENBQUMseUJBQXlCLEdBQUcsSUFBSSxDQUFDO1FBQzNDLElBQUksQ0FBQyxJQUFJLENBQUMsZUFBZSxHQUFHLEtBQUssQ0FBQztRQUNsQyxJQUFJLENBQUMsT0FBTyxHQUFHLE9BQU8sQ0FBQyw2QkFBNkIsQ0FBQyxDQUFDO1FBQ3RELElBQUksQ0FBQyxXQUFXLEdBQUcsT0FBTyxDQUFDLHNCQUFzQixDQUFDLENBQUM7SUFDdkQsQ0FBQztJQUVELHVDQUFRLEdBQVI7UUFDSSxJQUFJLENBQUMsZ0JBQWdCLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLFNBQVMsQ0FBQyxhQUFhLENBQUMsQ0FBQyxDQUFDO1FBQzlFLElBQUksQ0FBQyxTQUFTLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDMUIsQ0FBQztJQUVELDhDQUFlLEdBQWY7UUFDSSxJQUFJLEtBQUssR0FBRyxJQUFJLENBQUM7UUFDakIsSUFBSSxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUM7WUFDaEIsT0FBTyxFQUFFLHFDQUFxQztZQUM5QyxnQkFBZ0IsRUFBRSxRQUFRO1lBQzFCLE9BQU8sRUFBRSxDQUFDLFFBQVEsRUFBRSxRQUFRLEVBQUUsUUFBUSxFQUFFLFFBQVEsRUFBRSxRQUFRLENBQUM7U0FDOUQsQ0FBQyxDQUFDLElBQUksQ0FBQyxVQUFVLE1BQU07WUFDcEIsSUFBSSxNQUFN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UUFBUSxFQUFFLE1BQU0sQ0FBQyxFQUFFO1lBQ25CLFdBQVcsRUFBRSw4QkFBOEI7WUFDM0MsU0FBUyxFQUFFLENBQUMsNkJBQTZCLENBQUM7U0FDN0MsQ0FBQzt5Q0Fhb0IsV0FBSTtZQUNPLDhCQUFlO09BYm5DLG9CQUFvQixDQXlKaEM7SUFBRCwyQkFBQztDQUFBLEFBekpELElBeUpDO0FBekpZLG9EQUFvQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgT25Jbml0IH0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcbmltcG9ydCB7IFBhZ2UgfSBmcm9tIFwidWkvcGFnZVwiO1xuaW1wb3J0IHsgT2JzZXJ2YWJsZSB9IGZyb20gXCJyeGpzXCI7XG5pbXBvcnQgeyBTcG9vbml0eVNlcnZpY2UgfSBmcm9tIFwiLi4vdHlwZXNjcmlwdC9zcG9vbml0eS5zZGtcIjtcbmltcG9ydCB7IGFsZXJ0IH0gZnJvbSBcInRucy1jb3JlLW1vZHVsZXMvdWkvZGlhbG9nc1wiO1xuXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogXCJUcmFuc2FjdGlvblwiLFxuICAgIG1vZHVsZUlkOiBtb2R1bGUuaWQsXG4gICAgdGVtcGxhdGVVcmw6IFwiLi90cmFuc2FjdGlvbi5jb21wb25lbnQuaHRtbFwiLFxuICAgIHN0eWxlVXJsczogWycuL3RyYW5zYWN0aW9uLmNvbXBvbmVudC5jc3MnXVxufSlcbmV4cG9ydCBjbGFzcyBUcmFuc2FjdGlvbkNvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XG4gICAgLy8gU3RvcmFnZVxuICAgIGFwcFNldHRpbmdzOiBhbnk7XG5cbiAgICAvLyBEYXRhXG4gICAgcGFyYW1zJDogT2JzZXJ2YWJsZTxhbnk+O1xuICAgIHRyYW5zYWN0aW9uX2RhdGE6IGFueTtcblxuICAgIC8vIFV0aWxpdGllc1xuICAgIGRpYWxvZ3M6IGFueTtcblxuICAgIGNvbnN0cnVjdG9yKFxuICAgICAgICBwcml2YXRlIHBhZ2U6IFBhZ2UsXG4gICAgICAgIHByaXZhdGUgc3Bvb25pdHlTZXJ2aWNlOiBTcG9vbml0eVNlcnZpY2VcbiAgICApIHtcbiAgICAgICAgLy9TdGFydCBhdCBob21lXG4gICAgICAgIHRoaXMucGFnZS5lbmFibGVTd2lwZUJhY2tOYXZpZ2F0aW9uID0gdHJ1ZTtcbiAgICAgICAgdGhpcy5wYWdlLmFjdGlvbkJhckhpZGRlbiA9IGZhbHNlO1xuICAgICAgICB0aGlzLmRpYWxvZ3MgPSByZXF1aXJlKFwidG5zLWNvcmUtbW9kdWxlcy91aS9kaWFsb2dzXCIpO1xuICAgICAgICB0aGlzLmFwcFNldHRpbmdzID0gcmVxdWlyZShcImFwcGxpY2F0aW9uLXNldHRpbmdzXCIpO1xuICAgIH1cblxuICAgIG5nT25Jbml0KCk6IHZvaWQge1xuICAgICAgICB0aGlzLnRyYW5zYWN0aW9uX2RhdGEgPSBKU09OLnBhcnNlKHRoaXMuYXBwU2V0dGluZ3MuZ2V0U3RyaW5nKFwidHJhbnNhY3Rpb25cIikpO1xuICAgICAgICB0aGlzLnJlZnJlc2hVSShmYWxzZSk7XG4gICAgfVxuXG4gICAgcmF0ZVRyYW5zYWN0aW9uKCkge1xuICAgICAgICB2YXIgX3RoaXMgPSB0aGlzO1xuICAgICAgICB0aGlzLmRpYWxvZ3MuYWN0aW9uKHtcbiAgICAgICAgICAgIG1lc3NhZ2U6IFwiSG93IHdvdWxkIHlvdSByYXRlIHlvdXIgZXhwZXJpZW5jZT9cIixcbiAgICAgICAgICAgIGNhbmNlbEJ1dHRvblRleHQ6IFwiQ2FuY2VsXCIsXG4gICAgICAgICAgICBhY3Rpb25zOiBbXCIxIFN0YXJcIiwgXCIyIFN0YXJcIiwgXCIzIFN0YXJcIiwgXCI0IFN0YXJcIiwgXCI1IFN0YXJcIl1cbiAgICAgICAgfSkudGhlbihmdW5jdGlvbiAocmVzdWx0KSB7XG4gICAgICAgICAgICBpZiAocmVzdWx0ID09IFwiMSBTdGFyXCIpIHtcbiAgICAgICAgICAgICAgICBfdGhpcy5zZXRSYXRpbmcoMjApO1xuICAgICAgICAgICAgfSBlbHNlIGlmIChyZXN1bHQgPT0gXCIyIFN0YXJcIikge1xuICAgICAgICAgICAgICAgIF90aGlzLnNldFJhdGluZyg0MCk7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKHJlc3VsdCA9PSBcIjMgU3RhclwiKSB7XG4gICAgICAgICAgICAgICAgX3RoaXMuc2V0UmF0aW5nKDYwKTtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAocmVzdWx0ID09IFwiNCBTdGFyXCIpIHtcbiAgICAgICAgICAgICAgICBfdGhpcy5zZXRSYXRpbmcoODApO1xuICAgICAgICAgICAgfSBlbHNlIGlmIChyZXN1bHQgPT0gXCI0IFN0YXJcIikge1xuICAgICAgICAgICAgICAgIF90aGlzLnNldFJhdGluZygxMDApO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KVxuICAgIH1cblxuICAgIHNldFJhdGluZyhyYXRpbmc6IG51bWJlcikge1xuICAgICAgICB2YXIgdHJhbnNhY3Rpb25fZGF0YSA9IHtcbiAgICAgICAgICAgIHRyYW5zYWN0aW9uOiB0aGlzLnRyYW5zYWN0aW9uX2RhdGEuaWQsXG4gICAgICAgICAgICByYXRpbmc6IHJhdGluZyxcbiAgICAgICAgICAgIGNvbW1lbnQ6ICcnLFxuICAgICAgICAgICAgc2Vzc2lvbl9rZXk6IHRoaXMuYXBwU2V0dGluZ3MuZ2V0U3RyaW5nKFwic2Vzc2lvbl9rZXlcIilcbiAgICAgICAgfTtcbiAgICAgICAgdGhpcy5zcG9vbml0eVNlcnZpY2UudXNlclNlbmRSYXRpbmcodHJhbnNhY3Rpb25fZGF0YSlcbiAgICAgICAgICAgIC5zdWJzY3JpYmUoZGF0YSA9PiB7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coZGF0YSk7XG4gICAgICAgICAgICAgICAgYWxlcnQoJ1JhdGluZyBzdWNjZXNzZnVsbHkgc2VudCEnKTtcbiAgICAgICAgICAgICAgICB0aGlzLnJlZnJlc2hVSSh0cnVlKTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgZXJyID0+IHsgYWxlcnQoZXJyLmVycm9yLmVycm9yLmVycm9yc1swXS5tZXNzYWdlKTsgfSk7XG4gICAgfVxuICAgIFxuICAgIHRpcFRyYW5zYWN0aW9uKCkge1xuICAgICAgICB2YXIgX3RoaXMgPSB0aGlzO1xuICAgICAgICB0aGlzLmRpYWxvZ3MuYWN0aW9uKHtcbiAgICAgICAgICAgIG1lc3NhZ2U6IFwiSG93IG11Y2ggd291bGQgeW91IGxpa2UgdG8gdGlwP1wiLFxuICAgICAgICAgICAgY2FuY2VsQnV0dG9uVGV4dDogXCJDYW5jZWxcIixcbiAgICAgICAgICAgIGFjdGlvbnM6IFtcIk5vIFRpcFwiLCBcIiQxLjAwXCIsIFwiJDIuMDBcIiwgXCIkMy4wMFwiLCBcIiQ0LjAwXCJdXG4gICAgICAgIH0pLnRoZW4oZnVuY3Rpb24gKHJlc3VsdCkge1xuICAgICAgICAgICAgaWYgKHJlc3VsdCA9PSBcIk5vIFRpcFwiKSB7XG4gICAgICAgICAgICAgICAgX3RoaXMuc2V0VGlwKDApO1xuICAgICAgICAgICAgfSBlbHNlIGlmIChyZXN1bHQgPT0gXCIkMS4wMFwiKSB7XG4gICAgICAgICAgICAgICAgX3RoaXMuc2V0VGlwKDEpO1xuICAgICAgICAgICAgfSBlbHNlIGlmIChyZXN1bHQgPT0gXCIkMi4wMFwiKSB7XG4gICAgICAgICAgICAgICAgX3RoaXMuc2V0VGlwKDIpO1xuICAgICAgICAgICAgfSBlbHNlIGlmIChyZXN1bHQgPT0gXCIkMy4wMFwiKSB7XG4gICAgICAgICAgICAgICAgX3RoaXMuc2V0VGlwKDMpO1xuICAgICAgICAgICAgfSBlbHNlIGlmIChyZXN1bHQgPT0gXCIkNC4wMFwiKSB7XG4gICAgICAgICAgICAgICAgX3RoaXMuc2V0VGlwKDQpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KVxuICAgIH1cblxuICAgIHNldFRpcChhbW91bnQ6IG51bWJlcikge1xuICAgICAgICB2YXIgX3RoaXMgPSB0aGlzO1xuICAgICAgICB2YXIgdHJhbnNhY3Rpb25fZGF0YSA9IHtcbiAgICAgICAgICAgIHRyYW5zYWN0aW9uOiB0aGlzLnRyYW5zYWN0aW9uX2RhdGEuaWQsXG4gICAgICAgICAgICBhbW91bnQ6IGFtb3VudCxcbiAgICAgICAgICAgIHNlc3Npb25fa2V5OiB0aGlzLmFwcFNldHRpbmdzLmdldFN0cmluZyhcInNlc3Npb25fa2V5XCIpXG4gICAgICAgIH07XG4gICAgICAgIHRoaXMuZGlhbG9ncy5jb25maXJtKHtcbiAgICAgICAgICAgIHRpdGxlOiBcIkNvbmZpcm1hdGlvblwiLFxuICAgICAgICAgICAgbWVzc2FnZTogXCJBcmUgeW91IHN1cmUgeW91IHdhbnQgdG8gdGlwIHRoaXMgYW1vdW50P1wiLFxuICAgICAgICAgICAgb2tCdXR0b25UZXh0OiBcIlllc1wiLFxuICAgICAgICAgICAgY2FuY2VsQnV0dG9uVGV4dDogXCJDYW5jZWxcIlxuICAgICAgICB9KS50aGVuKGZ1bmN0aW9uIChyZXN1bHQpIHtcbiAgICAgICAgICAgIGlmIChyZXN1bHQpIHtcbiAgICAgICAgICAgICAgICBfdGhpcy5zcG9vbml0eVNlcnZpY2UudXNlclNlbmRUaXAodHJhbnNhY3Rpb25fZGF0YSlcbiAgICAgICAgICAgICAgICAgICAgLnN1YnNjcmliZShkYXRhID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGFsZXJ0KCdUaXAgc3VjY2Vzc2Z1bGx5IHNlbnQhJyk7XG4gICAgICAgICAgICAgICAgICAgICAgICBfdGhpcy5yZWZyZXNoVUkodHJ1ZSk7XG4gICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICBlcnIgPT4geyBhbGVydChlcnIuZXJyb3IuZXJyb3IuZXJyb3JzWzBdLm1lc3NhZ2UpOyB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgcmVmcmVzaFVJKGFwaTogYm9vbGVhbikge1xuICAgICAgICBpZiAoYXBpKSB7XG4gICAgICAgICAgICB2YXIgc2Vzc2lvbl9kYXRhID0ge3Nlc3Npb25fa2V5OiB0aGlzLmFwcFNldHRpbmdzLmdldFN0cmluZyhcInNlc3Npb25fa2V5XCIpfTtcbiAgICAgICAgICAgIHRoaXMuc3Bvb25pdHlTZXJ2aWNlLnVzZXJHZXRUcmFuc2FjdGlvbnMoc2Vzc2lvbl9kYXRhKVxuICAgICAgICAgICAgICAgIC5zdWJzY3JpYmUoZGF0YSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGZvciAodmFyIGkgaW4gZGF0YSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGRhdGFbaV1bXCJpZFwiXSA9PSB0aGlzLnRyYW5zYWN0aW9uX2RhdGEuaWQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnRyYW5zYWN0aW9uX2RhdGEuaWQgPSBkYXRhW2ldO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgZXJyID0+IHsgYWxlcnQoZXJyLmVycm9yLmVycm9yLmVycm9yc1swXS5tZXNzYWdlKTsgfSk7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBVcGRhdGUgcmF0aW5nIHRleHRcbiAgICAgICAgc3dpdGNoICh0aGlzLnRyYW5zYWN0aW9uX2RhdGEucmF0aW5nLnZhbHVlKSB7XG4gICAgICAgICAgICBjYXNlIDIwOlxuICAgICAgICAgICAgICAgIHRoaXMudHJhbnNhY3Rpb25fZGF0YS5zdGFyVGV4dCA9ICcmIzg5MDI7JztcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgNDA6XG4gICAgICAgICAgICAgICAgdGhpcy50cmFuc2FjdGlvbl9kYXRhLnN0YXJUZXh0ID0gJyYjODkwMjsmIzg5MDI7JztcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgNjA6XG4gICAgICAgICAgICAgICAgdGhpcy50cmFuc2FjdGlvbl9kYXRhLnN0YXJUZXh0ID0gJyYjODkwMjsmIzg5MDI7JiM4OTAyOyc7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIDgwOlxuICAgICAgICAgICAgICAgIHRoaXMudHJhbnNhY3Rpb25fZGF0YS5zdGFyVGV4dCA9ICcmIzg5MDI7JiM4OTAyOyYjODkwMjsmIzg5MDI7JztcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgMTAwMDpcbiAgICAgICAgICAgICAgICB0aGlzLnRyYW5zYWN0aW9uX2RhdGEuc3RhclRleHQgPSAnJiM4OTAyOyYjODkwMjsmIzg5MDI7JiM4OTAyOyYjODkwMjsnO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICB0aGlzLnRyYW5zYWN0aW9uX2RhdGEuc3RhclRleHQgPSB1bmRlZmluZWQ7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBhbGVydChtZXNzYWdlOiBzdHJpbmcpIHtcblx0XHRyZXR1cm4gYWxlcnQoe1xuXHRcdFx0dGl0bGU6IFwiQWxlcnRcIixcblx0XHRcdG9rQnV0dG9uVGV4dDogXCJPS1wiLFxuXHRcdFx0bWVzc2FnZTogbWVzc2FnZVxuXHRcdH0pO1xuICAgIH1cbn1cbiJdfQ==