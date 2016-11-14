"use strict";
var observable_1 = require('data/observable');
var HelloWorldModel = (function (_super) {
    __extends(HelloWorldModel, _super);
    function HelloWorldModel() {
        _super.call(this);
        this.items = ["res://icon", "res://logo", "res://icon", "res://logo", null, null, null, null, null, null, null, null, null, null, "res://logo", "res://icon"];
    }
    return HelloWorldModel;
}(observable_1.Observable));
exports.HelloWorldModel = HelloWorldModel;
//# sourceMappingURL=main-view-model.js.map