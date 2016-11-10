var StackLayout = require("ui/layouts/stack-layout").StackLayout;

var CustomView = (function(_super) {
  __extends(CustomView, _super);
  function CustomView() {
    _super.call(this);
    _customView = this;
  }
  
  return CustomView;
})(StackLayout);

exports.CustomView = CustomView;
