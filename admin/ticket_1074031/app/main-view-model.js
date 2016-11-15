"use strict";
var observable_1 = require("data/observable");
var observable_array_1 = require("data/observable-array");
var ViewModel = (function (_super) {
    __extends(ViewModel, _super);
    function ViewModel() {
        _super.call(this);
        this._words = ["One", "Two", "Three", "Four", "Five", "Six", "Seven", "Eight", "Nine", "Ten", "Two", "Three", "Four", "Five", "Six", "Seven", "Eight", "Nine", "Ten", "Two", "Three", "Four", "Five", "Six", "Seven", "Eight", "Nine", "Ten"];
    }
    Object.defineProperty(ViewModel.prototype, "dataItems", {
        get: function () {
            if (!this._items) {
                this._items = new observable_array_1.ObservableArray();
                for (var i = 0; i < this._words.length; i++) {
                    this._items.push(new DataItem(i, "Item " + i, "This is item description."));
                }
            }
            return this._items;
        },
        enumerable: true,
        configurable: true
    });
    ViewModel.prototype.getRandomLengthString = function () {
        var sentenceLength = Math.round((Math.random() * 15));
        var result = this._words[0];
        for (var i = 0; i < sentenceLength; i++) {
            result += (this._words[i % this._words.length] + " ");
        }
        return result;
    };
    return ViewModel;
}(observable_1.Observable));
exports.ViewModel = ViewModel;
var DataItem = (function () {
    function DataItem(id, name, description) {
        this.id = id;
        this.itemName = name;
        this.itemDescription = description;
    }
    return DataItem;
}());
exports.DataItem = DataItem;
//# sourceMappingURL=main-view-model.js.map