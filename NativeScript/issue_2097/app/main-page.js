"use strict";
var formattedStringModule = require("text/formatted-string");
var spanModule = require("text/span");
var labelModule = require("ui/label");
var colorModule = require("color");
function onLoaded(args) {
    var page = args.object;
    var myStack = page.getViewById("myStack");
    var label = new labelModule.Label();
    var formattedString = new formattedStringModule.FormattedString();
    var newSpan = new spanModule.Span();
    newSpan.text = " LoremIpsum NewSpan "; // set the text attribute
    newSpan.fontSize = 30; // set new spanModifeier
    newSpan.foregroundColor = new colorModule.Color("#444"); // foregroundCoior modier
    console.log(newSpan.spanModifiers.length); // 2
    formattedString.spans.push(newSpan); // attach the spans to the formated string
    label.formattedText = formattedString; // attach the formatedString to the label
    newSpan.updateSpanModifiers(formattedString); // update the span modifuers!!
    myStack.addChild(label);
}
exports.onLoaded = onLoaded;
//# sourceMappingURL=main-page.js.map