"use strict";
var core_1 = require("@angular/core");
var AppComponent = (function () {
    function AppComponent() {
        this.counter = 16;
        this.humiditesSource = [
            {
                "value": 65.495002746582,
                "datetime": "2016-11-22 18:49:00+01"
            },
            {
                "value": 67.657997131348,
                "datetime": "2016-11-22 21:25:00+01"
            },
            {
                "value": 69.768997192383,
                "datetime": "2016-11-22 22:43:01+01"
            },
            {
                "value": 75.164001464844,
                "datetime": "2016-11-22 23:00:01+01"
            },
            {
                "value": 70.450996398926,
                "datetime": "2016-11-22 23:01:01+01"
            },
            {
                "value": 68.418998718262,
                "datetime": "2016-11-23 00:12:01+01"
            },
            {
                "value": 63.043998718262,
                "datetime": "2016-11-23 15:05:05+01"
            },
            {
                "value": 65.639999389648,
                "datetime": "2016-11-23 15:10:05+01"
            },
            {
                "value": 68.231002807617,
                "datetime": "2016-11-23 16:24:05+01"
            },
            {
                "value": 70.827003479004,
                "datetime": "2016-11-23 16:30:05+01"
            },
            {
                "value": 73.03099822998,
                "datetime": "2016-11-23 16:38:05+01"
            },
            {
                "value": 75.051002502441,
                "datetime": "2016-11-23 17:13:05+01"
            }
        ];
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
    AppComponent.prototype.onTap = function () {
        this.counter--;
    };
    AppComponent = __decorate([
        core_1.Component({
            selector: "my-app",
            templateUrl: "app.component.html",
        }), 
        __metadata('design:paramtypes', [])
    ], AppComponent);
    return AppComponent;
}());
exports.AppComponent = AppComponent;
//# sourceMappingURL=app.component.js.map