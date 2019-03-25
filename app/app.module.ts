import { NgModule, NgModuleFactoryLoader, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptModule } from "nativescript-angular/nativescript.module";
import { NativeScriptHttpClientModule } from "nativescript-angular/http-client";
import { NativeScriptFormsModule } from "nativescript-angular/forms";
import { HttpClientModule } from "@angular/common/http";
import { NativeScriptHttpModule } from 'nativescript-angular/http';

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { SpoonityService } from "./typescript/spoonity.sdk";

@NgModule({
    bootstrap: [
        AppComponent
    ],
    imports: [
        NativeScriptModule,
        NativeScriptFormsModule,
        NativeScriptHttpClientModule,
        AppRoutingModule,
        HttpClientModule,
        NativeScriptHttpModule
    ],
    declarations: [
        AppComponent,
    ],
    providers: [
        SpoonityService
    ],
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})
export class AppModule { }
