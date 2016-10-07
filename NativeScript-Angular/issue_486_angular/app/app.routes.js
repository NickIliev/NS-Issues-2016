"use strict";
var secondary_component_1 = require("./secondary.component");
var third_component_1 = require("./third.component");
var first_component_1 = require("./first.component");
exports.routableComponents = [];
exports.routes = [
    routeEntry({ path: "", component: first_component_1.FirstComponent, data: { title: "FIRST" } }), ,
    routeEntry({ path: "secondary", component: secondary_component_1.SecondaryComponent, data: { title: "Secondary" } }),
    routeEntry({ path: "third", component: third_component_1.ThirdComponent, data: { title: "Third" } })
];
function routeEntry(data) {
    exports.routableComponents.push(data.component);
    return data;
}
//# sourceMappingURL=app.routes.js.map