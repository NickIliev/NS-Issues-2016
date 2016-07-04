var observable = require("data/observable");

var model = new observable.Observable();

// Event handler for Page "navigatingTo" event attached in main-page.xml
function navigatingTo(args) {
    // Get the event sender
    var page = args.object;
    page.bindingContext = model;
    
    model.on("propertyChange", function (propertyChangeData) {
  
        if (propertyChangeData.propertyName === "checkInTime") {
            page.getViewById("TimePickerB").minHour = model.TimePickerAHour;
            page.getViewById("TimePickerB").minMinute = model.TimePickerAMinute;
        }
                
        if (propertyChangeData.propertyName === "checkOutTime") {
            page.getViewById("TimePickerA").maxHour = model.TimePickerBHour;
            page.getViewById("TimePickerA").maxMinute = model.TimePickerBHour;
        }
    }); 
}

exports.navigatingTo = navigatingTo;




