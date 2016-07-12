exports.selectTab = function(viewModel, page, index) {
    if (require("application").android) {
        var tabView = page.getViewById("mainTabs");
        if (tabView) {
            tabView.selectedIndex = index;
        }
    }
    else {
        viewModel.set("selectedScreen", index);
    }
}