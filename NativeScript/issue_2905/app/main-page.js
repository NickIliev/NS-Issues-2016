"use strict";
var main_view_model_1 = require('./main-view-model');
var http = require("http");
function navigatingTo(args) {
    var page = args.object;
    page.bindingContext = new main_view_model_1.HelloWorldModel();
    http.request({
        url: "https://httpbin.org/patch",
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        content: JSON.stringify({ MyVariableOne: "ValueOne", MyVariableTwo: "ValueTwo" })
    }).then(function (response) {
        var result = response.content.toJSON();
        console.log(result);
    });
}
exports.navigatingTo = navigatingTo;
//# sourceMappingURL=main-page.js.map