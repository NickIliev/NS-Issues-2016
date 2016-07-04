var Observable = require("data/observable").Observable;

var now = new Date();
var model = new Observable({
    TimePickerBHour: now.getHours(),
    TimePickerAHour: now.getHours(),
    TimePickerAMinute: now.getMinutes(),
    TimePickerBMinute: now.getMinutes(),
    checkInTime: now,
    checkOutTime: now
});

// Event handler for Page "navigatingTo" event attached in main-page.xml
function navigatingTo(args) {
    // Get the event sender
    var page = args.object;
    page.bindingContext = model;
    
    var tpA = page.getViewById("TimePickerA");
    var tpB = page.getViewById("TimePickerB");
    
    console.dir(tpA.time);
    
    function updateConstraints() {
        
        tpA.maxHour = model.TimePickerBHour;
        tpA.maxMinute = model.TimePickerBMinute;
        console.log("A max hour: " + tpA.maxHour);
        
        tpB.minHour = model.TimePickerAHour;
        tpB.minMinute = model.TimePickerAMinute;
        console.log("B min hour: " + tpB.minHour);
    }
    updateConstraints();
    model.on("propertyChange", function (propertyChangeData) {
        updateConstraints();
        // updateConstraints();
        // console.log("propertyChange: " + propertyChangeData.propertyName + " " + new Date().time);
  
        // if (propertyChangeData.propertyName === "checkInTime") {
        //     console.log("checkInTime");
        //     page.getViewById("TimePickerB").minHour = model.TimePickerAHour;
        //     page.getViewById("TimePickerB").minMinute = model.TimePickerAMinute;
            
        //     // console.log('MIN HOUR B: ' + page.getViewById("TimePickerB").minHour);
        //     // console.log('MIN MUNITES B: ' + page.getViewById("TimePickerB").minMinute);
        // }
                
        // if (propertyChangeData.propertyName === "checkOutTime") {
        //     console.log("checkOutTime");
        //     page.getViewById("TimePickerA").maxHour = model.TimePickerBHour;
        //     page.getViewById("TimePickerA").maxMinute = model.TimePickerBHour;
            
        //     // console.log('MIN HOUR A: ' + page.getViewById("TimePickerA").minHour);
        //     // console.log('MIN MUNITES A: ' + page.getViewById("TimePickerA").minMinute);
        // }
    }); 
}

exports.navigatingTo = navigatingTo;

