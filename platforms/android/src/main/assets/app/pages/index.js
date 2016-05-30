// var PageModule = require("ui/page");
// FrameModule is needed in order to have an option to navigate to the new page.
var FrameModule = require("ui/frame");
var observable = require("data/observable");
var fetchModule = require("fetch");
var Sqlite = require( "nativescript-sqlite" );
var applicationSettings = require("application-settings");
var english=true,hindi=false;
function pageLoaded(args) {

var page = args.object;
// var settings = {
//         // Android settings
//         senderID: '316739204235', // Android: Required setting with the sender/project number
//         notificationCallbackAndroid: function(message, pushNotificationObject) { // Android: Callback to invoke when a new push is received.
//             alert(JSON.stringify(message));
//         },

//         // iOS settings
//         badge: true, // Enable setting badge through Push Notification
//         sound: true, // Enable playing a sound
//         alert: true, // Enable creating a alert

//         // Callback to invoke, when a push is received on iOS
//         notificationCallbackIOS: function(message) {
//             alert(JSON.stringify(message));
//         }
//     };
var HelloWorldModel = (function (_super) {
    __extends(HelloWorldModel, _super);
    function HelloWorldModel() {

        var self = this;
        _super.call(this);

        self.set("languageVisible",false);

//Stage 1. Display nayan logo and Welcome.
//Stage 2. fade welcome and display select language.
//Stage 3. keep select language and display buttons .
        setTimeout(function(){

            page.getViewById("welcometext").animate({
                opacity: 0,
                duration: 1000
            });
            page.getViewById("selectlanguagetext").animate({
                  opacity: 0,
                  duration: 0
              });
              page.getViewById("languagegrid").animate({
                  opacity: 0,
                  duration: 0
              });
              page.getViewById("doctorbutton").animate({
                  opacity: 0,
                  duration: 0
              });
              page.getViewById("patientbutton").animate({
                  opacity: 0,
                  duration: 0
              });
            setTimeout(function(){
              self.set("languageVisible",true);
              page.getViewById("selectlanguagetext").animate({
                  opacity: 1,
                  duration: 1000
              });
              page.getViewById("languagegrid").animate({
                  opacity: 1,
                  duration: 1000
              });
              setTimeout(function(){
                page.getViewById("doctorbutton").animate({
                  opacity: 1,
                  duration: 1000
              });
              page.getViewById("patientbutton").animate({
                  opacity: 1,
                  duration: 1000
              });
              },1000);
            },1000);

        },1500);

        console.log("ready.");
        self.set("message","“नयन” मोबाइल एप");



        //Check if database exist.. and take to appropriate page if required.
        if (Sqlite.exists("nayan.db")) {
            //Database does exist..
            //check if the user is a doctor or a patient..
        var promise =new Sqlite("nayan.db", function(err, db) {
            db.get('select * from user', function(err, row) {
              try {
                if(row[1]=='doctor'){
                  var topmost=FrameModule.topmost();
                  topmost.navigate("pages/doctor/home/home");
                }
                if(row[1]=='patient'){
                  var topmost=FrameModule.topmost();
                  topmost.navigate("pages/patient/home/home");
                }
                if(err!==null){
                  alert('Oops! Looks like something went wrong.. Please restart the app!');
                }
              } catch (e) {
                self.setui();
                console.log("i am right");
              }
            });
        });
      }   else{
        //call setup ui for language toggle
        this.setui();
        console.log('not found');
      }
    }
     HelloWorldModel.prototype.setui = function (){
      var self=this;
      try{
      //Unchecks the checkboxes
      english=true;
      hindi=false;
      applicationSettings.setString("language", "english");
      self.set("english_action",true);
      self.set("hindi_action",false);
      console.log("setui is activated");
      page.getViewById("languagegrid").on("tap", function (args) {

        //Toggles the english
        if (english !== true) {
          console.log("english var was  not true");
          console.log("hindi var is: "+hindi);
          console.log("English var is: "+english);
          // console.log(applicationSettings.getString("language"));
          english = true;
          applicationSettings.setString("language", "english");
          self.set("english_action",true);
          hindi = false;
          self.set("hindi_action",false);
          console.log("English var is: "+english);
          return 1;
          // console.log("after: "+applicationSettings.getString("language"));
        }else {
          console.log("hindi var was true");
          console.log("hindi var is: "+hindi);
          console.log("English var is: "+english);
          // console.log(applicationSettings.getString("language"));
          english = false;
          applicationSettings.setString("language", "hindi");
          self.set("english_action",false);
          hindi = true;
          self.set("hindi_action",true);
          console.log("English var is: "+english);
          return 1;
          // console.log("after: "+applicationSettings.getString("language"));
        }
      });

      // page.getViewById("hindi_id").on("tap", function (args) {

      //   //Toggles the non english
      //   if (hindi !== true) {
      //     console.log("hindi var was not true");
      //     console.log("hindi var is: "+hindi);
      //     console.log("English var is: "+english);
      //     console.log("before :"+applicationSettings.getString("language"));
      //     hindi = true;
      //     applicationSettings.setString("language", "hindi");
      //     self.set("hindi_action",true);
      //     english = false;
      //     self.set("english_action",false);
      //     console.log("after: "+applicationSettings.getString("language"));
      //   }else {
      //     console.log("hindi var was true");
      //     console.log("hindi var is: "+hindi);
      //     console.log("English var is: "+english);
      //     console.log("before:"+applicationSettings.getString("language"));
      //     hindi = false;
      //     applicationSettings.setString("language", "english");
      //     self.set("hindi_action",false);
      //     english = true;
      //     self.set("english_action",true);
      //     console.log("after: "+applicationSettings.getString("language"));
      //   }
      // });
    }catch(e){
      console.log(e);
    }


    };





    HelloWorldModel.prototype.doctorAction = function () {
       console.log("he/she is a Doctor");
       // this.push();
       page.getViewById("languagegrid").off("tap", function (args) {
       });
       var topmost=FrameModule.topmost();
       topmost.navigate("pages/doctor/registration/registration");
    };

    HelloWorldModel.prototype.patientAction = function () {
    	 console.log("he/she is a patient");
       page.getViewById("languagegrid").off("tap", function (args) {
       });
       console.log("moving to patient. language is: "+applicationSettings.getString("language"));
         var topmost=FrameModule.topmost();
       topmost.navigate("pages/patient/registration/registration");
    };
    return HelloWorldModel;
})(observable.Observable);
page.bindingContext = new HelloWorldModel();
}
unload=function(){
  page.getViewById("languagegrid").off("tap", function (args) {
       });
};
exports.pageLoaded = pageLoaded;
