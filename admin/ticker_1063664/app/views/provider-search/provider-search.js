var Observable = require("data/observable").Observable;
var gesturesModule = require("ui/gestures");
var applicationSettingsModule = require("application-settings");
var frameModule = require('ui/frame');

var View = require("~/common/view-base")
var navigation = require("~/components/navigation");
var tabViewUtil = require("~/components/tabview-util");
var location = require("~/components/location");

var ProviderSearchViewModel = require("./provider-search-view-model");

var view = new View();
view.viewModel = new ProviderSearchViewModel();

// initial loading
view.loaded = function(page) {
    var that = view;
    that.page = page;

    that.providerListElement = that.page.getViewById("providers-list");
    that.searchBox = that.page.getViewById("txtSearchBox");

    tabViewUtil.selectTab(that.viewModel, that.page, 0);

    that.viewModel.filterBy.applyCriteria();

    that.searchBox.on("Tap", function (args) {
        that.viewModel.set("isPrimaryCare", false);
        if(that.viewModel.get("searchBy").SelectedIndex === 2) {
            that.showConditionSelect();
        }
    });
}

view.onSearchBtnTap = function (args) {
    var that = view;
    if(that.viewModel.searchBy.get("SelectedIndex") === 2) {
        that.showConditionSelect();
    }
    else {
        view.search(args);
    }
};

view.search = function (args) {
    var that = view;

    console.log("searchbuttonpress");
    
    if(!that.viewModel.get("isConditionTriggered") &&
       !that.viewModel.get("isPrimaryCare")) {
        if (that.viewModel.get("searchTerm").trim() === "") {
            return;
        }
    }

    that.searchBox.dismissSoftInput();
    if (!that.viewModel.get("searchButtonPressed")) {
        that.viewModel.set("searchButtonPressed", true);
        that.viewModel.search();
    }
};

view.selectProvider = function (args) {
    var providerData = view.viewModel.searchResults.Data.getItem(args.itemIndex);
    navigation.goToProviderDetail(providerData.ProviderID);
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
        page.showModal("./views/provider-search/filters", {}, function (data) {
            if (data && data.isCallingSearch) {
                that.viewModel.search();
                if (that.viewModel.searchBy.get("SelectedIndex") === 2 && data.condition) {
                    that.viewModel.set("searchTerm", data.condition);
                }
            }
        }, false);
    }
};

view.showAccessUH = function (args) {
    view.viewModel.set("selectedScreen", 0);
    console.log("tab1 click")
    console.log("selectedScreen" + view.viewModel.get("selectedScreen"))
};
view.showEHI = function (args) {
    view.viewModel.set("selectedScreen", 1);
    console.log("tab2 click")
    console.log("selectedScreen" + view.viewModel.get("selectedScreen"))
};

view.onTapPrimaryCare = function (args) {
    var that = view;
    if (!that.viewModel.get("isPrimaryCare")) {
        that.viewModel.set("isPrimaryCare", true);
        that.viewModel.set("searchTerm", "");
        that.viewModel.searchBy.set("SelectedIndex", 0);
        that.search(args);
    }
    else {
        that.viewModel.set("isPrimaryCare", false);
    }
};

// custom viewModel events
view.viewModel.on("notifyLoadOnDemandFinished", function (eventData) {
    view.providerListElement.notifyLoadOnDemandFinished();
});

view.viewModel.on("refresh", function (eventData) {
    view.providerListElement.refresh();
});

view.viewModel.on("scrollToTopList", function (eventData) {
    var that = view;
    if (that.viewModel.searchResults.Count > 0) {
        that.providerListElement.scrollToIndex(0);
    }
});

view.viewModel.on("disableInput", function (eventData) {
    view.disableInput();
});

view.viewModel.on("enableInput", function (eventData) {
    view.enableInput();
});

view.viewModel.on("setSearchBoxHint", function (eventData) {
    view.searchBox.hint = eventData.hint;
});

view.showConditionSelect = function () {
    var that = view;
    if(!applicationSettingsModule.getBoolean("isShowingModal")) {
        that.page.showModal("./views/provider-search/condition-select", {}, function (data) {
            console.log(JSON.stringify(data));
            if(data && data.isItemSelected && data.display) {
                that.viewModel.set("isConditionTriggered", true);
                that.viewModel.set("searchTerm", data.display);
                that.search();
                console.log("search");
            }
            else {
                //cancelCallback();
                console.log("cancel");
            }
        }, false);
    }
};

view.viewModel.on("showConditionSelect", function (eventData) {
    view.showConditionSelect();
});

module.exports = view;