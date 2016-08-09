import { EventData, Observable } from "data/observable";
import { Page } from "ui/page";

var vm = new Observable();

vm.set("msg", "default message");

export function navigatingTo(args: EventData) {
    var page = <Page>args.object;
    page.bindingContext = vm;
}