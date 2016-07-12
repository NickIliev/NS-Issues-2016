"use strict";
var observable_1 = require('data/observable');
var core_1 = require("@angular/core");
var MenuComponent = (function (_super) {
    __extends(MenuComponent, _super);
    function MenuComponent() {
        _super.call(this);
        this.items = [
            { title: 'Home' },
            { title: 'G+' },
            { title: 'Sync' }
        ];
        this.selectedItem = "Selected: " + this.items[0].title;
    }
    MenuComponent.prototype.selectSegment = function (e) {
        this.set('selectedItem', "Selected: " + this.items[e.newIndex].title);
    };
    MenuComponent = __decorate([
        core_1.Component({
            selector: "menu",
            templateUrl: "./components/menu/menu.html",
        }), 
        __metadata('design:paramtypes', [])
    ], MenuComponent);
    return MenuComponent;
}(observable_1.Observable));
exports.MenuComponent = MenuComponent;
//# sourceMappingURL=menu.component.js.map