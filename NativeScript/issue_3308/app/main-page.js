"use strict";
var main_view_model_1 = require("./main-view-model");
var page;
// Event handler for Page "navigatingTo" event attached in main-page.xml
function navigatingTo(args) {
    /*
    This gets a reference this page’s <Page> UI component. You can
    view the API reference of the Page to see what’s available at
    https://docs.nativescript.org/api-reference/classes/_ui_page_.page.html
    */
    page = args.object;
    /*
    A page’s bindingContext is an object that should be used to perform
    data binding between XML markup and TypeScript code. Properties
    on the bindingContext can be accessed using the {{ }} syntax in XML.
    In this example, the {{ message }} and {{ onTap }} bindings are resolved
    against the object returned by createViewModel().

    You can learn more about data binding in NativeScript at
    https://docs.nativescript.org/core-concepts/data-binding.
    */
    page.bindingContext = new main_view_model_1.HelloWorldModel();
}
exports.navigatingTo = navigatingTo;
function openModal() {
    var modalPageModule = "./modal-page";
    var context = "some custom context";
    var fullscreen = true;
    page.showModal(modalPageModule, context, function closeCallback(username, password) {
        // Log the user in...
    }, fullscreen);
}
exports.openModal = openModal;
//# sourceMappingURL=main-page.js.map