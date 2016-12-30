"use strict";
var imageSource = require("image-source");
function onLoaded(args) {
    var page = args.object;
    // http://apod.nasa.gov/apod/image/1612/lmcapodgleason960.jpg  - NOT OK
    // http://apod.nasa.gov/apod/image/1612/farside_lro800.jpg  - NOT OK
    imageSource.fromUrl("http://apod.nasa.gov/apod/image/1612/lmcapodgleason960.jpg").then(function (res) {
        console.log("Succsess!");
    }).catch(function (err) {
        console.log(err); // throwing with  JS: Error: Response content may not be converted to an Image
    });
    // https://static.pexels.com/photos/33045/lion-wild-africa-african.jpg OK
    // http://mars.jpl.nasa.gov/msl-raw-images/proj/msl/redops/ods/surface/sol/01563/opgs/edr/ncam/NLB_536234013EDR_S0593016NCAM00568M_.JPG - OK
}
exports.onLoaded = onLoaded;
//# sourceMappingURL=main-page.js.map