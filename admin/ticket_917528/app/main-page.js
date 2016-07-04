var months = {
  "January": [
    {
      "resonForHoliday": "My Child was very Happy today",
      "date": "14"
    },
    {
      "resonForHoliday": "John was very Happy today",
      "date": "17"
    },
    {
      "resonForHoliday": "Ann was very Happy today",
      "date": "20"
    }
  ],
  "February": [
    {
      "resonForHoliday": "Jerry was very Happy today",
      "date": "24"
    },
    {
      "resonForHoliday": "Frank was very Happy today",
      "date": "27"
    },
    {
      "resonForHoliday": "Maria was very Happy today",
      "date": "31"
    }
  ]
}

var arr = Object.keys(months).map(function(k) { return months[k] });

var observableModule = require("data/observable");
var observableArrayModule = require("data/observable-array");

var myObservableArray = new observableArrayModule.ObservableArray(arr);

var viewModel = new observableModule.Observable();

function onNavigatingTo(args) {
    var page = args.object;

    var selectedIndex = 1; // for example you already have your selectedIndex returned from the binding context

    var selectedMonth = arr[selectedIndex]; // use the selectedIndex value to return February as an Object (or any other month)
    
    var selectedMonthArray = Object.keys(selectedMonth).map(function(k) { return selectedMonth[k] }); // convert February to array of events

    viewModel.set("listItems", selectedMonthArray); // set the binding for the events in February 
    
    page.bindingContext = viewModel; // finnaly set the page binding context
}
exports.onNavigatingTo = onNavigatingTo;