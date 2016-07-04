"use strict";
var core_1 = require("@angular/core");
var page_1 = require("ui/page");
var AppComponent = (function () {
    function AppComponent(_page, _zone) {
        this._page = _page;
        this._zone = _zone;
        this.counter = 16;
        this._page.actionBarHidden = true;
        var that = this;
        this._page.on("swipe", function (args) {
            console.log("Swipe Direction From event function: " + args.direction);
            that._zone.run(function () {
                that.onSwipe();
            });
        });
    }
    Object.defineProperty(AppComponent.prototype, "message", {
        get: function () {
            if (this.counter > 0) {
                return this.counter + " taps left";
            }
            else {
                return "Hoorraaay! \nYou are ready to start building!";
            }
        },
        enumerable: true,
        configurable: true
    });
    AppComponent.prototype.onSwipe = function () {
        console.log("onSwipe triggered");
        this.counter--;
        console.log(this.counter);
    };
    AppComponent = __decorate([
        core_1.Component({
            selector: "my-app",
            templateUrl: "app.component.html",
        }), 
        __metadata('design:paramtypes', [page_1.Page, core_1.NgZone])
    ], AppComponent);
    return AppComponent;
}());
exports.AppComponent = AppComponent;
//# sourceMappingURL=app.component.js.map