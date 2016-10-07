var Observable = require("data/observable").Observable;
var dialogs = require("ui/dialogs");
var frameModule = require("ui/frame");
var topmost = frameModule.topmost();
var geolocation = require("nativescript-geolocation");
var View = require("~/common/view-base")

var OrderViewModel = require("./order-view-model");
var view = new View();
var page;
var lat = null;
var lon = null;
var searchTerm;
view.viewModel = new OrderViewModel();


//var orderList = new OrderViewModel([]);
//var pageData = new Observable({
//    orderList: orderList,
//    order: ""
//});


view.loaded = function (args) {
    var that = view;
    var options = {
        pageName: "ReferralOrders"
    };
    that.initialize(args, options);
    that.providerListElement = that.page.getViewById("providers-list");

    patient = args.object.navigationContext;
    that.viewModel.load(patient.patientMRN, patient.token);
    that.mainContentElement = that.page.getViewById("main-content");

    if (!geolocation.isEnabled()) {
        geolocation.enableLocationRequest();
    } else {
        view.getLocation();
    }

    //page.bindingContext = pageData;

    //pageData.set("isLoading", true);
    //orderList.load().then(function () {
    //    pageData.set("isLoading", false);
    //    listView.animate({
    //        opacity: 1,
    //        duration: 1000
    //    });
    //});
};

view.schedule = function (args) {
    //    var providerData = view.viewModel.searchResults.Data.getItem(args.itemIndex);
    var referralData = view.viewModel.searchResults.Data.getItem(args.itemIndex);
    console.log("searchTerm", referralData.SearchTerm);
    searchTerm = referralData.SearchTerm;
    if (lat === null || lon == null) {
        view.getLocation();
        console.log("getting locaiton");
    }
    //    navigation.goToProviderDetail(providerData.ProviderID);
};

view.getLocation = function () {
    geolocation.getCurrentLocation({ desiredAccuracy: 3, updateDistance: 10, maximumAge: 20000, timeout: 20000 }).
    then(function (loc) {
        if (loc) {
            lat = loc.latitude;
            lon = loc.longitude;
            frameModule.topmost().navigate({
                moduleName: "views/referral-providers/referral-providers/",
                context: {
                    searchTerm: searchTerm,
                    lat: lat,
                    lon: lon
                }
            });
            console.log("Current location is: lat " + loc.latitude + ", lon " + loc.longitude);
        }
    }, function (e) {
        console.log("Error: " + e.message);
    });
}

module.exports = view;

//exports.loaded = function (args) {
//    page = args.object;
//    patient = page.navigationContext;
//    page.bindingContext = page.navigationContext;
//    console.log("PatientMRN",patient.patientMRN);
//    console.log("Token",patient.token);
//    http.request({
//        url: constants.referralEaseUrl + "Referral/GetReferrals",
//        method: "POST",
//        headers: { "Content-Type": "application/json", "token": patient.token },
//        content: JSON.stringify({ PatientMRN: patient.patientMRN, Skip: 0, Take: 5 })
//    }).then(function (response) {
//        console.log(JSON.stringify(response));
//        //var verifyResponse = response.content.toJSON().Data;
//        //if (verifyResponse.AccessGranted == true) {
//        //    topmost.navigate({
//        //        moduleName: "views/orders/orders",
//        //        context: {
//        //            patientMRN: verifyResponse.PatientMRN
//        //        }
//        //    });
//        //} else {
//        //    var context = {
//        //        title: "Unable to Verify",
//        //        message: "We were unable to verify your identity. Please try again or contact UH to schedule your appointment.",
//        //        okButtonText: "Try Again",
//        //        cancelButtonText: "Contact UH"
//        //    }
//        //    utility.launchPopup("action", function (data) {
//        //        // callback
//        //    }, null, context);
//        //}
//    }, function (error) {
//        console.error(JSON.stringify(error));
//    });

//};
