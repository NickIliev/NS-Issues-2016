import { EventData } from 'data/observable';
import { Page } from 'ui/page';
import { GestureEventData } from "ui/gestures";
import { StackLayout } from "ui/layouts/stack-layout";
import { GridLayout } from "ui/layouts/grid-layout";
import { Image } from "ui/image";

// Event handler for Page "navigatingTo" event attached in main-page.xml
export function navigatingTo(args: EventData) {
  // Get the event sender
  let page = <Page>args.object;

  var gridLayout = <GridLayout>page.getViewById("grid9");
  var num;

  for (var i = 0; i < 3; i++) {
      for (var j = 0; j < 3; j++) {
          num = i * 3 + j;
          //build the grids
          var cell = new StackLayout();
          cell.id = "GD" + num;
          cell.className = "grid";



          cell.on("tap", function (args: GestureEventData) {

          });


          var img = new Image();
          img.src = "res://icon";
          cell.addChild(img);

          GridLayout.setRow(cell, i);
          GridLayout.setColumn(cell, j);
          gridLayout.addChild(cell);
      }
  }
}