var Observable = require("data/observable").Observable;
var ObservableArray = require("data/observable-array").ObservableArray;
var options = new ObservableArray(new Observable({ index: 0, text: "Option 1", selected: true }), new Observable({ index: 1, text: "Option 2", selected: false }), new Observable({ index: 2, text: "Option 3", selected: false }), new Observable({ index: 3, text: "Option 4", selected: false }));
var page, pageData = new Observable({
    options: options
});
exports.navigatingTo = function (args) {
    page = args.object;
    page.bindingContext = pageData;
};
exports.selectOption = function (args) {
    var index = args.object.id.replace("option-", "");
    options.forEach(function (val, idx, arr) {
        if (idx == index)
            val.selected = true;
        else
            val.selected = false;
    });
};
//# sourceMappingURL=main-page.js.map