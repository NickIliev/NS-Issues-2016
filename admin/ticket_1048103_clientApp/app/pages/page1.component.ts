import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { NS_ROUTER_DIRECTIVES } from 'nativescript-angular/router';
import { HTTP_PROVIDERS } from '@angular/http';

@Component({

    template: `
 
    <GridLayout>
        <ActionBar [title]="Title" class="action-bar">
              <NavigationButton text="Go Back" android.systemIcon="ic_menu_back"
                (tap)="onNavigationButtonTap()"></NavigationButton> 
        </ActionBar>
 
            <StackLayout>
                <Button text="Blogs" [nsRouterLink]="['/blog']" class="link"></Button>
                <Button text="Main " [nsRouterLink]="['/main']" class="link"></Button>
                     <Button text="Blogs Telerik UI " [nsRouterLink]="['/blogui']" class="link"></Button>
                     <Button text="Blogs Telerik UI Drawer " [nsRouterLink]="['/blogdrawer']" class="link"></Button>
            </StackLayout>
 
    </GridLayout>
              `,
    directives: [NS_ROUTER_DIRECTIVES],
    providers: [HTTP_PROVIDERS]
})
export class Page1Component implements OnInit {

    public Title: string = "Page1";

    constructor(private location: Location) {
    }

    ngOnInit() {
    }

    public onNavigationButtonTap() {
        this.location.back();
    }

}
