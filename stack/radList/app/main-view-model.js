"use strict";
var observable = require("data/observable");
var observable_array_1 = require("data/observable-array");
var HelloWorldModel = (function (_super) {
    __extends(HelloWorldModel, _super);
    function HelloWorldModel() {
        _super.apply(this, arguments);
    }
    Object.defineProperty(HelloWorldModel.prototype, "items", {
        get: function () {
            var arr = new observable_array_1.ObservableArray();
            arr.push({ "first_name": "item 1" });
            arr.push({ "first_name": "item 2" });
            arr.push({ "first_name": "item 3" });
            arr.push({ "first_name": "item 4" });
            return arr;
        },
        enumerable: true,
        configurable: true
    });
    return HelloWorldModel;
}(observable.Observable));
exports.HelloWorldModel = HelloWorldModel;
//# sourceMappingURL=main-view-model.js.map