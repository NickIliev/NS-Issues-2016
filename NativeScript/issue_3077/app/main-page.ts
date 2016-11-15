import observable = require("data/observable");
import pageModule = require("ui/page");
import builder = require("ui/builder");

var viewModel = new observable.Observable();

export function onPageLoaded(args: observable.EventData) {
    var page = <pageModule.Page>args.object;
    viewModel.set("level", "Test for base level binding!");
    viewModel.set("parentTest", "Test for parent binding!");
    page.bindingContext = viewModel;

    var myComponentInstance = builder.load({
            path: "~/cmps",
            name: "component"
    });

    page.content = myComponentInstance;
}