"use strict";
var observable_1 = require('data/observable');
var HelloWorldModel = (function (_super) {
    __extends(HelloWorldModel, _super);
    function HelloWorldModel() {
        _super.call(this);
        this.pingFlag = true;
    }
    Object.defineProperty(HelloWorldModel.prototype, "myClass", {
        get: function () {
            return this._myClass;
        },
        set: function (calue) {
            if (this.pingFlag) {
                this._myClass = "correct";
                this.notifyPropertyChange('myClass', "correct");
            }
            else {
                this._myClass = "incorrect";
                this.notifyPropertyChange('myClass', "incorrect");
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(HelloWorldModel.prototype, "pingFlag", {
        get: function () {
            return this._pingFlag;
        },
        set: function (value) {
            if (this._pingFlag !== value) {
                this._pingFlag = value;
                this.notifyPropertyChange('pingFlag', value);
            }
        },
        enumerable: true,
        configurable: true
    });
    return HelloWorldModel;
}(observable_1.Observable));
exports.HelloWorldModel = HelloWorldModel;
//# sourceMappingURL=main-view-model.js.map