var FrameModule = require("ui/frame");
var observable = require("data/observable");
var ObservableArray = require('data/observable-array');
var dialogs = require("ui/dialogs");
var Sqlite = require( "nativescript-sqlite" );
var LocalNotifications = require("nativescript-local-notifications");
var calendarlist = new ObservableArray.ObservableArray();
var visit=0;
function dropreminderLoaded(args) {
var page = args.object;

var dropreminderModel = (function (_super) {
    __extends( dropreminderModel, _super);
    function dropreminderModel() {
        _super.call(this);
         var self=this;
       calendarlist = new ObservableArray.ObservableArray();
        this.set("calendarlist",calendarlist);
// if(!visit){
        new Sqlite("nayan.db", function(err, db) {
          var promise = db.each('select * from reminder', 
            function (err, row) {
              console.dir(row);
                console.log("Row results:", row); 
                  calendarlist.push({ name: row[1],id:row[0] });
          });
        });
        // visit=1;
      // }
        console.log(" is now ready.");
    }
 dropreminderModel.prototype.nextAction = function () {
       console.log("nextAction activated");
       var topmost=FrameModule.topmost();
       topmost.navigate("pages/index");
    };
    dropreminderModel.prototype.createReminderAction = function () {
    console.log("moving to create new reminder");
       var topmost=FrameModule.topmost();
       topmost.navigate("pages/patient/home/dropreminder/newreminder/newreminder");
        
    };
   
    return dropreminderModel;
})(observable.Observable);
page.bindingContext = new dropreminderModel();
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
          new Sqlite("nayan.db", function(err, db) {
          var promise = db.execSQL('DELETE FROM reminder where id=?', [item.id],
            function (err, row) {
                console.log("Row results:", row); 
              
          });
        });
          LocalNotifications.cancel(item.id).then(
      function(foundAndCanceled) {
          if (foundAndCanceled) {
            console.log("OK, it's gone!");
          } else {
            console.log("No ID "+item.id+" was scheduled");
          }
      }
  )
            calendarlist.splice(index, 1);
            // visit=0;
            return false;
        }
    });
}
exports.dropreminderLoaded = dropreminderLoaded;