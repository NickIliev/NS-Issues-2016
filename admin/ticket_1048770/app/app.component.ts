import {Component} from "@angular/core";
import {RouteConfig} from "@angular/router-deprecated";
import {NS_ROUTER_DIRECTIVES, NS_ROUTER_PROVIDERS} from "nativescript-angular/router-deprecated";

//importing classes
import {ListComponent} from "./components/list/list.component";
import {CreateComponent} from "./components/create/create.component";
import {AuthenticationPage} from "./components/authentication/auth.component";
import {MenuComponent} from "./components/menu/menu.component";

@Component({
    selector: "my-app",
    directives: [NS_ROUTER_DIRECTIVES],
    providers: [NS_ROUTER_PROVIDERS],
    template: "<page-router-outlet></page-router-outlet>",  //creates new pages and loads components inside.
})

@RouteConfig([
    { path: "/auth", component: AuthenticationPage, name: "Auth", useAsDefault: true},
    { path: "/menu", component: MenuComponent, name: "Menu"},
    { path: "/list", component: ListComponent, name: "List"},
    { path: "/create", component: CreateComponent, name: "Create" },
   
])

export class AppComponent { }
