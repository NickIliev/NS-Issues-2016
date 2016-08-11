
import {RouterConfig} from '@angular/router';
import {nsProvideRouter} from 'nativescript-angular/router';

import { BlogComponent } from "../blogs/blog.component";

import { MainComponent } from "../pages/main.component";
import { Page1Component } from "../pages/page1.component";

import { BlogUIComponent } from "../bogsui/blogui.component";

import { BlogDrawerComponent } from "../blogdrawer/blogdrawer.component";
import { BlogSwipeComponent } from "../blogswipe/blogswipe.component";




const routes: RouterConfig = [
    { path: "", redirectTo: "/main", terminal: true },

    { path: "main", component: MainComponent },
    { path: "page1", component: Page1Component },
    { path: "blog", component: BlogComponent },
    { path: "blogui", component: BlogUIComponent },
    { path: "blogdrawer", component: BlogDrawerComponent },
    { path: "blogswipecomponent", component: BlogSwipeComponent }


];

export const APP_ROUTER_PROVIDERS = [
    nsProvideRouter(routes, { enableTracing: false })
];