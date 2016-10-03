var DependencyObservable = require("ui/core/dependency-observable").DependencyObservable;
function DrawerCallbacksModel() { }
DrawerCallbacksModel.prototype = new DependencyObservable();
DrawerCallbacksModel.prototype.onDrawerOpening = function () {
    if (page.ios) {
        mainContentElement.animate({
            duration: 250,
            opacity: 0.5
        });
    }
};
DrawerCallbacksModel.prototype.onDrawerOpened = function () { };
DrawerCallbacksModel.prototype.onDrawerClosing = function () {
    if (page.ios) {
        mainContentElement.animate({
            duration: 250,
            opacity: 1
        });
    }
};
DrawerCallbacksModel.prototype.onDrawerClosed = function () { };

module.exports = DrawerCallbacksModel;