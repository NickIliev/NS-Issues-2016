"use strict";
var main_view_model_1 = require("./main-view-model");
var mapbox = require("nativescript-mapbox");
// Event handler for Page "navigatingTo" event attached in main-page.xml
function navigatingTo(args) {
    // Get the event sender
    var page = args.object;
    page.bindingContext = new main_view_model_1.HelloWorldModel();
    mapbox.show({
        accessToken: 'pk.eyJ1Ijoibmlja2lsaWV2IiwiYSI6ImNpbzl2M3VqeDAwMGl1d20xY3dmYnhvMmsifQ.MBrBtTZXezIXtSvpnmfxOg',
        style: 'emerald',
        margins: {
            left: 40,
            right: 40,
            top: 450,
            bottom: 40 // default 0
        },
        center: {
            lat: 52.3702160,
            lng: 4.8951680
        },
        zoomLevel: 9.25,
        showUserLocation: true,
        hideAttribution: false,
        hideLogo: false,
        hideCompass: false,
        disableRotation: false,
        disableScroll: false,
        disableZoom: false,
        markers: [
            {
                'lat': 52.3732160,
                'lng': 4.8941680,
                'title': 'Nice location',
                'subtitle': 'Really really nice location' // one line is available on iOS, multiple on Android
            }
        ]
    }).then(function (result) {
        console.log("Mapbox show done");
    }, function (error) {
        console.log("mapbox show error: " + error);
    });
}
exports.navigatingTo = navigatingTo;
//# sourceMappingURL=main-page.js.map