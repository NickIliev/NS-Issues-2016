var navigation = require("~/components/navigation");

exports.findProviderTap = function (e) {
    navigation.goToProviderSearchPage();
};

exports.findLocationTap = function (e) {
    navigation.goToLocationSearchPage();
};

exports.findPHRTap = function (e) {
    navigation.goToFindPHR();
};

exports.test = function (e) {
    console.log("tileTap");
}