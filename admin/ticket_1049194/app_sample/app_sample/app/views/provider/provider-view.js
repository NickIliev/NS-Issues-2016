var Observable = require("data/observable").Observable;
var imageSource = require("image-source");
var utils = require("utils/utils");
var analytics = require('nativescript-telerik-analytics');
var navigation = require("~/components/navigation");
var frame = require("ui/frame");

var app = require("application");

var View = require("~/common/view-base")

var ProviderViewModel = require("./provider-view-model");

var view = new View();
view.viewModel = new ProviderViewModel();

view.loaded = function (args) {
    var that = view;
    var options = {
        pageName: "ProviderDetail",
        showBackButton: true
    };
    that.initialize(args, options);

	that.mainContentElement = that.page.getViewById("main-content");

	that.navigationContext = that.page.navigationContext;

	that.viewModel.load(that.navigationContext.providerId);
};

view.getDirections = function (args) {
    var locationData = args.view.bindingContext;

    analytics.trackEvent('GetDirections.Physician');
    console.log(JSON.stringify(locationData));
    utils.openUrl("https://maps.google.com?saddr=Current+Location&daddr=" + locationData.Coordinates.Latitude + "," + locationData.Coordinates.Longitude);
};

view.creatingVideo = function (args) {
    if(require('application').android) {
        var nativeView = new com.google.android.youtube.player.YouTubePlayerView(args.context);
        //nativeView.getParent().setLayerType(android.view.View.LAYER_TYPE_NONE, null);
        
        var onInitializedListener = new com.google.android.youtube.player.YouTubePlayer.OnInitializedListener(
            {
                    onInitializationFailure : function(provider, error) {
                        alert("Error is[" + error + "]");
                    },
                    onInitializationSuccess : function(provider, player) {
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
    frame.topmost().goBack();
};

view.callAppointmentNumber = function (args) {
    var selectedProvider = view.viewModel.get("selectedProvider");
    analytics.trackEvent('LinkClick.CallAppointmentNumber.' + selectedProvider.ProviderID);

    var appointmentNumber = selectedProvider.AppointmentPhone ? selectedProvider.AppointmentPhone : '18668442273'; 
    utils.openUrl("tel://" + appointmentNumber);
};

view.requestAnAppointment = function (args) {
    console.log("request an appointment tap");
};

module.exports = view;
