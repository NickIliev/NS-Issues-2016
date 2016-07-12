var Observable = require("data/observable").Observable;
var ObservableArray = require("data/observable-array").ObservableArray;
var http = require("http");

var constants = require("~/common/constants");

var model = require("~/views/provider-search/provider-search-model");

var FiltersViewModel = new Observable({
    showInsurance: true,
    Gender: {
        SelectedIndex: 0,
        Genders: model.Genders
    },
    Insurance: new Observable({
        SearchTerm: "",
        Selected: false,
        SelectedInsurance: {
            InsuranceId: null,
            InsuranceName: ""
        },
        Insurances: {
            Data: new ObservableArray ([]),
            Count: 0
        }
    }),
    Condition: new Observable({
        SearchTerm: "",
        SelectedIds: "",
        Conditions: {
            Data: new ObservableArray ([
                { ConditionName: "Broken Leg", ConditionId: 1 },
                { ConditionName: "Itchy Eyes", ConditionId: 2 },
                { ConditionName: "Warts", ConditionId: 3 }
            ]),
            Count: 3
        }
    })
});

FiltersViewModel.clearInsuranceSearchResults = function () {
    var that = this;
    that.notify({eventName: "scrollToTopList"});
    while (that.Insurance.Insurances.Data.length) {
        that.Insurance.Insurances.Data.pop();
    }
    that.Insurance.Insurances.Count = 0;
};

FiltersViewModel.insuranceSearch = function () {
    var that = this;
    console.log("filtering results started");
    that.clearInsuranceSearchResults();

    that.insuranceRequest = http.request({
        url: constants.apiUrl + "Insurance/GetBySearch",
        method: "POST",
        headers: { "Content-Type": "application/json" },
        content: JSON.stringify({
            SearchTerm: that.Insurance.SearchTerm
        })
    })
    .then(function (response) {
        console.log("searchCompleted");
        if (response.statusCode == 200) {
            var data = response.content.toJSON();
            that.Insurance.Insurances.Count = data.Count
            data.Data.forEach(function(item) {
                that.Insurance.Insurances.Data.push(item);
            });
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

    return that.insuranceRequest;
};

module.exports = FiltersViewModel;