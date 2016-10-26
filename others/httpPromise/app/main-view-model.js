"use strict";
var observable_1 = require('data/observable');
var httpModule = require('http');
var HelloWorldModel = (function (_super) {
    __extends(HelloWorldModel, _super);
    function HelloWorldModel() {
        _super.call(this);
    }
    HelloWorldModel.prototype.onTap = function () {
        this.getActivityViaHttp().then(function (res) {
            console.log("IP: " + res.origin);
        });
    };
    HelloWorldModel.prototype.getActivityViaHttp = function () {
        return httpModule.getJSON('http://httpbin.org/ip');
    };
    return HelloWorldModel;
}(observable_1.Observable));
exports.HelloWorldModel = HelloWorldModel;
//# sourceMappingURL=main-view-model.js.map