import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { forkJoin } from "rxjs";
import { catchError } from "rxjs/internal/operators";
import { User } from "./user.model";
import { Token } from "./token.model";
import { Card } from "./card.model";
import { CreditCard } from "./creditcard.model";
import { Egift } from "./egift.model";
import { Reload } from "./reload.model";
import { Message } from "./message.model";
import { Passbook } from "./passbook.model";
import { TransactionRate } from "./transactionrate.model";
import { TransactionTip } from "./transactiontip.model";
import { Vendor } from "./vendor.model";
import { Session } from "./session.model";
import { HttpClient } from "@angular/common/http";
import { map } from 'rxjs/operators';
import { Constants } from './constants.config';
import { throwError } from 'rxjs';

@Injectable()
export class SpoonityService {
    _baseUrlUser = '';
    _baseUrlEgift = '';
    _baseUrlVendor = '';
    _errorCodes = [];
    _httpSettings = {
        responseType: 'text'
    };
    _session_key = '';
    _data = {};

    constructor(
        private _http: HttpClient
    ) {
        this._baseUrlUser = Constants.ENDPOINT + '/user/';
        this._baseUrlEgift = Constants.ENDPOINT + '/egift/';
        this._baseUrlVendor = Constants.ENDPOINT + '/vendor/';
        this._errorCodes = Constants.ERRORCODES;
    }

    /**
     * POST user register
     * 
     * This method is used to register a new user, usually we run the authenticate method after depending on the vendor's validation options
     */
    userRegister(user: User) {
        return this._http.post(this._baseUrlUser + 'register', user)
            .pipe(map(content => {
                this._data = {
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
                return this._data;
            }));
    }

    /**
     * POST user authenthicate
     * 
     * This method is used to check whether or not the credentials provided are valid for user login
     **/
    userAuthenticate(user: User) {
        return this._http.post(this._baseUrlUser + 'authenticate', user)
            .pipe(map(content => {
                this._data = {
                    first_login: content["first_login"],
                    online_order_token: content["online_order_token"],
                    session_key: content["session_identifier"],
                    vendor_id: content["user_vendor"]["vendor"]["id"],
                    user_id: content["user_vendor"]["user"]["id"]
                };

                return this._data;
            }));
    }

    /**
     * GET user exists
     * 
     * This method is used to check whether or not the email provided is available to be registered or not
     **/
    userExists(user: User) {
        return this._http.get(this._baseUrlUser + 'email/exists?email=' + user.email_address)
            .pipe(map(content => {
                this._data = {
                    exists: content["exists"],
                    vendor: {
                        id: content["vendor"] ? content["vendor"]["id"] : null,
                        name: content["vendor"] ? content["vendor"]["name"] : null
                    }
                }

                return this._data;
            }));
    }

    /**
     * GET cedula exists
     * 
     * This method is used to check whether or not the cedula provided is available to be registered or not (vendors can allow multiple to be registered to various accounts)
     **/
    cedulaExists(user: User) {
        return this._http.get(this._baseUrlUser + 'cedula/exists?cedula=' + user.cedula)
            .pipe(map(content => {
                this._data = {
                    exists: content["exists"],
                    valid: content["valid"],
                    vendor: {
                        id: content["vendor"] ? content["vendor"]["id"] : null,
                        name: content["vendor"] ? content["vendor"]["name"] : null
                    }
                }

                return this._data;
            }));
    }

    /**
     * GET mobile exists
     * 
     * This method is used to check whether or not the phone number provided is available to be registered or not (vendors can allow multiple to be registered to various accounts)
     **/
    mobileExists(user: User) {
        return this._http.get(this._baseUrlUser + 'mobile/exists?mobile=' + user.mobile + '&vendor=' + user.vendor + '&country=' + user.country)
            .pipe(map(content => {
                this._data = {
                    available: content["available"]
                }

                return this._data;
            }));
    }

    /**
     * GET user validated
     * 
     * This method is used to validate a user's session. If it expires then the user is signed out and must sign in again.
     **/
    userValidate(session: Session) {
        return this._http.get(this._baseUrlUser + 'isValidated?session=' + session.session_key)
            .pipe(map(content => {
                this._data = {
                    is_validated: content["isValidated"],
                    phone_number: content["phone_number"],
                    methods: content["methods"],
                    status: {
                        no_verification: content["status"]["No Verification"],
                        email: content["status"]["Email"],
                        sms: content["status"]["Sms"]
                    }
                };

                return this._data;
            }));
    }

    /**
     * GET user activate
     * 
     * This method is used to activate an account 
     **/
    userActivate(user: User) {
        return this._http.get(this._baseUrlUser + 'activate?session_identifier=' + user.session_key + '&token=' + user.token)
            .pipe(map(content => {
                console.log("Activation: ", content);
                return content;
            }));
    }

    /**
     * GET user activate email
     * 
     * This method sends an email to the user's account to activate
     **/
    userActivateEmail(session: Session) {
        return this._http.get(this._baseUrlUser + 'activate/email?session_identifier=' + session.session_key)
            .pipe(map(content => {
                console.log("Email activation: ", content);
                return content;
            }));
    }

    /**
     * GET user activate SMS
     * 
     * This method sends an SMS code to the user's phone to type down in the website activate
     **/
    userActivateSms(user: User) {
        return this._http.get(this._baseUrlUser + 'activate/sms?session_identifier=' + user.session_key + '&phone=' + user.mobile + '&country=' + user.country)
            .pipe(map(content => {
                console.log("SMS activation: ", content);
                return content;
            }));
    }

    /**
     * PUT user profile
     * 
     * This method is used to update the user's data and saved settings
     **/
    userUpdateProfile(user: User) {
        return this._http.put(this._baseUrlUser + 'profile?session_key=' + user.session_key, user)
            .pipe(map(content => {
                console.log("Update: ", content);
                return content;
            }));
    }

    /**
     * GET user profile
     * 
     * This method is used to grab the user's data and saved settings
     **/
    userGetProfile(session: Session) {
        return this._http.get(this._baseUrlUser + 'profile?session_key=' + session.session_key)
            .pipe(map(content => {
                // Clarify consent data
                var consentSms = false,
                    consentEmail = false;
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

                this._data = {
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
                return this._data;
            }));
    }

    /**
     * GET user reward list
     * 
     * This method is used to get the user's list of available rewards
     **/
    userGetRewards(session: Session) {
        return this._http.get(this._baseUrlUser + 'reward/list?session_key=' + session.session_key)
            .pipe(map(content => {
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
                    }
                    rewardArray.push(tempRewardObj);
                }

                // Simplify the returned data
                this._data = {
                    balances: content["balances"],
                    data: rewardArray,
                    more_pages: more_pages_boolean
                };

                return this._data;
            }));
    }

