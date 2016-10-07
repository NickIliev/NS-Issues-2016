var Observable = require("data/observable").Observable;
var gesturesModule = require("ui/gestures");
var app = require("application");
var analytics = require("nativescript-telerik-analytics");
var applicationSettingsModule = require("application-settings");

var utility = require("~/common/utility");
var View = require("~/common/view-base")
var navigation = require("~/components/navigation");
var utils = require("utils/utils");
var Color = require("color").Color;
var mapsModule = require("nativescript-google-maps-sdk");
var tabViewUtil = require("~/components/tabview-util");
var location = require("~/components/location");

var LocationSearchViewModel = require("./location-search-view-model");

var view = new View();
view.viewModel = new LocationSearchViewModel([]);

view.loaded = function(page) {
    var that = view;
    that.page = page;

    that.locationListElement = that.page.getViewById("locations-list");
    that.mainContentElement = that.page.getViewById("main-content");
    that.searchBox = that.page.getViewById("txtSearchBox");

    tabViewUtil.selectTab(that.viewModel, that.page, 0);

    if(!applicationSettingsModule.getBoolean("isLocationSearchInitialized")) {
        that.viewModel.set("showLocationFailureWarning", true);
        if(that.page._navigationContext && that.page._navigationContext.erAndUrgentCareOnly) {
            that.viewModel.set("isSearching", true);
            console.log("ERs and Urgent Care Only");
            that.viewModel.set("searchTerm", "");
            that.viewModel.filterBy.setDefaults();
            if (that.viewModel.filterBy.currentCriteria.filterBy.length === 0) {
                that.viewModel.filterBy.load()
                .then(function(data){
                    that.viewModel.filterBy.selectERAndUrgentCare();
                    that.viewModel.search();
                });
            }
            else {
                that.viewModel.filterBy.selectERAndUrgentCare();
                that.viewModel.search();
            }
        }
        else if (that.viewModel.filterBy.currentCriteria.filterBy.length === 0) {
            that.viewModel.filterBy.setDefaults();
            that.viewModel.filterBy.load();
            that.viewModel.filterBy.applyCriteria();
        }
    }
};

view.search = function (args) {
    var that = view;

    console.log("searchbuttonpress");

    if (that.viewModel.get("searchTerm").trim() === "") {
        return;
    }

    that.searchBox.dismissSoftInput();
    if (!that.viewModel.get("searchButtonPressed")) {
        that.viewModel.set("searchButtonPressed", true);
        that.viewModel.search();            
    }
};

view.launchMap = function (args) {
    var that = view;
    var location = args.object._parent._parent.bindingContext;
    
    utility.launchPopup("confirm", function(data) {
        analytics.trackEvent('LocationSearch.LaunchMap');
        console.log("launching map for " + location.Coordinates.Latitude + "," + location.Coordinates.Longitude);

        var formattedAddress = "";
        if (location.Address1) {
            // using street address
            formattedAddress += location.Address1;

            if (location.Address2) {
                formattedAddress += " " + location.Address2;
            }
            if (location.City && location.State) {
                formattedAddress += " " + location.City + ", " + location.State;
            }
            if (location.PostalCode) {
                formattedAddress += " " + location.PostalCode;
            }
        }
        else if(location.Coordinates &&
                location.Coordinates.Latitude &&
                location.Coordinates.Longitude) {
            // using geocordinates
            utils.openUrl("https://maps.google.com?saddr=Current+Location&daddr=" + location.Coordinates.Latitude + "," + location.Coordinates.Longitude);
        }
        else {
            that.showError("Error mapping location. Could not find address or geocordinates for selected location.");
        }
        utils.openUrl("https://maps.google.com?saddr=Current+Location&daddr=" + encodeURIComponent(formattedAddress));
    }, function(data) {
        // analytics.trackEvent('LinkClick.TermsOfUse'); // TODO: track cancellations?
    });
};

view.callLocation = function (args) {
    var that = view;
    var location = args.object._parent._parent.bindingContext;
    
    // remove special chars from phone number
    var phone = location.Phone.replace(/ |-|\(|\)/g, '');
    
    utility.launchPopup("confirm", function(data) {
        analytics.trackEvent('LocationSearch.CallLocation');
        console.log("Calling " + phone);
        utils.openUrl("tel://" + phone);
    }, function(data) {
        // analytics.trackEvent('LinkClick.TermsOfUse'); // TODO: track cancellations?
    });
};

view.openURL = function (args) {
    var that = view;
    var location = args.object._parent._parent.bindingContext;
    
    utility.launchPopup("confirm", function(data) {
        analytics.trackEvent('LocationSearch.LaunchURL');
        console.log("launching url for " + location.DisplayName);
        utils.openUrl(location.URL);
    }, function(data) {
        // analytics.trackEvent('LinkClick.TermsOfUse'); // TODO: track cancellations?
    });
};

view.submitCheckIn = function (args) {
    var location = args.object._parent._parent.bindingContext;
    console.log("Submit check in for: " + location.DisplayName + " with location time = " + location.availableTimes[location.selectedTime]);
};

