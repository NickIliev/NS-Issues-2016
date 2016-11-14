var observableModule = require("data/observable");
var frame = require("ui/frame");
var drawerModule = require("nativescript-telerik-ui/sidedrawer");
 
var GettingStartedViewModel = (function (_super) {
    __extends(GettingStartedViewModel, _super);
    function GettingStartedViewModel() {
        _super.call(this);
        this.set("mainContentText", "SideDrawer for NativeScript can be easily setup in the XML definition of your page by defining main- and drawer-content. The component"
            + " has a default transition and position and also exposes notifications related to changes in its state. Swipe from left to open side drawer.");
    }
    return GettingStartedViewModel;
}(observableModule.Observable));
exports.GettingStartedViewModel = GettingStartedViewModel;