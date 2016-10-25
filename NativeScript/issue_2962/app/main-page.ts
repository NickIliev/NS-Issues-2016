import { EventData, Observable } from 'data/observable';
import { Page } from 'ui/page';

let vm = new Observable();
vm.set("interests", "some interests");

export function navigatingTo(args: EventData) {
  let page = <Page>args.object;
  page.bindingContext = vm;
}

export function onTapInterests(args: EventData) {
  console.log("onTapInterests");
}