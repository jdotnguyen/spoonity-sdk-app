import { ItemEventData } from "ui/list-view"
import { Component, ElementRef, ViewChild } from "@angular/core";
import { Page } from "ui/page";
import { Switch } from "tns-core-modules/ui/switch";
import { ios } from "application";
declare var UITableViewCellSelectionStyle;
import { alert, prompt } from "tns-core-modules/ui/dialogs";
import { DatePicker } from "tns-core-modules/ui/date-picker";
import { Router } from "@angular/router";
import { SpoonityService } from "../typescript/spoonity.sdk";

import { User } from "../typescript/user.model";
import { VendorConfig } from '../shared/vendor.config';

@Component({
	selector: "Register",
	moduleId: module.id,
	templateUrl: "./register.component.html",
	styleUrls: ['./register.component.css']
})
export class RegisterComponent {
	user: User;
	processing: boolean;
	appSettings: any;
	session: any;
	birthday: any;
	bday: any;
	@ViewChild("password") password: ElementRef;

	constructor(
		private page: Page,
		private spoonityService: SpoonityService,
		private router: Router
	) {
		this.page.actionBarHidden = false;
		this.user = new User();
		this.user.vendor = VendorConfig.VENDOR;
		this.user.language = 1;
		this.user.phone_number = {};
		this.processing = false;
		this.appSettings = require("application-settings");
	}

	ngOnInit(): void {
	}

	submit() {
		this.processing = true;
		this.spoonityService.userRegister(this.user)
			.subscribe(data => {
				this.processing = false;
				this.spoonityService.userAuthenticate(this.user)
					.subscribe(data => {
						this.appSettings.setString("session_key", data["session_key"]);
						this.appSettings.setNumber("vendor_id", data["vendor_id"]);
						this.appSettings.setString("user_id", data["user_id"]);
						this.router.navigate(["/home"]);
					},
						err => {
							this.alert("There was an error upon authentication.");
						});
			},
				err => {
					this.processing = false;
					this.alert("There was an error upon registration.");
				});
	}

	onItemLoading(args: any) {
		if (ios) {
			const cell = args.ios;
			cell.selectionStyle = UITableViewCellSelectionStyle.UITableViewCellSelectionStyleNone;
		}
	}

	tosCheck(event) {
		let tosSwitch = <Switch>event.object;
		if (tosSwitch.checked) {
			this.user.terms = 1;
		} else {
			this.user.terms = 0;
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
