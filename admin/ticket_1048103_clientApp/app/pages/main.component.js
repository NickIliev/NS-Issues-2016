"use strict";
var core_1 = require('@angular/core');
var router_1 = require('nativescript-angular/router');
var http_1 = require('@angular/http');
var MainComponent = (function () {
    function MainComponent() {
        this.Title = "Main";
    }
    MainComponent.prototype.ngOnInit = function () {
    };
    MainComponent = __decorate([
        core_1.Component({
            template: "\n \n    <GridLayout>\n        <ActionBar [title]=\"Title\" class=\"action-bar\">\n        </ActionBar>\n \n            <StackLayout>\n                <Button text=\"Blogs\" [nsRouterLink]=\"['/blog']\" class=\"link\"></Button>\n                <Button text=\"Page 1\" [nsRouterLink]=\"['/page1']\" class=\"link\"></Button>\n                <Button text=\"Blogs Telerik UI \" [nsRouterLink]=\"['/blogui']\" class=\"link\"></Button>\n                <Button text=\"Blogs Telerik UI Refresh and also Drawer \"  textWrap=\"true\" [nsRouterLink]=\"['/blogdrawer']\" class=\"link\"></Button>\n                <Button text=\"Blogs Telerik UI Swipe \"  textWrap=\"true\" [nsRouterLink]=\"['/blogswipecomponent']\" class=\"link\"></Button>\n\n\n                <Button text=\"Blog Child \"  textWrap=\"true\" [nsRouterLink]=\"['/blogchild']\" class=\"link\"></Button>\n                \n         \n            </StackLayout>\n    </GridLayout>\n              ",
            directives: [router_1.NS_ROUTER_DIRECTIVES],
            providers: [http_1.HTTP_PROVIDERS]
        }), 
        __metadata('design:paramtypes', [])
    ], MainComponent);
    return MainComponent;
}());
exports.MainComponent = MainComponent;
//# sourceMappingURL=main.component.js.map