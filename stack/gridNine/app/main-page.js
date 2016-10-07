"use strict";
var stack_layout_1 = require("ui/layouts/stack-layout");
var grid_layout_1 = require("ui/layouts/grid-layout");
var image_1 = require("ui/image");
// Event handler for Page "navigatingTo" event attached in main-page.xml
function navigatingTo(args) {
    // Get the event sender
    var page = args.object;
    var gridLayout = page.getViewById("grid9");
    var num;
    for (var i = 0; i < 3; i++) {
        for (var j = 0; j < 3; j++) {
            num = i * 3 + j;
            //build the grids
            var cell = new stack_layout_1.StackLayout();
            cell.id = "GD" + num;
            cell.className = "grid";
            var that = this;
            cell.on("tap", function (args) {
                //console.log(this.id);//  nope
                console.log(that.id); //  
            });
            var img = new image_1.Image();
            img.src = "res://icon";
            cell.addChild(img);
            grid_layout_1.GridLayout.setRow(cell, i);
            grid_layout_1.GridLayout.setColumn(cell, j);
            gridLayout.addChild(cell);
        }
    }
}
exports.navigatingTo = navigatingTo;
//# sourceMappingURL=main-page.js.map