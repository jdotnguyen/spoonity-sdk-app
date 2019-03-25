import * as geoLocation from "nativescript-geolocation";
import { Component, OnInit, ViewChild, ElementRef, Output, EventEmitter } from "@angular/core";

@Component({
	selector: "BottomBar",
	moduleId: module.id,
	templateUrl: "./bottomBar.component.html",
	styleUrls: ['./bottomBar.component.css']
})
export class BottomBarComponent implements OnInit {
	currentGeoLocation: any;
	message_count: any;

    enableLocationServices(): void {
        geoLocation.isEnabled().then(enabled => {
            if (!enabled) {
                geoLocation.enableLocationRequest().then(() => this.showLocation());
            } else {
                this.showLocation();
            }
        });
    }

    private showLocation(): void {
        geoLocation.watchLocation(location => {
            this.currentGeoLocation = location;
        }, error => {
            alert(error);
        }, {
                desiredAccuracy: 3,
                updateDistance: 10,
                minimumUpdateTime: 1000 * 1
            });
    }

	selectedTab: number = 0;

	@ViewChild('image1') image1: ElementRef;
	@ViewChild('image2') image2: ElementRef;
	@ViewChild('image3') image3: ElementRef;
	@ViewChild('image4') image4: ElementRef;
	@ViewChild('image5') image5: ElementRef;

	@Output() tabSelected = new EventEmitter<number>();

	constructor() {
	}

	ngOnInit(): void {
	}

	ngAfterViewInit() {
	}

	selectTab(index: number) {
		if (index != this.selectedTab) {
			this.selectedTab = index;
			this.tabSelected.emit(this.selectedTab);
		}
	}

	messageCounter(count: number) {
		this.message_count = count;
		console.log('justin', this.message_count);
	}

}