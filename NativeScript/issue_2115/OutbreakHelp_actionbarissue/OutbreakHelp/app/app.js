var application = require("application");
var googleAnalytics = require("nativescript-google-analytics");

application.mainModule = "./views/home/home";
//application.mainModule = "./views/home/settings/settings";
//application.mainModule = "./views/briefs/briefs";
//application.mainModule = "./views/resources/resources";
//application.mainModule = "./views/webinars/webinars";
//application.mainModule = "./views/resources/filter/filter";
//application.mainModule = "./views/debug/debug";
application.cssFile = "./app.css";



if (application.ios) {
    //IOS 
    var __extends = this.__extends || function (d, b) {
        for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
        function __() { this.constructor = d; }
        __.prototype = b.prototype;
        d.prototype = new __();
    };
    
    var appDelegate = (function (_super) {
        __extends(appDelegate, _super);
        function appDelegate() {
            _super.apply(this, arguments);
        }
        
        appDelegate.prototype.applicationDidFinishLaunchingWithOptions = function (application, launchOptions) {
            //Module Code to initalize 
            initAnalytics("UA-59296321-2");
        };
        
        appDelegate.ObjCProtocols = [UIApplicationDelegate];
        return appDelegate;
    })(UIResponder);
    application.ios.delegate = appDelegate;
}else{
    //ANDROID 
    application.on(application.launchEvent, function (args) {
        //Module Code to initalize 
        initAnalytics("UA-59296321-3");
    });
 
}



application.start();
  
  
function initAnalytics(id){
    if (application.ios) {
        googleAnalytics.initalize({
                trackingId: id
        });
    }else{
        googleAnalytics.initalize({
                trackingId: id,
                dispatchInterval: 30
        });
    }
    
    googleAnalytics.startTimer("App Start", {
                                category: "Initalization",
                                name: "App Start"
                            });
}