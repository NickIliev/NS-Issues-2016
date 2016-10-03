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

exports.findERTap = function (e) {
    navigation.goToFindEROrUrgentCare();
}
exports.launchReferralEase = function (e) {
    navigation.goToReferralEase();
}
exports.launchScheduling = function (e) {
    navigation.goToScheduling();
}