var FrameModule = require("ui/frame");
var observable = require("data/observable");
  var Calendar = require("nativescript-calendar");

function calendarLoaded(args) {
var page = args.object;
var calendarModel = (function (_super) {
    __extends( calendarModel, _super);
    function calendarModel() {
        _super.call(this);
        console.log(" is now ready.");
        

        // Only the `title`, `startDate` and `endDate` are mandatory, so this would suffice: 
  // var options = {
  //   title: 'Get eye meds',
  //   // Make sure these are valid JavaScript Date objects. 
  //   // In this case we schedule an Event for now + 1 hour, lasting 1 hour. 
  //   startDate: new Date(new Date().getTime() + (60*60*1000)),
  //   endDate: new Date(new Date().getTime() + (2*60*60*1000))
  // };
 
  // // You can however add lots of properties to enrich the Event: 
  // options.location = 'The doc';
  // options.notes = 'This event has reminders';
 
  // // iOS has a separate 'url' field, but on Android the plugin appends this to the 'notes' field. 
  // options.url = 'http://microlabs.com';
 
  // // You can also override the default reminder(s) of the Calendar (in minutes): 
  // options.reminders = {
  //   first: 30,
  //   second: 10
  // };
 
  // // You can make this Event recurring (this one repeats every other day for 10 days): 
  // options.recurrence = {
  //   frequency: Calendar.RecurrenceFrequency.DAILY, // DAILY|WEEKLY|MONTHLY|YEARLY 
  //   interval: 2, // once in every 2 days 
  //   endDate: new Date(new Date().getTime() + (10*24*60*60*1000)) // 10 days 
  // };
 
  // // Want to use a custom calendar for your app? Pass in the 'id' or 'name'. 
  // // If the name doesn't yet exist the plugin will create it for you. 
  // options.calendar = {
  //   // id: 3, 
  //   name: " Cal"
  // };
 
  // Calendar.createEvent(options).then(
  //     function(createdId) {
  //       console.log("Created Event with ID: " + createdId);
  //     },
  //     function(error) {
  //       console.log("Error creating an Event: " + error);
  //     }
  // );
    }
 calendarModel.prototype.nextAction = function () {
       console.log("nextAction activated");
       var topmost=FrameModule.topmost();
       topmost.navigate("pages/index");
    };
   
    return calendarModel;
})(observable.Observable);
page.bindingContext = new calendarModel();
}

exports.calendarLoaded = calendarLoaded;