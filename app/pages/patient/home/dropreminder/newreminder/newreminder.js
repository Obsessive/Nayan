var FrameModule = require("ui/frame");
var observable = require("data/observable");
var dialogs = require("ui/dialogs");
var Calendar = require("nativescript-calendar");

function dropreminderLoaded(args) {
var page = args.object;
var dropreminderModel = (function (_super) {
    __extends( dropreminderModel, _super);
    function dropreminderModel() {
        _super.call(this);
        console.log(" is now ready.");
    }
 dropreminderModel.prototype.nextAction = function () {
       console.log("nextAction activated");
       var topmost=FrameModule.topmost();
       topmost.navigate("pages/index");
    };
    dropreminderModel.prototype.setReminderAction = function () {
          var datepick=page.getViewById("pickdate");
       var ev=page.getViewById("patientdropname");
      
              // Only the `title`, `startDate` and `endDate` are mandatory, so this would suffice: 
  var options = {
    title: "Nayan : "+ev.text,
    // Make sure these are valid JavaScript Date objects. 
    // In this case we schedule an Event for now + 1 hour, lasting 1 hour. 
     startDate: new Date(new Date().getTime() + (60*60*1000)),
    endDate: new Date(new Date().getTime() + (2*60*60*1000))
  };
  options.recurrence = {
    frequency: Calendar.RecurrenceFrequency.DAILY, // DAILY|WEEKLY|MONTHLY|YEARLY 
    interval: 1, // once in every 2 days 
    endDate: new Date(new Date().getTime() + (10*24*60*60*1000)) // 10 days 
  };
 
  // You can however add lots of properties to enrich the Event: 
  options.location = 'The doc';
  options.notes = 'This event has reminders';
 
  // iOS has a separate 'url' field, but on Android the plugin appends this to the 'notes' field. 
  options.url = 'http://microlabs.com';
 

 
  // Want to use a custom calendar for your app? Pass in the 'id' or 'name'. 
  // If the name doesn't yet exist the plugin will create it for you. 
  options.calendar = {
    // id: 3, 
    name: " Nayan Reminders"
  };
 
  Calendar.createEvent(options).then(
      function(createdId) {
        console.log("Created Event with ID: " + createdId);
      },
      function(error) {
        console.log("Error creating an Event: " + error);
      }
  );
  dialogs.alert("Reminder has been set in your device's Calendar Successfully!").then(function() {
    console.log("Dialog closed!");
  
  });
    };
   
    return dropreminderModel;
})(observable.Observable);
page.bindingContext = new dropreminderModel();
}

exports.dropreminderLoaded = dropreminderLoaded;