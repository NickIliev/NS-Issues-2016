var geolocation = require("nativescript-geolocation");

var getLocation = function (viewModel, callback) {
    console.log("Getting Location");
    if(geolocation.isEnabled()) {
        geolocation.getCurrentLocation()
                    .then(function (data) {
                        viewModel.set("currentLocation", data);
                    });
    }
    else {
        geolocation.enableLocationRequest(function() {
            // successCallback
            geolocation.getCurrentLocation()
                    .then(function (data) {
                        viewModel.set("currentLocation", data);
                    });
            console.log("currentLocaiton" + JSON.stringify(viewModel.get("currentLocation")));
        },
        null,   // successArgs
        null,   // errorCallback
        null);  // errorArgs
        viewModel.set("currentLocation", {});
    }
};

exports.getLocation = getLocation;