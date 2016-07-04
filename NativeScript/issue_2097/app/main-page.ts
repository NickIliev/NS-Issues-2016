import { EventData } from "data/observable";
import { Page } from "ui/page";
import { StackLayout } from "ui/layouts/stack-layout";

import formattedStringModule = require("text/formatted-string");
import spanModule = require("text/span");
import labelModule = require("ui/label");
import colorModule = require("color");

export function onLoaded(args: EventData) {
    var page = <Page>args.object;
    
    var myStack = <StackLayout>page.getViewById("myStack");
    
    var label = new labelModule.Label();
    var formattedString = new formattedStringModule.FormattedString();
    var newSpan = new spanModule.Span();

    newSpan.text = " LoremIpsum NewSpan "; // set the text attribute
    newSpan.fontSize = 30;  // set new spanModifeier
    newSpan.foregroundColor = new colorModule.Color("#444"); // foregroundCoior modier
    
    console.log(newSpan.spanModifiers.length); // 2 spanModiers added to the span
    
    formattedString.spans.push(newSpan); // push the spans to the formated string
    label.formattedText = formattedString; // attach the formatedString to the label
    
    newSpan.updateSpanModifiers(formattedString); //do not forget to update the span modifuers!
    
    myStack.addChild(label);
}