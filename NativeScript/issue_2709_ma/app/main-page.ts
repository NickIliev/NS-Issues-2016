import { EventData } from "data/observable";
import { Page } from "ui/page";

var Observable = require("data/observable").Observable;

var timeModel = new Observable();
timeModel.StartTime_Formatted = '9:53';
timeModel.EndTime_Formatted = '9:53';

export function loaded(args: EventData) {
    var page = <Page>args.object;
    page.bindingContext = timeModel;
}

export function onTimeTap(args: EventData) {
    timeModel.set('EndTime_Formatted', '10:53');
}