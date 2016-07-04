import {Component} from "@angular/core";
import {RouteConfig} from "@angular/router-deprecated";
import {NS_ROUTER_DIRECTIVES, NS_ROUTER_PROVIDERS} from "nativescript-angular/router";

import {FirstListPage} from "./first-list.component";
import {SecondListPage} from "./second-list.component";

@Component({
  selector: "main",
  directives: [NS_ROUTER_DIRECTIVES],
  providers: [NS_ROUTER_PROVIDERS],
  template: "<page-router-outlet></page-router-outlet>"
})
@RouteConfig([
  { path: "/FirstListPage", component: FirstListPage, name: "FirstListPage"},
  { path: "/SecondListPage", component: SecondListPage, name: "SecondListPage", useAsDefault: true  }
])
export class AppComponent {}