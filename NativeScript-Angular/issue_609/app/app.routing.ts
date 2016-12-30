import { NgModule } from '@angular/core';
import { NativeScriptRouterModule } from 'nativescript-angular/router';
import { Routes } from '@angular/router';

import { ItemsComponent } from './items.component';
import { ItemDetailComponent } from './item-detail.component';

import { FirstComponent } from './first.component';
import { SecondComponent } from './second.component';

const routes: Routes = [
    { path: '', redirectTo: '/items', pathMatch: 'full' },
    { path: 'items', component: ItemsComponent },
    { path: 'item/:id', component: ItemDetailComponent },
    { path: "first", component: FirstComponent },
    { path: "second", component: SecondComponent }
];

@NgModule({
    imports: [NativeScriptRouterModule.forRoot(routes)],
    exports: [NativeScriptRouterModule]
})
export class AppRoutingModule { }