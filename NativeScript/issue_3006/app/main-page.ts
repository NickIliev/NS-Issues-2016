import { EventData } from 'data/observable';
import { Page } from 'ui/page';

export function navigatingTo(args: EventData) {
  let page = <Page>args.object;
}

export function onTouch(args: EventData) {
  console.log("onTouch");
}

export function onTap(args: EventData) {
  console.log("onTap");
}