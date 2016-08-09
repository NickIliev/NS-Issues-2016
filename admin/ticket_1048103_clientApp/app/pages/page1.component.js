"use strict";
var core_1 = require('@angular/core');
var common_1 = require('@angular/common');
var router_1 = require('nativescript-angular/router');
var http_1 = require('@angular/http');
var Page1Component = (function () {
    function Page1Component(location) {
        this.location = location;
        this.Title = "Page1";
    }
    Page1Component.prototype.ngOnInit = function () {
    };
    Page1Component.prototype.onNavigationButtonTap = function () {
        this.location.back();
    };
    Page1Component = __decorate([
        core_1.Component({
            template: "\n \n    <GridLayout>\n        <ActionBar [title]=\"Title\" class=\"action-bar\">\n              <NavigationButton text=\"Go Back\" android.systemIcon=\"ic_menu_back\"\n                (tap)=\"onNavigationButtonTap()\"></NavigationButton> \n        </ActionBar>\n \n            <StackLayout>\n                <Button text=\"Blogs\" [nsRouterLink]=\"['/blog']\" class=\"link\"></Button>\n                <Button text=\"Main \" [nsRouterLink]=\"['/main']\" class=\"link\"></Button>\n                     <Button text=\"Blogs Telerik UI \" [nsRouterLink]=\"['/blogui']\" class=\"link\"></Button>\n                     <Button text=\"Blogs Telerik UI Drawer \" [nsRouterLink]=\"['/blogdrawer']\" class=\"link\"></Button>\n            </StackLayout>\n \n    </GridLayout>\n              ",
            directives: [router_1.NS_ROUTER_DIRECTIVES],
            providers: [http_1.HTTP_PROVIDERS]
        }), 
        __metadata('design:paramtypes', [common_1.Location])
    ], Page1Component);
    return Page1Component;
}());
exports.Page1Component = Page1Component;
//# sourceMappingURL=page1.component.js.map