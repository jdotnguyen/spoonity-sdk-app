import { NgModule } from "@angular/core";
import { Routes } from "@angular/router";
import { NativeScriptRouterModule } from "nativescript-angular/router";

const routes: Routes = [
    { path: "", redirectTo: "/home", pathMatch: "full" },
    { path: "login", loadChildren: "./login/login.module#LoginModule" },
    { path: "register", loadChildren: "./register/register.module#RegisterModule" },
    { path: "home", loadChildren: "./home/home.module#HomeModule" },
    { path: "transaction", loadChildren: "./transaction/transaction.module#HomeModule" },
    { path: "message", loadChildren: "./message/message.module#HomeModule" },
    { path: "account", loadChildren: "./account/account.module#HomeModule" },
    { path: "location", loadChildren: "./location/location.module#HomeModule" }
];

@NgModule({
    imports: [NativeScriptRouterModule.forRoot(routes)],
    exports: [NativeScriptRouterModule]
})
export class AppRoutingModule { }
