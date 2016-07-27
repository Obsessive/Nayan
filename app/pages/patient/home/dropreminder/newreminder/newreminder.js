var FrameModule = require("ui/frame");
var observable = require("data/observable");
var dialogs = require("ui/dialogs");
var Calendar = require("nativescript-calendar");
var applicationSettings = require("application-settings");
var LocalNotifications = require("nativescript-local-notifications");
var Sqlite = require( "nativescript-sqlite" );
var applicationSettings = require("application-settings");
var pushid;
var i18n=require("../../../i18n");
function dropreminderLoaded(args) {
var page = args.object;
var dropreminderModel = (function (_super) {
    __extends( dropreminderModel, _super);

    function dropreminderModel() {
        _super.call(this);
            //Set all labels and other i18n bindings here
      //getting it from i18n
      //var i18n=require("../i18n");
      //will ensure no internal var conflicts.
      //Not the best solution. -Zee
      //I'm sure. Abhijith will improve this.
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
        // this.set("reminditems", ["Once","Twice a day","Thrice a day","four times a day"]);
        this.set("dosageitems", ["select","1 drop","2 drops","3 drops","4 drops","5 drops","6 drops","7 drops"]);
        console.log(" is now ready.");
    }
 dropreminderModel.prototype.nextAction = function () {
       console.log("nextAction activated");
       var topmost=FrameModule.topmost();
       topmost.navigate("pages/index");
    };
    dropreminderModel.prototype.setReminderAction = function () {
      var dateObj = new Date();
        var month = dateObj.getUTCMonth(); //months from 1-12
        var day = dateObj.getUTCDate();
        var year = dateObj.getUTCFullYear();
          var datepick=page.getViewById("pickdate");
          var ev=page.getViewById("patientdropname");
         var rin=this.get("remindIndex");
         var dosage=this.get("dosageIndex");
          var hour=datepick.hour;
         var minute=datepick.minute;
         var eyeps=page.getViewById("eyep").selectedIndex;
         if(eyeps==0){
            ev.text=ev.text+"|Left Eye";
         }
         if(eyeps==1){
            ev.text=ev.text+"|Right Eye";
         }
         if(eyeps==2){
            ev.text=ev.text+"|Both Eyes";
         }

          console.log(ev.text+" "+hour+" "+minute+" "+eyeps+" "+rin+" "+dosage+ " " +month+" "+year+" "+day);
          switch(rin) {
              // case 0:

              //     break;
              case 1:
              var promise =new Sqlite("nayan.db", function(err, db) {
                  db.execSQL("insert into reminder (medicine,times) values (?,?)", [ev.text,"Twice a day"], function(err, id) {
                    pushid=id;
                  });
                });
                  LocalNotifications.schedule([{
                    id: pushid,
                    title: 'Nayan Eye Drops Reminder: '+ev.text,
                    body: 'Drops Reminder for: '+ev.text,
                    ticker: 'Nayan Reminder: '+ev.text,
                    at: new Date(year,month,day,8,minute,9,123)
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
                    at: new Date(year,month,day,20,minute,9,123)
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
                  db.execSQL("insert into reminder (medicine,times) values (?,?)", [ev.text,"Three times a day"], function(err, id) {
                    pushid=id;
                  });
                });
                  LocalNotifications.schedule([{
                    id: pushid,
                    title: 'Nayan Eye Drops Reminder: '+ev.text,
                    body: 'Drops Reminder for: '+ev.text,
                    ticker: 'Nayan Reminder: '+ev.text,
                    at: new Date(year,month,day,8,minute,9,123)
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
                    at: new Date(year,month,day,2,minute,9,123)
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
                    at: new Date(year,month,day,8,minute,9,123)
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
                      db.execSQL("insert into reminder (medicine,times) values (?,?)", [ev.text,"Four times a day"], function(err, id) {
                        pushid=id;
                        console.log("id: "+id);
                      });
                    });
                      LocalNotifications.schedule([{
                        id: pushid,
                        title: 'Nayan Eye Drops Reminder: '+ev.text,
                        body: 'Drops Reminder for: '+ev.text,
                        ticker: 'Nayan Reminder: '+ev.text,
                        at: new Date(year,month,day,8,minute,9,123)
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
                        at: new Date(year,month,day,12,minute,9,123)
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
                        at: new Date(year,month,day,4,minute,9,123)
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
                        at: new Date(year,month,day,8,minute,9,123)
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
                  db.execSQL("insert into reminder (medicine,times) values (?,?)", [ev.text,hour+":"+minute], function(err, id) {
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
                    at: new Date(year,month,day,hour,minute,9,123)
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
exports.back = function(args){
  console.log("back");
  var topmost=FrameModule.topmost();
  topmost.goBack();
}
exports.dropreminderLoaded = dropreminderLoaded;
