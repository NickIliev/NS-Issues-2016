var frame = require("ui/frame");
var dialogs = require("ui/dialogs");
var Observable = require("data/observable").Observable;
var RadListView = require("nativescript-telerik-ui/listview").RadListView;

var filterBy = require("~/views/provider-search/filters-view-model");

var closeCallback;

var view = new Observable();
view.viewModel = filterBy;

view.onShowingModally = function (args) {
    var modalPage = args.object;
    if (modalPage.ios && modalPage.ios.modalPresentationStyle === UIModalPresentationStyle.UIModalPresentationFullScreen) {
        modalPage.ios.modalPresentationStyle = UIModalPresentationStyle.UIModalPresentationOverFullScreen;
    }
}

view.onShownModally = function (args) {
    closeCallback = args.closeCallback;
    var modalPage = args.object;

    if (frame.topmost().currentPage.modal !== args.object) {
        throw new Error(`frame.topmost().currentPage.modal.id: ${frame.topmost().currentPage.modal.id}; modalPage.id: ${modalPage.id}`);
    }
}

view.onLoaded = function (args) {
    var that = view;
    page = args.object;

    page.bindingContext = filterBy;

    // TODO: modularize autocomplete
    that.lvInsurance = page.getViewById("lvInsurance");
    that.lvInsurance.selectionBehavior = "Press";
    that.lvInsurance.multipleSelection = false;

    that.txtInsuranceSearchBox = page.getViewById("txtInsuranceSearchBox");
    that.viewModel.Insurance.on(Observable.propertyChangeEvent, function(propertyChangeData){
        if (propertyChangeData.propertyName === "SearchTerm" &&
            propertyChangeData.value.length > 2) {
            console.log(propertyChangeData.value);
            that.viewModel.insuranceSearch();
        }
    });

    that.lvInsurance.on(RadListView.itemSelectedEvent, function(args) {
        var selectedItem = that.viewModel.Insurance.Insurances.Data.getItem(args.itemIndex);
        that.viewModel.Insurance.SelectedInsurance.InsuranceId = selectedItem.InsuranceId;
        that.viewModel.Insurance.SelectedInsurance.InsuranceName = selectedItem.InsuranceName;

        // that.viewModel.Insurance.SelectedInsurances.push(that.viewModel.Insurance.Insurances.Data.getItem(args.itemIndex));
        // that.viewModel.Insurance.SelectedInsurances.forEach(function(item) {
        //     console.log(item.InsuranceName + " " + item.InsuranceId + " is selected.")
        // });
        //that.viewModel.Insurance.Selected = true;
        console.log("selectedName: " + that.viewModel.Insurance.get('SelectedInsurance').InsuranceName);
        that.viewModel.Insurance.set("SearchTerm", "");
        that.viewModel.clearInsuranceSearchResults();
    })

    that.lvCondition = page.getViewById("lvCondition");
    that.lvCondition.selectionBehavior = "Press";
    that.lvCondition.multipleSelection = false;

    that.txtConditionSearchBox = page.getViewById("txtConditionSearchBox");
    that.viewModel.Condition.on(Observable.propertyChangeEvent, function(propertyChangeData){
        if(propertyChangeData.propertyName === "SearchTerm" &&
           propertyChangeData.value.length > 2) {
            console.log(propertyChangeData.propertyName + " has been changed and the new value is: " + propertyChangeData.value);
        }
    });
}

view.onSearchButtonTap = function () {
    if (closeCallback) {
        // call search on return
        closeCallback(true);
    }
    else {
        frame.topmost().goBack();
    }
}

view.onUnloaded = function() {
    var that = view;

    // reset Insurances TextBox
    that.txtInsuranceSearchBox.text = "";
    that.viewModel.Insurance.set("SearchTerm", "");
    that.viewModel.Insurance.off(Observable.propertyChangeEvent);
    that.lvInsurance.off(RadListView.itemSelectedEvent);

    // reset Conditions TextBox
    that.txtConditionSearchBox.text = "";
    that.viewModel.Condition.set("SearchTerm", "");
    that.viewModel.Condition.off(Observable.propertyChangeEvent);
}

view.onInsuranceButtonTap = function (){
    view.viewModel.set("showInsurance", true);
}

view.onConditionButtonTap = function (){
    view.viewModel.set("showInsurance", false);
}

view.clearSelectedInsurance = function (){
    view.viewModel.Insurance.set("SelectedInsurance", {
        InsuranceId: null,
        InsuranceName: null
    });
}

module.exports = view;