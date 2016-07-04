"use strict";
var observable = require("data/observable");
var MagnitudeModel = (function (_super) {
    __extends(MagnitudeModel, _super);
    function MagnitudeModel() {
        _super.call(this);
        this._magnitude = "-150.020313164"; // your default value
    }
    Object.defineProperty(MagnitudeModel.prototype, "magnitude", {
        get: function () {
            return this._magnitude;
        },
        set: function (value) {
            this._magnitude = value;
            this.notifyPropertyChange("magnitude", value);
        },
        enumerable: true,
        configurable: true
    });
    MagnitudeModel.prototype.changeMagnitude = function (newValue) {
        this._magnitude = newValue;
        this.notifyPropertyChange("magnitude", newValue);
    };
    return MagnitudeModel;
}(observable.Observable));
exports.MagnitudeModel = MagnitudeModel;
//# sourceMappingURL=main-view-model.js.map