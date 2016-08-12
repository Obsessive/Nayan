var FrameModule = require("ui/frame");
var observable = require("data/observable");
var ObservableArray = require('data/observable-array');
var Calendar = require("nativescript-calendar");
var applicationSettings = require("application-settings");
var LocalNotifications = require("nativescript-local-notifications");
var dialogs = require("ui/dialogs");
var i18n=require("../../i18n");
var calendarlist = new ObservableArray.ObservableArray();
function calendarLoaded(args) {
var page = args.object;
var calendarModel = (function (_super) {
    __extends( calendarModel, _super);
    function calendarModel() {
        _super.call(this);
        var self=this;

        if(application.ios){
          calendar.hasPermission().then(
              function(granted) {
                if(!granted){
                  alert("Please enable calendar permission from your device settings to use this feature");
                }
              });
        }
        for(var x in i18n){
         if(applicationSettings.getString("language")==="hindi" && x==="hindi"){
            for(var y in i18n[x]){
              this.set(y,i18n[x][y]);
            }
         }
         if(applicationSettings.getString("language")==="english" && x==="english"){
             for(var y in i18n[x]){
              this.set(y,i18n[x][y]);
            }
         }
        // this.set(x,i18n[x]);
      }
        calendarlist = new ObservableArray.ObservableArray();
        this.set("calendarlist",calendarlist);
        var options = {
          // when searching, dates are mandatory - the event must be within this interval
          startDate: new Date(new Date().getTime() - (183*24*60*60*1000)),
          endDate: new Date(new Date().getTime() + (183*24*60*60*1000))
        };

        // options.url = 'http://microlabs.com';
        options.calendar = {
          id: 54,
          name: "MicroLabs Nayan"
        };
        Calendar.findEvents(options).then(
            function(events) {
              console.log("1");
              console.log(JSON.stringify(events));
               for(var i=0;i<events.length;i++)
               {
                if(events[i].title.indexOf('Nayan:') > -1){

                console.log(events[i].title+" id:"+events[i].id);
                  calendarlist.push({name:events[i].title,id:events[i].id});
                }else{
                  console.log("not nayan reminder");
                }
               }
               //console.dir(calendarlist);
            },
            function(error) {
              console.log("Error finding Events: " + error);
            }
        );

        console.log(" is now ready.");
    }

 calendarModel.prototype.newEventAction = function () {
       console.log("nextAction activated");
       var topmost=FrameModule.topmost();
       topmost.navigate("pages/patient/home/calendar/newevent/newevent");
    };
     calendarModel.prototype.delCalendarAction = function () {
       var btn = args.object;
      var item = btn.bindingContext;
      console.log("2");
      console.log(item);
      console.dir(item);
    };

    return calendarModel;
})(observable.Observable);
page.bindingContext = new calendarModel();
}
exports.delbutton = function(args) {
    /**
     * Getting the "bindingContext" of the tapped item.
     * The bindingContext will contain e.g: {name: 'First Item', id: 0}
     */
    var btn = args.object;
    var tappedItemData = btn.bindingContext;
    console.log("1");
    console.log(tappedItemData);
    /**
     * Iterate through our array and if the tapped item id
     * is the same as the id of the id of the current iteration
     * then remove it.
     */
    calendarlist.some(function (item, index) {
        if(item.id === tappedItemData.id) {
          console.log(item.id);
          var options = {
            // when searching, dates are mandatory - the event must be within this interval
            startDate: new Date(new Date().getTime() - (50*24*60*60*1000)),
            endDate: new Date(new Date().getTime() + (50*24*60*60*1000))
          };
          options.id = tappedItemData.id;
          Calendar.deleteEvents(options).then(
              function(deletedEventIds) {
                console.log(JSON.stringify(deletedEventIds));
              },
              function(error) {
                console.log("Error deleting Events: " + error);
              }
          );
            calendarlist.splice(index, 1);
            return false;
        }
    });
}
exports.back = function(args){
  console.log("back");
  var topmost=FrameModule.topmost();
  topmost.goBack();
}
exports.calendarLoaded = calendarLoaded;
