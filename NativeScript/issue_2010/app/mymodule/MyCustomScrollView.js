var scrollViewModule = require("ui/scroll-view");
var imageModule = require("ui/image");

var MyCustomScrollView = (function (_super) {
    __extends(MyCustomScrollView, _super);
    function MyCustomScrollView() {
        _super.call(this);

        var img = new imageModule.Image();
        img.src = "~/res/pic1.jpg";
        
        this.content = img;

    }
    return MyCustomScrollView;
})(scrollViewModule.ScrollView);

exports.MyCustomScrollView = MyCustomScrollView;