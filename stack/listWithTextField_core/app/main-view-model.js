"use strict";
var observable_1 = require('data/observable');
var HelloWorldModel = (function (_super) {
    __extends(HelloWorldModel, _super);
    function HelloWorldModel() {
        _super.call(this);
        this.source = [];
        this.source = ["ala", "bala", "nica", "ala", "bala", "ala", "bala", "ala", "bala"];
    }
    return HelloWorldModel;
}(observable_1.Observable));
exports.HelloWorldModel = HelloWorldModel;
//# sourceMappingURL=main-view-model.js.map