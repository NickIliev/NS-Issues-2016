"use strict";
var observable_1 = require("data/observable");
var observable_array_1 = require("data/observable-array");
var MenuItem = (function (_super) {
    __extends(MenuItem, _super);
    function MenuItem(name) {
        _super.call(this);
        this._name = name;
        this._visibility = false;
    }
    Object.defineProperty(MenuItem.prototype, "name", {
        get: function () {
            return this._name;
        },
        set: function (value) {
            this._name = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MenuItem.prototype, "visibility", {
        get: function () {
            return this._visibility;
        },
        set: function (value) {
            this._visibility = value;
            this.notifyPropertyChange("isVisible", value);
        },
        enumerable: true,
        configurable: true
    });
    return MenuItem;
}(observable_1.Observable));
var itemsObservableArray = new observable_array_1.ObservableArray([
    new MenuItem("explore"),
    new MenuItem("community"),
    new MenuItem("profile"),
    new MenuItem("ranking"),
    new MenuItem("camera")
]);
var viewModel = new observable_1.Observable({
    currentActive: "explore",
    menuItems: itemsObservableArray
});
// Event handler for Page "navigatingTo" event attached in main-page.xml
function navigatingTo(args) {
    // Get the event sender
    var page = args.object;
    itemsObservableArray.getItem(0).set("visibility", true);
    itemsObservableArray.getItem(1).set("visibility", true);
    itemsObservableArray.getItem(2).set("visibility", true);
    page.bindingContext = viewModel;
}
exports.navigatingTo = navigatingTo;
//# sourceMappingURL=main-page.js.map