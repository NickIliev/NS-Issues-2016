"use strict";
var observable = require("data/observable");
var HelloWorldModel = (function (_super) {
    __extends(HelloWorldModel, _super);
    function HelloWorldModel() {
        _super.apply(this, arguments);
    }
    Object.defineProperty(HelloWorldModel.prototype, "categoricalSource", {
        get: function () {
            return [
                { Country: "Germany", Amount: 0, SecondVal: 14, ThirdVal: 24 },
                { Country: "France", Amount: 0, SecondVal: 23, ThirdVal: 25 },
                { Country: "Bulgaria", Amount: 0, SecondVal: 17, ThirdVal: 23 },
                { Country: "Spain", Amount: 0, SecondVal: 19, ThirdVal: 24 },
                { Country: "USA", Amount: 60, SecondVal: 8, ThirdVal: 21 }
            ];
        },
        enumerable: true,
        configurable: true
    });
    return HelloWorldModel;
}(observable.Observable));
exports.HelloWorldModel = HelloWorldModel;
//# sourceMappingURL=main-view-model.js.map