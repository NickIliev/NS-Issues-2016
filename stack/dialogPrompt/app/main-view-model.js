"use strict";
var observable = require("data/observable");
var MyViewModel = (function (_super) {
    __extends(MyViewModel, _super);
    function MyViewModel() {
        _super.apply(this, arguments);
    }
    Object.defineProperty(MyViewModel.prototype, "pendingConnections", {
        get: function () {
            return this._pendingConnections;
        },
        set: function (value) {
            if (this._pendingConnections !== value) {
                this._pendingConnections = value;
            }
        },
        enumerable: true,
        configurable: true
    });
    return MyViewModel;
}(observable.Observable));
exports.MyViewModel = MyViewModel;
//# sourceMappingURL=main-view-model.js.map