    /**
     * GET user quick pay balance
     * 
     * This method is used to get the user's quick pay balance
     **/
    userGetQuickPayBalance(session: Session) {
        return this._http.get(this._baseUrlUser + 'quick-pay/balance?session_key=' + session.session_key)
            .pipe(map(content => {
                // Simplify the returned data
                this._data = {
                    amount: content["amount"],
                    currency: {
                        code: content["currency"]["code"],
                        id: content["currency"]["id"],
                        name: content["currency"]["name"],
                        object: content["currency"]["object"]
                    }
                };
                return this._data;
            }));
    }

    /**
     * GET user transaction list
     * 
     * This method is used to get the user's transaction list
     **/
    userGetTransactions(session: Session) {
        return this._http.get(this._baseUrlUser + 'transaction/list?session_key=' + session.session_key)
            .pipe(map(content => {
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
                        }
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
                        }
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
                    }
                    loyaltyArray = [];
                    itemsArray = [];
                    transactionArray.push(tempRewardObj);
                }

                // Simplify the returned data
                this._data = transactionArray;
                return this._data;
            }));
    }

    /**
     * POST user card add
     * 
     * This method is used to add the user's card
     **/
    userAddCard(card: Card) {
        return this._http.post(this._baseUrlUser + 'card/add?session_key=' + card.session_key, card)
            .pipe(map(content => {
                // Simplify the returned data
                this._data = {
                    id: content["id"],
                    number: content["card"]["number"],
                    created: content["created"],
                    updated: content["updated"]
                };

                return this._data;
            }));
    }

    /**
     * GET user card list
     * 
     * This method is used to get the user's card list
     **/
    userGetCards(session: Session) {
        let spoonityCards = this._http.get(this._baseUrlUser + 'card/list?session_key=' + session.session_key)
            .pipe(map(content => {
                // Simplify the returned data
                var cardArray = [];
                var cardObj = {};
                for (var i in content["data"]) {
                    const objToReturn = {
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
                    }

                    cardArray.push(objToReturn);
                };
                cardObj["spoonity"] = cardArray;
                return cardObj;
            }));

        let thirdPartyCards = this._http.get(this._baseUrlUser + 'card-3rdparty/list?session_key=' + session.session_key)
            .pipe(map(content => {
                // Simplify the returned data
                var cardArray = [];
                var cardObj = {};
                for (var i in content["data"]) {
                    const objToReturn = {
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
                    }

                    cardArray.push(objToReturn);
                };
                cardObj["thirdParty"] = cardArray;
                return cardObj;
            }));

        return forkJoin(spoonityCards, thirdPartyCards);
    }

    /**
     * DELETE user card
     * 
     * This method is used to delete the user's card
     **/
    userDeleteCard(card: Card) {
        return this._http.request('delete', this._baseUrlUser + 'card?session_key=' + card.session_key, { body: { user_card: card.id } })
            .pipe(map(content => {
                throw ("error");
                console.log("Delete Spoonity card success: ", content);
                return content;
            }))
            .pipe(catchError((error) => {
                return this._http.request('delete', this._baseUrlUser + 'card-3rdparty?session_key=' + card.session_key, { body: { user_card3rdparty: card.id } })
                    .pipe(map(content => {
                        console.log("Delete third party card success: ", content);
                        return content;
                    }))
                    .pipe(catchError((error) => {
                        if (error["status"] == 200) {
                            console.log("Delete third party card success: ", error);
                            return error;
                        } else {
                            console.log("Delete third party card fail: ", error.error.error.errors[0].message);
                            return error;
                        }
                    }));
            }));
    }

    /**
     * PUT user card found
     * 
     * This method is used to mark the user's card as found
     **/
    userFoundCard(card: Card) {
        return this._http.put(this._baseUrlUser + 'card/found?session_key=' + card.session_key, card)
            .pipe(map(content => {
                console.log("Found Spoonity card: ", content);
                return content;
            },
            error => {
                return this._http.put(this._baseUrlUser + 'card-3rdparty/found?session_key=' + card.session_key, card)
                    .pipe(map(content => {
                        return content;
                    }));
            }));
    }

    /**
     * PUT user card lost
     * 
     * This method is used to mark the user's card as lost
     **/
    userLostCard(card: Card) {
        return this._http.put(this._baseUrlUser + 'card/found?session_key=' + card.session_key, card)
            .pipe(map(content => {
                return content;
            },
            error => {
                return this._http.put(this._baseUrlUser + 'card-3rdparty/found?session_key=' + card.session_key, card)
                    .pipe(map(content => {
                        return content;
                    }));
            }));
    }

    /**
     * POST user credit card add
     * 
     * This method is used to add the user's credit card
     **/
    userAddCreditCard(creditCard: CreditCard) {
        return this._http.post(this._baseUrlUser + 'billing-profile/add?session_key=' + creditCard.session_key, creditCard)
            .pipe(map(content => {
                // Simplify the returned data
                this._data = {
                    card: content["card"],
                    created: content["created"],
                    expiry: content["expiry"],
                    id: content["id"],
                    name: content["name"],
                    type: content["type"]
                };

                return this._data;
            }));
    }

    /**
     * GET user credit card list
     * 
     * This method is used to get the user's credit card list
     **/
    userGetCreditCards(creditCard: CreditCard) {
        var urlString = "";
        if (creditCard) {
            if (creditCard.hasOwnProperty("page")) {
                urlString += "&page=" + creditCard.page;
            }
            if (creditCard.hasOwnProperty("limit")) {
                urlString += "&limit=" + creditCard.limit;
            }
        } else {
            urlString = "&page=0&limit=10";
        }
        return this._http.get(this._baseUrlUser + 'billing-profile/list?session_key=' + creditCard.session_key + urlString)
            .pipe(map(content => {
                // Simplify the returned data
                var cardArray = [];
                for (var i in content["data"]) {
                    const objToReturn = {
                        card: content["data"][i]["card"],
                        created: content["data"][i]["created"],
                        expiry: content["data"][i]["expiry"],
                        id: content["data"][i]["id"],
                        name: content["data"][i]["name"],
                        type: content["data"][i]["type"]
                    };

                    cardArray.push(objToReturn);
                }

                this._data = cardArray;

                return this._data;
            }));
    }

    /**
     * DELETE user credit card
     * 
     * This method is used to delete the user's credit card
     **/
    userDeleteCreditCard(creditCard: CreditCard) {
        return this._http.request('delete', this._baseUrlUser + 'billing-profile?session_key=' + creditCard.session_key, { body: { user_billingprofile: creditCard.id } })
            .pipe(map(content => {
                console.log("Credit card delete: ", content);
                return content;
            }))
            .pipe(catchError((error) => {
                if (error["status"] == 200) {
                    console.log("Delete credit card success: ", error);
                } else {
                    console.log("Delete credit card fail: ", error.error.error.errors[0].message);
                }
                return throwError(error);
            }));
    }

    /**
     * POST user credit card reload
     * 
     * This method is used to reload the user's credit card
     **/
    userReloadCreditCard(reload: Reload) {
        return this._http.post(this._baseUrlUser + 'billing-profile/reload?session_key=' + reload.session_key, reload)
            .pipe(map(content => {
                if (content["transaction_status"]["name"] == "Complete") {
                    this._data["success"] = true;
                } else {
                    this._data["success"] = false;
                }

                return this._data;
            }))
            .pipe(catchError((error) => {
                if (error["status"] == 200) {
                    console.log("Reload success: ", error);
                } else {
                    console.log("Reload fail: ", error.error.error.errors[0].message);
                }
                return throwError(error);
            }));;
    }

    /**
     * POST egift purchase
     * 
     * This method is used to purchase an egift
     **/
    egiftPurchase(egift: Egift) {
        if (egift.billing.name != null) {
            egift.billing.id = null;
        }

        return this._http.post(this._baseUrlEgift + 'purchase?session_key=' + egift.session_key, egift)
            .pipe(map(content => {
                if (content["transaction_status"]["name"] == "Complete") {
                    this._data["success"] = true;
                } else {
                    this._data["success"] = false;
                }

                return this._data;
            }))
            .pipe(catchError((error) => {
                if (error["status"] == 200) {
                    console.log("Egift success: ", error);
                } else {
                    console.log("Egift fail: ", error.error.error.errors[0].message);
                }
                return throwError(error);
            }));;
    }

    /**
     * GET user get messages
     * 
     * This method is used to get all of the user's messages
     **/
    userGetMessages(session: Session) {
        return this._http.get(this._baseUrlUser + 'message/list?session_key=' + session.session_key)
            .pipe(map(content => {
                // Simplify the returned data
                var messageArray = [];
                for (var i in content) {
                    const objToReturn = {
                        user_message_id: content[i]["user_message_id"],
                        user_id: content[i]["user_id"],
                        message: content[i]["message"],
                        read: content[i]["read"]
                    };

                    messageArray.push(objToReturn);
                }
                
                return messageArray;
            }))
            .pipe(catchError((error) => {
                if (error["status"] == 200) {
                    console.log("User messages success: ", error);
                } else {
                    console.log("User messages fail: ", error.error.error.errors[0].message);
                }
                return throwError(error);
            }));;
    }

    /**
     * GET user get message
     * 
     * This method is used to get a specific user message
     **/
    userGetMessage(message: Message) {
        return this._http.get(this._baseUrlUser + 'message?session_key=' + message.session_key + '&user_message=' + message.user_message)
            .pipe(map(content => {
                // Simplify the returned data
                this._data = {
                    user_message_id: content["user_message_id"],
                    user_id: content["user_id"],
                    message: content["message"],
                    read: content["read"]
                };

                return this._data;
            }))
            .pipe(catchError((error) => {
                if (error["status"] == 200) {
                    console.log("User message success: ", error);
                } else {
                    console.log("User message fail: ", error.error.error.errors[0].message);
                }
                return throwError(error);
            }));;
    }

    /**
     * PUT user update message status
     * 
     * This method is used to edit the user's particular message's status
     **/
    userUpdateMessageStatus(message: Message) {
        return this._http.put(this._baseUrlUser + 'message?session_key=' + message.session_key, message)
            .pipe(map(content => {
                // Simplify the returned data
                this._data = {
                    user_message_id: content["user_message_id"],
                    user_id: content["user_id"],
                    message: content["message"],
                    read: content["read"]
                };

                return this._data;
            }))
            .pipe(catchError((error) => {
                if (error["status"] == 200) {
                    console.log("User update message status success: ", error);
                } else {
                    console.log("User update message status fail: ", error.error.error.errors[0].message);
                }
                return throwError(error);
            }));;
    }

    /**
     * GET passbook
     * 
     * This method is used to get the passbook pkpass file from the API
     **/
    passbookGet(passbook: Passbook) {
        return this._http.get(this._baseUrlVendor + passbook.vendor_id + '/passbook/' + passbook.type + '/export/' + passbook.user_id + '?session_key=' + passbook.session_key)
            .pipe(map(content => {
                // Simplify the returned data
                return content["data"];
            }))
            .pipe(catchError((error) => {
                if (error["status"] == 200) {
                    console.log("Passbook download success: ", error);
                } else {
                    console.log("Passbook download fail: ", error.error.error.errors[0].message);
                }
                return throwError(error);
            }));;
    }

    /**
     * POST user reset password email
     * 
     * This method is used to get the API to send an email to the user for a password reset (which includes the token)
     **/
    userPasswordResetEmail(user: User) {
        return this._http.post(this._baseUrlUser + 'password-reset/reset', user)
            .pipe(map(content => {
                // Simplify the returned data
                return "Password reset email successfully sent.";
            }))
            .pipe(catchError((error) => {
                if (error["status"] == 200) {
                    console.log("User password reset email sent success: ", error);
                } else {
                    console.log("User password reset email sent fail: ", error.error.error.errors[0].message);
                }
                return throwError(error);
            }));;
    }

    /**
     * POST user reset password
     * 
     * This method is used to set the user's new password with an authentication token
     **/
    userPasswordResetApply(user: User) {
        return this._http.post(this._baseUrlUser + 'password-reset/apply', user)
            .pipe(map(content => {
                // Simplify the returned data
                return "Password successfully reset.";
            }))
            .pipe(catchError((error) => {
                if (error["status"] == 200) {
                    console.log("User password reset success: ", error);
                } else {
                    console.log("User password reset fail: ", error.error.error.errors[0].message);
                }
                return throwError(error);
            }));;
    }

    /**
     * POST user get token
     * 
     * This method is used to get a user token depending on the type specified
     **/
    userGetToken(token: Token) {
        return this._http.post(this._baseUrlUser + 'token/request?session_key=' + token.session_key, token)
            .pipe(map(content => {
                // Simplify the returned data
                const objToReturn = {
                    barcode: content["barcode"],
                    created: content["created"],
                    expiry: content["expiry"],
                    token: content["token"],
                    updated: content["updated"]
                };

                return objToReturn;
            }))
            .pipe(catchError((error) => {
                if (error["status"] == 200) {
                    console.log("User get token success: ", error);
                } else {
                    console.log("User get token fail: ", error.error.error.errors[0].message);
                }
                return throwError(error);
            }));;
    }

    /**
     * POST user send tip
     * 
     * This method is used to send a tip based on transaction ID
     **/
    userSendTip(transaction: TransactionTip) {
        return this._http.post(this._baseUrlUser + 'transaction/tip?session_key=' + transaction.session_key, transaction)
            .pipe(map(content => {
                // Simplify the returned data
                return "Tip successfully sent.";
            }))
            .pipe(catchError((error) => {
                if (error["status"] == 200) {
                    console.log("User send tip success: ", error);
                } else {
                    console.log("User send tip fail: ", error.error.error.errors[0].message);
                }
                return throwError(error);
            }));;
    }

    /**
     * POST user send rating
     * 
     * This method is used to send a rating based on transaction ID
     **/
    userSendRating(transaction: TransactionRate) {
        return this._http.post(this._baseUrlUser + 'transaction/rate?session_key=' + transaction.session_key, transaction)
            .pipe(map(content => {
                // Simplify the returned data
                return "Rating successfully sent.";
            }))
            .pipe(catchError((error) => {
                if (error["status"] == 200) {
                    console.log("User send rating success: ", error);
                } else {
                    console.log("User send rating fail: ", error.error.error.errors[0].message);
                }
                return throwError(error);
            }));;
    }

    /**
     * GET vendor store list
     * 
     * This method is used to get a list of all the vendor's stores
     **/
    vendorGetStoreList(vendor: Vendor) {
        return this._http.get(this._baseUrlVendor + 'store/list?vendor=' + vendor.vendor_id)
            .pipe(map(content => {
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
                    }
                }

                const objToReturn = {
                    count: content["count"],
                    data: storeArray
                };

                return objToReturn;
            }))
            .pipe(catchError((error) => {
                if (error["status"] == 200) {
                    console.log("Vendor get store list success: ", error);
                } else {
                    console.log("Vendor get store list fail: ", error.error.error.errors[0].message);
                }
                return throwError(error);
            }));;
    }

    /**
     * GET user favorite store list
     * 
     * This method is used to get a list of all the user's favorite stores for a particular vendor
     **/
    userGetFavoriteStoreList(session_data: Session) {
        return this._http.get(this._baseUrlUser + 'vendor/favorite-location/list?session_key=' + session_data.session_key)
            .pipe(map(content => {
                // Simplify the returned data
                const objToReturn = content;

                return objToReturn;
            }))
            .pipe(catchError((error) => {
                if (error["status"] == 200) {
                    console.log("User get favorite store list success: ", error);
                } else {
                    console.log("User get favorite store list fail: ", error.error.error.errors[0].message);
                }
                return throwError(error);
            }));;
    }

    /**
     * POST vendor store checkin
     * 
     * This method is used to check-in a store
     **/
    vendorCheckinStore(vendor: Vendor) {
        return this._http.post(this._baseUrlVendor + 'store/check-in?session_key=' + vendor.session_key, vendor)
            .pipe(map(content => {
                // Simplify the returned data
                return "Successfully checked in.";
            }))
            .pipe(catchError((error) => {
                if (error["status"] == 200) {
                    console.log("Vendor check-in success: ", error);
                } else {
                    console.log("Vendor check-in fail: ", error.error.error.errors[0].message);
                }
                return throwError(error);
            }));;
    }

    /**
     * DELETE vendor delete user email
     * 
     * This method is used to send an email to a customer (user) account for deletion
     **/
    vendorDeleteUserEmail(user: User) {
        var customerId = 0;
        if (user) {
            if (user.hasOwnProperty("id")) {
                customerId = user.id;
            }
        } else {
            return null;
        }
        return this._http.request('delete', this._baseUrlVendor + user.vendor_id + '/customers/' + user.id + '/submit?session_key=' + user.session_key, { body: { id: customerId } })
            .pipe(map(content => {
                // Simplify the returned data
                return {response:"Delete account email successfully sent."};
            }))
            .pipe(catchError((error) => {
                if (error["status"] == 200) {
                    console.log("Vendor send delete user email success: ", error);
                } else {
                    console.log("Vendor send delete user email fail: ", error.error.error.errors[0].message);
                }
                return throwError(error);
            }));;
    }

    /**
     * DELETE vendor delete user email
     * 
     * This method is used to send an email to a customer (user) account for deletion
     **/
    vendorDeleteUserApply(user: User) {
        var customerId = 0;
        if (user) {
            if (user.hasOwnProperty("id")) {
                customerId = user.id;
            }
        } else {
            return null;
        }

        return this._http.request('delete', this._baseUrlVendor + user.vendor_id + '/customers/' + user.id, { body: { code: user.code, id: customerId } })
            .pipe(map(content => {
                // Simplify the returned data
                return "Delete account email successfully deleted.";
            }))
            .pipe(catchError((error) => {
                if (error["status"] == 200) {
                    console.log("Vendor delete user success: ", error);
                } else {
                    console.log("Vendor delete user fail: ", error.error.error.errors[0].message);
                }
                return throwError(error);
            }));;
    }
}
