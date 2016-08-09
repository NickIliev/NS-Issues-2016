import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { NS_ROUTER_DIRECTIVES } from 'nativescript-angular/router';
import { HTTP_PROVIDERS } from '@angular/http';

@Component({

    template: `
 
    <GridLayout>
        <ActionBar [title]="Title" class="action-bar">
        </ActionBar>
 
            <StackLayout>
                <Button text="Blogs" [nsRouterLink]="['/blog']" class="link"></Button>
                <Button text="Page 1" [nsRouterLink]="['/page1']" class="link"></Button>
                <Button text="Blogs Telerik UI " [nsRouterLink]="['/blogui']" class="link"></Button>
                <Button text="Blogs Telerik UI Refresh and also Drawer "  textWrap="true" [nsRouterLink]="['/blogdrawer']" class="link"></Button>
                <Button text="Blogs Telerik UI Swipe "  textWrap="true" [nsRouterLink]="['/blogswipecomponent']" class="link"></Button>


                <Button text="Blog Child "  textWrap="true" [nsRouterLink]="['/blogchild']" class="link"></Button>
                
         
            </StackLayout>
    </GridLayout>
              `,
    directives: [NS_ROUTER_DIRECTIVES],
    providers: [HTTP_PROVIDERS]
})
export class MainComponent implements OnInit {

    public Title: string = "Main";

    constructor() {
    }

    ngOnInit() {
    }

}
