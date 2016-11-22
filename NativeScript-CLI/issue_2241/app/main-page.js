/*
In NativeScript, a file with the same name as an XML file is known as
a code-behind file. The code-behind is a great place to place your view
logic, and to set up your page’s data binding.
*/

/*
NativeScript adheres to the CommonJS specification for dealing with
JavaScript modules. The CommonJS require() function is how you import
JavaScript modules defined in other files.
*/
var createViewModel = require("./main-view-model").createViewModel;

function onNavigatingTo(args) {
    /*
    This gets a reference this page’s <Page> UI component. You can
    view the API reference of the Page to see what’s available at
    https://docs.nativescript.org/api-reference/classes/_ui_page_.page.html
    */
    var page = args.object;

    var test;
    var SubscribeOptions = com.google.android.gms.nearby.messages.SubscribeOptions;
    var Strategy = com.google.android.gms.nearby.messages.Strategy;
    var MessageListener = com.google.android.gms.nearby.messages.MessageListener.extend({
        onFound: function (message) {
            Log.d("MESSAGE", "Found message :) ");
        },
        onLost: function (message) {
            Log.d("MESSAGE", "Lost message :( ");
        }
    });
    var mMessageListener = new MessageListener();

    var myCallback = com.google.android.gms.nearby.Nearby.Messages.SubscribeCallback.extend({
        onExpired: function() {
            console.log("onExpired");
        }
    });

    var options = new SubscribeOptions.Builder()
        .setStrategy(Strategy.BLE_ONLY)
        .setCallback(myCallback)
        .build();


    page.bindingContext = createViewModel();
}

/*
Exporting a function in a NativeScript code-behind file makes it accessible
to the file’s corresponding XML file. In this case, exporting the onNavigatingTo
function here makes the navigatingTo="onNavigatingTo" binding in this page’s XML
file work.
*/
exports.onNavigatingTo = onNavigatingTo;