import { EventData } from 'data/observable';
import { Page } from 'ui/page';
import { Button } from "ui/button";

export function navigatingTo(args: EventData) {
  let page = <Page>args.object;
  let button = <Button>page.getViewById("btn");

  button.on(Button.tapEvent, function (){
    console.log("Button TAP triggered!");  
  })
}
