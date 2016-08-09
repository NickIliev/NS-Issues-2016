import { EventData, Observable } from "data/observable";
import { Page } from "ui/page";
import { MyViewModel } from "./main-view-model";

var vm = new MyViewModel();

export function onPageLoaded(args) {
    var page = args.object;
    page.bindingContext = vm;
}