var FrameModule = require("ui/frame");
var observable = require("data/observable");
var dialogs = require("ui/dialogs");
var tts = require("nativescript-texttospeech");
var application = require("application");
var pushPlugin = require("nativescript-push-notifications");
if (application.android) {
var Toast = require("nativescript-toast");
}
var Sqlite = require( "nativescript-sqlite" );
var applicationSettings = require("application-settings");
var i18n=require("../i18n");
// var fontModule = require("ui/styling/font");
application.on(application.resumeEvent, function (args) {
    if (args.android) {
        // For Android applications, args.android is an android activity class.
        console.log("Activity: " + args.android);

        pushPlugin.onMessageReceived(function callback(data) {  
            console.log("push received: "+data );
            var substring = "Inbox:";
            console.log(data.indexOf(substring) > -1);
            if(data.indexOf(substring) > -1){
              var msg=data.slice(6);
              console.log(msg);
               new Sqlite("nayan.db", function(err, db) {
                  var promise =db.execSQL("INSERT INTO chat (`message`,`fromid`,`toid`) VALUES(?,?,?)",[msg,'1','1']);
                  promise.then(function(){
                      console.log(JSON.stringify({"payload":[{"fromid":id,"toid":patient.id,"message":msg}]}));
                  });
              });
              // var topmost=FrameModule.topmost();
              // var navigationEntry = {
              //   moduleName: "pages/patient/home/inbox/inbox",
              //   context: {msg:msg},
              //   animated: true
              // };
              // topmost.navigate(navigationEntry);
            }else{
                var options = {
                    title: "Notification",
                    message: data,
                    okButtonText: "OK"
                };
                dialogs.alert(options).then(function () {
                    console.log("Done!");
                });
            }
        });
    } else if (args.ios) {
        // For iOS applications, args.ios is UIApplication.
        console.log("UIApplication: " + args.ios);
    }
});
function patientHomeLoaded(args) {
var page = args.object;
var patientHomeModel = (function (_super) {
    __extends(patientHomeModel, _super);
    function patientHomeModel() {
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
        tts.speak("Home!");
        // this.set("patienthomelist", [{ icon:"~/images/user.png",name: "My Profile" }, { icon:"~/images/condition.png",name: "Eye conditions" },{ icon:"~/images/inbox.png",name: "My inbox" },{ icon:"~/images/calendar.png",name: "Calendar" },{ icon:"~/images/book.png",name: "Medical Diary" },{ icon:"~/images/alarm.png",name: "Drop Reminder" },{ icon:"~/images/gym.png",name: "Eye Opening Story" },{ icon:"~/images/apple.png",name: "Food For Vision" },{ icon:"~/images/phone.png",name: "Contact us" },{ icon:"",name: "Legal" }]);
        if (application.android) {
        pushPlugin.onMessageReceived(function callback(data) {  
            console.log("push received: "+data );
            var substring = "Inbox:";
            console.log(data.indexOf(substring) > -1);
            if(data.indexOf(substring) > -1){
              var msg=data.slice(6);
              console.log(msg);
              var topmost=FrameModule.topmost();
              var navigationEntry = {
                moduleName: "pages/patient/home/inbox/inbox",
                context: {msg:msg},
                animated: true
              };
              topmost.navigate(navigationEntry);
            }else{
                var options = {
                    title: "Notification",
                    message: data,
                    okButtonText: "OK"
                };
                dialogs.alert(options).then(function () {
                    console.log("Done!");
                });
            }
        });
      }
        console.log("patient home is now ready.");
        //back button on home should quit the app.
        if (application.android) {
            application.android.on(application.AndroidApplication.activityBackPressedEvent, backEvent);
        }
    }
    // patientHomeModel.prototype.pageNavigatingTo = function () {
    //   console.log("navigating to...");
    // };

    // patientHomeModel.prototype.registerAction = function () {
    //    console.log("Registration button clicked.");
    //    var topmost=FrameModule.topmost();
    //    topmost.navigate("pages/patient/registration/registration");
    // };
   
    return patientHomeModel;
})(observable.Observable);
page.bindingContext = new patientHomeModel();
}
var speak = function (text,callback) {
  tts.speak("Profile");
  callback();
};

exports.patienthomelistitemTap = function (args) {
    var index = args.index;
    console.log('Clicked item with index ' + index);
    //This is shit. change this to id or name based index.
    if(index==0){
      speak("profile",function(){
        var topmost=FrameModule.topmost();
       topmost.navigate("pages/patient/home/profile/profile");
     });
      
    }
    //This index is shit too.
    
    if(index==1){
      tts.speak("Eye Conditions");
      var topmost=FrameModule.topmost();
       topmost.navigate("pages/patient/home/eyeconditions/eyeconditions");
    }
    if(index==2){
      tts.speak("Inbox");
      var topmost=FrameModule.topmost();
//       var navigationEntry = {
//     moduleName: "pages/patient/home/inbox/inbox",
//     animated: true,
//     transition: {
//         name: "slide",
//         duration: 380,
//         curve: "easeIn"
//     }
// };
// topmost.navigate(navigationEntry);
       topmost.navigate("pages/patient/home/inbox/inbox");
    }
    if(index==3){
      tts.speak("Calendar");
      var topmost=FrameModule.topmost();
       topmost.navigate("pages/patient/home/calendar/calendar");
    }
    if(index==4){
      tts.speak("Diary");
      var topmost=FrameModule.topmost();
       topmost.navigate("pages/patient/home/diary/diary");
    }
    if(index==5){
      tts.speak("Drop Reminder");
      var topmost=FrameModule.topmost();
       topmost.navigate("pages/patient/home/dropreminder/dropreminder");
    }
   
    if(index==7){
      tts.speak("Good food for good vision");
      var topmost=FrameModule.topmost();
       topmost.navigate("pages/patient/home/foodvision/foodvision");
    }
     if(index==8){
      tts.speak("Contact Micro Labs");
      var topmost=FrameModule.topmost();
       topmost.navigate("pages/patient/home/contact/contact");
    }
    if(index==6){
      tts.speak("Eye Opening Stories");
      var topmost=FrameModule.topmost();
       topmost.navigate("pages/patient/home/exercise/exercise");
    }
    if(index==9){
      tts.speak("Legal Details");
      var topmost=FrameModule.topmost();
       topmost.navigate("pages/patient/home/legal/legal");
    }
};
exports.homeUnloaded = function() {
    // We only want to un-register the event on Android
    if (application.android) {
        application.android.off(application.AndroidApplication.activityBackPressedEvent, backEvent);
    }
};
backEvent = function () {
            android.os.Process.killProcess(android.os.Process.myPid());
    };
exports.patientHomeLoaded = patientHomeLoaded;
