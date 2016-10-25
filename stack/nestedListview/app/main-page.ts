import { EventData, Observable } from "data/observable";
import { Page } from "ui/page";

var page: Page;
var tempSessions = [
    {
        id: '0',
        title: "Stuff"
    },
    {
        id: '1',
        title: "Stuffly"
    },
    {
        id: '2',
        title: "Stufferrs"
    },
    {
        id: '3',
        title: "Event 4"
    }
];

export function pageLoaded(args: EventData){
    console.log(JSON.stringify(tempSessions));
    page = <Page>args.object;
    page.bindingContext = new Observable({
        sessions: tempSessions
    });
}