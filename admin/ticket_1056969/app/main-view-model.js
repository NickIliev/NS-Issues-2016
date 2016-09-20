"use strict";
var observable = require("data/observable");
var observable_array_1 = require("data/observable-array");
var HelloWorldModel = (function (_super) {
    __extends(HelloWorldModel, _super);
    function HelloWorldModel() {
        _super.call(this);
        this.initItems();
    }
    Object.defineProperty(HelloWorldModel.prototype, "items", {
        get: function () {
            return this._items;
        },
        enumerable: true,
        configurable: true
    });
    HelloWorldModel.prototype.initItems = function () {
        this._items = new observable_array_1.ObservableArray();
    };
    HelloWorldModel.prototype.pullToRefreshInitiated = function (args) {
        var that = new WeakRef(this);
        // the timer is not mandatory but just for demonstration purposes to delay the activity indicator
        // timer.setTimeout(function() {
        var newItemsToAddArray = [
            { description: "ddd" },
            { description: "eee" },
            { description: "fff" },
        ];
        for (var index = 0; index < newItemsToAddArray.length; index++) {
            that.get()._items.push(newItemsToAddArray[index]);
        }
        that.get()._numberOfAddedItems++;
        var listView = args.object;
        listView.notifyPullToRefreshFinished();
        // }, 1000);
    };
    HelloWorldModel.prototype.initDataItems = function () {
        this._items = new observable_array_1.ObservableArray();
        this._numberOfAddedItems = 0;
        this._numberOfAddedItems++;
    };
    return HelloWorldModel;
}(observable.Observable));
exports.HelloWorldModel = HelloWorldModel;
//# sourceMappingURL=main-view-model.js.map