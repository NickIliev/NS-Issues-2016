var Observable = require("data/observable").Observable;
var imageSource = require("image-source");
var utils = require("utils/utils");
var analytics = require('nativescript-telerik-analytics');
var navigation = require("~/components/navigation");
var frame = require("ui/frame");
//var tools = require("nativescript-swiss-army-knife").SwissArmyKnife();
var app = require("application");

var utility = require("~/common/utility");
var View = require("~/common/view-base")

var ProviderViewModel = require("./provider-view-model");

var view = new View();
view.viewModel = new ProviderViewModel();

view.loaded = function (page) {
    var that = view;
    that.page = page;

    that.mainContentElement = that.page.getViewById("main-content");

    that.navigationContext = that.page.navigationContext;
    that.viewModel.set("selectedScreen", "tap1");
    that.viewModel.load(that.navigationContext.providerId);
  
    // disable tab menu scrollbar
    if(app.ios) {
        var scrollview = that.page.getViewById("horizontalScroll");
        if (scrollview.ios) {
            scrollview.ios.showsHorizontalScrollIndicator = false;
        }
    }

};

view.getDirections = function (args) {
    var that = view;
    var locationData = args.view.bindingContext;

    utility.launchPopup("confirm", function(data) {
        analytics.trackEvent('GetDirections.Physician');
        console.log(JSON.stringify(locationData));
        utils.openUrl("https://maps.google.com?saddr=Current+Location&daddr=" + locationData.Coordinates.Latitude + "," + locationData.Coordinates.Longitude);
    }, function(data) {
        // analytics.trackEvent('LinkClick.TermsOfUse'); // TODO: track cancellations?
    });
};

view.creatingVideo = function (args) {
    if(require('application').android) {
        var nativeView = new com.google.android.youtube.player.YouTubePlayerView(args.context);
        //nativeView.getParent().setLayerType(android.view.View.LAYER_TYPE_NONE, null);

        var onInitializedListener = new com.google.android.youtube.player.YouTubePlayer.OnInitializedListener(
            {
                onInitializationFailure: function(provider, error) {
                    alert("Error is[" + error + "]");
                },
                onInitializationSuccess: function (provider, player) {
                    player.cueVideo("UxjgUjVpe24");
                },
            });

        // This is the google services personal ID, please replace it.
        nativeView.initialize("AIzaSyA0mwtxBgOp2Nj7fCiYTAZThx8z9Xf5Ux0", onInitializedListener)
        args.view = nativeView;
    }
    else {
        var test = "ios";
    }
};

view.goBackToResults = function (args) {
    console.log("hit tap")
    var topmost = frame.topmost();
    topmost.goBack();
};

view.callAppointmentNumber = function (args) {
    var that = view;
    var selectedProvider = view.viewModel.get("selectedProvider");

    utility.launchPopup("confirm", function (data) {
        analytics.trackEvent('LinkClick.CallAppointmentNumber.' + selectedProvider.ProviderID);
        var appointmentNumber = selectedProvider.AppointmentPhone ? selectedProvider.AppointmentPhone : '18668442273';
        utils.openUrl("tel://" + appointmentNumber);
    }, function (data) {
        // analytics.trackEvent('LinkClick.TermsOfUse'); // TODO: track cancellations?
    });
};

view.requestAnAppointment = function (args) {
    console.log("request an appointment tap");
};

view.TabViewMenuTap = function (args) {
    var id = args.object.id;

    view.viewModel.set("selectedScreen", id);
    console.log("Tapped tab menu item with id: " + id);

    //var offset = ;
    //that.scroll.scrollToHorizontalOffset(offset);
};

module.exports = view;
