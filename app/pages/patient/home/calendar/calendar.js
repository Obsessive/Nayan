var FrameModule = require("ui/frame");
var observable = require("data/observable");
var ObservableArray = require('data/observable-array');
var Calendar = require("nativescript-calendar");
var LocalNotifications = require("nativescript-local-notifications");
var dialogs = require("ui/dialogs");
var calendarlist = new ObservableArray.ObservableArray();
function calendarLoaded(args) {
var page = args.object;
var calendarModel = (function (_super) {
    __extends( calendarModel, _super);
    function calendarModel() {
        _super.call(this);
        var self=this;
        calendarlist = new ObservableArray.ObservableArray();
        this.set("calendarlist",calendarlist);
        var options = {
          // when searching, dates are mandatory - the event must be within this interval 
          startDate: new Date(new Date().getTime() - (50*24*60*60*1000)),
          endDate: new Date(new Date().getTime() + (50*24*60*60*1000))
        };
       
        options.url = 'http://microlabs.com';
       
        Calendar.findEvents(options).then(
            function(events) {
              console.log(JSON.stringify(events));
               for(var i=0;i<events.length;i++)
               {
                console.log(events[i].title+" id:"+events[i].id);
                  calendarlist.push({name:events[i].title,id:events[i].id});
               }
               console.dir(calendarlist);
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
exports.calendarLoaded = calendarLoaded;