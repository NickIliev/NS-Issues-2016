var Observable = require("data/observable").Observable;
var ObservableArray = require("data/observable-array").ObservableArray;
var http = require("http");
var geolocation = require("nativescript-geolocation");
var listViewModule = require("nativescript-telerik-ui/listview");

var ViewModel = require("~/common/view-model-base")
var constants = require("~/common/constants");

var model = require("~/views/provider-search/provider-search-model");

var filterBy = require("~/views/provider-search/filters-view-model");

function ProviderSearchViewModel() {
    var data = {
        pageTitle: "Search Providers",
        searchResults: {
            Count: -1,
            Data: new ObservableArray([])
        },
        searchTerm: "",
        currentSearch: {},
        isLoading: false,
        currentLocation: {},
        selectedScreen: 0,
        searchBy: new Observable({
            SelectedIndex: 0,
            SearchTypes: model.SearchTypes
        }),
        sortBy: new Observable({
            SelectedIndex: 0,
            SortTypes: model.SortTypes
        }),
        filterBy: filterBy,
        listViewOnDemandMode: listViewModule.ListViewLoadOnDemandMode.None
    };
    var viewModel = new ViewModel(data);

    viewModel.searchBy.on(Observable.propertyChangeEvent, function(propertyChangeData){
        console.log(propertyChangeData.propertyName + " has been changed and the new value is: " + propertyChangeData.value);
        viewModel.searchWithNewCriteria();
    });

    viewModel.sortBy.on(Observable.propertyChangeEvent, function(propertyChangeData){
        console.log(propertyChangeData.propertyName + " has been changed and the new value is: " + propertyChangeData.value);
        viewModel.searchWithNewCriteria();
    });

    viewModel.clearSearchResults = function () {
        var that = this;
        that.notify({eventName: "scrollToTopList"});
        while (that.get("searchResults").Data.length) {
            that.searchResults.Data.pop();
        }
        that.searchResults.Count = -1;
    };

    viewModel.getFilters = function () {
        var that = this;

        var filters = []
        filters.push({
                "Field": "Gender",
                "Value": that.filterBy.Gender.Genders[that.filterBy.Gender.SelectedIndex].Value,
                "Operator": "EQ"
            });

        if(that.filterBy.Insurance.SelectedInsurance.InsuranceId != null) {
            filters.push({
                "Field": "Insurance",
                "Value": that.filterBy.Insurance.SelectedInsurance.InsuranceId,
                "Operator": "EQ"
            });
        }
        return filters;
    };

    viewModel.getSpecialtiesText = function (specialties) {
        var specialtiesText = "";

        specialties.forEach(function (specialty) {
            specialtiesText += specialty + ", ";
        });

        if (specialtiesText.length > 0) {
            specialtiesText = specialtiesText.substring(0, specialtiesText.length - 2);
        }

        return specialtiesText;
    };

    viewModel.getCountText = function (count) {
        if(count > 1 || count === 0) {
            return count + " results found."
        }
        else if (count === 1) {
            return count + " result found."
        }
    };

    viewModel.search = function () {
        var that = this;
        console.log("searchStarted");
        that.set("loadingResults", true);
        that.clearSearchResults();
        
        if(that.sortBy.SortTypes[that.sortBy.SelectedIndex] === "Closest" &&
           that.currentLocation.latitude &&
           that.currentLocation.longitude) {
            that.getLocation();
        }

        console.log("currentLocation: " + JSON.stringify(that.get("currentLocation")));
        
        that.set("currentSearch", {
            searchTerm: that.get("searchTerm"),
            searchBy: that.get("searchBy").SelectedIndex,
            skip: 0,
            take: 15
        });

        var filters = that.getFilters();

        return http.request({
            url: constants.apiUrl + "Provider/GetBySearch",
            method: "POST",
            headers: { "Content-Type": "application/json" },
            content: JSON.stringify({
                SearchTerm: that.get("currentSearch").searchTerm,
                SearchBy: that.get("currentSearch").searchBy,
                Skip: that.get("currentSearch").skip,
                Take: that.get("currentSearch").take,
                Sort: [{
                    Field: that.sortBy.SortTypes[that.sortBy.SelectedIndex].Value
                }],
                Filter: {
                    Logic: "AND",
                    Filters: filters
                },
                currentLocation: {
                    Latitude: that.get("currentLocation").latitude,
                    Longitude: that.get("currentLocation").longitude
                }
            })
        })
        .then(function (response) {
            console.log("searchCompleted");
            if (response.statusCode == 200) {
                var data = response.content.toJSON();
                that.searchResults.Count = data.Count
                data.Data.forEach(function(item) {
                    item.SpecialtiesText = that.getSpecialtiesText(item.Specialties);
                    item.Specialties = null;
                    that.searchResults.Data.push(item);
                });
                var currentLength = that.get("searchResults").Data.length;
                console.log("listLength: " + currentLength);
                var totalCount = that.get("searchResults").Count;
                console.log("totalCount: " + totalCount);
                if (that.get("searchResults").Data.length < that.get("searchResults").Count) {
                    that.set("listViewOnDemandMode", listViewModule.ListViewLoadOnDemandMode.Auto);
                } else {
                    that.set("listViewOnDemandMode", listViewModule.ListViewLoadOnDemandMode.None);
                }
            }
            else {
                that.showError("Error occurred. StatusCode: " + response.statusCode);
            }
        }, function (e) {
            console.log("Error occurred " + e);
        })
        .then(function(){
            that.hidePageLoading();
            that.set("loadingResults", false);
        });
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
        
        var filters = that.getFilters();

        return http.request({
            url: constants.apiUrl + "Provider/GetBySearch",
            method: "POST",
            headers: { "Content-Type": "application/json" },
            content: JSON.stringify({
                SearchTerm: that.get("currentSearch").searchTerm,
                SearchBy: that.get("currentSearch").searchBy,
                Skip: that.get("currentSearch").skip,
                Take: that.get("currentSearch").take,
                Sort: [{
                    Field: that.sortBy.SortTypes[that.sortBy.SelectedIndex].Value
                }],
                Filter: {
                    Logic: "AND",
                    Filters: filters
                },
                currentLocation: {
                    Latitude: that.get("currentLocation").latitude,
                    Longitude: that.get("currentLocation").longitude
                }
            })
        })
        .then(function (response) {
            console.log("loadingMoreResults Completed");
            if (response.statusCode == 200) {
                //console.log("Initial Length: " + that.get("searchResults").Data.length);
                var listView = args.object;
                response.content.toJSON().Data.forEach(function(item) {
                    item.SpecialtiesText = that.getSpecialtiesText(item.Specialties);
                    item.Specialties = null;
                    that.searchResults.Data.push(item);
                });
                //console.log("New Length: " + that.get("searchResults").Data.length);
                var currentLength = that.get("searchResults").Data.length;
                var totalCount = that.get("searchResults").Count;
                if (that.get("searchResults").Data.length >= that.get("searchResults").Count) {
                    that.set("listViewOnDemandMode", listViewModule.ListViewLoadOnDemandMode.None);
                }
                else {
                    that.set("listViewOnDemandMode", listViewModule.ListViewLoadOnDemandMode.Auto);
                }
            }
            else {
                that.showError("Error occurred. StatusCode: " + response.statusCode);
            }
        }, function (e) {
            that.showError("Error occurred " + e);
            that.set("listViewOnDemandMode", listViewModule.ListViewLoadOnDemandMode.None);
        })
        .then(function(){
            that.set("loadingResults", false)
            
            that.notify({eventName: "notifyLoadOnDemandFinished"});
        });
    };
    
    viewModel.getLocation = function (callback) {
        console.log("Getting Location");
        var that = this;
        
        if(geolocation.isEnabled()) {
            geolocation.getCurrentLocation()
                        .then(function (data) {
                            that.set("currentLocation", data);
                        });
        }
        else {
            that.set("currentLocation", {});
        }

    };

    return viewModel;
}

module.exports = ProviderSearchViewModel;