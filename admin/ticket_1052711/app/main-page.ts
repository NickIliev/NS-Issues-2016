import { EventData } from "data/observable";
import { Page } from "ui/page";

import buttonModule = require("ui/button");
import formattedStringModule = require("text/formatted-string");
import spanModule = require("text/span");

// Event handler for Page "navigatingTo" event attached in main-page.xml
export function navigatingTo(args: EventData) {
    // Get the event sender
    var page = <Page>args.object;

    var btn = <buttonModule.Button>page.getViewById("b0");
    var formattedString = new formattedStringModule.FormattedString();
    var firstSpan = new spanModule.Span();

    firstSpan.fontSize = 18;
    firstSpan.text = "Capitalize and then lowercase ";
    formattedString.spans.push(firstSpan);
    btn.formattedText = formattedString;
}