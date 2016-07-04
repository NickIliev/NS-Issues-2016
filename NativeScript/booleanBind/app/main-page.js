var Observable = require("data/observable").Observable;

var pageData = new Observable({
    history: true
});

function onNavigatingTo(args) {
    var page = args.object;
    page.bindingContext = pageData;
}
exports.onNavigatingTo = onNavigatingTo;