var observableModule = require("data/observable");

var viewModel = new observableModule.Observable();
viewModel.set("ip", "none"); // initial value

function onLoaded(args) {
   var page = args.object;
   page.bindingContext = viewModel;

   fetch("http://httpbin.org/ip", {
        method: "GET",
        headers: { "Content-Type": "application/json" }
    })
    .then(function (res) { return res.json(); })
    .then(function (data) {  
        console.log(data.origin); // make sure you are getting the value 
        viewModel.set("ip", data.origin); // binding to "price"

    })
}
exports.onLoaded = onLoaded;