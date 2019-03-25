import { ItemEventData } from "ui/list-view"
import { Component, ElementRef, ViewChild } from "@angular/core";
import { Page } from "ui/page";
import { ios } from "application";
declare var UITableViewCellSelectionStyle;
import { alert, prompt } from "tns-core-modules/ui/dialogs";
import { Router } from "@angular/router";
import { SpoonityService } from "../typescript/spoonity.sdk";

import { User } from "../typescript/user.model";
import { Session } from "../typescript/session.model";
import { VendorConfig } from '../shared/vendor.config';

@Component({
	selector: "Login",
	moduleId: module.id,
	templateUrl: "./login.component.html",
	styleUrls: ['./login.component.css']
})
export class LoginComponent {
	user: User;
	processing: boolean;
	appSettings: any;
	session: Session;
	@ViewChild("password") password: ElementRef;

	constructor(
		private page: Page,
		private spoonityService: SpoonityService,
		private router: Router
	) {
		this.page.enableSwipeBackNavigation = false;
		this.page.actionBarHidden = true;
		this.user = new User();
		this.user.vendor = VendorConfig.VENDOR;
		this.processing = false;
		this.appSettings = require("application-settings");

		// Login if we already have a session in storage
		if (this.appSettings.getString("session_key")) {
			this.session = {session_key : this.appSettings.getString("session_key")};
		}
	}

	ngOnInit(): void {
		if (this.session) {
			this.spoonityService.userValidate(this.session)
				.subscribe(data => {
					this.router.navigate(["/home"]);
				},
					err => {
						this.processing = false;
					});
		}
	}

	submit() {
		this.spoonityService.userAuthenticate(this.user)
			.subscribe(data => {
				this.appSettings.setString("session_key", data["session_key"]);
				this.appSettings.setNumber("vendor_id", data["vendor_id"]);
				this.appSettings.setString("user_id", data["user_id"]);
				this.processing = false;
				this.router.navigate(["/home"]);
			},
				err => {
					this.processing = false;
					this.alert("Unfortunately we could not find your account.");
				});
		this.processing = true;
	}

	focusPassword() {
		this.password.nativeElement.focus();
	}

	onItemLoading(args: any) {
		if (ios) {
			const cell = args.ios;
			cell.selectionStyle = UITableViewCellSelectionStyle.UITableViewCellSelectionStyleNone;
		}
	}

	goToRegister() {
		this.router.navigate(["/register"]);
	}

	alert(message: string) {
		return alert({
			title: "Alert",
			okButtonText: "OK",
			message: message
		});
	}
}
