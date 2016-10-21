var webViewModule = require("ui/web-view");
var webView = new webViewModule.WebView();

function pageLoaded(args) {
    var page = args.object;

    var wv = page.getViewById("wv");
    var url ="http://mixstreamflashplayer.net/flash/MixStreamPlayer.swf";
    wv.android.getSettings().setPluginsEnabled(true);
    // wv.android.loadUrl(url);

    page.bindingContext = webView.webViewModule;

    
}
exports.pageLoaded = pageLoaded;