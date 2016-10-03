var Observable = require("data/observable").Observable;
var ObservableArray = require("data/observable-array").ObservableArray;
var http = require("http");
var geolocation = require("nativescript-geolocation");
var listViewModule = require("nativescript-telerik-ui/listview");

var ViewModel = require("~/common/view-model-base")
var constants = require("~/common/constants");
var utility = require("~/common/utility");
var validator = require("email-validator");
var dropdown = require("~/components/dropdown");

function RequestAppointmentViewModel() {
    var data = {
        pageTitle: "Request An Appointment",
        isLoading: false,
        selectedScreen: 0,
        firstname: "",
        lastname: "",
        addressline1: "",
        addressline2: "",
        city: "",
        states: null,
        zipcode: "",
        gender: null,
        birthdate: "",
        firstnamecontact: "",
        lastnamecontact: "",
        phonenumber: "",
        emailcontact: "",
        specialities: null,
        items: null,
        selectedIndex: -1


    };
    var viewModel = new ViewModel(data);

    viewModel.load = function () {
        console.log("loading viewModel");
    };


    //** Bind Usa States dropdown **//
    viewModel.getStates = function () {
        var that = this;
        console.log("getStates method loading");

        var requestOptions = {
            url: constants.apiUrl + "State/GetAllByCountryId?id=238",
            method: "GET",
            headers: { "Content-Type": "application/json" }
        };

        utility.httpRequest(that, requestOptions,
            function (response) { // success callback
                var data = response.content.toJSON();
                var states = [];
                data.Data.forEach(function (item) {
                    states.push({
                        StateId: item.StateId,
                        StateName: item.StateName
                    });
                    console.log(JSON.stringify(item));
                });
                that.set("states", new dropdown(states, "StateName"));
                that.set("selectedIndex", 0);
            },
            function () { // error callback
            });
    }

    return viewModel;
}

module.exports = RequestAppointmentViewModel;