view.disableInput = function () {
    var that = view;
    that.searchBox.editable = false;
};

view.enableInput = function () {
    var that = view;
    that.searchBox.editable = true;
};

view.showFilters = function (args) {
    var that = view;
    console.log("show filters");

    var page = args.object.page;
    if(!applicationSettingsModule.getBoolean("isShowingModal")) {
        page.showModal("./views/location-search/filters", {}, function (search) {
            if(search) {
                that.viewModel.search();
            }
        }, false);
    }
};

view.showListView = function (args) {
    view.viewModel.set("showList", true);
};

view.showMapView = function (args) {
    view.viewModel.set("showList", false);
};

// custom viewModel events
view.viewModel.on("notifyLoadOnDemandFinished", function (eventData) {
    view.locationListElement.notifyLoadOnDemandFinished();
});

view.viewModel.on("refresh", function (eventData) {
    view.locationListElement.refresh();
});

view.viewModel.on("scrollToTopList", function (eventData) {
    var that = view;
    if(that.viewModel.searchResults.Count > 0 &&
        that.locationListElement.Count > 0) {
        that.locationListElement.scrollToIndex(0);
    }
});

view.viewModel.on("disableInput", function (eventData) {
    view.disableInput();
});

view.viewModel.on("enableInput", function (eventData) {
    view.enableInput();
});

view.wait = function (milliSeconds) {
    return new Promise(function (resolve, reject) {
        setTimeout(function () {
           resolve(milliSeconds);
        }, milliSeconds);
    });
};

view.onMapReady = function (args) {
    var that = view;
    console.log("onMapReady");

    that.mapView = args.object;

    console.log("Map Ready");

    if (that.viewModel.get("searchResults").Data.length > 0) {
        that.addMapMarkersAndCenter();
    }

    that.viewModel.set("isMapInitialized", true);
};

view.onCoordinateTapped = function (args) {
    console.log("Coordinate Tapped, Lat: " + args.position.latitude + ", Lon: " + args.position.longitude, args);
};

view.onMarkerEvent = function (args) {
   console.log("Marker Event: '" + args.eventName
                + "' triggered on: " + args.marker.title
                + ", Lat: " + args.marker.position.latitude + ", Lon: " + args.marker.position.longitude, args);
};

view.lastCamera = null;
view.onCameraChanged = function (args) {
    console.log("Camera changed: "+JSON.stringify(args.camera), JSON.stringify(args.camera) === view.lastCamera);
    view.lastCamera = JSON.stringify(args.camera); 
};

view.addMapMarkersAndCenter = function () {
    var that = view;
    if (that.mapView) {
        if(that.viewModel.get("searchResults").Count > 0) {
            // add marker for current location
            // var currentLocation = that.viewModel.get("currentLocation");
            // if(currentLocation.latitude != null && currentLocation.longitude != null) {
            //     var markerCurrentLocation = new mapsModule.Marker();
            //     markerCurrentLocation.position = mapsModule.Position.positionFromLatLng(currentLocation.latitude, currentLocation.longitude);
            //     markerCurrentLocation.title = "You";
            //     markerCurrentLocation.userData = {index: -1};

            //     // var icon = new Image();
            //     // icon.imageSource = imageSource.fromResource('icon');
            //     // marker.icon = icon;
            //     markerCurrentLocation.icon = 'icon';

            //     that.mapView.addMarker(markerCurrentLocation);
            // }

            // add markers for location search results
            that.viewModel.get("searchResults").Data.forEach(function (location) {
                var marker = new mapsModule.Marker();
                marker.position = mapsModule.Position.positionFromLatLng(location.Coordinates.Latitude, location.Coordinates.Longitude);
                marker.title = location.DisplayName;
                marker.snippet = location.City + ", " + location.State + (location.Distance != null ? " " + location.Distance + "mi" : "");
                marker.userData = {index: location.LocationID};
                that.mapView.addMarker(marker);
            }, this);

            // center camera and zoom to appropriate level to fit markers
            if(app.android) {
                //that.mapView.updateCameraBounds(that.viewModel.get("searchResults").Data, 50);
            }
        }
    }
};

view.viewModel.on("addMapMarkersAndCenter", function () {
    view.addMapMarkersAndCenter();
});

view.removeMapMarkers = function () {
    var that = view;
    if (that.mapView) {
        console.log("removing markers");
        that.viewModel.get("searchResults").Data.forEach(function(location) {
            var marker = that.mapView.findMarker(function (marker) {
                return marker.userData.index === location.LocationID;
            });
            if(marker) {
                that.mapView.removeMarker(marker);
            }

            //console.log("removed marker for LocationID: " + location.LocationID);
        }, this);
    }
};

view.viewModel.on("removeMapMarkers", function () {
    view.removeMapMarkers();
});


view.showAccessUH = function (args) {
    view.viewModel.set("selectedScreen", 0);
};
view.showEHI = function (args) {
    view.viewModel.set("selectedScreen", 1);
};
module.exports = view;