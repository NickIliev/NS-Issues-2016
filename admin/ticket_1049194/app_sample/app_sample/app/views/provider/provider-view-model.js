var Observable = require("data/observable").Observable;
var ObservableArray = require("data/observable-array").ObservableArray;
var http = require("http");
var imageSource = require("image-source");

var ViewModel = require("~/common/view-model-base")
var constants = require("~/common/constants");

function ProviderViewModel() {
    var data = {
        pageTitle: "Provider Details",
        isLoading: true,
        selectedProvider: {}
    };
    var viewModel = new ViewModel(data);

    viewModel.load = function (providerId) {
        var that = this;
        
        that.set("isLoading", true);
        console.log("load started");
        // clear previous data
        that.set("selectedProvider", {
            FullName: "",
            Image: "",
            Specialties: "",
            Certification: [],
            Educations: [],
            Locations: []
        });

        return http.request({
            url: constants.apiUrl + "Provider/Get/" + providerId,
            method: "GET",
            headers: { "Content-Type": "application/json" }
        })
		.then(function (response) {
            var provider = response.content.toJSON().Data;
            provider.Specialties = that.getSpecialtiesText(provider.Specialties);
            provider.Locations.forEach(function (item) {
                item.Address = item.AddressLine1 + ', ' +
                               (item.AddressLine2 ? item.AddressLine2 + ', ' : '') +
                               item.City + ', ' +
                               item.State + ' ' +
                               item.Zip;
            });
		    that.set("selectedProvider", provider);
            that.set("isLoading", false);
            console.log("load completed");
		}, function (e) {
		    console.log("Error occurred " + e);
		});
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

    return viewModel;
}

module.exports = ProviderViewModel;