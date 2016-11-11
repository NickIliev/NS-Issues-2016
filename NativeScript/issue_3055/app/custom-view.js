var StackLayout = require("ui/layouts/stack-layout").StackLayout;

var CustomView = (function(_super) {
    __extends(CustomView, _super);
    function CustomView() {
        _super.call(this);
        _customView = this;

        this.on("touch", function() {
          console.log("CV touched from inside");
        })

        this.on("tap", function() {
          console.log("CV tapped from inside");
        })
    }
    return CustomView;
})(StackLayout);

exports.CustomView = CustomView;
