var frameModule = require("ui/frame");
var Observable = require("data/observable").Observable;
var ObservableArray = require("data/observable-array").ObservableArray;
var constants = require("~/common/constants");
var utility = require("~/common/utility");
var ViewModel = require("~/common/view-model-base")
var dialogsModule = require("ui/dialogs");

function OrderViewModel() {
    var data = {
        pageTitle: "ReferralOrders",
        isLoading: false,
        searchResults: {
            Count: -1,
            Data: new ObservableArray([])
        }
    };
    var viewModel = new ViewModel(data);

    viewModel.load = function (patientMRN,token) {
       var that = this;
        that.empty();
        that.set("patientMRN", patientMRN);

        var requestOptions = {
            url: constants.referralEaseUrl + "Referral/GetReferrals",
            method: "POST",
            headers: { "Content-Type": "application/json", "token": token },
            content: JSON.stringify({ PatientMRN: patientMRN, Skip: 0, Take: 5 })
        };
        //console.log(requestOptions.url);
        return utility.httpRequest(that, requestOptions,
            function (response) { // success callback
               var data = response.content.toJSON();
                //console.log(JSON.stringify(response));
               that.searchResults.Count = data.Count;
               //console.log("search count", that.searchResults.Count);
               that.set("count", data.Count + " Referral order(s) found. Click to schedule.");
               data.Data.forEach(function (item) {
                   var doneDate = item.ToBeDoneDate;
                   doneDate = item.ToBeDoneDate.split(" ");
                   item.ToBeDoneDate = doneDate[0];
                   var searchTerm = item.QOClassificationEntryName;
                   searchTerm = item.QOClassificationEntryName.split("Referral");
                   item.SearchTerm = searchTerm[0];
                   //console.log("search term", item.SearchTerm);
                    that.searchResults.Data.push(item);
                });
            },
            function () { // error callback
            }
        );
    };

    viewModel.empty = function () {
        var that = this;
        if (that.get("searchResults").Data.length > 0) {
            while (that.get("searchResults").Data.length) {
                that.searchResults.Data.pop();
            }
        }
    };

    return viewModel;
}

module.exports = OrderViewModel;