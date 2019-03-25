"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var rxjs_1 = require("rxjs");
var operators_1 = require("rxjs/internal/operators");
var http_1 = require("@angular/common/http");
var operators_2 = require("rxjs/operators");
var constants_config_1 = require("./constants.config");
var rxjs_2 = require("rxjs");
var SpoonityService = /** @class */ (function () {
    function SpoonityService(_http) {
        this._http = _http;
        this._baseUrlUser = '';
        this._baseUrlEgift = '';
        this._baseUrlVendor = '';
        this._errorCodes = [];
        this._httpSettings = {
            responseType: 'text'
        };
        this._session_key = '';
        this._data = {};
        this._baseUrlUser = constants_config_1.Constants.ENDPOINT + '/user/';
        this._baseUrlEgift = constants_config_1.Constants.ENDPOINT + '/egift/';
        this._baseUrlVendor = constants_config_1.Constants.ENDPOINT + '/vendor/';
        this._errorCodes = constants_config_1.Constants.ERRORCODES;
    }
    /**
     * POST user register
     *
     * This method is used to register a new user, usually we run the authenticate method after depending on the vendor's validation options
     */
    SpoonityService.prototype.userRegister = function (user) {
        var _this = this;
        return this._http.post(this._baseUrlUser + 'register', user)
            .pipe(operators_2.map(function (content) {
            _this._data = {
                id: content["id,"],
                first_name: content["first_name,"],
                last_name: content["last_name,"],
                email_address: content["email_address,"],
                birthdate: content["birthdate,"],
                date_created: content["date_created,"],
                date_updated: content["date_updated,"],
                status: {
                    id: content["status.id"]
                }
            };
            return _this._data;
        }));
    };
    /**
     * POST user authenthicate
     *
     * This method is used to check whether or not the credentials provided are valid for user login
     **/
    SpoonityService.prototype.userAuthenticate = function (user) {
        var _this = this;
        return this._http.post(this._baseUrlUser + 'authenticate', user)
            .pipe(operators_2.map(function (content) {
            _this._data = {
                first_login: content["first_login"],
                online_order_token: content["online_order_token"],
                session_key: content["session_identifier"],
                vendor_id: content["user_vendor"]["vendor"]["id"],
                user_id: content["user_vendor"]["user"]["id"]
            };
            return _this._data;
        }));
    };
    /**
     * GET user exists
     *
     * This method is used to check whether or not the email provided is available to be registered or not
     **/
    SpoonityService.prototype.userExists = function (user) {
        var _this = this;
        return this._http.get(this._baseUrlUser + 'email/exists?email=' + user.email_address)
            .pipe(operators_2.map(function (content) {
            _this._data = {
                exists: content["exists"],
                vendor: {
                    id: content["vendor"] ? content["vendor"]["id"] : null,
                    name: content["vendor"] ? content["vendor"]["name"] : null
                }
            };
            return _this._data;
        }));
    };
    /**
     * GET cedula exists
     *
     * This method is used to check whether or not the cedula provided is available to be registered or not (vendors can allow multiple to be registered to various accounts)
     **/
    SpoonityService.prototype.cedulaExists = function (user) {
        var _this = this;
        return this._http.get(this._baseUrlUser + 'cedula/exists?cedula=' + user.cedula)
            .pipe(operators_2.map(function (content) {
            _this._data = {
                exists: content["exists"],
                valid: content["valid"],
                vendor: {
                    id: content["vendor"] ? content["vendor"]["id"] : null,
                    name: content["vendor"] ? content["vendor"]["name"] : null
                }
            };
            return _this._data;
        }));
    };
    /**
     * GET mobile exists
     *
     * This method is used to check whether or not the phone number provided is available to be registered or not (vendors can allow multiple to be registered to various accounts)
     **/
    SpoonityService.prototype.mobileExists = function (user) {
        var _this = this;
        return this._http.get(this._baseUrlUser + 'mobile/exists?mobile=' + user.mobile + '&vendor=' + user.vendor + '&country=' + user.country)
            .pipe(operators_2.map(function (content) {
            _this._data = {
                available: content["available"]
            };
            return _this._data;
        }));
    };
    /**
     * GET user validated
     *
     * This method is used to validate a user's session. If it expires then the user is signed out and must sign in again.
     **/
    SpoonityService.prototype.userValidate = function (session) {
        var _this = this;
        return this._http.get(this._baseUrlUser + 'isValidated?session=' + session.session_key)
            .pipe(operators_2.map(function (content) {
            _this._data = {
                is_validated: content["isValidated"],
                phone_number: content["phone_number"],
                methods: content["methods"],
                status: {
                    no_verification: content["status"]["No Verification"],
                    email: content["status"]["Email"],
                    sms: content["status"]["Sms"]
                }
            };
            return _this._data;
        }));
    };
    /**
     * GET user activate
     *
     * This method is used to activate an account
     **/
    SpoonityService.prototype.userActivate = function (user) {
        return this._http.get(this._baseUrlUser + 'activate?session_identifier=' + user.session_key + '&token=' + user.token)
            .pipe(operators_2.map(function (content) {
            console.log("Activation: ", content);
            return content;
        }));
    };
    /**
     * GET user activate email
     *
     * This method sends an email to the user's account to activate
     **/
    SpoonityService.prototype.userActivateEmail = function (session) {
        return this._http.get(this._baseUrlUser + 'activate/email?session_identifier=' + session.session_key)
            .pipe(operators_2.map(function (content) {
            console.log("Email activation: ", content);
            return content;
        }));
    };
    /**
     * GET user activate SMS
     *
     * This method sends an SMS code to the user's phone to type down in the website activate
     **/
    SpoonityService.prototype.userActivateSms = function (user) {
        return this._http.get(this._baseUrlUser + 'activate/sms?session_identifier=' + user.session_key + '&phone=' + user.mobile + '&country=' + user.country)
            .pipe(operators_2.map(function (content) {
            console.log("SMS activation: ", content);
            return content;
        }));
    };
    /**
     * PUT user profile
     *
     * This method is used to update the user's data and saved settings
     **/
    SpoonityService.prototype.userUpdateProfile = function (user) {
        return this._http.put(this._baseUrlUser + 'profile?session_key=' + user.session_key, user)
            .pipe(operators_2.map(function (content) {
            console.log("Update: ", content);
            return content;
        }));
    };
    /**
     * GET user profile
     *
     * This method is used to grab the user's data and saved settings
     **/
    SpoonityService.prototype.userGetProfile = function (session) {
        var _this = this;
        return this._http.get(this._baseUrlUser + 'profile?session_key=' + session.session_key)
            .pipe(operators_2.map(function (content) {
            // Clarify consent data
            var consentSms = false, consentEmail = false;
            switch (content["contact_consent"]) {
                case 0:
                default:
                    break;
                case 1:
                    consentEmail = true;
                    break;
                case 2:
                    consentSms = true;
                    break;
                case 3:
                    consentSms = true;
                    consentEmail = true;
                    break;
            }
            // Clean out metadata
            var metadataObj = {};
            for (var i in content["metadata"]) {
                content["metadata"][i]["field"] = content["metadata"][i]["field"].toLowerCase().replace(/\s/g, '_');
                metadataObj[content["metadata"][i]["field"]] = content["metadata"][i]["value"];
            }
            _this._data = {
                auto_reload: {
                    billing_profile: content["billing_profile"],
                    reload_amount: content["reload_amount"],
                    reload_threshold: content["reload_threshold"]
                },
                contact_consent: {
                    sms: consentSms,
                    email: consentEmail
                },
                created: content["created"],
                updated: content["updated"],
                id: content["user"]["id"],
                email_address: content["user"]["email_address"],
                first_name: content["user"]["first_name"],
                last_name: content["user"]["last_name"],
                birthdate: content["user"]["birthdate"],
                is_verified: {
                    status: content["is_verified"]["status"],
                    methods: {
                        email: content["is_verified"]["methods"]["Email"],
                        sms: content["is_verified"]["methods"]["SMS"]
                    }
                },
                language: content["language"],
                metadata: metadataObj,
                online_order_token: content["online_order_token"],
                push_endpoints: {
                    gcm: content["push_endpoints"]["gcm"],
                    apns: content["push_endpoints"]["apns"]
                },
                referral_url: content["referral_url"],
                status: {
                    status_id: content["status"]["status_id"],
                    name: content["status"]["name"]
                }
            };
            return _this._data;
        }));
    };
    /**
     * GET user reward list
     *
     * This method is used to get the user's list of available rewards
     **/
    SpoonityService.prototype.userGetRewards = function (session) {
        var _this = this;
        return this._http.get(this._baseUrlUser + 'reward/list?session_key=' + session.session_key)
            .pipe(operators_2.map(function (content) {
            // Check if we have a URL for next page
            var more_pages_boolean = false;
            if (content["next_page_url"] != null) {
                more_pages_boolean = true;
            }
            // Clean out reward data
            var expiryArray = [];
            var rewardArray = [];
            // Clean out the rest of the data
            for (var i in content["data"]) {
                var tempRewardObj = {
                    catalog: {
                        id: content["data"][i]["catalog.id"],
                        name: content["data"][i]["catalog"]["name"]
                    },
                    type: {
                        id: content["data"][i]["type"]["id"],
                        name: content["data"][i]["type"]["name"]
                    },
                    currency: {
                        id: content["data"][i]["currency"]["id"],
                        name: content["data"][i]["currency"]["name"]
                    },
                    id: content["data"][i]["id"],
                    name: content["data"][i]["name"],
                    description: content["data"][i]["description"],
                    summary: content["data"][i]["summary"],
                    cost: content["data"][i]["cost"],
                    available: content["data"][i]["available"],
                    progress: content["data"][i]["progress"],
                    expiring: content["data"][i]["expiring"]["data"]
                };
                rewardArray.push(tempRewardObj);
            }
            // Simplify the returned data
            _this._data = {
                balances: content["balances"],
                data: rewardArray,
                more_pages: more_pages_boolean
            };
            return _this._data;
        }));
    };
    /**
     * GET user quick pay balance
     *
     * This method is used to get the user's quick pay balance
     **/
    SpoonityService.prototype.userGetQuickPayBalance = function (session) {
        var _this = this;
        return this._http.get(this._baseUrlUser + 'quick-pay/balance?session_key=' + session.session_key)
            .pipe(operators_2.map(function (content) {
            // Simplify the returned data
            _this._data = {
                amount: content["amount"],
                currency: {
                    code: content["currency"]["code"],
                    id: content["currency"]["id"],
                    name: content["currency"]["name"],
                    object: content["currency"]["object"]
                }
            };
            return _this._data;
        }));
    };
    /**
     * GET user transaction list
     *
     * This method is used to get the user's transaction list
     **/
    SpoonityService.prototype.userGetTransactions = function (session) {
        var _this = this;
        return this._http.get(this._baseUrlUser + 'transaction/list?session_key=' + session.session_key)
            .pipe(operators_2.map(function (content) {
            // Clean out transaction data
            var loyaltyArray = [];
            var itemsArray = [];
            var transactionArray = [];
            for (var i in content["data"]) {
                // Organize the loyalty data
                for (var k in content["data"][i]["rewards"]) {
                    var tempLoyaltyObj = {
                        currency: {
                            id: content["data"][i]["rewards"][k]["id"],
                            name: content["data"][i]["rewards"][k]["name"]
                        },
                        redeemed: content["data"][i]["rewards"][k]["spent"],
                        earned: content["data"][i]["rewards"][k]["earned"],
                        expired: content["data"][i]["rewards"][k]["expired"]
                    };
                    loyaltyArray.push(tempLoyaltyObj);
                }
                // Organize items data
                for (var l in content["data"][i]["items"]) {
                    var tempItemsObj = {
                        type: content["data"][i]["items"][l]["type"],
                        name: content["data"][i]["items"][l]["name"],
                        quantity: content["data"][i]["items"][l]["quantity"],
                        price: content["data"][i]["items"][l]["price"],
                        id: content["data"][i]["items"][l]["id"]
                    };
                    itemsArray.push(tempItemsObj);
                }
                var tempRewardObj = {
                    rating: {
                        comment: content["data"][i]["rating"]["comment"],
                        value: content["data"][i]["rating"]["value"],
                        window: content["data"][i]["rating"]["window"]
                    },
                    tip: {
                        amount: content["data"][i]["tip"]["amount"],
                        window: content["data"][i]["tip"]["window"]
                    },
                    id: content["data"][i]["id"],
                    date: content["data"][i]["date"],
                    items: itemsArray,
                    receipt_date: content["data"][i]["receipts"][0] ? content["data"][i]["receipts"][0]["date"] : null,
                    subtotal: content["data"][i]["receipts"][0] ? content["data"][i]["receipts"][0]["subtotal"] : null,
                    receipt_number: content["data"][i]["receipts"][0] ? content["data"][i]["receipts"][0]["number"] : null,
                    cashier: content["data"][i]["receipts"][0] ? content["data"][i]["receipts"][0]["cashier"] : null,
                    total: content["data"][i]["receipts"],
                    address: content["data"][i]["address"],
                    name: content["data"][i]["name"],
                    quickpay: {
                        used: content["data"][i]["quickpay"]["used"],
                        loaded: content["data"][i]["quickpay"]["loaded"],
                        balance: content["data"][i]["quickpay"]["balance"]
                    },
                    loyalty: loyaltyArray,
                    status: content["data"][i]["status"]
                };
                loyaltyArray = [];
                itemsArray = [];
                transactionArray.push(tempRewardObj);
            }
            // Simplify the returned data
            _this._data = transactionArray;
            return _this._data;
        }));
    };
    /**
     * POST user card add
     *
     * This method is used to add the user's card
     **/
    SpoonityService.prototype.userAddCard = function (card) {
        var _this = this;
        return this._http.post(this._baseUrlUser + 'card/add?session_key=' + card.session_key, card)
            .pipe(operators_2.map(function (content) {
            // Simplify the returned data
            _this._data = {
                id: content["id"],
                number: content["card"]["number"],
                created: content["created"],
                updated: content["updated"]
            };
            return _this._data;
        }));
    };
    /**
     * GET user card list
     *
     * This method is used to get the user's card list
     **/
    SpoonityService.prototype.userGetCards = function (session) {
        var spoonityCards = this._http.get(this._baseUrlUser + 'card/list?session_key=' + session.session_key)
            .pipe(operators_2.map(function (content) {
            // Simplify the returned data
            var cardArray = [];
            var cardObj = {};
            for (var i in content["data"]) {
                var objToReturn = {
                    card: {
                        number: content["data"][i]["card"]["number"],
                        pin: content["data"][i]["card"]["pin"]
                    },
                    created: content["data"][i]["created"],
                    updated: content["data"][i]["updated"],
                    id: content["data"][i]["id"],
                    status: {
                        id: content["data"][i]["status"]["id"],
                        name: content["data"][i]["status"]["name"]
                    }
                };
                cardArray.push(objToReturn);
            }
            ;
            cardObj["spoonity"] = cardArray;
            return cardObj;
        }));
        var thirdPartyCards = this._http.get(this._baseUrlUser + 'card-3rdparty/list?session_key=' + session.session_key)
            .pipe(operators_2.map(function (content) {
            // Simplify the returned data
            var cardArray = [];
            var cardObj = {};
            for (var i in content["data"]) {
                var objToReturn = {
                    card: {
                        number: content["data"][i]["card"]["number"],
                        pin: content["data"][i]["card"]["pin"]
                    },
                    created: content["data"][i]["created"],
                    updated: content["data"][i]["updated"],
                    id: content["data"][i]["id"],
                    status: {
                        id: content["data"][i]["status"]["id"],
                        name: content["data"][i]["status"]["name"]
                    }
                };
                cardArray.push(objToReturn);
            }
            ;
            cardObj["thirdParty"] = cardArray;
            return cardObj;
        }));
        return rxjs_1.forkJoin(spoonityCards, thirdPartyCards);
    };
    /**
     * DELETE user card
     *
     * This method is used to delete the user's card
     **/
    SpoonityService.prototype.userDeleteCard = function (card) {
        var _this = this;
        return this._http.request('delete', this._baseUrlUser + 'card?session_key=' + card.session_key, { body: { user_card: card.id } })
            .pipe(operators_2.map(function (content) {
            throw ("error");
            console.log("Delete Spoonity card success: ", content);
            return content;
        }))
            .pipe(operators_1.catchError(function (error) {
            return _this._http.request('delete', _this._baseUrlUser + 'card-3rdparty?session_key=' + card.session_key, { body: { user_card3rdparty: card.id } })
                .pipe(operators_2.map(function (content) {
                console.log("Delete third party card success: ", content);
                return content;
            }))
                .pipe(operators_1.catchError(function (error) {
                if (error["status"] == 200) {
                    console.log("Delete third party card success: ", error);
                    return error;
                }
                else {
                    console.log("Delete third party card fail: ", error.error.error.errors[0].message);
                    return error;
                }
            }));
        }));
    };
    /**
     * PUT user card found
     *
     * This method is used to mark the user's card as found
     **/
    SpoonityService.prototype.userFoundCard = function (card) {
        var _this = this;
        return this._http.put(this._baseUrlUser + 'card/found?session_key=' + card.session_key, card)
            .pipe(operators_2.map(function (content) {
            console.log("Found Spoonity card: ", content);
            return content;
        }, function (error) {
            return _this._http.put(_this._baseUrlUser + 'card-3rdparty/found?session_key=' + card.session_key, card)
                .pipe(operators_2.map(function (content) {
                return content;
            }));
        }));
    };
    /**
     * PUT user card lost
     *
     * This method is used to mark the user's card as lost
     **/
    SpoonityService.prototype.userLostCard = function (card) {
        var _this = this;
        return this._http.put(this._baseUrlUser + 'card/found?session_key=' + card.session_key, card)
            .pipe(operators_2.map(function (content) {
            return content;
        }, function (error) {
            return _this._http.put(_this._baseUrlUser + 'card-3rdparty/found?session_key=' + card.session_key, card)
                .pipe(operators_2.map(function (content) {
                return content;
            }));
        }));
    };
    /**
     * POST user credit card add
     *
     * This method is used to add the user's credit card
     **/
    SpoonityService.prototype.userAddCreditCard = function (creditCard) {
        var _this = this;
        return this._http.post(this._baseUrlUser + 'billing-profile/add?session_key=' + creditCard.session_key, creditCard)
            .pipe(operators_2.map(function (content) {
            // Simplify the returned data
            _this._data = {
                card: content["card"],
                created: content["created"],
                expiry: content["expiry"],
                id: content["id"],
                name: content["name"],
                type: content["type"]
            };
            return _this._data;
        }));
    };
    /**
     * GET user credit card list
     *
     * This method is used to get the user's credit card list
     **/
    SpoonityService.prototype.userGetCreditCards = function (creditCard) {
        var _this = this;
        var urlString = "";
        if (creditCard) {
            if (creditCard.hasOwnProperty("page")) {
                urlString += "&page=" + creditCard.page;
            }
            if (creditCard.hasOwnProperty("limit")) {
                urlString += "&limit=" + creditCard.limit;
            }
        }
        else {
            urlString = "&page=0&limit=10";
        }
        return this._http.get(this._baseUrlUser + 'billing-profile/list?session_key=' + creditCard.session_key + urlString)
            .pipe(operators_2.map(function (content) {
            // Simplify the returned data
            var cardArray = [];
            for (var i in content["data"]) {
                var objToReturn = {
                    card: content["data"][i]["card"],
                    created: content["data"][i]["created"],
                    expiry: content["data"][i]["expiry"],
                    id: content["data"][i]["id"],
                    name: content["data"][i]["name"],
                    type: content["data"][i]["type"]
                };
                cardArray.push(objToReturn);
            }
            _this._data = cardArray;
            return _this._data;
        }));
    };
    /**
     * DELETE user credit card
     *
     * This method is used to delete the user's credit card
     **/
    SpoonityService.prototype.userDeleteCreditCard = function (creditCard) {
        return this._http.request('delete', this._baseUrlUser + 'billing-profile?session_key=' + creditCard.session_key, { body: { user_billingprofile: creditCard.id } })
            .pipe(operators_2.map(function (content) {
            console.log("Credit card delete: ", content);
            return content;
        }))
            .pipe(operators_1.catchError(function (error) {
            if (error["status"] == 200) {
                console.log("Delete credit card success: ", error);
            }
            else {
                console.log("Delete credit card fail: ", error.error.error.errors[0].message);
            }
            return rxjs_2.throwError(error);
        }));
    };
    /**
     * POST user credit card reload
     *
     * This method is used to reload the user's credit card
     **/
    SpoonityService.prototype.userReloadCreditCard = function (reload) {
        var _this = this;
        return this._http.post(this._baseUrlUser + 'billing-profile/reload?session_key=' + reload.session_key, reload)
            .pipe(operators_2.map(function (content) {
            if (content["transaction_status"]["name"] == "Complete") {
                _this._data["success"] = true;
            }
            else {
                _this._data["success"] = false;
            }
            return _this._data;
        }))
            .pipe(operators_1.catchError(function (error) {
            if (error["status"] == 200) {
                console.log("Reload success: ", error);
            }
            else {
                console.log("Reload fail: ", error.error.error.errors[0].message);
            }
            return rxjs_2.throwError(error);
        }));
        ;
    };
    /**
     * POST egift purchase
     *
     * This method is used to purchase an egift
     **/
    SpoonityService.prototype.egiftPurchase = function (egift) {
        var _this = this;
        if (egift.billing.name != null) {
            egift.billing.id = null;
        }
        return this._http.post(this._baseUrlEgift + 'purchase?session_key=' + egift.session_key, egift)
            .pipe(operators_2.map(function (content) {
            if (content["transaction_status"]["name"] == "Complete") {
                _this._data["success"] = true;
            }
            else {
                _this._data["success"] = false;
            }
            return _this._data;
        }))
            .pipe(operators_1.catchError(function (error) {
            if (error["status"] == 200) {
                console.log("Egift success: ", error);
            }
            else {
                console.log("Egift fail: ", error.error.error.errors[0].message);
            }
            return rxjs_2.throwError(error);
        }));
        ;
    };
    /**
     * GET user get messages
     *
     * This method is used to get all of the user's messages
     **/
    SpoonityService.prototype.userGetMessages = function (session) {
        return this._http.get(this._baseUrlUser + 'message/list?session_key=' + session.session_key)
            .pipe(operators_2.map(function (content) {
            // Simplify the returned data
            var messageArray = [];
            for (var i in content) {
                var objToReturn = {
                    user_message_id: content[i]["user_message_id"],
                    user_id: content[i]["user_id"],
                    message: content[i]["message"],
                    read: content[i]["read"]
                };
                messageArray.push(objToReturn);
            }
            return messageArray;
        }))
            .pipe(operators_1.catchError(function (error) {
            if (error["status"] == 200) {
                console.log("User messages success: ", error);
            }
            else {
                console.log("User messages fail: ", error.error.error.errors[0].message);
            }
            return rxjs_2.throwError(error);
        }));
        ;
    };
    /**
     * GET user get message
     *
     * This method is used to get a specific user message
     **/
    SpoonityService.prototype.userGetMessage = function (message) {
        var _this = this;
        return this._http.get(this._baseUrlUser + 'message?session_key=' + message.session_key + '&user_message=' + message.user_message)
            .pipe(operators_2.map(function (content) {
            // Simplify the returned data
            _this._data = {
                user_message_id: content["user_message_id"],
                user_id: content["user_id"],
                message: content["message"],
                read: content["read"]
            };
            return _this._data;
        }))
            .pipe(operators_1.catchError(function (error) {
            if (error["status"] == 200) {
                console.log("User message success: ", error);
            }
            else {
                console.log("User message fail: ", error.error.error.errors[0].message);
            }
            return rxjs_2.throwError(error);
        }));
        ;
    };
    /**
     * PUT user update message status
     *
     * This method is used to edit the user's particular message's status
     **/
    SpoonityService.prototype.userUpdateMessageStatus = function (message) {
        var _this = this;
        return this._http.put(this._baseUrlUser + 'message?session_key=' + message.session_key, message)
            .pipe(operators_2.map(function (content) {
            // Simplify the returned data
            _this._data = {
                user_message_id: content["user_message_id"],
                user_id: content["user_id"],
                message: content["message"],
                read: content["read"]
            };
            return _this._data;
        }))
            .pipe(operators_1.catchError(function (error) {
            if (error["status"] == 200) {
                console.log("User update message status success: ", error);
            }
            else {
                console.log("User update message status fail: ", error.error.error.errors[0].message);
            }
            return rxjs_2.throwError(error);
        }));
        ;
    };
    /**
     * GET passbook
     *
     * This method is used to get the passbook pkpass file from the API
     **/
    SpoonityService.prototype.passbookGet = function (passbook) {
        return this._http.get(this._baseUrlVendor + passbook.vendor_id + '/passbook/' + passbook.type + '/export/' + passbook.user_id + '?session_key=' + passbook.session_key)
            .pipe(operators_2.map(function (content) {
            // Simplify the returned data
            return content["data"];
        }))
            .pipe(operators_1.catchError(function (error) {
            if (error["status"] == 200) {
                console.log("Passbook download success: ", error);
            }
            else {
                console.log("Passbook download fail: ", error.error.error.errors[0].message);
            }
            return rxjs_2.throwError(error);
        }));
        ;
    };
    /**
     * POST user reset password email
     *
     * This method is used to get the API to send an email to the user for a password reset (which includes the token)
     **/
    SpoonityService.prototype.userPasswordResetEmail = function (user) {
        return this._http.post(this._baseUrlUser + 'password-reset/reset', user)
            .pipe(operators_2.map(function (content) {
            // Simplify the returned data
            return "Password reset email successfully sent.";
        }))
            .pipe(operators_1.catchError(function (error) {
            if (error["status"] == 200) {
                console.log("User password reset email sent success: ", error);
            }
            else {
                console.log("User password reset email sent fail: ", error.error.error.errors[0].message);
            }
            return rxjs_2.throwError(error);
        }));
        ;
    };
    /**
     * POST user reset password
     *
     * This method is used to set the user's new password with an authentication token
     **/
    SpoonityService.prototype.userPasswordResetApply = function (user) {
        return this._http.post(this._baseUrlUser + 'password-reset/apply', user)
            .pipe(operators_2.map(function (content) {
            // Simplify the returned data
            return "Password successfully reset.";
        }))
            .pipe(operators_1.catchError(function (error) {
            if (error["status"] == 200) {
                console.log("User password reset success: ", error);
            }
            else {
                console.log("User password reset fail: ", error.error.error.errors[0].message);
            }
            return rxjs_2.throwError(error);
        }));
        ;
    };
    /**
     * POST user get token
     *
     * This method is used to get a user token depending on the type specified
     **/
    SpoonityService.prototype.userGetToken = function (token) {
        return this._http.post(this._baseUrlUser + 'token/request?session_key=' + token.session_key, token)
            .pipe(operators_2.map(function (content) {
            // Simplify the returned data
            var objToReturn = {
                barcode: content["barcode"],
                created: content["created"],
                expiry: content["expiry"],
                token: content["token"],
                updated: content["updated"]
            };
            return objToReturn;
        }))
            .pipe(operators_1.catchError(function (error) {
            if (error["status"] == 200) {
                console.log("User get token success: ", error);
            }
            else {
                console.log("User get token fail: ", error.error.error.errors[0].message);
            }
            return rxjs_2.throwError(error);
        }));
        ;
    };
    /**
     * POST user send tip
     *
     * This method is used to send a tip based on transaction ID
     **/
    SpoonityService.prototype.userSendTip = function (transaction) {
        return this._http.post(this._baseUrlUser + 'transaction/tip?session_key=' + transaction.session_key, transaction)
            .pipe(operators_2.map(function (content) {
            // Simplify the returned data
            return "Tip successfully sent.";
        }))
            .pipe(operators_1.catchError(function (error) {
            if (error["status"] == 200) {
                console.log("User send tip success: ", error);
            }
            else {
                console.log("User send tip fail: ", error.error.error.errors[0].message);
            }
            return rxjs_2.throwError(error);
        }));
        ;
    };
    /**
     * POST user send rating
     *
     * This method is used to send a rating based on transaction ID
     **/
    SpoonityService.prototype.userSendRating = function (transaction) {
        return this._http.post(this._baseUrlUser + 'transaction/rate?session_key=' + transaction.session_key, transaction)
            .pipe(operators_2.map(function (content) {
            // Simplify the returned data
            return "Rating successfully sent.";
        }))
            .pipe(operators_1.catchError(function (error) {
            if (error["status"] == 200) {
                console.log("User send rating success: ", error);
            }
            else {
                console.log("User send rating fail: ", error.error.error.errors[0].message);
            }
            return rxjs_2.throwError(error);
        }));
        ;
    };
    /**
     * GET vendor store list
     *
     * This method is used to get a list of all the vendor's stores
     **/
    SpoonityService.prototype.vendorGetStoreList = function (vendor) {
        return this._http.get(this._baseUrlVendor + 'store/list?vendor=' + vendor.vendor_id)
            .pipe(operators_2.map(function (content) {
            // Simplify the returned data
            var storeArray = [];
            for (var i = 0; i < content["data"].length; i++) {
                storeArray[i] = {
                    address_line_1: content["data"][i]["address_line_1"],
                    city: content["data"][i]["city"],
                    country: {
                        country_id: content["data"][i]["country"]["country_id"],
                        code: content["data"][i]["country"]["code"],
                        name: content["data"][i]["country"]["name"]
                    },
                    distance: content["data"][i]["distance"],
                    email_address: content["data"][i]["email_address"],
                    hours_of_operation: content["data"][i]["hours_of_operation"],
                    is_open: content["data"][i]["is_open"],
                    latitude: content["data"][i]["latitude"],
                    longitude: content["data"][i]["longitude"],
                    name: content["data"][i]["name"],
                    parent: content["data"][i]["parent"],
                    phone_number: content["data"][i]["phone_number"],
                    postal_code: content["data"][i]["postal_code"],
                    region: content["data"][i]["region"],
                    timezone: content["data"][i]["timezone"],
                    vendor_attribute: content["data"][i]["vendor_attribute"],
                    favourite: content["data"][i]["favourite"],
                    id: content["data"][i]["id"]
                };
            }
            var objToReturn = {
                count: content["count"],
                data: storeArray
            };
            return objToReturn;
        }))
            .pipe(operators_1.catchError(function (error) {
            if (error["status"] == 200) {
                console.log("Vendor get store list success: ", error);
            }
            else {
                console.log("Vendor get store list fail: ", error.error.error.errors[0].message);
            }
            return rxjs_2.throwError(error);
        }));
        ;
    };
    /**
     * GET user favorite store list
     *
     * This method is used to get a list of all the user's favorite stores for a particular vendor
     **/
    SpoonityService.prototype.userGetFavoriteStoreList = function (session_data) {
        return this._http.get(this._baseUrlUser + 'vendor/favorite-location/list?session_key=' + session_data.session_key)
            .pipe(operators_2.map(function (content) {
            // Simplify the returned data
            var objToReturn = content;
            return objToReturn;
        }))
            .pipe(operators_1.catchError(function (error) {
            if (error["status"] == 200) {
                console.log("User get favorite store list success: ", error);
            }
            else {
                console.log("User get favorite store list fail: ", error.error.error.errors[0].message);
            }
            return rxjs_2.throwError(error);
        }));
        ;
    };
    /**
     * POST vendor store checkin
     *
     * This method is used to check-in a store
     **/
    SpoonityService.prototype.vendorCheckinStore = function (vendor) {
        return this._http.post(this._baseUrlVendor + 'store/check-in?session_key=' + vendor.session_key, vendor)
            .pipe(operators_2.map(function (content) {
            // Simplify the returned data
            return "Successfully checked in.";
        }))
            .pipe(operators_1.catchError(function (error) {
            if (error["status"] == 200) {
                console.log("Vendor check-in success: ", error);
            }
            else {
                console.log("Vendor check-in fail: ", error.error.error.errors[0].message);
            }
            return rxjs_2.throwError(error);
        }));
        ;
    };
    /**
     * DELETE vendor delete user email
     *
     * This method is used to send an email to a customer (user) account for deletion
     **/
    SpoonityService.prototype.vendorDeleteUserEmail = function (user) {
        var customerId = 0;
        if (user) {
            if (user.hasOwnProperty("id")) {
                customerId = user.id;
            }
        }
        else {
            return null;
        }
        return this._http.request('delete', this._baseUrlVendor + user.vendor_id + '/customers/' + user.id + '/submit?session_key=' + user.session_key, { body: { id: customerId } })
            .pipe(operators_2.map(function (content) {
            // Simplify the returned data
            return { response: "Delete account email successfully sent." };
        }))
            .pipe(operators_1.catchError(function (error) {
            if (error["status"] == 200) {
                console.log("Vendor send delete user email success: ", error);
            }
            else {
                console.log("Vendor send delete user email fail: ", error.error.error.errors[0].message);
            }
            return rxjs_2.throwError(error);
        }));
        ;
    };
    /**
     * DELETE vendor delete user email
     *
     * This method is used to send an email to a customer (user) account for deletion
     **/
    SpoonityService.prototype.vendorDeleteUserApply = function (user) {
        var customerId = 0;
        if (user) {
            if (user.hasOwnProperty("id")) {
                customerId = user.id;
            }
        }
        else {
            return null;
        }
        return this._http.request('delete', this._baseUrlVendor + user.vendor_id + '/customers/' + user.id, { body: { code: user.code, id: customerId } })
            .pipe(operators_2.map(function (content) {
            // Simplify the returned data
            return "Delete account email successfully deleted.";
        }))
            .pipe(operators_1.catchError(function (error) {
            if (error["status"] == 200) {
                console.log("Vendor delete user success: ", error);
            }
            else {
                console.log("Vendor delete user fail: ", error.error.error.errors[0].message);
            }
            return rxjs_2.throwError(error);
        }));
        ;
    };
    SpoonityService = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [http_1.HttpClient])
    ], SpoonityService);
    return SpoonityService;
}());
exports.SpoonityService = SpoonityService;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3Bvb25pdHkuc2RrLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsic3Bvb25pdHkuc2RrLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsc0NBQTJDO0FBRTNDLDZCQUFnQztBQUNoQyxxREFBcUQ7QUFhckQsNkNBQWtEO0FBQ2xELDRDQUFxQztBQUNyQyx1REFBK0M7QUFDL0MsNkJBQWtDO0FBR2xDO0lBV0kseUJBQ1ksS0FBaUI7UUFBakIsVUFBSyxHQUFMLEtBQUssQ0FBWTtRQVg3QixpQkFBWSxHQUFHLEVBQUUsQ0FBQztRQUNsQixrQkFBYSxHQUFHLEVBQUUsQ0FBQztRQUNuQixtQkFBYyxHQUFHLEVBQUUsQ0FBQztRQUNwQixnQkFBVyxHQUFHLEVBQUUsQ0FBQztRQUNqQixrQkFBYSxHQUFHO1lBQ1osWUFBWSxFQUFFLE1BQU07U0FDdkIsQ0FBQztRQUNGLGlCQUFZLEdBQUcsRUFBRSxDQUFDO1FBQ2xCLFVBQUssR0FBRyxFQUFFLENBQUM7UUFLUCxJQUFJLENBQUMsWUFBWSxHQUFHLDRCQUFTLENBQUMsUUFBUSxHQUFHLFFBQVEsQ0FBQztRQUNsRCxJQUFJLENBQUMsYUFBYSxHQUFHLDRCQUFTLENBQUMsUUFBUSxHQUFHLFNBQVMsQ0FBQztRQUNwRCxJQUFJLENBQUMsY0FBYyxHQUFHLDRCQUFTLENBQUMsUUFBUSxHQUFHLFVBQVUsQ0FBQztRQUN0RCxJQUFJLENBQUMsV0FBVyxHQUFHLDRCQUFTLENBQUMsVUFBVSxDQUFDO0lBQzVDLENBQUM7SUFFRDs7OztPQUlHO0lBQ0gsc0NBQVksR0FBWixVQUFhLElBQVU7UUFBdkIsaUJBaUJDO1FBaEJHLE9BQU8sSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFlBQVksR0FBRyxVQUFVLEVBQUUsSUFBSSxDQUFDO2FBQ3ZELElBQUksQ0FBQyxlQUFHLENBQUMsVUFBQSxPQUFPO1lBQ2IsS0FBSSxDQUFDLEtBQUssR0FBRztnQkFDVCxFQUFFLEVBQUUsT0FBTyxD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QUs7WUFDbkIsSUFBSSxLQUFLLENBQUMsUUFBUSxDQUFDLElBQUksR0FBRyxFQUFFO2dCQUN4QixPQUFPLENBQUMsR0FBRyxDQUFDLDhCQUE4QixFQUFFLEtBQUssQ0FBQyxDQUFDO2FBQ3REO2lCQUFNO2dCQUNILE9BQU8sQ0FBQyxHQUFHLENBQUMsMkJBQTJCLEVBQUUsS0FBSyxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDO2FBQ2pGO1lBQ0QsT0FBTyxpQkFBVSxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQzdCLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFBQSxDQUFDO0lBQ2IsQ0FBQztJQXRrQ1EsZUFBZTtRQUQzQixpQkFBVSxFQUFFO3lDQWFVLGlCQUFVO09BWnBCLGVBQWUsQ0F1a0MzQjtJQUFELHNCQUFDO0NBQUEsQUF2a0NELElBdWtDQztBQXZrQ1ksMENBQWUiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcbmltcG9ydCB7IE9ic2VydmFibGUgfSBmcm9tIFwicnhqc1wiO1xuaW1wb3J0IHsgZm9ya0pvaW4gfSBmcm9tIFwicnhqc1wiO1xuaW1wb3J0IHsgY2F0Y2hFcnJvciB9IGZyb20gXCJyeGpzL2ludGVybmFsL29wZXJhdG9yc1wiO1xuaW1wb3J0IHsgVXNlciB9IGZyb20gXCIuL3VzZXIubW9kZWxcIjtcbmltcG9ydCB7IFRva2VuIH0gZnJvbSBcIi4vdG9rZW4ubW9kZWxcIjtcbmltcG9ydCB7IENhcmQgfSBmcm9tIFwiLi9jYXJkLm1vZGVsXCI7XG5pbXBvcnQgeyBDcmVkaXRDYXJkIH0gZnJvbSBcIi4vY3JlZGl0Y2FyZC5tb2RlbFwiO1xuaW1wb3J0IHsgRWdpZnQgfSBmcm9tIFwiLi9lZ2lmdC5tb2RlbFwiO1xuaW1wb3J0IHsgUmVsb2FkIH0gZnJvbSBcIi4vcmVsb2FkLm1vZGVsXCI7XG5pbXBvcnQgeyBNZXNzYWdlIH0gZnJvbSBcIi4vbWVzc2FnZS5tb2RlbFwiO1xuaW1wb3J0IHsgUGFzc2Jvb2sgfSBmcm9tIFwiLi9wYXNzYm9vay5tb2RlbFwiO1xuaW1wb3J0IHsgVHJhbnNhY3Rpb25SYXRlIH0gZnJvbSBcIi4vdHJhbnNhY3Rpb25yYXRlLm1vZGVsXCI7XG5pbXBvcnQgeyBUcmFuc2FjdGlvblRpcCB9IGZyb20gXCIuL3RyYW5zYWN0aW9udGlwLm1vZGVsXCI7XG5pbXBvcnQgeyBWZW5kb3IgfSBmcm9tIFwiLi92ZW5kb3IubW9kZWxcIjtcbmltcG9ydCB7IFNlc3Npb24gfSBmcm9tIFwiLi9zZXNzaW9uLm1vZGVsXCI7XG5pbXBvcnQgeyBIdHRwQ2xpZW50IH0gZnJvbSBcIkBhbmd1bGFyL2NvbW1vbi9odHRwXCI7XG5pbXBvcnQgeyBtYXAgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5pbXBvcnQgeyBDb25zdGFudHMgfSBmcm9tICcuL2NvbnN0YW50cy5jb25maWcnO1xuaW1wb3J0IHsgdGhyb3dFcnJvciB9IGZyb20gJ3J4anMnO1xuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgU3Bvb25pdHlTZXJ2aWNlIHtcbiAgICBfYmFzZVVybFVzZXIgPSAnJztcbiAgICBfYmFzZVVybEVnaWZ0ID0gJyc7XG4gICAgX2Jhc2VVcmxWZW5kb3IgPSAnJztcbiAgICBfZXJyb3JDb2RlcyA9IFtdO1xuICAgIF9odHRwU2V0dGluZ3MgPSB7XG4gICAgICAgIHJlc3BvbnNlVHlwZTogJ3RleHQnXG4gICAgfTtcbiAgICBfc2Vzc2lvbl9rZXkgPSAnJztcbiAgICBfZGF0YSA9IHt9O1xuXG4gICAgY29uc3RydWN0b3IoXG4gICAgICAgIHByaXZhdGUgX2h0dHA6IEh0dHBDbGllbnRcbiAgICApIHtcbiAgICAgICAgdGhpcy5fYmFzZVVybFVzZXIgPSBDb25zdGFudHMuRU5EUE9JTlQgKyAnL3VzZXIvJztcbiAgICAgICAgdGhpcy5fYmFzZVVybEVnaWZ0ID0gQ29uc3RhbnRzLkVORFBPSU5UICsgJy9lZ2lmdC8nO1xuICAgICAgICB0aGlzLl9iYXNlVXJsVmVuZG9yID0gQ29uc3RhbnRzLkVORFBPSU5UICsgJy92ZW5kb3IvJztcbiAgICAgICAgdGhpcy5fZXJyb3JDb2RlcyA9IENvbnN0YW50cy5FUlJPUkNPREVTO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFBPU1QgdXNlciByZWdpc3RlclxuICAgICAqIFxuICAgICAqIFRoaXMgbWV0aG9kIGlzIHVzZWQgdG8gcmVnaXN0ZXIgYSBuZXcgdXNlciwgdXN1YWxseSB3ZSBydW4gdGhlIGF1dGhlbnRpY2F0ZSBtZXRob2QgYWZ0ZXIgZGVwZW5kaW5nIG9uIHRoZSB2ZW5kb3IncyB2YWxpZGF0aW9uIG9wdGlvbnNcbiAgICAgKi9cbiAgICB1c2VyUmVnaXN0ZXIodXNlcjogVXNlcikge1xuICAgICAgICByZXR1cm4gdGhpcy5faHR0cC5wb3N0KHRoaXMuX2Jhc2VVcmxVc2VyICsgJ3JlZ2lzdGVyJywgdXNlcilcbiAgICAgICAgICAgIC5waXBlKG1hcChjb250ZW50ID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLl9kYXRhID0ge1xuICAgICAgICAgICAgICAgICAgICBpZDogY29udGVudFtcImlkLFwiXSxcbiAgICAgICAgICAgICAgICAgICAgZmlyc3RfbmFtZTogY29udGVudFtcImZpcnN0X25hbWUsXCJdLFxuICAgICAgICAgICAgICAgICAgICBsYXN0X25hbWU6IGNvbnRlbnRbXCJsYXN0X25hbWUsXCJdLFxuICAgICAgICAgICAgICAgICAgICBlbWFpbF9hZGRyZXNzOiBjb250ZW50W1wiZW1haWxfYWRkcmVzcyxcIl0sXG4gICAgICAgICAgICAgICAgICAgIGJpcnRoZGF0ZTogY29udGVudFtcImJpcnRoZGF0ZSxcIl0sXG4gICAgICAgICAgICAgICAgICAgIGRhdGVfY3JlYXRlZDogY29udGVudFtcImRhdGVfY3JlYXRlZCxcIl0sXG4gICAgICAgICAgICAgICAgICAgIGRhdGVfdXBkYXRlZDogY29udGVudFtcImRhdGVfdXBkYXRlZCxcIl0sXG4gICAgICAgICAgICAgICAgICAgIHN0YXR1czoge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWQ6IGNvbnRlbnRbXCJzdGF0dXMuaWRcIl1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuX2RhdGE7XG4gICAgICAgICAgICB9KSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogUE9TVCB1c2VyIGF1dGhlbnRoaWNhdGVcbiAgICAgKiBcbiAgICAgKiBUaGlzIG1ldGhvZCBpcyB1c2VkIHRvIGNoZWNrIHdoZXRoZXIgb3Igbm90IHRoZSBjcmVkZW50aWFscyBwcm92aWRlZCBhcmUgdmFsaWQgZm9yIHVzZXIgbG9naW5cbiAgICAgKiovXG4gICAgdXNlckF1dGhlbnRpY2F0ZSh1c2VyOiBVc2VyKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9odHRwLnBvc3QodGhpcy5fYmFzZVVybFVzZXIgKyAnYXV0aGVudGljYXRlJywgdXNlcilcbiAgICAgICAgICAgIC5waXBlKG1hcChjb250ZW50ID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLl9kYXRhID0ge1xuICAgICAgICAgICAgICAgICAgICBmaXJzdF9sb2dpbjogY29udGVudFtcImZpcnN0X2xvZ2luXCJdLFxuICAgICAgICAgICAgICAgICAgICBvbmxpbmVfb3JkZXJfdG9rZW46IGNvbnRlbnRbXCJvbmxpbmVfb3JkZXJfdG9rZW5cIl0sXG4gICAgICAgICAgICAgICAgICAgIHNlc3Npb25fa2V5OiBjb250ZW50W1wic2Vzc2lvbl9pZGVudGlmaWVyXCJdLFxuICAgICAgICAgICAgICAgICAgICB2ZW5kb3JfaWQ6IGNvbnRlbnRbXCJ1c2VyX3ZlbmRvclwiXVtcInZlbmRvclwiXVtcImlkXCJdLFxuICAgICAgICAgICAgICAgICAgICB1c2VyX2lkOiBjb250ZW50W1widXNlcl92ZW5kb3JcIl1bXCJ1c2VyXCJdW1wiaWRcIl1cbiAgICAgICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuX2RhdGE7XG4gICAgICAgICAgICB9KSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogR0VUIHVzZXIgZXhpc3RzXG4gICAgICogXG4gICAgICogVGhpcyBtZXRob2QgaXMgdXNlZCB0byBjaGVjayB3aGV0aGVyIG9yIG5vdCB0aGUgZW1haWwgcHJvdmlkZWQgaXMgYXZhaWxhYmxlIHRvIGJlIHJlZ2lzdGVyZWQgb3Igbm90XG4gICAgICoqL1xuICAgIHVzZXJFeGlzdHModXNlcjogVXNlcikge1xuICAgICAgICByZXR1cm4gdGhpcy5faHR0cC5nZXQodGhpcy5fYmFzZVVybFVzZXIgKyAnZW1haWwvZXhpc3RzP2VtYWlsPScgKyB1c2VyLmVtYWlsX2FkZHJlc3MpXG4gICAgICAgICAgICAucGlwZShtYXAoY29udGVudCA9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy5fZGF0YSA9IHtcbiAgICAgICAgICAgICAgICAgICAgZXhpc3RzOiBjb250ZW50W1wiZXhpc3RzXCJdLFxuICAgICAgICAgICAgICAgICAgICB2ZW5kb3I6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlkOiBjb250ZW50W1widmVuZG9yXCJdID8gY29udGVudFtcInZlbmRvclwiXVtcImlkXCJdIDogbnVsbCxcbiAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6IGNvbnRlbnRbXCJ2ZW5kb3JcIl0gPyBjb250ZW50W1widmVuZG9yXCJdW1wibmFtZVwiXSA6IG51bGxcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLl9kYXRhO1xuICAgICAgICAgICAgfSkpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEdFVCBjZWR1bGEgZXhpc3RzXG4gICAgICogXG4gICAgICogVGhpcyBtZXRob2QgaXMgdXNlZCB0byBjaGVjayB3aGV0aGVyIG9yIG5vdCB0aGUgY2VkdWxhIHByb3ZpZGVkIGlzIGF2YWlsYWJsZSB0byBiZSByZWdpc3RlcmVkIG9yIG5vdCAodmVuZG9ycyBjYW4gYWxsb3cgbXVsdGlwbGUgdG8gYmUgcmVnaXN0ZXJlZCB0byB2YXJpb3VzIGFjY291bnRzKVxuICAgICAqKi9cbiAgICBjZWR1bGFFeGlzdHModXNlcjogVXNlcikge1xuICAgICAgICByZXR1cm4gdGhpcy5faHR0cC5nZXQodGhpcy5fYmFzZVVybFVzZXIgKyAnY2VkdWxhL2V4aXN0cz9jZWR1bGE9JyArIHVzZXIuY2VkdWxhKVxuICAgICAgICAgICAgLnBpcGUobWFwKGNvbnRlbnQgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMuX2RhdGEgPSB7XG4gICAgICAgICAgICAgICAgICAgIGV4aXN0czogY29udGVudFtcImV4aXN0c1wiXSxcbiAgICAgICAgICAgICAgICAgICAgdmFsaWQ6IGNvbnRlbnRbXCJ2YWxpZFwiXSxcbiAgICAgICAgICAgICAgICAgICAgdmVuZG9yOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZDogY29udGVudFtcInZlbmRvclwiXSA/IGNvbnRlbnRbXCJ2ZW5kb3JcIl1bXCJpZFwiXSA6IG51bGwsXG4gICAgICAgICAgICAgICAgICAgICAgICBuYW1lOiBjb250ZW50W1widmVuZG9yXCJdID8gY29udGVudFtcInZlbmRvclwiXVtcIm5hbWVcIl0gOiBudWxsXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5fZGF0YTtcbiAgICAgICAgICAgIH0pKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBHRVQgbW9iaWxlIGV4aXN0c1xuICAgICAqIFxuICAgICAqIFRoaXMgbWV0aG9kIGlzIHVzZWQgdG8gY2hlY2sgd2hldGhlciBvciBub3QgdGhlIHBob25lIG51bWJlciBwcm92aWRlZCBpcyBhdmFpbGFibGUgdG8gYmUgcmVnaXN0ZXJlZCBvciBub3QgKHZlbmRvcnMgY2FuIGFsbG93IG11bHRpcGxlIHRvIGJlIHJlZ2lzdGVyZWQgdG8gdmFyaW91cyBhY2NvdW50cylcbiAgICAgKiovXG4gICAgbW9iaWxlRXhpc3RzKHVzZXI6IFVzZXIpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2h0dHAuZ2V0KHRoaXMuX2Jhc2VVcmxVc2VyICsgJ21vYmlsZS9leGlzdHM/bW9iaWxlPScgKyB1c2VyLm1vYmlsZSArICcmdmVuZG9yPScgKyB1c2VyLnZlbmRvciArICcmY291bnRyeT0nICsgdXNlci5jb3VudHJ5KVxuICAgICAgICAgICAgLnBpcGUobWFwKGNvbnRlbnQgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMuX2RhdGEgPSB7XG4gICAgICAgICAgICAgICAgICAgIGF2YWlsYWJsZTogY29udGVudFtcImF2YWlsYWJsZVwiXVxuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLl9kYXRhO1xuICAgICAgICAgICAgfSkpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEdFVCB1c2VyIHZhbGlkYXRlZFxuICAgICAqIFxuICAgICAqIFRoaXMgbWV0aG9kIGlzIHVzZWQgdG8gdmFsaWRhdGUgYSB1c2VyJ3Mgc2Vzc2lvbi4gSWYgaXQgZXhwaXJlcyB0aGVuIHRoZSB1c2VyIGlzIHNpZ25lZCBvdXQgYW5kIG11c3Qgc2lnbiBpbiBhZ2Fpbi5cbiAgICAgKiovXG4gICAgdXNlclZhbGlkYXRlKHNlc3Npb246IFNlc3Npb24pIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2h0dHAuZ2V0KHRoaXMuX2Jhc2VVcmxVc2VyICsgJ2lzVmFsaWRhdGVkP3Nlc3Npb249JyArIHNlc3Npb24uc2Vzc2lvbl9rZXkpXG4gICAgICAgICAgICAucGlwZShtYXAoY29udGVudCA9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy5fZGF0YSA9IHtcbiAgICAgICAgICAgICAgICAgICAgaXNfdmFsaWRhdGVkOiBjb250ZW50W1wiaXNWYWxpZGF0ZWRcIl0sXG4gICAgICAgICAgICAgICAgICAgIHBob25lX251bWJlcjogY29udGVudFtcInBob25lX251bWJlclwiXSxcbiAgICAgICAgICAgICAgICAgICAgbWV0aG9kczogY29udGVudFtcIm1ldGhvZHNcIl0sXG4gICAgICAgICAgICAgICAgICAgIHN0YXR1czoge1xuICAgICAgICAgICAgICAgICAgICAgICAgbm9fdmVyaWZpY2F0aW9uOiBjb250ZW50W1wic3RhdHVzXCJdW1wiTm8gVmVyaWZpY2F0aW9uXCJdLFxuICAgICAgICAgICAgICAgICAgICAgICAgZW1haWw6IGNvbnRlbnRbXCJzdGF0dXNcIl1bXCJFbWFpbFwiXSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHNtczogY29udGVudFtcInN0YXR1c1wiXVtcIlNtc1wiXVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLl9kYXRhO1xuICAgICAgICAgICAgfSkpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEdFVCB1c2VyIGFjdGl2YXRlXG4gICAgICogXG4gICAgICogVGhpcyBtZXRob2QgaXMgdXNlZCB0byBhY3RpdmF0ZSBhbiBhY2NvdW50IFxuICAgICAqKi9cbiAgICB1c2VyQWN0aXZhdGUodXNlcjogVXNlcikge1xuICAgICAgICByZXR1cm4gdGhpcy5faHR0cC5nZXQodGhpcy5fYmFzZVVybFVzZXIgKyAnYWN0aXZhdGU/c2Vzc2lvbl9pZGVudGlmaWVyPScgKyB1c2VyLnNlc3Npb25fa2V5ICsgJyZ0b2tlbj0nICsgdXNlci50b2tlbilcbiAgICAgICAgICAgIC5waXBlKG1hcChjb250ZW50ID0+IHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIkFjdGl2YXRpb246IFwiLCBjb250ZW50KTtcbiAgICAgICAgICAgICAgICByZXR1cm4gY29udGVudDtcbiAgICAgICAgICAgIH0pKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBHRVQgdXNlciBhY3RpdmF0ZSBlbWFpbFxuICAgICAqIFxuICAgICAqIFRoaXMgbWV0aG9kIHNlbmRzIGFuIGVtYWlsIHRvIHRoZSB1c2VyJ3MgYWNjb3VudCB0byBhY3RpdmF0ZVxuICAgICAqKi9cbiAgICB1c2VyQWN0aXZhdGVFbWFpbChzZXNzaW9uOiBTZXNzaW9uKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9odHRwLmdldCh0aGlzLl9iYXNlVXJsVXNlciArICdhY3RpdmF0ZS9lbWFpbD9zZXNzaW9uX2lkZW50aWZpZXI9JyArIHNlc3Npb24uc2Vzc2lvbl9rZXkpXG4gICAgICAgICAgICAucGlwZShtYXAoY29udGVudCA9PiB7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJFbWFpbCBhY3RpdmF0aW9uOiBcIiwgY29udGVudCk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGNvbnRlbnQ7XG4gICAgICAgICAgICB9KSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogR0VUIHVzZXIgYWN0aXZhdGUgU01TXG4gICAgICogXG4gICAgICogVGhpcyBtZXRob2Qgc2VuZHMgYW4gU01TIGNvZGUgdG8gdGhlIHVzZXIncyBwaG9uZSB0byB0eXBlIGRvd24gaW4gdGhlIHdlYnNpdGUgYWN0aXZhdGVcbiAgICAgKiovXG4gICAgdXNlckFjdGl2YXRlU21zKHVzZXI6IFVzZXIpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2h0dHAuZ2V0KHRoaXMuX2Jhc2VVcmxVc2VyICsgJ2FjdGl2YXRlL3Ntcz9zZXNzaW9uX2lkZW50aWZpZXI9JyArIHVzZXIuc2Vzc2lvbl9rZXkgKyAnJnBob25lPScgKyB1c2VyLm1vYmlsZSArICcmY291bnRyeT0nICsgdXNlci5jb3VudHJ5KVxuICAgICAgICAgICAgLnBpcGUobWFwKGNvbnRlbnQgPT4ge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiU01TIGFjdGl2YXRpb246IFwiLCBjb250ZW50KTtcbiAgICAgICAgICAgICAgICByZXR1cm4gY29udGVudDtcbiAgICAgICAgICAgIH0pKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBQVVQgdXNlciBwcm9maWxlXG4gICAgICogXG4gICAgICogVGhpcyBtZXRob2QgaXMgdXNlZCB0byB1cGRhdGUgdGhlIHVzZXIncyBkYXRhIGFuZCBzYXZlZCBzZXR0aW5nc1xuICAgICAqKi9cbiAgICB1c2VyVXBkYXRlUHJvZmlsZSh1c2VyOiBVc2VyKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9odHRwLnB1dCh0aGlzLl9iYXNlVXJsVXNlciArICdwcm9maWxlP3Nlc3Npb25fa2V5PScgKyB1c2VyLnNlc3Npb25fa2V5LCB1c2VyKVxuICAgICAgICAgICAgLnBpcGUobWFwKGNvbnRlbnQgPT4ge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiVXBkYXRlOiBcIiwgY29udGVudCk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGNvbnRlbnQ7XG4gICAgICAgICAgICB9KSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogR0VUIHVzZXIgcHJvZmlsZVxuICAgICAqIFxuICAgICAqIFRoaXMgbWV0aG9kIGlzIHVzZWQgdG8gZ3JhYiB0aGUgdXNlcidzIGRhdGEgYW5kIHNhdmVkIHNldHRpbmdzXG4gICAgICoqL1xuICAgIHVzZXJHZXRQcm9maWxlKHNlc3Npb246IFNlc3Npb24pIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2h0dHAuZ2V0KHRoaXMuX2Jhc2VVcmxVc2VyICsgJ3Byb2ZpbGU/c2Vzc2lvbl9rZXk9JyArIHNlc3Npb24uc2Vzc2lvbl9rZXkpXG4gICAgICAgICAgICAucGlwZShtYXAoY29udGVudCA9PiB7XG4gICAgICAgICAgICAgICAgLy8gQ2xhcmlmeSBjb25zZW50IGRhdGFcbiAgICAgICAgICAgICAgICB2YXIgY29uc2VudFNtcyA9IGZhbHNlLFxuICAgICAgICAgICAgICAgICAgICBjb25zZW50RW1haWwgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICBzd2l0Y2ggKGNvbnRlbnRbXCJjb250YWN0X2NvbnNlbnRcIl0pIHtcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAwOlxuICAgICAgICAgICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgMTpcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNlbnRFbWFpbCA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAyOlxuICAgICAgICAgICAgICAgICAgICAgICAgY29uc2VudFNtcyA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAzOlxuICAgICAgICAgICAgICAgICAgICAgICAgY29uc2VudFNtcyA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zZW50RW1haWwgPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgLy8gQ2xlYW4gb3V0IG1ldGFkYXRhXG4gICAgICAgICAgICAgICAgdmFyIG1ldGFkYXRhT2JqID0ge307XG4gICAgICAgICAgICAgICAgZm9yICh2YXIgaSBpbiBjb250ZW50W1wibWV0YWRhdGFcIl0pIHtcbiAgICAgICAgICAgICAgICAgICAgY29udGVudFtcIm1ldGFkYXRhXCJdW2ldW1wiZmllbGRcIl0gPSBjb250ZW50W1wibWV0YWRhdGFcIl1baV1bXCJmaWVsZFwiXS50b0xvd2VyQ2FzZSgpLnJlcGxhY2UoL1xccy9nLCAnXycpO1xuXG4gICAgICAgICAgICAgICAgICAgIG1ldGFkYXRhT2JqW2NvbnRlbnRbXCJtZXRhZGF0YVwiXVtpXVtcImZpZWxkXCJdXSA9IGNvbnRlbnRbXCJtZXRhZGF0YVwiXVtpXVtcInZhbHVlXCJdO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIHRoaXMuX2RhdGEgPSB7XG4gICAgICAgICAgICAgICAgICAgIGF1dG9fcmVsb2FkOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBiaWxsaW5nX3Byb2ZpbGU6IGNvbnRlbnRbXCJiaWxsaW5nX3Byb2ZpbGVcIl0sXG4gICAgICAgICAgICAgICAgICAgICAgICByZWxvYWRfYW1vdW50OiBjb250ZW50W1wicmVsb2FkX2Ftb3VudFwiXSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlbG9hZF90aHJlc2hvbGQ6IGNvbnRlbnRbXCJyZWxvYWRfdGhyZXNob2xkXCJdXG4gICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgIGNvbnRhY3RfY29uc2VudDoge1xuICAgICAgICAgICAgICAgICAgICAgICAgc21zOiBjb25zZW50U21zLFxuICAgICAgICAgICAgICAgICAgICAgICAgZW1haWw6IGNvbnNlbnRFbWFpbFxuICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICBjcmVhdGVkOiBjb250ZW50W1wiY3JlYXRlZFwiXSxcbiAgICAgICAgICAgICAgICAgICAgdXBkYXRlZDogY29udGVudFtcInVwZGF0ZWRcIl0sXG4gICAgICAgICAgICAgICAgICAgIGlkOiBjb250ZW50W1widXNlclwiXVtcImlkXCJdLFxuICAgICAgICAgICAgICAgICAgICBlbWFpbF9hZGRyZXNzOiBjb250ZW50W1widXNlclwiXVtcImVtYWlsX2FkZHJlc3NcIl0sXG4gICAgICAgICAgICAgICAgICAgIGZpcnN0X25hbWU6IGNvbnRlbnRbXCJ1c2VyXCJdW1wiZmlyc3RfbmFtZVwiXSxcbiAgICAgICAgICAgICAgICAgICAgbGFzdF9uYW1lOiBjb250ZW50W1widXNlclwiXVtcImxhc3RfbmFtZVwiXSxcbiAgICAgICAgICAgICAgICAgICAgYmlydGhkYXRlOiBjb250ZW50W1widXNlclwiXVtcImJpcnRoZGF0ZVwiXSxcbiAgICAgICAgICAgICAgICAgICAgaXNfdmVyaWZpZWQ6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHN0YXR1czogY29udGVudFtcImlzX3ZlcmlmaWVkXCJdW1wic3RhdHVzXCJdLFxuICAgICAgICAgICAgICAgICAgICAgICAgbWV0aG9kczoge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVtYWlsOiBjb250ZW50W1wiaXNfdmVyaWZpZWRcIl1bXCJtZXRob2RzXCJdW1wiRW1haWxcIl0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc21zOiBjb250ZW50W1wiaXNfdmVyaWZpZWRcIl1bXCJtZXRob2RzXCJdW1wiU01TXCJdXG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgIGxhbmd1YWdlOiBjb250ZW50W1wibGFuZ3VhZ2VcIl0sXG4gICAgICAgICAgICAgICAgICAgIG1ldGFkYXRhOiBtZXRhZGF0YU9iaixcbiAgICAgICAgICAgICAgICAgICAgb25saW5lX29yZGVyX3Rva2VuOiBjb250ZW50W1wib25saW5lX29yZGVyX3Rva2VuXCJdLFxuICAgICAgICAgICAgICAgICAgICBwdXNoX2VuZHBvaW50czoge1xuICAgICAgICAgICAgICAgICAgICAgICAgZ2NtOiBjb250ZW50W1wicHVzaF9lbmRwb2ludHNcIl1bXCJnY21cIl0sXG4gICAgICAgICAgICAgICAgICAgICAgICBhcG5zOiBjb250ZW50W1wicHVzaF9lbmRwb2ludHNcIl1bXCJhcG5zXCJdXG4gICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgIHJlZmVycmFsX3VybDogY29udGVudFtcInJlZmVycmFsX3VybFwiXSxcbiAgICAgICAgICAgICAgICAgICAgc3RhdHVzOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBzdGF0dXNfaWQ6IGNvbnRlbnRbXCJzdGF0dXNcIl1bXCJzdGF0dXNfaWRcIl0sXG4gICAgICAgICAgICAgICAgICAgICAgICBuYW1lOiBjb250ZW50W1wic3RhdHVzXCJdW1wibmFtZVwiXVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5fZGF0YTtcbiAgICAgICAgICAgIH0pKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBHRVQgdXNlciByZXdhcmQgbGlzdFxuICAgICAqIFxuICAgICAqIFRoaXMgbWV0aG9kIGlzIHVzZWQgdG8gZ2V0IHRoZSB1c2VyJ3MgbGlzdCBvZiBhdmFpbGFibGUgcmV3YXJkc1xuICAgICAqKi9cbiAgICB1c2VyR2V0UmV3YXJkcyhzZXNzaW9uOiBTZXNzaW9uKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9odHRwLmdldCh0aGlzLl9iYXNlVXJsVXNlciArICdyZXdhcmQvbGlzdD9zZXNzaW9uX2tleT0nICsgc2Vzc2lvbi5zZXNzaW9uX2tleSlcbiAgICAgICAgICAgIC5waXBlKG1hcChjb250ZW50ID0+IHtcbiAgICAgICAgICAgICAgICAvLyBDaGVjayBpZiB3ZSBoYXZlIGEgVVJMIGZvciBuZXh0IHBhZ2VcbiAgICAgICAgICAgICAgICB2YXIgbW9yZV9wYWdlc19ib29sZWFuID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgaWYgKGNvbnRlbnRbXCJuZXh0X3BhZ2VfdXJsXCJdICE9IG51bGwpIHtcbiAgICAgICAgICAgICAgICAgICAgbW9yZV9wYWdlc19ib29sZWFuID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAvLyBDbGVhbiBvdXQgcmV3YXJkIGRhdGFcbiAgICAgICAgICAgICAgICB2YXIgZXhwaXJ5QXJyYXkgPSBbXTtcbiAgICAgICAgICAgICAgICB2YXIgcmV3YXJkQXJyYXkgPSBbXTtcblxuICAgICAgICAgICAgICAgIC8vIENsZWFuIG91dCB0aGUgcmVzdCBvZiB0aGUgZGF0YVxuICAgICAgICAgICAgICAgIGZvciAodmFyIGkgaW4gY29udGVudFtcImRhdGFcIl0pIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIHRlbXBSZXdhcmRPYmogPSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjYXRhbG9nOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWQ6IGNvbnRlbnRbXCJkYXRhXCJdW2ldW1wiY2F0YWxvZy5pZFwiXSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBuYW1lOiBjb250ZW50W1wiZGF0YVwiXVtpXVtcImNhdGFsb2dcIl1bXCJuYW1lXCJdXG4gICAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgdHlwZToge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlkOiBjb250ZW50W1wiZGF0YVwiXVtpXVtcInR5cGVcIl1bXCJpZFwiXSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBuYW1lOiBjb250ZW50W1wiZGF0YVwiXVtpXVtcInR5cGVcIl1bXCJuYW1lXCJdXG4gICAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgY3VycmVuY3k6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZDogY29udGVudFtcImRhdGFcIl1baV1bXCJjdXJyZW5jeVwiXVtcImlkXCJdLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6IGNvbnRlbnRbXCJkYXRhXCJdW2ldW1wiY3VycmVuY3lcIl1bXCJuYW1lXCJdXG4gICAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgaWQ6IGNvbnRlbnRbXCJkYXRhXCJdW2ldW1wiaWRcIl0sXG4gICAgICAgICAgICAgICAgICAgICAgICBuYW1lOiBjb250ZW50W1wiZGF0YVwiXVtpXVtcIm5hbWVcIl0sXG4gICAgICAgICAgICAgICAgICAgICAgICBkZXNjcmlwdGlvbjogY29udGVudFtcImRhdGFcIl1baV1bXCJkZXNjcmlwdGlvblwiXSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHN1bW1hcnk6IGNvbnRlbnRbXCJkYXRhXCJdW2ldW1wic3VtbWFyeVwiXSxcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvc3Q6IGNvbnRlbnRbXCJkYXRhXCJdW2ldW1wiY29zdFwiXSxcbiAgICAgICAgICAgICAgICAgICAgICAgIGF2YWlsYWJsZTogY29udGVudFtcImRhdGFcIl1baV1bXCJhdmFpbGFibGVcIl0sXG4gICAgICAgICAgICAgICAgICAgICAgICBwcm9ncmVzczogY29udGVudFtcImRhdGFcIl1baV1bXCJwcm9ncmVzc1wiXSxcbiAgICAgICAgICAgICAgICAgICAgICAgIGV4cGlyaW5nOiBjb250ZW50W1wiZGF0YVwiXVtpXVtcImV4cGlyaW5nXCJdW1wiZGF0YVwiXVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIHJld2FyZEFycmF5LnB1c2godGVtcFJld2FyZE9iaik7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgLy8gU2ltcGxpZnkgdGhlIHJldHVybmVkIGRhdGFcbiAgICAgICAgICAgICAgICB0aGlzLl9kYXRhID0ge1xuICAgICAgICAgICAgICAgICAgICBiYWxhbmNlczogY29udGVudFtcImJhbGFuY2VzXCJdLFxuICAgICAgICAgICAgICAgICAgICBkYXRhOiByZXdhcmRBcnJheSxcbiAgICAgICAgICAgICAgICAgICAgbW9yZV9wYWdlczogbW9yZV9wYWdlc19ib29sZWFuXG4gICAgICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLl9kYXRhO1xuICAgICAgICAgICAgfSkpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEdFVCB1c2VyIHF1aWNrIHBheSBiYWxhbmNlXG4gICAgICogXG4gICAgICogVGhpcyBtZXRob2QgaXMgdXNlZCB0byBnZXQgdGhlIHVzZXIncyBxdWljayBwYXkgYmFsYW5jZVxuICAgICAqKi9cbiAgICB1c2VyR2V0UXVpY2tQYXlCYWxhbmNlKHNlc3Npb246IFNlc3Npb24pIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2h0dHAuZ2V0KHRoaXMuX2Jhc2VVcmxVc2VyICsgJ3F1aWNrLXBheS9iYWxhbmNlP3Nlc3Npb25fa2V5PScgKyBzZXNzaW9uLnNlc3Npb25fa2V5KVxuICAgICAgICAgICAgLnBpcGUobWFwKGNvbnRlbnQgPT4ge1xuICAgICAgICAgICAgICAgIC8vIFNpbXBsaWZ5IHRoZSByZXR1cm5lZCBkYXRhXG4gICAgICAgICAgICAgICAgdGhpcy5fZGF0YSA9IHtcbiAgICAgICAgICAgICAgICAgICAgYW1vdW50OiBjb250ZW50W1wiYW1vdW50XCJdLFxuICAgICAgICAgICAgICAgICAgICBjdXJyZW5jeToge1xuICAgICAgICAgICAgICAgICAgICAgICAgY29kZTogY29udGVudFtcImN1cnJlbmN5XCJdW1wiY29kZVwiXSxcbiAgICAgICAgICAgICAgICAgICAgICAgIGlkOiBjb250ZW50W1wiY3VycmVuY3lcIl1bXCJpZFwiXSxcbiAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6IGNvbnRlbnRbXCJjdXJyZW5jeVwiXVtcIm5hbWVcIl0sXG4gICAgICAgICAgICAgICAgICAgICAgICBvYmplY3Q6IGNvbnRlbnRbXCJjdXJyZW5jeVwiXVtcIm9iamVjdFwiXVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5fZGF0YTtcbiAgICAgICAgICAgIH0pKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBHRVQgdXNlciB0cmFuc2FjdGlvbiBsaXN0XG4gICAgICogXG4gICAgICogVGhpcyBtZXRob2QgaXMgdXNlZCB0byBnZXQgdGhlIHVzZXIncyB0cmFuc2FjdGlvbiBsaXN0XG4gICAgICoqL1xuICAgIHVzZXJHZXRUcmFuc2FjdGlvbnMoc2Vzc2lvbjogU2Vzc2lvbikge1xuICAgICAgICByZXR1cm4gdGhpcy5faHR0cC5nZXQodGhpcy5fYmFzZVVybFVzZXIgKyAndHJhbnNhY3Rpb24vbGlzdD9zZXNzaW9uX2tleT0nICsgc2Vzc2lvbi5zZXNzaW9uX2tleSlcbiAgICAgICAgICAgIC5waXBlKG1hcChjb250ZW50ID0+IHtcbiAgICAgICAgICAgICAgICAvLyBDbGVhbiBvdXQgdHJhbnNhY3Rpb24gZGF0YVxuICAgICAgICAgICAgICAgIHZhciBsb3lhbHR5QXJyYXkgPSBbXTtcbiAgICAgICAgICAgICAgICB2YXIgaXRlbXNBcnJheSA9IFtdO1xuICAgICAgICAgICAgICAgIHZhciB0cmFuc2FjdGlvbkFycmF5ID0gW107XG5cbiAgICAgICAgICAgICAgICBmb3IgKHZhciBpIGluIGNvbnRlbnRbXCJkYXRhXCJdKSB7XG4gICAgICAgICAgICAgICAgICAgIC8vIE9yZ2FuaXplIHRoZSBsb3lhbHR5IGRhdGFcbiAgICAgICAgICAgICAgICAgICAgZm9yICh2YXIgayBpbiBjb250ZW50W1wiZGF0YVwiXVtpXVtcInJld2FyZHNcIl0pIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciB0ZW1wTG95YWx0eU9iaiA9IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjdXJyZW5jeToge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZDogY29udGVudFtcImRhdGFcIl1baV1bXCJyZXdhcmRzXCJdW2tdW1wiaWRcIl0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6IGNvbnRlbnRbXCJkYXRhXCJdW2ldW1wicmV3YXJkc1wiXVtrXVtcIm5hbWVcIl1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlZGVlbWVkOiBjb250ZW50W1wiZGF0YVwiXVtpXVtcInJld2FyZHNcIl1ba11bXCJzcGVudFwiXSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBlYXJuZWQ6IGNvbnRlbnRbXCJkYXRhXCJdW2ldW1wicmV3YXJkc1wiXVtrXVtcImVhcm5lZFwiXSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBleHBpcmVkOiBjb250ZW50W1wiZGF0YVwiXVtpXVtcInJld2FyZHNcIl1ba11bXCJleHBpcmVkXCJdXG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICBsb3lhbHR5QXJyYXkucHVzaCh0ZW1wTG95YWx0eU9iaik7XG4gICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICAvLyBPcmdhbml6ZSBpdGVtcyBkYXRhXG4gICAgICAgICAgICAgICAgICAgIGZvciAodmFyIGwgaW4gY29udGVudFtcImRhdGFcIl1baV1bXCJpdGVtc1wiXSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHRlbXBJdGVtc09iaiA9IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0eXBlOiBjb250ZW50W1wiZGF0YVwiXVtpXVtcIml0ZW1zXCJdW2xdW1widHlwZVwiXSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBuYW1lOiBjb250ZW50W1wiZGF0YVwiXVtpXVtcIml0ZW1zXCJdW2xdW1wibmFtZVwiXSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBxdWFudGl0eTogY29udGVudFtcImRhdGFcIl1baV1bXCJpdGVtc1wiXVtsXVtcInF1YW50aXR5XCJdLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHByaWNlOiBjb250ZW50W1wiZGF0YVwiXVtpXVtcIml0ZW1zXCJdW2xdW1wicHJpY2VcIl0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWQ6IGNvbnRlbnRbXCJkYXRhXCJdW2ldW1wiaXRlbXNcIl1bbF1bXCJpZFwiXVxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgaXRlbXNBcnJheS5wdXNoKHRlbXBJdGVtc09iaik7XG4gICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICB2YXIgdGVtcFJld2FyZE9iaiA9IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJhdGluZzoge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbW1lbnQ6IGNvbnRlbnRbXCJkYXRhXCJdW2ldW1wicmF0aW5nXCJdW1wiY29tbWVudFwiXSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZTogY29udGVudFtcImRhdGFcIl1baV1bXCJyYXRpbmdcIl1bXCJ2YWx1ZVwiXSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB3aW5kb3c6IGNvbnRlbnRbXCJkYXRhXCJdW2ldW1wicmF0aW5nXCJdW1wid2luZG93XCJdXG4gICAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgdGlwOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYW1vdW50OiBjb250ZW50W1wiZGF0YVwiXVtpXVtcInRpcFwiXVtcImFtb3VudFwiXSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB3aW5kb3c6IGNvbnRlbnRbXCJkYXRhXCJdW2ldW1widGlwXCJdW1wid2luZG93XCJdXG4gICAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgaWQ6IGNvbnRlbnRbXCJkYXRhXCJdW2ldW1wiaWRcIl0sXG4gICAgICAgICAgICAgICAgICAgICAgICBkYXRlOiBjb250ZW50W1wiZGF0YVwiXVtpXVtcImRhdGVcIl0sXG4gICAgICAgICAgICAgICAgICAgICAgICBpdGVtczogaXRlbXNBcnJheSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlY2VpcHRfZGF0ZTogY29udGVudFtcImRhdGFcIl1baV1bXCJyZWNlaXB0c1wiXVswXSA/IGNvbnRlbnRbXCJkYXRhXCJdW2ldW1wicmVjZWlwdHNcIl1bMF1bXCJkYXRlXCJdIDogbnVsbCxcbiAgICAgICAgICAgICAgICAgICAgICAgIHN1YnRvdGFsOiBjb250ZW50W1wiZGF0YVwiXVtpXVtcInJlY2VpcHRzXCJdWzBdID8gY29udGVudFtcImRhdGFcIl1baV1bXCJyZWNlaXB0c1wiXVswXVtcInN1YnRvdGFsXCJdIDogbnVsbCxcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlY2VpcHRfbnVtYmVyOiBjb250ZW50W1wiZGF0YVwiXVtpXVtcInJlY2VpcHRzXCJdWzBdID8gY29udGVudFtcImRhdGFcIl1baV1bXCJyZWNlaXB0c1wiXVswXVtcIm51bWJlclwiXSA6IG51bGwsXG4gICAgICAgICAgICAgICAgICAgICAgICBjYXNoaWVyOiBjb250ZW50W1wiZGF0YVwiXVtpXVtcInJlY2VpcHRzXCJdWzBdID8gY29udGVudFtcImRhdGFcIl1baV1bXCJyZWNlaXB0c1wiXVswXVtcImNhc2hpZXJcIl0gOiBudWxsLFxuICAgICAgICAgICAgICAgICAgICAgICAgdG90YWw6IGNvbnRlbnRbXCJkYXRhXCJdW2ldW1wicmVjZWlwdHNcIl0sXG4gICAgICAgICAgICAgICAgICAgICAgICBhZGRyZXNzOiBjb250ZW50W1wiZGF0YVwiXVtpXVtcImFkZHJlc3NcIl0sXG4gICAgICAgICAgICAgICAgICAgICAgICBuYW1lOiBjb250ZW50W1wiZGF0YVwiXVtpXVtcIm5hbWVcIl0sXG4gICAgICAgICAgICAgICAgICAgICAgICBxdWlja3BheToge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHVzZWQ6IGNvbnRlbnRbXCJkYXRhXCJdW2ldW1wicXVpY2twYXlcIl1bXCJ1c2VkXCJdLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxvYWRlZDogY29udGVudFtcImRhdGFcIl1baV1bXCJxdWlja3BheVwiXVtcImxvYWRlZFwiXSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBiYWxhbmNlOiBjb250ZW50W1wiZGF0YVwiXVtpXVtcInF1aWNrcGF5XCJdW1wiYmFsYW5jZVwiXVxuICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgIGxveWFsdHk6IGxveWFsdHlBcnJheSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHN0YXR1czogY29udGVudFtcImRhdGFcIl1baV1bXCJzdGF0dXNcIl1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBsb3lhbHR5QXJyYXkgPSBbXTtcbiAgICAgICAgICAgICAgICAgICAgaXRlbXNBcnJheSA9IFtdO1xuICAgICAgICAgICAgICAgICAgICB0cmFuc2FjdGlvbkFycmF5LnB1c2godGVtcFJld2FyZE9iaik7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgLy8gU2ltcGxpZnkgdGhlIHJldHVybmVkIGRhdGFcbiAgICAgICAgICAgICAgICB0aGlzLl9kYXRhID0gdHJhbnNhY3Rpb25BcnJheTtcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5fZGF0YTtcbiAgICAgICAgICAgIH0pKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBQT1NUIHVzZXIgY2FyZCBhZGRcbiAgICAgKiBcbiAgICAgKiBUaGlzIG1ldGhvZCBpcyB1c2VkIHRvIGFkZCB0aGUgdXNlcidzIGNhcmRcbiAgICAgKiovXG4gICAgdXNlckFkZENhcmQoY2FyZDogQ2FyZCkge1xuICAgICAgICByZXR1cm4gdGhpcy5faHR0cC5wb3N0KHRoaXMuX2Jhc2VVcmxVc2VyICsgJ2NhcmQvYWRkP3Nlc3Npb25fa2V5PScgKyBjYXJkLnNlc3Npb25fa2V5LCBjYXJkKVxuICAgICAgICAgICAgLnBpcGUobWFwKGNvbnRlbnQgPT4ge1xuICAgICAgICAgICAgICAgIC8vIFNpbXBsaWZ5IHRoZSByZXR1cm5lZCBkYXRhXG4gICAgICAgICAgICAgICAgdGhpcy5fZGF0YSA9IHtcbiAgICAgICAgICAgICAgICAgICAgaWQ6IGNvbnRlbnRbXCJpZFwiXSxcbiAgICAgICAgICAgICAgICAgICAgbnVtYmVyOiBjb250ZW50W1wiY2FyZFwiXVtcIm51bWJlclwiXSxcbiAgICAgICAgICAgICAgICAgICAgY3JlYXRlZDogY29udGVudFtcImNyZWF0ZWRcIl0sXG4gICAgICAgICAgICAgICAgICAgIHVwZGF0ZWQ6IGNvbnRlbnRbXCJ1cGRhdGVkXCJdXG4gICAgICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLl9kYXRhO1xuICAgICAgICAgICAgfSkpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEdFVCB1c2VyIGNhcmQgbGlzdFxuICAgICAqIFxuICAgICAqIFRoaXMgbWV0aG9kIGlzIHVzZWQgdG8gZ2V0IHRoZSB1c2VyJ3MgY2FyZCBsaXN0XG4gICAgICoqL1xuICAgIHVzZXJHZXRDYXJkcyhzZXNzaW9uOiBTZXNzaW9uKSB7XG4gICAgICAgIGxldCBzcG9vbml0eUNhcmRzID0gdGhpcy5faHR0cC5nZXQodGhpcy5fYmFzZVVybFVzZXIgKyAnY2FyZC9saXN0P3Nlc3Npb25fa2V5PScgKyBzZXNzaW9uLnNlc3Npb25fa2V5KVxuICAgICAgICAgICAgLnBpcGUobWFwKGNvbnRlbnQgPT4ge1xuICAgICAgICAgICAgICAgIC8vIFNpbXBsaWZ5IHRoZSByZXR1cm5lZCBkYXRhXG4gICAgICAgICAgICAgICAgdmFyIGNhcmRBcnJheSA9IFtdO1xuICAgICAgICAgICAgICAgIHZhciBjYXJkT2JqID0ge307XG4gICAgICAgICAgICAgICAgZm9yICh2YXIgaSBpbiBjb250ZW50W1wiZGF0YVwiXSkge1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBvYmpUb1JldHVybiA9IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhcmQ6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBudW1iZXI6IGNvbnRlbnRbXCJkYXRhXCJdW2ldW1wiY2FyZFwiXVtcIm51bWJlclwiXSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBwaW46IGNvbnRlbnRbXCJkYXRhXCJdW2ldW1wiY2FyZFwiXVtcInBpblwiXVxuICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgIGNyZWF0ZWQ6IGNvbnRlbnRbXCJkYXRhXCJdW2ldW1wiY3JlYXRlZFwiXSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHVwZGF0ZWQ6IGNvbnRlbnRbXCJkYXRhXCJdW2ldW1widXBkYXRlZFwiXSxcbiAgICAgICAgICAgICAgICAgICAgICAgIGlkOiBjb250ZW50W1wiZGF0YVwiXVtpXVtcImlkXCJdLFxuICAgICAgICAgICAgICAgICAgICAgICAgc3RhdHVzOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWQ6IGNvbnRlbnRbXCJkYXRhXCJdW2ldW1wic3RhdHVzXCJdW1wiaWRcIl0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbmFtZTogY29udGVudFtcImRhdGFcIl1baV1bXCJzdGF0dXNcIl1bXCJuYW1lXCJdXG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICBjYXJkQXJyYXkucHVzaChvYmpUb1JldHVybik7XG4gICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICBjYXJkT2JqW1wic3Bvb25pdHlcIl0gPSBjYXJkQXJyYXk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGNhcmRPYmo7XG4gICAgICAgICAgICB9KSk7XG5cbiAgICAgICAgbGV0IHRoaXJkUGFydHlDYXJkcyA9IHRoaXMuX2h0dHAuZ2V0KHRoaXMuX2Jhc2VVcmxVc2VyICsgJ2NhcmQtM3JkcGFydHkvbGlzdD9zZXNzaW9uX2tleT0nICsgc2Vzc2lvbi5zZXNzaW9uX2tleSlcbiAgICAgICAgICAgIC5waXBlKG1hcChjb250ZW50ID0+IHtcbiAgICAgICAgICAgICAgICAvLyBTaW1wbGlmeSB0aGUgcmV0dXJuZWQgZGF0YVxuICAgICAgICAgICAgICAgIHZhciBjYXJkQXJyYXkgPSBbXTtcbiAgICAgICAgICAgICAgICB2YXIgY2FyZE9iaiA9IHt9O1xuICAgICAgICAgICAgICAgIGZvciAodmFyIGkgaW4gY29udGVudFtcImRhdGFcIl0pIHtcbiAgICAgICAgICAgICAgICAgICAgY29uc3Qgb2JqVG9SZXR1cm4gPSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjYXJkOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbnVtYmVyOiBjb250ZW50W1wiZGF0YVwiXVtpXVtcImNhcmRcIl1bXCJudW1iZXJcIl0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcGluOiBjb250ZW50W1wiZGF0YVwiXVtpXVtcImNhcmRcIl1bXCJwaW5cIl1cbiAgICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICBjcmVhdGVkOiBjb250ZW50W1wiZGF0YVwiXVtpXVtcImNyZWF0ZWRcIl0sXG4gICAgICAgICAgICAgICAgICAgICAgICB1cGRhdGVkOiBjb250ZW50W1wiZGF0YVwiXVtpXVtcInVwZGF0ZWRcIl0sXG4gICAgICAgICAgICAgICAgICAgICAgICBpZDogY29udGVudFtcImRhdGFcIl1baV1bXCJpZFwiXSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHN0YXR1czoge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlkOiBjb250ZW50W1wiZGF0YVwiXVtpXVtcInN0YXR1c1wiXVtcImlkXCJdLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6IGNvbnRlbnRbXCJkYXRhXCJdW2ldW1wic3RhdHVzXCJdW1wibmFtZVwiXVxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgY2FyZEFycmF5LnB1c2gob2JqVG9SZXR1cm4pO1xuICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgY2FyZE9ialtcInRoaXJkUGFydHlcIl0gPSBjYXJkQXJyYXk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGNhcmRPYmo7XG4gICAgICAgICAgICB9KSk7XG5cbiAgICAgICAgcmV0dXJuIGZvcmtKb2luKHNwb29uaXR5Q2FyZHMsIHRoaXJkUGFydHlDYXJkcyk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogREVMRVRFIHVzZXIgY2FyZFxuICAgICAqIFxuICAgICAqIFRoaXMgbWV0aG9kIGlzIHVzZWQgdG8gZGVsZXRlIHRoZSB1c2VyJ3MgY2FyZFxuICAgICAqKi9cbiAgICB1c2VyRGVsZXRlQ2FyZChjYXJkOiBDYXJkKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9odHRwLnJlcXVlc3QoJ2RlbGV0ZScsIHRoaXMuX2Jhc2VVcmxVc2VyICsgJ2NhcmQ/c2Vzc2lvbl9rZXk9JyArIGNhcmQuc2Vzc2lvbl9rZXksIHsgYm9keTogeyB1c2VyX2NhcmQ6IGNhcmQuaWQgfSB9KVxuICAgICAgICAgICAgLnBpcGUobWFwKGNvbnRlbnQgPT4ge1xuICAgICAgICAgICAgICAgIHRocm93IChcImVycm9yXCIpO1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiRGVsZXRlIFNwb29uaXR5IGNhcmQgc3VjY2VzczogXCIsIGNvbnRlbnQpO1xuICAgICAgICAgICAgICAgIHJldHVybiBjb250ZW50O1xuICAgICAgICAgICAgfSkpXG4gICAgICAgICAgICAucGlwZShjYXRjaEVycm9yKChlcnJvcikgPT4ge1xuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLl9odHRwLnJlcXVlc3QoJ2RlbGV0ZScsIHRoaXMuX2Jhc2VVcmxVc2VyICsgJ2NhcmQtM3JkcGFydHk/c2Vzc2lvbl9rZXk9JyArIGNhcmQuc2Vzc2lvbl9rZXksIHsgYm9keTogeyB1c2VyX2NhcmQzcmRwYXJ0eTogY2FyZC5pZCB9IH0pXG4gICAgICAgICAgICAgICAgICAgIC5waXBlKG1hcChjb250ZW50ID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiRGVsZXRlIHRoaXJkIHBhcnR5IGNhcmQgc3VjY2VzczogXCIsIGNvbnRlbnQpO1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGNvbnRlbnQ7XG4gICAgICAgICAgICAgICAgICAgIH0pKVxuICAgICAgICAgICAgICAgICAgICAucGlwZShjYXRjaEVycm9yKChlcnJvcikgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGVycm9yW1wic3RhdHVzXCJdID09IDIwMCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiRGVsZXRlIHRoaXJkIHBhcnR5IGNhcmQgc3VjY2VzczogXCIsIGVycm9yKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gZXJyb3I7XG4gICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiRGVsZXRlIHRoaXJkIHBhcnR5IGNhcmQgZmFpbDogXCIsIGVycm9yLmVycm9yLmVycm9yLmVycm9yc1swXS5tZXNzYWdlKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gZXJyb3I7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH0pKTtcbiAgICAgICAgICAgIH0pKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBQVVQgdXNlciBjYXJkIGZvdW5kXG4gICAgICogXG4gICAgICogVGhpcyBtZXRob2QgaXMgdXNlZCB0byBtYXJrIHRoZSB1c2VyJ3MgY2FyZCBhcyBmb3VuZFxuICAgICAqKi9cbiAgICB1c2VyRm91bmRDYXJkKGNhcmQ6IENhcmQpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2h0dHAucHV0KHRoaXMuX2Jhc2VVcmxVc2VyICsgJ2NhcmQvZm91bmQ/c2Vzc2lvbl9rZXk9JyArIGNhcmQuc2Vzc2lvbl9rZXksIGNhcmQpXG4gICAgICAgICAgICAucGlwZShtYXAoY29udGVudCA9PiB7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJGb3VuZCBTcG9vbml0eSBjYXJkOiBcIiwgY29udGVudCk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGNvbnRlbnQ7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgZXJyb3IgPT4ge1xuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLl9odHRwLnB1dCh0aGlzLl9iYXNlVXJsVXNlciArICdjYXJkLTNyZHBhcnR5L2ZvdW5kP3Nlc3Npb25fa2V5PScgKyBjYXJkLnNlc3Npb25fa2V5LCBjYXJkKVxuICAgICAgICAgICAgICAgICAgICAucGlwZShtYXAoY29udGVudCA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gY29udGVudDtcbiAgICAgICAgICAgICAgICAgICAgfSkpO1xuICAgICAgICAgICAgfSkpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFBVVCB1c2VyIGNhcmQgbG9zdFxuICAgICAqIFxuICAgICAqIFRoaXMgbWV0aG9kIGlzIHVzZWQgdG8gbWFyayB0aGUgdXNlcidzIGNhcmQgYXMgbG9zdFxuICAgICAqKi9cbiAgICB1c2VyTG9zdENhcmQoY2FyZDogQ2FyZCkge1xuICAgICAgICByZXR1cm4gdGhpcy5faHR0cC5wdXQodGhpcy5fYmFzZVVybFVzZXIgKyAnY2FyZC9mb3VuZD9zZXNzaW9uX2tleT0nICsgY2FyZC5zZXNzaW9uX2tleSwgY2FyZClcbiAgICAgICAgICAgIC5waXBlKG1hcChjb250ZW50ID0+IHtcbiAgICAgICAgICAgICAgICByZXR1cm4gY29udGVudDtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBlcnJvciA9PiB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuX2h0dHAucHV0KHRoaXMuX2Jhc2VVcmxVc2VyICsgJ2NhcmQtM3JkcGFydHkvZm91bmQ/c2Vzc2lvbl9rZXk9JyArIGNhcmQuc2Vzc2lvbl9rZXksIGNhcmQpXG4gICAgICAgICAgICAgICAgICAgIC5waXBlKG1hcChjb250ZW50ID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBjb250ZW50O1xuICAgICAgICAgICAgICAgICAgICB9KSk7XG4gICAgICAgICAgICB9KSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogUE9TVCB1c2VyIGNyZWRpdCBjYXJkIGFkZFxuICAgICAqIFxuICAgICAqIFRoaXMgbWV0aG9kIGlzIHVzZWQgdG8gYWRkIHRoZSB1c2VyJ3MgY3JlZGl0IGNhcmRcbiAgICAgKiovXG4gICAgdXNlckFkZENyZWRpdENhcmQoY3JlZGl0Q2FyZDogQ3JlZGl0Q2FyZCkge1xuICAgICAgICByZXR1cm4gdGhpcy5faHR0cC5wb3N0KHRoaXMuX2Jhc2VVcmxVc2VyICsgJ2JpbGxpbmctcHJvZmlsZS9hZGQ/c2Vzc2lvbl9rZXk9JyArIGNyZWRpdENhcmQuc2Vzc2lvbl9rZXksIGNyZWRpdENhcmQpXG4gICAgICAgICAgICAucGlwZShtYXAoY29udGVudCA9PiB7XG4gICAgICAgICAgICAgICAgLy8gU2ltcGxpZnkgdGhlIHJldHVybmVkIGRhdGFcbiAgICAgICAgICAgICAgICB0aGlzLl9kYXRhID0ge1xuICAgICAgICAgICAgICAgICAgICBjYXJkOiBjb250ZW50W1wiY2FyZFwiXSxcbiAgICAgICAgICAgICAgICAgICAgY3JlYXRlZDogY29udGVudFtcImNyZWF0ZWRcIl0sXG4gICAgICAgICAgICAgICAgICAgIGV4cGlyeTogY29udGVudFtcImV4cGlyeVwiXSxcbiAgICAgICAgICAgICAgICAgICAgaWQ6IGNvbnRlbnRbXCJpZFwiXSxcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogY29udGVudFtcIm5hbWVcIl0sXG4gICAgICAgICAgICAgICAgICAgIHR5cGU6IGNvbnRlbnRbXCJ0eXBlXCJdXG4gICAgICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLl9kYXRhO1xuICAgICAgICAgICAgfSkpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEdFVCB1c2VyIGNyZWRpdCBjYXJkIGxpc3RcbiAgICAgKiBcbiAgICAgKiBUaGlzIG1ldGhvZCBpcyB1c2VkIHRvIGdldCB0aGUgdXNlcidzIGNyZWRpdCBjYXJkIGxpc3RcbiAgICAgKiovXG4gICAgdXNlckdldENyZWRpdENhcmRzKGNyZWRpdENhcmQ6IENyZWRpdENhcmQpIHtcbiAgICAgICAgdmFyIHVybFN0cmluZyA9IFwiXCI7XG4gICAgICAgIGlmIChjcmVkaXRDYXJkKSB7XG4gICAgICAgICAgICBpZiAoY3JlZGl0Q2FyZC5oYXNPd25Qcm9wZXJ0eShcInBhZ2VcIikpIHtcbiAgICAgICAgICAgICAgICB1cmxTdHJpbmcgKz0gXCImcGFnZT1cIiArIGNyZWRpdENhcmQucGFnZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChjcmVkaXRDYXJkLmhhc093blByb3BlcnR5KFwibGltaXRcIikpIHtcbiAgICAgICAgICAgICAgICB1cmxTdHJpbmcgKz0gXCImbGltaXQ9XCIgKyBjcmVkaXRDYXJkLmxpbWl0O1xuICAgICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdXJsU3RyaW5nID0gXCImcGFnZT0wJmxpbWl0PTEwXCI7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRoaXMuX2h0dHAuZ2V0KHRoaXMuX2Jhc2VVcmxVc2VyICsgJ2JpbGxpbmctcHJvZmlsZS9saXN0P3Nlc3Npb25fa2V5PScgKyBjcmVkaXRDYXJkLnNlc3Npb25fa2V5ICsgdXJsU3RyaW5nKVxuICAgICAgICAgICAgLnBpcGUobWFwKGNvbnRlbnQgPT4ge1xuICAgICAgICAgICAgICAgIC8vIFNpbXBsaWZ5IHRoZSByZXR1cm5lZCBkYXRhXG4gICAgICAgICAgICAgICAgdmFyIGNhcmRBcnJheSA9IFtdO1xuICAgICAgICAgICAgICAgIGZvciAodmFyIGkgaW4gY29udGVudFtcImRhdGFcIl0pIHtcbiAgICAgICAgICAgICAgICAgICAgY29uc3Qgb2JqVG9SZXR1cm4gPSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjYXJkOiBjb250ZW50W1wiZGF0YVwiXVtpXVtcImNhcmRcIl0sXG4gICAgICAgICAgICAgICAgICAgICAgICBjcmVhdGVkOiBjb250ZW50W1wiZGF0YVwiXVtpXVtcImNyZWF0ZWRcIl0sXG4gICAgICAgICAgICAgICAgICAgICAgICBleHBpcnk6IGNvbnRlbnRbXCJkYXRhXCJdW2ldW1wiZXhwaXJ5XCJdLFxuICAgICAgICAgICAgICAgICAgICAgICAgaWQ6IGNvbnRlbnRbXCJkYXRhXCJdW2ldW1wiaWRcIl0sXG4gICAgICAgICAgICAgICAgICAgICAgICBuYW1lOiBjb250ZW50W1wiZGF0YVwiXVtpXVtcIm5hbWVcIl0sXG4gICAgICAgICAgICAgICAgICAgICAgICB0eXBlOiBjb250ZW50W1wiZGF0YVwiXVtpXVtcInR5cGVcIl1cbiAgICAgICAgICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgICAgICAgICBjYXJkQXJyYXkucHVzaChvYmpUb1JldHVybik7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgdGhpcy5fZGF0YSA9IGNhcmRBcnJheTtcblxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLl9kYXRhO1xuICAgICAgICAgICAgfSkpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIERFTEVURSB1c2VyIGNyZWRpdCBjYXJkXG4gICAgICogXG4gICAgICogVGhpcyBtZXRob2QgaXMgdXNlZCB0byBkZWxldGUgdGhlIHVzZXIncyBjcmVkaXQgY2FyZFxuICAgICAqKi9cbiAgICB1c2VyRGVsZXRlQ3JlZGl0Q2FyZChjcmVkaXRDYXJkOiBDcmVkaXRDYXJkKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9odHRwLnJlcXVlc3QoJ2RlbGV0ZScsIHRoaXMuX2Jhc2VVcmxVc2VyICsgJ2JpbGxpbmctcHJvZmlsZT9zZXNzaW9uX2tleT0nICsgY3JlZGl0Q2FyZC5zZXNzaW9uX2tleSwgeyBib2R5OiB7IHVzZXJfYmlsbGluZ3Byb2ZpbGU6IGNyZWRpdENhcmQuaWQgfSB9KVxuICAgICAgICAgICAgLnBpcGUobWFwKGNvbnRlbnQgPT4ge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiQ3JlZGl0IGNhcmQgZGVsZXRlOiBcIiwgY29udGVudCk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGNvbnRlbnQ7XG4gICAgICAgICAgICB9KSlcbiAgICAgICAgICAgIC5waXBlKGNhdGNoRXJyb3IoKGVycm9yKSA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKGVycm9yW1wic3RhdHVzXCJdID09IDIwMCkge1xuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIkRlbGV0ZSBjcmVkaXQgY2FyZCBzdWNjZXNzOiBcIiwgZXJyb3IpO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiRGVsZXRlIGNyZWRpdCBjYXJkIGZhaWw6IFwiLCBlcnJvci5lcnJvci5lcnJvci5lcnJvcnNbMF0ubWVzc2FnZSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHJldHVybiB0aHJvd0Vycm9yKGVycm9yKTtcbiAgICAgICAgICAgIH0pKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBQT1NUIHVzZXIgY3JlZGl0IGNhcmQgcmVsb2FkXG4gICAgICogXG4gICAgICogVGhpcyBtZXRob2QgaXMgdXNlZCB0byByZWxvYWQgdGhlIHVzZXIncyBjcmVkaXQgY2FyZFxuICAgICAqKi9cbiAgICB1c2VyUmVsb2FkQ3JlZGl0Q2FyZChyZWxvYWQ6IFJlbG9hZCkge1xuICAgICAgICByZXR1cm4gdGhpcy5faHR0cC5wb3N0KHRoaXMuX2Jhc2VVcmxVc2VyICsgJ2JpbGxpbmctcHJvZmlsZS9yZWxvYWQ/c2Vzc2lvbl9rZXk9JyArIHJlbG9hZC5zZXNzaW9uX2tleSwgcmVsb2FkKVxuICAgICAgICAgICAgLnBpcGUobWFwKGNvbnRlbnQgPT4ge1xuICAgICAgICAgICAgICAgIGlmIChjb250ZW50W1widHJhbnNhY3Rpb25fc3RhdHVzXCJdW1wibmFtZVwiXSA9PSBcIkNvbXBsZXRlXCIpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fZGF0YVtcInN1Y2Nlc3NcIl0gPSB0cnVlO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX2RhdGFbXCJzdWNjZXNzXCJdID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuX2RhdGE7XG4gICAgICAgICAgICB9KSlcbiAgICAgICAgICAgIC5waXBlKGNhdGNoRXJyb3IoKGVycm9yKSA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKGVycm9yW1wic3RhdHVzXCJdID09IDIwMCkge1xuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIlJlbG9hZCBzdWNjZXNzOiBcIiwgZXJyb3IpO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiUmVsb2FkIGZhaWw6IFwiLCBlcnJvci5lcnJvci5lcnJvci5lcnJvcnNbMF0ubWVzc2FnZSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHJldHVybiB0aHJvd0Vycm9yKGVycm9yKTtcbiAgICAgICAgICAgIH0pKTs7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogUE9TVCBlZ2lmdCBwdXJjaGFzZVxuICAgICAqIFxuICAgICAqIFRoaXMgbWV0aG9kIGlzIHVzZWQgdG8gcHVyY2hhc2UgYW4gZWdpZnRcbiAgICAgKiovXG4gICAgZWdpZnRQdXJjaGFzZShlZ2lmdDogRWdpZnQpIHtcbiAgICAgICAgaWYgKGVnaWZ0LmJpbGxpbmcubmFtZSAhPSBudWxsKSB7XG4gICAgICAgICAgICBlZ2lmdC5iaWxsaW5nLmlkID0gbnVsbDtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiB0aGlzLl9odHRwLnBvc3QodGhpcy5fYmFzZVVybEVnaWZ0ICsgJ3B1cmNoYXNlP3Nlc3Npb25fa2V5PScgKyBlZ2lmdC5zZXNzaW9uX2tleSwgZWdpZnQpXG4gICAgICAgICAgICAucGlwZShtYXAoY29udGVudCA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKGNvbnRlbnRbXCJ0cmFuc2FjdGlvbl9zdGF0dXNcIl1bXCJuYW1lXCJdID09IFwiQ29tcGxldGVcIikge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLl9kYXRhW1wic3VjY2Vzc1wiXSA9IHRydWU7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fZGF0YVtcInN1Y2Nlc3NcIl0gPSBmYWxzZTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5fZGF0YTtcbiAgICAgICAgICAgIH0pKVxuICAgICAgICAgICAgLnBpcGUoY2F0Y2hFcnJvcigoZXJyb3IpID0+IHtcbiAgICAgICAgICAgICAgICBpZiAoZXJyb3JbXCJzdGF0dXNcIl0gPT0gMjAwKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiRWdpZnQgc3VjY2VzczogXCIsIGVycm9yKTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIkVnaWZ0IGZhaWw6IFwiLCBlcnJvci5lcnJvci5lcnJvci5lcnJvcnNbMF0ubWVzc2FnZSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHJldHVybiB0aHJvd0Vycm9yKGVycm9yKTtcbiAgICAgICAgICAgIH0pKTs7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogR0VUIHVzZXIgZ2V0IG1lc3NhZ2VzXG4gICAgICogXG4gICAgICogVGhpcyBtZXRob2QgaXMgdXNlZCB0byBnZXQgYWxsIG9mIHRoZSB1c2VyJ3MgbWVzc2FnZXNcbiAgICAgKiovXG4gICAgdXNlckdldE1lc3NhZ2VzKHNlc3Npb246IFNlc3Npb24pIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2h0dHAuZ2V0KHRoaXMuX2Jhc2VVcmxVc2VyICsgJ21lc3NhZ2UvbGlzdD9zZXNzaW9uX2tleT0nICsgc2Vzc2lvbi5zZXNzaW9uX2tleSlcbiAgICAgICAgICAgIC5waXBlKG1hcChjb250ZW50ID0+IHtcbiAgICAgICAgICAgICAgICAvLyBTaW1wbGlmeSB0aGUgcmV0dXJuZWQgZGF0YVxuICAgICAgICAgICAgICAgIHZhciBtZXNzYWdlQXJyYXkgPSBbXTtcbiAgICAgICAgICAgICAgICBmb3IgKHZhciBpIGluIGNvbnRlbnQpIHtcbiAgICAgICAgICAgICAgICAgICAgY29uc3Qgb2JqVG9SZXR1cm4gPSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB1c2VyX21lc3NhZ2VfaWQ6IGNvbnRlbnRbaV1bXCJ1c2VyX21lc3NhZ2VfaWRcIl0sXG4gICAgICAgICAgICAgICAgICAgICAgICB1c2VyX2lkOiBjb250ZW50W2ldW1widXNlcl9pZFwiXSxcbiAgICAgICAgICAgICAgICAgICAgICAgIG1lc3NhZ2U6IGNvbnRlbnRbaV1bXCJtZXNzYWdlXCJdLFxuICAgICAgICAgICAgICAgICAgICAgICAgcmVhZDogY29udGVudFtpXVtcInJlYWRcIl1cbiAgICAgICAgICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgICAgICAgICBtZXNzYWdlQXJyYXkucHVzaChvYmpUb1JldHVybik7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgIHJldHVybiBtZXNzYWdlQXJyYXk7XG4gICAgICAgICAgICB9KSlcbiAgICAgICAgICAgIC5waXBlKGNhdGNoRXJyb3IoKGVycm9yKSA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKGVycm9yW1wic3RhdHVzXCJdID09IDIwMCkge1xuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIlVzZXIgbWVzc2FnZXMgc3VjY2VzczogXCIsIGVycm9yKTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIlVzZXIgbWVzc2FnZXMgZmFpbDogXCIsIGVycm9yLmVycm9yLmVycm9yLmVycm9yc1swXS5tZXNzYWdlKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRocm93RXJyb3IoZXJyb3IpO1xuICAgICAgICAgICAgfSkpOztcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBHRVQgdXNlciBnZXQgbWVzc2FnZVxuICAgICAqIFxuICAgICAqIFRoaXMgbWV0aG9kIGlzIHVzZWQgdG8gZ2V0IGEgc3BlY2lmaWMgdXNlciBtZXNzYWdlXG4gICAgICoqL1xuICAgIHVzZXJHZXRNZXNzYWdlKG1lc3NhZ2U6IE1lc3NhZ2UpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2h0dHAuZ2V0KHRoaXMuX2Jhc2VVcmxVc2VyICsgJ21lc3NhZ2U/c2Vzc2lvbl9rZXk9JyArIG1lc3NhZ2Uuc2Vzc2lvbl9rZXkgKyAnJnVzZXJfbWVzc2FnZT0nICsgbWVzc2FnZS51c2VyX21lc3NhZ2UpXG4gICAgICAgICAgICAucGlwZShtYXAoY29udGVudCA9PiB7XG4gICAgICAgICAgICAgICAgLy8gU2ltcGxpZnkgdGhlIHJldHVybmVkIGRhdGFcbiAgICAgICAgICAgICAgICB0aGlzLl9kYXRhID0ge1xuICAgICAgICAgICAgICAgICAgICB1c2VyX21lc3NhZ2VfaWQ6IGNvbnRlbnRbXCJ1c2VyX21lc3NhZ2VfaWRcIl0sXG4gICAgICAgICAgICAgICAgICAgIHVzZXJfaWQ6IGNvbnRlbnRbXCJ1c2VyX2lkXCJdLFxuICAgICAgICAgICAgICAgICAgICBtZXNzYWdlOiBjb250ZW50W1wibWVzc2FnZVwiXSxcbiAgICAgICAgICAgICAgICAgICAgcmVhZDogY29udGVudFtcInJlYWRcIl1cbiAgICAgICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuX2RhdGE7XG4gICAgICAgICAgICB9KSlcbiAgICAgICAgICAgIC5waXBlKGNhdGNoRXJyb3IoKGVycm9yKSA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKGVycm9yW1wic3RhdHVzXCJdID09IDIwMCkge1xuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIlVzZXIgbWVzc2FnZSBzdWNjZXNzOiBcIiwgZXJyb3IpO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiVXNlciBtZXNzYWdlIGZhaWw6IFwiLCBlcnJvci5lcnJvci5lcnJvci5lcnJvcnNbMF0ubWVzc2FnZSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHJldHVybiB0aHJvd0Vycm9yKGVycm9yKTtcbiAgICAgICAgICAgIH0pKTs7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogUFVUIHVzZXIgdXBkYXRlIG1lc3NhZ2Ugc3RhdHVzXG4gICAgICogXG4gICAgICogVGhpcyBtZXRob2QgaXMgdXNlZCB0byBlZGl0IHRoZSB1c2VyJ3MgcGFydGljdWxhciBtZXNzYWdlJ3Mgc3RhdHVzXG4gICAgICoqL1xuICAgIHVzZXJVcGRhdGVNZXNzYWdlU3RhdHVzKG1lc3NhZ2U6IE1lc3NhZ2UpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2h0dHAucHV0KHRoaXMuX2Jhc2VVcmxVc2VyICsgJ21lc3NhZ2U/c2Vzc2lvbl9rZXk9JyArIG1lc3NhZ2Uuc2Vzc2lvbl9rZXksIG1lc3NhZ2UpXG4gICAgICAgICAgICAucGlwZShtYXAoY29udGVudCA9PiB7XG4gICAgICAgICAgICAgICAgLy8gU2ltcGxpZnkgdGhlIHJldHVybmVkIGRhdGFcbiAgICAgICAgICAgICAgICB0aGlzLl9kYXRhID0ge1xuICAgICAgICAgICAgICAgICAgICB1c2VyX21lc3NhZ2VfaWQ6IGNvbnRlbnRbXCJ1c2VyX21lc3NhZ2VfaWRcIl0sXG4gICAgICAgICAgICAgICAgICAgIHVzZXJfaWQ6IGNvbnRlbnRbXCJ1c2VyX2lkXCJdLFxuICAgICAgICAgICAgICAgICAgICBtZXNzYWdlOiBjb250ZW50W1wibWVzc2FnZVwiXSxcbiAgICAgICAgICAgICAgICAgICAgcmVhZDogY29udGVudFtcInJlYWRcIl1cbiAgICAgICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuX2RhdGE7XG4gICAgICAgICAgICB9KSlcbiAgICAgICAgICAgIC5waXBlKGNhdGNoRXJyb3IoKGVycm9yKSA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKGVycm9yW1wic3RhdHVzXCJdID09IDIwMCkge1xuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIlVzZXIgdXBkYXRlIG1lc3NhZ2Ugc3RhdHVzIHN1Y2Nlc3M6IFwiLCBlcnJvcik7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJVc2VyIHVwZGF0ZSBtZXNzYWdlIHN0YXR1cyBmYWlsOiBcIiwgZXJyb3IuZXJyb3IuZXJyb3IuZXJyb3JzWzBdLm1lc3NhZ2UpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICByZXR1cm4gdGhyb3dFcnJvcihlcnJvcik7XG4gICAgICAgICAgICB9KSk7O1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEdFVCBwYXNzYm9va1xuICAgICAqIFxuICAgICAqIFRoaXMgbWV0aG9kIGlzIHVzZWQgdG8gZ2V0IHRoZSBwYXNzYm9vayBwa3Bhc3MgZmlsZSBmcm9tIHRoZSBBUElcbiAgICAgKiovXG4gICAgcGFzc2Jvb2tHZXQocGFzc2Jvb2s6IFBhc3Nib29rKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9odHRwLmdldCh0aGlzLl9iYXNlVXJsVmVuZG9yICsgcGFzc2Jvb2sudmVuZG9yX2lkICsgJy9wYXNzYm9vay8nICsgcGFzc2Jvb2sudHlwZSArICcvZXhwb3J0LycgKyBwYXNzYm9vay51c2VyX2lkICsgJz9zZXNzaW9uX2tleT0nICsgcGFzc2Jvb2suc2Vzc2lvbl9rZXkpXG4gICAgICAgICAgICAucGlwZShtYXAoY29udGVudCA9PiB7XG4gICAgICAgICAgICAgICAgLy8gU2ltcGxpZnkgdGhlIHJldHVybmVkIGRhdGFcbiAgICAgICAgICAgICAgICByZXR1cm4gY29udGVudFtcImRhdGFcIl07XG4gICAgICAgICAgICB9KSlcbiAgICAgICAgICAgIC5waXBlKGNhdGNoRXJyb3IoKGVycm9yKSA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKGVycm9yW1wic3RhdHVzXCJdID09IDIwMCkge1xuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIlBhc3Nib29rIGRvd25sb2FkIHN1Y2Nlc3M6IFwiLCBlcnJvcik7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJQYXNzYm9vayBkb3dubG9hZCBmYWlsOiBcIiwgZXJyb3IuZXJyb3IuZXJyb3IuZXJyb3JzWzBdLm1lc3NhZ2UpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICByZXR1cm4gdGhyb3dFcnJvcihlcnJvcik7XG4gICAgICAgICAgICB9KSk7O1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFBPU1QgdXNlciByZXNldCBwYXNzd29yZCBlbWFpbFxuICAgICAqIFxuICAgICAqIFRoaXMgbWV0aG9kIGlzIHVzZWQgdG8gZ2V0IHRoZSBBUEkgdG8gc2VuZCBhbiBlbWFpbCB0byB0aGUgdXNlciBmb3IgYSBwYXNzd29yZCByZXNldCAod2hpY2ggaW5jbHVkZXMgdGhlIHRva2VuKVxuICAgICAqKi9cbiAgICB1c2VyUGFzc3dvcmRSZXNldEVtYWlsKHVzZXI6IFVzZXIpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2h0dHAucG9zdCh0aGlzLl9iYXNlVXJsVXNlciArICdwYXNzd29yZC1yZXNldC9yZXNldCcsIHVzZXIpXG4gICAgICAgICAgICAucGlwZShtYXAoY29udGVudCA9PiB7XG4gICAgICAgICAgICAgICAgLy8gU2ltcGxpZnkgdGhlIHJldHVybmVkIGRhdGFcbiAgICAgICAgICAgICAgICByZXR1cm4gXCJQYXNzd29yZCByZXNldCBlbWFpbCBzdWNjZXNzZnVsbHkgc2VudC5cIjtcbiAgICAgICAgICAgIH0pKVxuICAgICAgICAgICAgLnBpcGUoY2F0Y2hFcnJvcigoZXJyb3IpID0+IHtcbiAgICAgICAgICAgICAgICBpZiAoZXJyb3JbXCJzdGF0dXNcIl0gPT0gMjAwKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiVXNlciBwYXNzd29yZCByZXNldCBlbWFpbCBzZW50IHN1Y2Nlc3M6IFwiLCBlcnJvcik7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJVc2VyIHBhc3N3b3JkIHJlc2V0IGVtYWlsIHNlbnQgZmFpbDogXCIsIGVycm9yLmVycm9yLmVycm9yLmVycm9yc1swXS5tZXNzYWdlKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRocm93RXJyb3IoZXJyb3IpO1xuICAgICAgICAgICAgfSkpOztcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBQT1NUIHVzZXIgcmVzZXQgcGFzc3dvcmRcbiAgICAgKiBcbiAgICAgKiBUaGlzIG1ldGhvZCBpcyB1c2VkIHRvIHNldCB0aGUgdXNlcidzIG5ldyBwYXNzd29yZCB3aXRoIGFuIGF1dGhlbnRpY2F0aW9uIHRva2VuXG4gICAgICoqL1xuICAgIHVzZXJQYXNzd29yZFJlc2V0QXBwbHkodXNlcjogVXNlcikge1xuICAgICAgICByZXR1cm4gdGhpcy5faHR0cC5wb3N0KHRoaXMuX2Jhc2VVcmxVc2VyICsgJ3Bhc3N3b3JkLXJlc2V0L2FwcGx5JywgdXNlcilcbiAgICAgICAgICAgIC5waXBlKG1hcChjb250ZW50ID0+IHtcbiAgICAgICAgICAgICAgICAvLyBTaW1wbGlmeSB0aGUgcmV0dXJuZWQgZGF0YVxuICAgICAgICAgICAgICAgIHJldHVybiBcIlBhc3N3b3JkIHN1Y2Nlc3NmdWxseSByZXNldC5cIjtcbiAgICAgICAgICAgIH0pKVxuICAgICAgICAgICAgLnBpcGUoY2F0Y2hFcnJvcigoZXJyb3IpID0+IHtcbiAgICAgICAgICAgICAgICBpZiAoZXJyb3JbXCJzdGF0dXNcIl0gPT0gMjAwKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiVXNlciBwYXNzd29yZCByZXNldCBzdWNjZXNzOiBcIiwgZXJyb3IpO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiVXNlciBwYXNzd29yZCByZXNldCBmYWlsOiBcIiwgZXJyb3IuZXJyb3IuZXJyb3IuZXJyb3JzWzBdLm1lc3NhZ2UpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICByZXR1cm4gdGhyb3dFcnJvcihlcnJvcik7XG4gICAgICAgICAgICB9KSk7O1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFBPU1QgdXNlciBnZXQgdG9rZW5cbiAgICAgKiBcbiAgICAgKiBUaGlzIG1ldGhvZCBpcyB1c2VkIHRvIGdldCBhIHVzZXIgdG9rZW4gZGVwZW5kaW5nIG9uIHRoZSB0eXBlIHNwZWNpZmllZFxuICAgICAqKi9cbiAgICB1c2VyR2V0VG9rZW4odG9rZW46IFRva2VuKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9odHRwLnBvc3QodGhpcy5fYmFzZVVybFVzZXIgKyAndG9rZW4vcmVxdWVzdD9zZXNzaW9uX2tleT0nICsgdG9rZW4uc2Vzc2lvbl9rZXksIHRva2VuKVxuICAgICAgICAgICAgLnBpcGUobWFwKGNvbnRlbnQgPT4ge1xuICAgICAgICAgICAgICAgIC8vIFNpbXBsaWZ5IHRoZSByZXR1cm5lZCBkYXRhXG4gICAgICAgICAgICAgICAgY29uc3Qgb2JqVG9SZXR1cm4gPSB7XG4gICAgICAgICAgICAgICAgICAgIGJhcmNvZGU6IGNvbnRlbnRbXCJiYXJjb2RlXCJdLFxuICAgICAgICAgICAgICAgICAgICBjcmVhdGVkOiBjb250ZW50W1wiY3JlYXRlZFwiXSxcbiAgICAgICAgICAgICAgICAgICAgZXhwaXJ5OiBjb250ZW50W1wiZXhwaXJ5XCJdLFxuICAgICAgICAgICAgICAgICAgICB0b2tlbjogY29udGVudFtcInRva2VuXCJdLFxuICAgICAgICAgICAgICAgICAgICB1cGRhdGVkOiBjb250ZW50W1widXBkYXRlZFwiXVxuICAgICAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgICAgICByZXR1cm4gb2JqVG9SZXR1cm47XG4gICAgICAgICAgICB9KSlcbiAgICAgICAgICAgIC5waXBlKGNhdGNoRXJyb3IoKGVycm9yKSA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKGVycm9yW1wic3RhdHVzXCJdID09IDIwMCkge1xuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIlVzZXIgZ2V0IHRva2VuIHN1Y2Nlc3M6IFwiLCBlcnJvcik7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJVc2VyIGdldCB0b2tlbiBmYWlsOiBcIiwgZXJyb3IuZXJyb3IuZXJyb3IuZXJyb3JzWzBdLm1lc3NhZ2UpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICByZXR1cm4gdGhyb3dFcnJvcihlcnJvcik7XG4gICAgICAgICAgICB9KSk7O1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFBPU1QgdXNlciBzZW5kIHRpcFxuICAgICAqIFxuICAgICAqIFRoaXMgbWV0aG9kIGlzIHVzZWQgdG8gc2VuZCBhIHRpcCBiYXNlZCBvbiB0cmFuc2FjdGlvbiBJRFxuICAgICAqKi9cbiAgICB1c2VyU2VuZFRpcCh0cmFuc2FjdGlvbjogVHJhbnNhY3Rpb25UaXApIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2h0dHAucG9zdCh0aGlzLl9iYXNlVXJsVXNlciArICd0cmFuc2FjdGlvbi90aXA/c2Vzc2lvbl9rZXk9JyArIHRyYW5zYWN0aW9uLnNlc3Npb25fa2V5LCB0cmFuc2FjdGlvbilcbiAgICAgICAgICAgIC5waXBlKG1hcChjb250ZW50ID0+IHtcbiAgICAgICAgICAgICAgICAvLyBTaW1wbGlmeSB0aGUgcmV0dXJuZWQgZGF0YVxuICAgICAgICAgICAgICAgIHJldHVybiBcIlRpcCBzdWNjZXNzZnVsbHkgc2VudC5cIjtcbiAgICAgICAgICAgIH0pKVxuICAgICAgICAgICAgLnBpcGUoY2F0Y2hFcnJvcigoZXJyb3IpID0+IHtcbiAgICAgICAgICAgICAgICBpZiAoZXJyb3JbXCJzdGF0dXNcIl0gPT0gMjAwKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiVXNlciBzZW5kIHRpcCBzdWNjZXNzOiBcIiwgZXJyb3IpO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiVXNlciBzZW5kIHRpcCBmYWlsOiBcIiwgZXJyb3IuZXJyb3IuZXJyb3IuZXJyb3JzWzBdLm1lc3NhZ2UpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICByZXR1cm4gdGhyb3dFcnJvcihlcnJvcik7XG4gICAgICAgICAgICB9KSk7O1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFBPU1QgdXNlciBzZW5kIHJhdGluZ1xuICAgICAqIFxuICAgICAqIFRoaXMgbWV0aG9kIGlzIHVzZWQgdG8gc2VuZCBhIHJhdGluZyBiYXNlZCBvbiB0cmFuc2FjdGlvbiBJRFxuICAgICAqKi9cbiAgICB1c2VyU2VuZFJhdGluZyh0cmFuc2FjdGlvbjogVHJhbnNhY3Rpb25SYXRlKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9odHRwLnBvc3QodGhpcy5fYmFzZVVybFVzZXIgKyAndHJhbnNhY3Rpb24vcmF0ZT9zZXNzaW9uX2tleT0nICsgdHJhbnNhY3Rpb24uc2Vzc2lvbl9rZXksIHRyYW5zYWN0aW9uKVxuICAgICAgICAgICAgLnBpcGUobWFwKGNvbnRlbnQgPT4ge1xuICAgICAgICAgICAgICAgIC8vIFNpbXBsaWZ5IHRoZSByZXR1cm5lZCBkYXRhXG4gICAgICAgICAgICAgICAgcmV0dXJuIFwiUmF0aW5nIHN1Y2Nlc3NmdWxseSBzZW50LlwiO1xuICAgICAgICAgICAgfSkpXG4gICAgICAgICAgICAucGlwZShjYXRjaEVycm9yKChlcnJvcikgPT4ge1xuICAgICAgICAgICAgICAgIGlmIChlcnJvcltcInN0YXR1c1wiXSA9PSAyMDApIHtcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJVc2VyIHNlbmQgcmF0aW5nIHN1Y2Nlc3M6IFwiLCBlcnJvcik7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJVc2VyIHNlbmQgcmF0aW5nIGZhaWw6IFwiLCBlcnJvci5lcnJvci5lcnJvci5lcnJvcnNbMF0ubWVzc2FnZSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHJldHVybiB0aHJvd0Vycm9yKGVycm9yKTtcbiAgICAgICAgICAgIH0pKTs7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogR0VUIHZlbmRvciBzdG9yZSBsaXN0XG4gICAgICogXG4gICAgICogVGhpcyBtZXRob2QgaXMgdXNlZCB0byBnZXQgYSBsaXN0IG9mIGFsbCB0aGUgdmVuZG9yJ3Mgc3RvcmVzXG4gICAgICoqL1xuICAgIHZlbmRvckdldFN0b3JlTGlzdCh2ZW5kb3I6IFZlbmRvcikge1xuICAgICAgICByZXR1cm4gdGhpcy5faHR0cC5nZXQodGhpcy5fYmFzZVVybFZlbmRvciArICdzdG9yZS9saXN0P3ZlbmRvcj0nICsgdmVuZG9yLnZlbmRvcl9pZClcbiAgICAgICAgICAgIC5waXBlKG1hcChjb250ZW50ID0+IHtcbiAgICAgICAgICAgICAgICAvLyBTaW1wbGlmeSB0aGUgcmV0dXJuZWQgZGF0YVxuICAgICAgICAgICAgICAgIHZhciBzdG9yZUFycmF5ID0gW107XG4gICAgICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBjb250ZW50W1wiZGF0YVwiXS5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgICAgICBzdG9yZUFycmF5W2ldID0ge1xuICAgICAgICAgICAgICAgICAgICAgICAgYWRkcmVzc19saW5lXzE6IGNvbnRlbnRbXCJkYXRhXCJdW2ldW1wiYWRkcmVzc19saW5lXzFcIl0sXG4gICAgICAgICAgICAgICAgICAgICAgICBjaXR5OiBjb250ZW50W1wiZGF0YVwiXVtpXVtcImNpdHlcIl0sXG4gICAgICAgICAgICAgICAgICAgICAgICBjb3VudHJ5OiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY291bnRyeV9pZDogY29udGVudFtcImRhdGFcIl1baV1bXCJjb3VudHJ5XCJdW1wiY291bnRyeV9pZFwiXSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb2RlOiBjb250ZW50W1wiZGF0YVwiXVtpXVtcImNvdW50cnlcIl1bXCJjb2RlXCJdLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6IGNvbnRlbnRbXCJkYXRhXCJdW2ldW1wiY291bnRyeVwiXVtcIm5hbWVcIl1cbiAgICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICBkaXN0YW5jZTogY29udGVudFtcImRhdGFcIl1baV1bXCJkaXN0YW5jZVwiXSxcbiAgICAgICAgICAgICAgICAgICAgICAgIGVtYWlsX2FkZHJlc3M6IGNvbnRlbnRbXCJkYXRhXCJdW2ldW1wiZW1haWxfYWRkcmVzc1wiXSxcbiAgICAgICAgICAgICAgICAgICAgICAgIGhvdXJzX29mX29wZXJhdGlvbjogY29udGVudFtcImRhdGFcIl1baV1bXCJob3Vyc19vZl9vcGVyYXRpb25cIl0sXG4gICAgICAgICAgICAgICAgICAgICAgICBpc19vcGVuOiBjb250ZW50W1wiZGF0YVwiXVtpXVtcImlzX29wZW5cIl0sXG4gICAgICAgICAgICAgICAgICAgICAgICBsYXRpdHVkZTogY29udGVudFtcImRhdGFcIl1baV1bXCJsYXRpdHVkZVwiXSxcbiAgICAgICAgICAgICAgICAgICAgICAgIGxvbmdpdHVkZTogY29udGVudFtcImRhdGFcIl1baV1bXCJsb25naXR1ZGVcIl0sXG4gICAgICAgICAgICAgICAgICAgICAgICBuYW1lOiBjb250ZW50W1wiZGF0YVwiXVtpXVtcIm5hbWVcIl0sXG4gICAgICAgICAgICAgICAgICAgICAgICBwYXJlbnQ6IGNvbnRlbnRbXCJkYXRhXCJdW2ldW1wicGFyZW50XCJdLFxuICAgICAgICAgICAgICAgICAgICAgICAgcGhvbmVfbnVtYmVyOiBjb250ZW50W1wiZGF0YVwiXVtpXVtcInBob25lX251bWJlclwiXSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHBvc3RhbF9jb2RlOiBjb250ZW50W1wiZGF0YVwiXVtpXVtcInBvc3RhbF9jb2RlXCJdLFxuICAgICAgICAgICAgICAgICAgICAgICAgcmVnaW9uOiBjb250ZW50W1wiZGF0YVwiXVtpXVtcInJlZ2lvblwiXSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHRpbWV6b25lOiBjb250ZW50W1wiZGF0YVwiXVtpXVtcInRpbWV6b25lXCJdLFxuICAgICAgICAgICAgICAgICAgICAgICAgdmVuZG9yX2F0dHJpYnV0ZTogY29udGVudFtcImRhdGFcIl1baV1bXCJ2ZW5kb3JfYXR0cmlidXRlXCJdLFxuICAgICAgICAgICAgICAgICAgICAgICAgZmF2b3VyaXRlOiBjb250ZW50W1wiZGF0YVwiXVtpXVtcImZhdm91cml0ZVwiXSxcbiAgICAgICAgICAgICAgICAgICAgICAgIGlkOiBjb250ZW50W1wiZGF0YVwiXVtpXVtcImlkXCJdXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBjb25zdCBvYmpUb1JldHVybiA9IHtcbiAgICAgICAgICAgICAgICAgICAgY291bnQ6IGNvbnRlbnRbXCJjb3VudFwiXSxcbiAgICAgICAgICAgICAgICAgICAgZGF0YTogc3RvcmVBcnJheVxuICAgICAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgICAgICByZXR1cm4gb2JqVG9SZXR1cm47XG4gICAgICAgICAgICB9KSlcbiAgICAgICAgICAgIC5waXBlKGNhdGNoRXJyb3IoKGVycm9yKSA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKGVycm9yW1wic3RhdHVzXCJdID09IDIwMCkge1xuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIlZlbmRvciBnZXQgc3RvcmUgbGlzdCBzdWNjZXNzOiBcIiwgZXJyb3IpO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiVmVuZG9yIGdldCBzdG9yZSBsaXN0IGZhaWw6IFwiLCBlcnJvci5lcnJvci5lcnJvci5lcnJvcnNbMF0ubWVzc2FnZSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHJldHVybiB0aHJvd0Vycm9yKGVycm9yKTtcbiAgICAgICAgICAgIH0pKTs7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogR0VUIHVzZXIgZmF2b3JpdGUgc3RvcmUgbGlzdFxuICAgICAqIFxuICAgICAqIFRoaXMgbWV0aG9kIGlzIHVzZWQgdG8gZ2V0IGEgbGlzdCBvZiBhbGwgdGhlIHVzZXIncyBmYXZvcml0ZSBzdG9yZXMgZm9yIGEgcGFydGljdWxhciB2ZW5kb3JcbiAgICAgKiovXG4gICAgdXNlckdldEZhdm9yaXRlU3RvcmVMaXN0KHNlc3Npb25fZGF0YTogU2Vzc2lvbikge1xuICAgICAgICByZXR1cm4gdGhpcy5faHR0cC5nZXQodGhpcy5fYmFzZVVybFVzZXIgKyAndmVuZG9yL2Zhdm9yaXRlLWxvY2F0aW9uL2xpc3Q/c2Vzc2lvbl9rZXk9JyArIHNlc3Npb25fZGF0YS5zZXNzaW9uX2tleSlcbiAgICAgICAgICAgIC5waXBlKG1hcChjb250ZW50ID0+IHtcbiAgICAgICAgICAgICAgICAvLyBTaW1wbGlmeSB0aGUgcmV0dXJuZWQgZGF0YVxuICAgICAgICAgICAgICAgIGNvbnN0IG9ialRvUmV0dXJuID0gY29udGVudDtcblxuICAgICAgICAgICAgICAgIHJldHVybiBvYmpUb1JldHVybjtcbiAgICAgICAgICAgIH0pKVxuICAgICAgICAgICAgLnBpcGUoY2F0Y2hFcnJvcigoZXJyb3IpID0+IHtcbiAgICAgICAgICAgICAgICBpZiAoZXJyb3JbXCJzdGF0dXNcIl0gPT0gMjAwKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiVXNlciBnZXQgZmF2b3JpdGUgc3RvcmUgbGlzdCBzdWNjZXNzOiBcIiwgZXJyb3IpO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiVXNlciBnZXQgZmF2b3JpdGUgc3RvcmUgbGlzdCBmYWlsOiBcIiwgZXJyb3IuZXJyb3IuZXJyb3IuZXJyb3JzWzBdLm1lc3NhZ2UpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICByZXR1cm4gdGhyb3dFcnJvcihlcnJvcik7XG4gICAgICAgICAgICB9KSk7O1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFBPU1QgdmVuZG9yIHN0b3JlIGNoZWNraW5cbiAgICAgKiBcbiAgICAgKiBUaGlzIG1ldGhvZCBpcyB1c2VkIHRvIGNoZWNrLWluIGEgc3RvcmVcbiAgICAgKiovXG4gICAgdmVuZG9yQ2hlY2tpblN0b3JlKHZlbmRvcjogVmVuZG9yKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9odHRwLnBvc3QodGhpcy5fYmFzZVVybFZlbmRvciArICdzdG9yZS9jaGVjay1pbj9zZXNzaW9uX2tleT0nICsgdmVuZG9yLnNlc3Npb25fa2V5LCB2ZW5kb3IpXG4gICAgICAgICAgICAucGlwZShtYXAoY29udGVudCA9PiB7XG4gICAgICAgICAgICAgICAgLy8gU2ltcGxpZnkgdGhlIHJldHVybmVkIGRhdGFcbiAgICAgICAgICAgICAgICByZXR1cm4gXCJTdWNjZXNzZnVsbHkgY2hlY2tlZCBpbi5cIjtcbiAgICAgICAgICAgIH0pKVxuICAgICAgICAgICAgLnBpcGUoY2F0Y2hFcnJvcigoZXJyb3IpID0+IHtcbiAgICAgICAgICAgICAgICBpZiAoZXJyb3JbXCJzdGF0dXNcIl0gPT0gMjAwKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiVmVuZG9yIGNoZWNrLWluIHN1Y2Nlc3M6IFwiLCBlcnJvcik7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJWZW5kb3IgY2hlY2staW4gZmFpbDogXCIsIGVycm9yLmVycm9yLmVycm9yLmVycm9yc1swXS5tZXNzYWdlKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRocm93RXJyb3IoZXJyb3IpO1xuICAgICAgICAgICAgfSkpOztcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBERUxFVEUgdmVuZG9yIGRlbGV0ZSB1c2VyIGVtYWlsXG4gICAgICogXG4gICAgICogVGhpcyBtZXRob2QgaXMgdXNlZCB0byBzZW5kIGFuIGVtYWlsIHRvIGEgY3VzdG9tZXIgKHVzZXIpIGFjY291bnQgZm9yIGRlbGV0aW9uXG4gICAgICoqL1xuICAgIHZlbmRvckRlbGV0ZVVzZXJFbWFpbCh1c2VyOiBVc2VyKSB7XG4gICAgICAgIHZhciBjdXN0b21lcklkID0gMDtcbiAgICAgICAgaWYgKHVzZXIpIHtcbiAgICAgICAgICAgIGlmICh1c2VyLmhhc093blByb3BlcnR5KFwiaWRcIikpIHtcbiAgICAgICAgICAgICAgICBjdXN0b21lcklkID0gdXNlci5pZDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0aGlzLl9odHRwLnJlcXVlc3QoJ2RlbGV0ZScsIHRoaXMuX2Jhc2VVcmxWZW5kb3IgKyB1c2VyLnZlbmRvcl9pZCArICcvY3VzdG9tZXJzLycgKyB1c2VyLmlkICsgJy9zdWJtaXQ/c2Vzc2lvbl9rZXk9JyArIHVzZXIuc2Vzc2lvbl9rZXksIHsgYm9keTogeyBpZDogY3VzdG9tZXJJZCB9IH0pXG4gICAgICAgICAgICAucGlwZShtYXAoY29udGVudCA9PiB7XG4gICAgICAgICAgICAgICAgLy8gU2ltcGxpZnkgdGhlIHJldHVybmVkIGRhdGFcbiAgICAgICAgICAgICAgICByZXR1cm4ge3Jlc3BvbnNlOlwiRGVsZXRlIGFjY291bnQgZW1haWwgc3VjY2Vzc2Z1bGx5IHNlbnQuXCJ9O1xuICAgICAgICAgICAgfSkpXG4gICAgICAgICAgICAucGlwZShjYXRjaEVycm9yKChlcnJvcikgPT4ge1xuICAgICAgICAgICAgICAgIGlmIChlcnJvcltcInN0YXR1c1wiXSA9PSAyMDApIHtcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJWZW5kb3Igc2VuZCBkZWxldGUgdXNlciBlbWFpbCBzdWNjZXNzOiBcIiwgZXJyb3IpO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiVmVuZG9yIHNlbmQgZGVsZXRlIHVzZXIgZW1haWwgZmFpbDogXCIsIGVycm9yLmVycm9yLmVycm9yLmVycm9yc1swXS5tZXNzYWdlKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRocm93RXJyb3IoZXJyb3IpO1xuICAgICAgICAgICAgfSkpOztcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBERUxFVEUgdmVuZG9yIGRlbGV0ZSB1c2VyIGVtYWlsXG4gICAgICogXG4gICAgICogVGhpcyBtZXRob2QgaXMgdXNlZCB0byBzZW5kIGFuIGVtYWlsIHRvIGEgY3VzdG9tZXIgKHVzZXIpIGFjY291bnQgZm9yIGRlbGV0aW9uXG4gICAgICoqL1xuICAgIHZlbmRvckRlbGV0ZVVzZXJBcHBseSh1c2VyOiBVc2VyKSB7XG4gICAgICAgIHZhciBjdXN0b21lcklkID0gMDtcbiAgICAgICAgaWYgKHVzZXIpIHtcbiAgICAgICAgICAgIGlmICh1c2VyLmhhc093blByb3BlcnR5KFwiaWRcIikpIHtcbiAgICAgICAgICAgICAgICBjdXN0b21lcklkID0gdXNlci5pZDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHRoaXMuX2h0dHAucmVxdWVzdCgnZGVsZXRlJywgdGhpcy5fYmFzZVVybFZlbmRvciArIHVzZXIudmVuZG9yX2lkICsgJy9jdXN0b21lcnMvJyArIHVzZXIuaWQsIHsgYm9keTogeyBjb2RlOiB1c2VyLmNvZGUsIGlkOiBjdXN0b21lcklkIH0gfSlcbiAgICAgICAgICAgIC5waXBlKG1hcChjb250ZW50ID0+IHtcbiAgICAgICAgICAgICAgICAvLyBTaW1wbGlmeSB0aGUgcmV0dXJuZWQgZGF0YVxuICAgICAgICAgICAgICAgIHJldHVybiBcIkRlbGV0ZSBhY2NvdW50IGVtYWlsIHN1Y2Nlc3NmdWxseSBkZWxldGVkLlwiO1xuICAgICAgICAgICAgfSkpXG4gICAgICAgICAgICAucGlwZShjYXRjaEVycm9yKChlcnJvcikgPT4ge1xuICAgICAgICAgICAgICAgIGlmIChlcnJvcltcInN0YXR1c1wiXSA9PSAyMDApIHtcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJWZW5kb3IgZGVsZXRlIHVzZXIgc3VjY2VzczogXCIsIGVycm9yKTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIlZlbmRvciBkZWxldGUgdXNlciBmYWlsOiBcIiwgZXJyb3IuZXJyb3IuZXJyb3IuZXJyb3JzWzBdLm1lc3NhZ2UpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICByZXR1cm4gdGhyb3dFcnJvcihlcnJvcik7XG4gICAgICAgICAgICB9KSk7O1xuICAgIH1cbn1cbiJdfQ==