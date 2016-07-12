var Observable = require("data/observable").Observable;
var gesturesModule = require("ui/gestures");

var View = require("~/common/view-base")
var navigation = require("~/components/navigation");
var tabViewUtil = require("~/components/tabview-util");

var ProviderSearchViewModel = require("./provider-search-view-model");


var view = new View();
view.viewModel = new ProviderSearchViewModel();

view.loaded = function(args) {
    var that = view;
    var options = {
        pageName: "ProviderSearch"
    };
    that.initialize(args, options);

    that.providerListElement = that.page.getViewById("providers-list");
    that.mainContentElement = that.page.getViewById("main-content");
    
    that.searchBox = that.page.getViewById("txtSearchBox");
    
    that.ddlSearchBy = that.page.getViewById("ddlSearchBy");

    tabViewUtil.selectTab(that.viewModel, that.page, 0);
    
    that.viewModel.getLocation();
};

view.search = function (args) {
    var that = view;

    console.log("searchbuttonpress");

    if (that.viewModel.get("searchTerm").trim() === "") {
        return;
    }

    that.searchBox.dismissSoftInput();
    if(!that.viewModel.get("searchButtonPressed")) {
        that.viewModel.set("searchButtonPressed", true);
        that.viewModel.search()
            .catch(function (error) {
                that.viewModel.showError(error.toString());
            })
            .then(function() {
                that.viewModel.set("searchButtonPressed", false)
            });
            
    }
};

view.selectProvider = function (args) {
    var providerData = view.viewModel.searchResults.Data.getItem(args.itemIndex);
    navigation.goToProviderDetail(providerData.ProviderID);
};

view.disableInput = function() {
    var that = view;
    that.searchBox.editable = false;
    if(that.ddlSearchBy && that.ddlSearchBy.editable) {
    	that.ddlSearchBy.editable = false;
    }
};

view.enableInput = function () {
    var that = view;
    that.searchBox.editable = true;
    if(that.ddlSearchBy) {
    	that.ddlSearchBy.editable = true;
	}
};

view.showFilters = function(args) {
    var that = view;
    console.log("show filters");

    var page = args.object.page;
    that.showModal(page, false);
};

view.showModal = function (page, fullscreen) {
    var that = view;
    page.showModal("./views/provider-search/filters", {}, function (search) {
        console.log("genderSelection: " + that.viewModel.filterBy.Gender.SelectedIndex)
        if(search) {
            view.viewModel.search();
        }
    }, fullscreen);
};

view.onCloseModal = function(args) {
    var page = args.object.page;
    page.closeModal();
};

// custom viewModel events
view.viewModel.on("notifyLoadOnDemandFinished", function (eventData) {
    view.providerListElement.notifyLoadOnDemandFinished();
});

view.viewModel.on("scrollToTopList", function (eventData) {
    var that = view;
    if(that.viewModel.searchResults.Count > 0) {
        that.providerListElement.scrollToIndex(0);
    }
});

view.viewModel.on("disableInput", function (eventData) {
    view.disableInput();
});

view.viewModel.on("enableInput", function (eventData) {
    view.enableInput();
});

module.exports = view;