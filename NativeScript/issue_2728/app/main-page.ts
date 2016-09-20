import { EventData, Observable } from 'data/observable';
import { Page } from 'ui/page';

export function onPageLoaded(args: EventData) {

  let page = <Page>args.object;

  let vm = new Observable();
  vm.set("color", "red");
  vm.set("name", "Anakin");

  page.bindingContext = vm;
}