var observable = require("data/observable");
var pageData = new observable.Observable();

exports.loaded = function(args) {
	pageData.set("showDetails", true);
    pageData.set("msg", "default message");
	args.object.bindingContext = pageData;
}

exports.toggle = function() {
	pageData.set("showDetails", !pageData.get("showDetails"));
}