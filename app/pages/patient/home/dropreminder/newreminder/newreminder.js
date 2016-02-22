var FrameModule = require("ui/frame");
var observable = require("data/observable");
var dialogs = require("ui/dialogs");
var Calendar = require("nativescript-calendar");
var applicationSettings = require("application-settings");
var LocalNotifications = require("nativescript-local-notifications");
var Sqlite = require( "nativescript-sqlite" );
var pushid;
function dropreminderLoaded(args) {
var page = args.object;
var dropreminderModel = (function (_super) {
    __extends( dropreminderModel, _super);

    function dropreminderModel() {
        _super.call(this);
        this.set("reminditems", ["at above set time","Twice a day","Thrice a day","four times a day","five times a day","six times a day"]);
        console.log(" is now ready.");
    }
 dropreminderModel.prototype.nextAction = function () {
       console.log("nextAction activated");
       var topmost=FrameModule.topmost();
       topmost.navigate("pages/index");
    };
    dropreminderModel.prototype.setReminderAction = function () {
      var dateObj = new Date();
        var month = dateObj.getUTCMonth() + 1; //months from 1-12
        var day = dateObj.getUTCDate();
        var year = dateObj.getUTCFullYear();
          var datepick=page.getViewById("pickdate");
          var ev=page.getViewById("patientdropname");
         var rin=this.get("remindIndex");
          var hour=datepick.hour;
         var minute=datepick.minute;
         var eyeps=page.getViewById("eyep").selectedIndex;
          console.log(ev.text+" "+hour+" "+minute+" "+eyeps+" "+rin);
          switch(rin) {
              // case 0:
              
              //     break;
              case 1:
              var promise =new Sqlite("nayan.db", function(err, db) {
                  db.execSQL("insert into reminder (medicine) values (?)", [ev.text], function(err, id) {
                    pushid=id;
                  });
                });
                  LocalNotifications.schedule([{
                    id: pushid,
                    title: 'Nayan Eye Drops Reminder: '+ev.text,
                    body: 'Drops Reminder for: '+ev.text,
                    ticker: 'Nayan Reminder: '+ev.text,
                    at: new Date(year,month-1,day,8,minute,9,123)
                  }]).then(
                      function() {
                        console.log("notification done.");
                      },
                      function(error) {
                        console.log("doSchedule error: " + error);
                      }
                  );

                  LocalNotifications.schedule([{
                    id: pushid,
                    title: 'Nayan Eye Drops Reminder: '+ev.text,
                    body: 'Drops Reminder for: '+ev.text,
                    ticker: 'Nayan Reminder: '+ev.text,
                    at: new Date(year,month-1,day,20,minute,9,123)
                  }]).then(
                      function() {
                        console.log("notification done.");
                      },
                      function(error) {
                        console.log("doSchedule error: " + error);
                      }
                  );
                
                
                  dialogs.alert({
                          title: "Saved",
                          message: 'Nayan has now saved your reminder!',
                          okButtonText: "OK, thanks"
                        });
                  break;


                case 2:
                var promise =new Sqlite("nayan.db", function(err, db) {
                  db.execSQL("insert into reminder (medicine) values (?)", [ev.text], function(err, id) {
                    pushid=id;
                  });
                });
                  LocalNotifications.schedule([{
                    id: pushid,
                    title: 'Nayan Eye Drops Reminder: '+ev.text,
                    body: 'Drops Reminder for: '+ev.text,
                    ticker: 'Nayan Reminder: '+ev.text,
                    at: new Date(year,month-1,day,8,minute,9,123)
                  }]).then(
                      function() {
                        console.log("notification done.");
                      },
                      function(error) {
                        console.log("doSchedule error: " + error);
                      }
                  );

                  LocalNotifications.schedule([{
                    id: pushid,
                    title: 'Nayan Eye Drops Reminder: '+ev.text,
                    body: 'Drops Reminder for: '+ev.text,
                    ticker: 'Nayan Reminder: '+ev.text,
                    at: new Date(year,month-1,day,2,minute,9,123)
                  }]).then(
                      function() {
                        console.log("notification done.");
                      },
                      function(error) {
                        console.log("doSchedule error: " + error);
                      }
                  );
                  

                  LocalNotifications.schedule([{
                    id: pushid,
                    title: 'Nayan Eye Drops Reminder: '+ev.text,
                    body: 'Drops Reminder for: '+ev.text,
                    ticker: 'Nayan Reminder: '+ev.text,
                    at: new Date(year,month-1,day,8,minute,9,123)
                  }]).then(
                      function() {
                        console.log("notification done.");
                      },
                      function(error) {
                        console.log("doSchedule error: " + error);
                      }
                  );
                
                  dialogs.alert({
                          title: "Saved",
                          message: 'Nayan has now saved your reminder!',
                          okButtonText: "OK, thanks"
                        });
                  break;

                  case 3:
                      var promise =new Sqlite("nayan.db", function(err, db) {
                      db.execSQL("insert into reminder (medicine) values (?)", [ev.text], function(err, id) {
                        pushid=id;
                        console.log("id: "+id);
                      });
                    });
                      LocalNotifications.schedule([{
                        id: pushid,
                        title: 'Nayan Eye Drops Reminder: '+ev.text,
                        body: 'Drops Reminder for: '+ev.text,
                        ticker: 'Nayan Reminder: '+ev.text,
                        at: new Date(year,month-1,day,8,minute,9,123)
                      }]).then(
                          function() {
                            console.log("notification done.");
                          },
                          function(error) {
                            console.log("doSchedule error: " + error);
                          }
                      );

                      LocalNotifications.schedule([{
                        id: pushid,
                        title: 'Nayan Eye Drops Reminder: '+ev.text,
                        body: 'Drops Reminder for: '+ev.text,
                        ticker: 'Nayan Reminder: '+ev.text,
                        at: new Date(year,month-1,day,12,minute,9,123)
                      }]).then(
                          function() {
                            console.log("notification done.");
                          },
                          function(error) {
                            console.log("doSchedule error: " + error);
                          }
                      );

                      LocalNotifications.schedule([{
                        id: pushid,
                        title: 'Nayan Eye Drops Reminder: '+ev.text,
                        body: 'Drops Reminder for: '+ev.text,
                        ticker: 'Nayan Reminder: '+ev.text,
                        at: new Date(year,month-1,day,4,minute,9,123)
                      }]).then(
                          function() {
                            console.log("notification done.");
                          },
                          function(error) {
                            console.log("doSchedule error: " + error);
                          }
                      );

                      LocalNotifications.schedule([{
                        id: pushid,
                        title: 'Nayan Eye Drops Reminder: '+ev.text,
                        body: 'Drops Reminder for: '+ev.text,
                        ticker: 'Nayan Reminder: '+ev.text,
                        at: new Date(year,month-1,day,8,minute,9,123)
                      }]).then(
                          function() {
                            console.log("notification done.");
                          },
                          function(error) {
                            console.log("doSchedule error: " + error);
                          }
                      );
                    
                    
                    
                      dialogs.alert({
                              title: "Saved",
                              message: 'Nayan has now saved your reminder!',
                              okButtonText: "OK, thanks"
                            });
                  break;

              default:
              var promise =new Sqlite("nayan.db", function(err, db) {
                  db.execSQL("insert into reminder (medicine) values (?)", [ev.text], function(err, id) {
                    pushid=id;
                    console.log(id);
                    console.log(err);
                  });
                });
                  LocalNotifications.schedule([{
                    id: pushid,
                    title: 'Nayan Eye Drops Reminder: '+ev.text,
                    body: 'Drops Reminder for: '+ev.text,
                    ticker: 'Nayan Reminder: '+ev.text,
                    at: new Date(year,month-1,day,hour,minute,9,123)
                  }]).then(
                      function() {
                        dialogs.alert({
                          title: "Saved",
                          message: 'Nayan has now saved your reminder!',
                          okButtonText: "OK, thanks"
                        });
                        console.log("notification done.");
                      },
                      function(error) {
                        console.log("doSchedule error: " + error);
                      }
                  );
                  
            } 
          
        };
   
    return dropreminderModel;
})
(observable.Observable);
page.bindingContext = new dropreminderModel();
}

exports.dropreminderLoaded = dropreminderLoaded;