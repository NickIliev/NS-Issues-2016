var Observable = require("data/observable").Observable;
var ObservableArray = require("data/observable-array").ObservableArray;
var listViewModule = require("nativescript-telerik-ui/listview");
var app = require("application");
var applicationSettingsModule = require("application-settings");

var ViewModel = require("~/common/view-model-base")
var constants = require("~/common/constants");
var location = require("~/components/location");
var utility = require("~/common/utility");

var filterBy = require("~/views/location-search/filters-view-model");

function LocationSearchViewModel(items) {
    var data = {
        pageTitle: "Search Locations",
        searchResults: {
            Count: -1,
            Data: new ObservableArray([])
        },
        searchTerm: "",
        currentSearch: {},
        isSearching: false,
        loadingResults: false,
        currentLocation: {},
        showLocationFailureWarning: true,
        selectedScreen: 0,
        showList: true,
        mapView: new Observable({
            latitude: 41.2,
            longitude: -81.2,
            zoom: 8,
            bearing: 0,
            tilt: 0,
            padding: [40,40,40,40]
        }),
        filterBy: filterBy,
        listViewOnDemandMode: listViewModule.ListViewLoadOnDemandMode.None,
        hasPerformedSearch: false
    };
    var viewModel = new ViewModel(data);

    viewModel.clearSearchResults = function () {
        var that = this;

        if(that.get("searchResults").Data.length > 0) {
            // switch back to list view
            that.set("showList", true);
            that.notify({eventName: "scrollToTopList"});

            // remove markers from mapView
            that.notify({eventName: "removeMapMarkers"});

            // clear search results
            while (that.get("searchResults").Data.length) {
                that.searchResults.Data.pop();
            }
            //that.searchResults.Data=new ObservableArray([]);
            that.searchResults.Count = -1;
        }
        console.log("results cleared");
    };

    viewModel.getFilters = function () {
        var that = this;
        var filters = []

        that.filterBy.currentCriteria.filterBy.forEach(function(item) {
            if(item.isSelected) {
                filters.push(item.LocationTypeID);
            }
        }, this);
        
        return filters.length > 0 ? filters : null;
    };

    viewModel.search = function () {
        var that = this;

        console.log("searchStarted");
        that.set("isSearching", true);
        that.clearSearchResults();

        //if(that.filterBy.currentCriteria.get("sortByClosest")) {
        location.getLocation(that, function (success) {
            if(!success) {
                // couldn't get location
                if(that.get("showLocationFailureWarning")) {
                    that.showError("Couldn't get current location. Searching without.");
                    that.set("showLocationFailureWarning", false);
                }
                that.filterBy.set("sortByClosest", false);
                that.filterBy.currentCriteria.set("sortByClosest", false);
            } 
            that.doSearch();
        });
        // }
        // else {
        //     that.doSearch();
        // }
    };

    viewModel.getSearchRequestOptions = function (locationTypeIds) {
        var that = this;
        return {
            url: constants.apiUrl + "Location/GetBySearch",
            method: "POST",
            headers: { "Content-Type": "application/json" },
            content: JSON.stringify({
                SearchTerm: that.get("currentSearch").searchTerm,
                Skip: that.get("currentSearch").skip,
                Take: that.get("currentSearch").take,
                Sort: [{
                    Field: that.filterBy.currentCriteria.sortByClosest ? "Closest" : "Zip"
                }],
                LocationTypeIds: typeof locationTypeIds != 'undefined' ? locationTypeIds : that.getFilters(),
                CurrentLocation: {
                    Latitude: that.get("currentLocation").latitude,
                    Longitude: that.get("currentLocation").longitude
                }
            })
        };
    };

    viewModel.doSearch = function () {
        var that = this;

        console.log("currentLocation: " + JSON.stringify(that.get("currentLocation")));
        
        that.set("currentSearch", {
            searchTerm: that.get("searchTerm"),
            skip: 0,
            take: 15
        });

        var locationTypeIds = that.getFilters();

        var requestOptions = that.getSearchRequestOptions(locationTypeIds);

        if(requestOptions && (locationTypeIds || that.filterBy.get("isFilterSelectAll"))) {
            return utility.httpRequest(that, requestOptions,
                function (response) { // success callback
                    console.log("searchCompleted");
                    var data = response.content.toJSON();
                    // workaround for activity indicator on radlistview not always showing
                    if (app.android) {
                        that.notify({ eventName: "refresh" });
                    }

                    that.searchResults.Count = data.Count;
                    data.Data.forEach(function(item) {
                        // item.availableTimes = ["3:00pm Today", "3:30pm Today", "4:00pm Today"];
                        that.searchResults.Data.push(item);
                    });

                    var currentLength = that.get("searchResults").Data.length;
                    console.log("listLength: " + currentLength);
                    var totalCount = that.get("searchResults").Count;
                    console.log("totalCount: " + totalCount);

                    // add markers for locations to the map view
                    that.notify({eventName: "addMapMarkersAndCenter"});

                    if (that.get("searchResults").Data.length < that.get("searchResults").Count) {
                        that.set("listViewOnDemandMode", listViewModule.ListViewLoadOnDemandMode.Auto);
                    } else {
                        that.set("listViewOnDemandMode", listViewModule.ListViewLoadOnDemandMode.None);
                    }
                    that.set("hasPerformedSearch", true);
                },
                function () { // error callback
                    that.set("listViewOnDemandMode", listViewModule.ListViewLoadOnDemandMode.None);
                })
                .then(function(){
                    that.set("isSearching", false);
                    that.set("searchButtonPressed", false);
                    applicationSettingsModule.setBoolean("isLocationSearchInitialized", true);
                });

        }
        else {
            that.showError("Please select at least one location type from the filters.");
            that.set("hasPerformedSearch", true);
            that.set("isSearching", false);
            that.set("searchButtonPressed", false);
            applicationSettingsModule.setBoolean("isLocationSearchInitialized", true);
        }
    };
    
    viewModel.searchWithNewCriteria = function () {
        var that = this;
        if(that.get("currentSearch").searchTerm != undefined && that.get("currentSearch").searchTerm != null) {
            that.set("searchTerm", that.get("currentSearch").searchTerm)
        }
        that.search();
    };

    viewModel.loadMoreResults = function(args) {
        var that = this;

        console.log("loadingMoreResults Started");
        that.set("loadingResults", true);
        
        that.currentSearch.skip += 15;

        return utility.httpRequest(that, that.getSearchRequestOptions(),
            function (response) { // success callback
                console.log("Initial Length: " + that.get("searchResults").Data.length);
                var data = response.content.toJSON();

                if (app.android) {
                    that.notify({ eventName: "refresh" });
                }

                data.Data.forEach(function(item) {
                    // item.availableTimes = ["3:00pm Today", "3:30pm Today", "4:00pm Today"];
                    that.searchResults.Data.push(item);
                });
                console.log("New Length: " + that.get("searchResults").Data.length);
                if (that.get("searchResults").Data.length >= that.get("searchResults").Count) {
                    that.set("listViewOnDemandMode", listViewModule.ListViewLoadOnDemandMode.None);
                }
                else {
                    that.set("listViewOnDemandMode", listViewModule.ListViewLoadOnDemandMode.Auto);
                }
            },
            function () { // error callback
                that.set("listViewOnDemandMode", listViewModule.ListViewLoadOnDemandMode.None);
            })
            .then(function(){
                that.set("loadingResults", false);
                that.notify({eventName: "notifyLoadOnDemandFinished"});
            });
    };

    return viewModel;
}

module.exports = LocationSearchViewModel;