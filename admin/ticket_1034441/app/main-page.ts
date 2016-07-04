import { EventData } from "data/observable";
import { Page } from "ui/page";
import { HelloWorldModel } from "./main-view-model";

var mapbox = require("nativescript-mapbox");

// Event handler for Page "navigatingTo" event attached in main-page.xml
export function navigatingTo(args: EventData) {
    // Get the event sender
    var page = <Page>args.object;
    page.bindingContext = new HelloWorldModel();
      
    mapbox.show({
        accessToken: 'pk.eyJ1Ijoibmlja2lsaWV2IiwiYSI6ImNpbzl2M3VqeDAwMGl1d20xY3dmYnhvMmsifQ.MBrBtTZXezIXtSvpnmfxOg', // see 'Prerequisites' above
        style: 'emerald', // light|dark|emerald|satellite|streets , default 'streets' (there is also 'hybrid' for Android)
        margins: {
        left: 40, // default 0
        right: 40, // default 0
        top: 450, // default 0
        bottom: 40 // default 0
        },
        center: { // optional without a default
        lat: 52.3702160,
        lng: 4.8951680
        },
        zoomLevel: 9.25, // 0-20, default 0
        showUserLocation: true, // default false - requires location permissions on Android which you can remove from AndroidManifest.xml if you don't need them
        hideAttribution: false, // default false, Mapbox requires this default if you're on a free plan
        hideLogo: false, // default false, Mapbox requires this default if you're on a free plan
        hideCompass: false, // default false
        disableRotation: false, // default false
        disableScroll: false, // default false
        disableZoom: false, // default false
        markers: [ // optional without a default
        {
            'lat': 52.3732160, // mandatory
            'lng': 4.8941680, // mandatory
            'title': 'Nice location', // recommended to pass in
            'subtitle': 'Really really nice location' // one line is available on iOS, multiple on Android
        }
        ]
    }).then(
        function(result) {
            console.log("Mapbox show done");
        },
        function(error) {
            console.log("mapbox show error: " + error);
        }
  )
}