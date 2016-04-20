var FrameModule = require("ui/frame");
var observable = require("data/observable");
  var Calendar = require("nativescript-calendar");
var LocalNotifications = require("nativescript-local-notifications");
var dialogs = require("ui/dialogs");
function calendarLoaded(args) {
var page = args.object;
var calendarModel = (function (_super) {
    __extends( calendarModel, _super);
    function calendarModel() {
        _super.call(this);
        console.log(" is now ready.");
    }
 calendarModel.prototype.nextAction = function () {
       console.log("nextAction activated");
       var topmost=FrameModule.topmost();
       topmost.navigate("pages/index");
    };

    calendarModel.prototype.setReminderAction = function () {
       var datepick=page.getViewById("pickdate");
       var ev=page.getViewById("patientcalendarname");
       var year=datepick.year;
       var month=datepick.month;
       var day=datepick.day;
        console.log(year+" "+month+" "+day);
        console.log(new Date(year,month-1,day,8,23,9,123));
        console.log(new Date(new Date().getTime() + 10*1000));

    

 // Only the `title`, `startDate` and `endDate` are mandatory, so this would suffice: 
  var options = {
    title: "Nayan: "+ev.text,
    // Make sure these are valid JavaScript Date objects. 
    // In this case we schedule an Event for now + 1 hour, lasting 1 hour. 
    startDate: new Date(year,month-1,day),
    endDate: new Date(new Date(year,month-1,day) + (24*60*60*1000))
  };
 // options.recurrence = {
 //    frequency: Calendar.RecurrenceFrequency.DAILY, // DAILY|WEEKLY|MONTHLY|YEARLY 
 //    interval: 2, // once in every 2 days 
 //    endDate: new Date(new Date().getTime() + (10*24*60*60*1000)) // 10 days 
 //  };
  // You can however add lots of properties to enrich the Event: 
  options.location = 'Nayan Eye Doctor';
  options.notes = 'This event has reminders';
 
  // iOS has a separate 'url' field, but on Android the plugin appends this to the 'notes' field. 
  options.url = 'http://microlabs.com';
 

 
  // Want to use a custom calendar for your app? Pass in the 'id' or 'name'. 
  // If the name doesn't yet exist the plugin will create it for you. 
  options.calendar = {
    id: 54, 
    name: "MicroLabs Nayan"
  };
 
  Calendar.createEvent(options).then(
      function(createdId) {
        console.log("Created Event with ID: " + createdId);
      },
      function(error) {
        console.log("Error creating an Event: " + error);
      }
  );
      LocalNotifications.schedule([{
      id: 1,
      title: 'Nayan Reminder',
      body: 'Nayan: '+ev.text,
      ticker: 'Nayan Reminder: '+ev.text,
      at: new Date(year,month-1,day,8,23,9,123)
    }]).then(
        function() {
          // dialogs.alert({
          //   title: "Notification scheduled",
          //   message: 'ID: 1',
          //   okButtonText: "OK, thanks"
          // });
          console.log("notification done.");
        },
        function(error) {
          console.log("doSchedule error: " + error);
        }
    );
  dialogs.alert("Reminder has been set in your device's Calendar Successfully!").then(function() {
    console.log("Dialog closed!");
  });
    };
   
   
    return calendarModel;
})(observable.Observable);
page.bindingContext = new calendarModel();
}
exports.back = function(args){
  console.log("back");
  var topmost=FrameModule.topmost();
  topmost.goBack();
}
exports.calendarLoaded = calendarLoaded;