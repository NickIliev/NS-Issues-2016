import { StackLayout } from "ui/layouts/stack-layout";
import { Label } from "ui/label";

var stack;

exports.onPageLoaded = function(args) {
    var page = args.object;
    stack = <StackLayout> page.getViewById("container");


    for (var i = 0; i < 4; i++) {
      stack.addChild(new Label("ITEM #"+i));
      console.log("item added");
    }
};

exports.add = function(args) {
  var lbl = new Label();
  lbl.text = "new Item";

  stack.addChild(lbl);
  console.log("new item added");
}