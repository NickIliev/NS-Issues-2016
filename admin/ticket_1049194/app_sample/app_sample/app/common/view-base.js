var observableModule = require("data/observable");
var actionBarUtil = require("~/components/action-bar/action-bar-util");
var drawerCallbacks = require("~/components/drawer-menu/drawer-util");
var utils = require("utils/utils");
var analytics = require('nativescript-telerik-analytics');

var View = (function (_super) {

    __extends(View, _super);

    function View() {
        _super.apply(this, arguments);
    }
    
    View.drawerButton = null;

    View.prototype.initialize = function (args, options) {
        var that = this;
       
        that.page = args.object;
        that.page.bindingContext = that.viewModel;

        actionBarUtil.initialize(that.page, options);

        that.drawerElement = that.page.getViewById("drawer");
        if(that.drawerElement) {
            that.drawerElement.delegate = new drawerCallbacks();
        }
        
        if(options && options.pageName) {
            analytics.trackEvent('ViewPage.' + options.pageName);
        }
    }

    View.prototype.toggleSideDrawer = function (args) {
        var drawerElement = args.object.actionBar.page.getViewById("drawer");

        if (drawerElement) {
            drawerElement.toggleDrawerState();
            // TODO: make drawer menu icon toggle with close icon
            // if (View.drawerButton.icon == "res://ic_menu_black") {
            //     console.log(View.drawerButton.icon);
            // }
            // else {
            //     console.log(View.drawerButton.icon);
            // }
        }
    };

    View.prototype.callUH = function (args) {
        analytics.trackEvent('LinkClick.CallUH');
        utils.openUrl("tel://18668442273");
    };

    return View;

})(observableModule.Observable);

module.exports = View;