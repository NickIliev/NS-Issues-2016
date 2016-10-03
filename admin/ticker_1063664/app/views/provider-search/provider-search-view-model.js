var Observable = require("data/observable").Observable;
var ObservableArray = require("data/observable-array").ObservableArray;
var utility = require("~/common/utility");
var listViewModule = require("nativescript-telerik-ui/listview");
var location = require("~/components/location");
var dropdown = require("~/components/dropdown");
var app = require("application");
var frameModule = require("ui/frame");

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
        searchBy: new Observable({
            SelectedIndex: 0,
            SearchTypes: new dropdown(model.SearchTypes, "DisplayValue")
        }),
        searchTerm: "",
        currentSearch: {},
        isPrimaryCare: false,
        isLoading: false,
        isSearching: false,
        loadingResults: false,
        currentLocation: {},
        selectedScreen: 0,
        filterBy: filterBy,
        listViewOnDemandMode: listViewModule.ListViewLoadOnDemandMode.None
    };
    var viewModel = new ViewModel(data);

    viewModel.searchBy.on(Observable.propertyChangeEvent, function(propertyChangeData){
        var that = viewModel;

        // TODO: replace magic numbers with Enum
        if (propertyChangeData.propertyName === "SelectedIndex") {
            that.clearSearchResults();
            that.set("searchTerm", "");
            that.set("isPrimaryCare", false);
            that.filterBy.setDefaults();
            if(propertyChangeData.value === 2) {
                // modal window for find condition
                console.log("call showConditionSelect");
                that.notify({eventName: "showConditionSelect"});
            }
        }
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

        that.filterBy.currentCriteria.filters.forEach(function(item) {
            filters.push({
                Operator: "Eq",
                Field: item.field,
                Value: item.value
            });
        }, this);

        return filters.length > 0 ? filters : null;
    };

    viewModel.getRequestOptions = function () {
        var that = this;

        var currentSearch = that.get("currentSearch");
        var currentLocation = that.get("currentLocation");

        return {
            url: constants.apiUrl + "Provider/GetBySearch",
            method: "POST",
            headers: { "Content-Type": "application/json" },
            content: JSON.stringify({
                SearchTerm: currentSearch.searchBy === 2 ? "" : currentSearch.searchTerm,
                SearchBy: typeof currentSearch.searchBy === 'undefined' ? 0 : currentSearch.searchBy,
                Skip: currentSearch.skip,
                Take: currentSearch.take,
                ConditionSearchSeed: currentSearch.conditionSearchSeed,
                IsPrimaryCare: currentSearch.isPrimaryCare,
                Sort: [{
                    Field: that.filterBy.sortBy.SortTypes._array[that.filterBy.currentCriteria.sortBy].Value
                }],
                Filter: {
                    Logic: "AND",
                    Filters: that.getFilters()
                },
                currentLocation: {
                    Latitude: currentLocation.latitude,
                    Longitude: currentLocation.longitude
                }
            })
        };
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

    viewModel.search = function () {
        var that = this;

        console.log("searchStarted");
        that.set("isSearching", true);
        that.clearSearchResults();

        if(that.filterBy.sortBy.SortTypes._array[that.filterBy.currentCriteria.sortBy] &&
           that.filterBy.sortBy.SortTypes._array[that.filterBy.currentCriteria.sortBy].DisplayValue === "Closest") {
            location.getLocation(that, function (success) {
                if(!success) {
                    // couldn't get location
                    that.showError("Couldn't get current location. Sorting by name instead.");
                    that.filterBy.sortBy.set("SelectedIndex", 0);
                    that.filterBy.currentCriteria.set("sortBy", 0);
                }
                that.doSearch();
            });
        }
        else {
            that.doSearch();
        }
    };

    viewModel.doSearch = function () {
        var that = this;

        that.set("currentSearch", {
            isPrimaryCare: that.get("isPrimaryCare"),
            conditionSearchSeed: null,
            searchTerm: that.get("searchTerm"),
            searchBy: that.get("searchBy").SelectedIndex,
            skip: 0,
            take: 15
        });

        var requestOptions = that.getRequestOptions();

        return utility.httpRequest(that, requestOptions,
            function (response) { // success callback
                console.log("searchCompleted");
                var data = response.content.toJSON();
                if (app.android) {
                    that.notify({ eventName: "refresh" });
                }
                that.searchResults.Count = data.Data.Count
                that.currentSearch.conditionSearchSeed = data.Data.ConditionSearchSeed;
                data.Data.ProviderSearchResults.forEach(function(item) {
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
            },
            function () { // error callback
                that.set("listViewOnDemandMode", listViewModule.ListViewLoadOnDemandMode.None);
            })
            .then(function(){
                that.set("isSearching", false);
                that.set("searchButtonPressed", false);
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

        var requestOptions = that.getRequestOptions();

        return utility.httpRequest(that, requestOptions,
            function (response) { // success callback
                console.log("loadingMoreResults Completed");
                var data = response.content.toJSON();
                //console.log("Initial Length: " + that.get("searchResults").Data.length);
                var listView = args.object;
                that.currentSearch.conditionSearchSeed = data.Data.ConditionSearchSeed;
                data.Data.ProviderSearchResults.forEach(function(item) {
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
            },
            function () { // error callback
                that.set("listViewOnDemandMode", listViewModule.ListViewLoadOnDemandMode.None);
            })
            .then(function(){
                that.set("loadingResults", false)
                that.notify({eventName: "notifyLoadOnDemandFinished"});
            });
    };

    return viewModel;
}

module.exports = ProviderSearchViewModel;