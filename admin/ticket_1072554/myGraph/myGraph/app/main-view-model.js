var Observable = require("data/observable").Observable;

function getMessage(counter) {
    if (counter <= 0) {
        return "Hoorraaay! You unlocked the NativeScript clicker achievement!";
    } else {
        return counter + " taps left";
    }
}

function createViewModel() {
    var viewModel = new Observable();
    viewModel.counter = 42;
    viewModel.message = getMessage(viewModel.counter);

    viewModel.onTap = function() {
        this.counter--;
        this.set("message", getMessage(this.counter));
    }

    var testData = [
        { Time: new Date(), Celsius: 0 },
        { Time: new Date(), Celsius: 13 },
        { Time: new Date(), Celsius: 24 },
        { Time: new Date(), Celsius: 11},
        { Time: new Date(), Celsius: 18}
    ];

    viewModel.GraphSource = testData;
        //viewModel.set("GraphSource", testData);

    return viewModel;
}

exports.createViewModel = createViewModel;