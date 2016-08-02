"use strict";
var formattedStringModule = require("text/formatted-string");
var spanModule = require("text/span");
// Event handler for Page "navigatingTo" event attached in main-page.xml
function navigatingTo(args) {
    // Get the event sender
    var page = args.object;
    var btn = page.getViewById("b0");
    var formattedString = new formattedStringModule.FormattedString();
    var firstSpan = new spanModule.Span();
    firstSpan.fontSize = 18;
    firstSpan.text = "Capitalize and then lowercase ";
    formattedString.spans.push(firstSpan);
    btn.formattedText = formattedString;
}
exports.navigatingTo = navigatingTo;
//# sourceMappingURL=main-page.js.map