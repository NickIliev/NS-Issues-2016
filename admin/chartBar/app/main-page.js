"use strict";
var observable_1 = require("data/observable");
var countriesItems = [
    { Country: "Germany", Amount: -5, SecondVal: 14 },
    { Country: "France", Amount: 13, SecondVal: -3 },
    { Country: "Bulgaria", Amount: -10, SecondVal: 17 },
    { Country: "Spain", Amount: 11, SecondVal: -9 },
    { Country: "USA", Amount: 18, SecondVal: 8 }
];
var yearItems = [
    { Year: 200, Amount: 15 },
    { Year: 456, Amount: -8 },
    { Year: 366, Amount: 25 },
    { Year: 100, Amount: -5 },
    { Year: 340, Amount: 17 },
    { Year: 135, Amount: 20 },
];
var viewModel = new observable_1.Observable();
viewModel.set("countriesSource", countriesItems);
viewModel.set("yearSource", countriesItems);
function navigatingTo(args) {
    var page = args.object;
    page.bindingContext = viewModel;
}
exports.navigatingTo = navigatingTo;
//# sourceMappingURL=main-page.js.map