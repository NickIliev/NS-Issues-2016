"use strict";
var observable = require("data/observable");
var MyViewModel = (function (_super) {
    __extends(MyViewModel, _super);
    function MyViewModel() {
        _super.call(this);
    }
    Object.defineProperty(MyViewModel.prototype, "firstSeries", {
        get: function () {
            return [
                { "name": "April", "Dresses": 100000 },
                { "name": "May", "Top": 200000, "Skirts": 500000, "Jackets": 200000 },
                { "name": "June", "Top": 255500, "Skirts": 35000, "Jackets": 254000 },
                { "name": "July", "Dresses": 258361, "Pants": 20000, "Top": 300000, "Skirts": 25000, "Jackets": 35620 }
            ];
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MyViewModel.prototype, "secondSeries", {
        get: function () {
            return [
                { "name": "April", "Dresses": 100000 },
                { "name": "May", "Skirts": 600000, "Jackets": 600000 },
                { "name": "June", "Top": 255500, "Skirts": 35000 },
                { "name": "July", "Top": 300000, "Skirts": 25000, "Jackets": 35620 }
            ];
        },
        enumerable: true,
        configurable: true
    });
    return MyViewModel;
}(observable.Observable));
exports.MyViewModel = MyViewModel;
//# sourceMappingURL=main-view-model.js.map