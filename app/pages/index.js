// var PageModule = require("ui/page");
// FrameModule is needed in order to have an option to navigate to the new page.
var FrameModule = require("ui/frame");
var observable = require("data/observable");
var fetchModule = require("fetch");
var Sqlite = require( "nativescript-sqlite" );

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
        console.log("ready."); 

        //Check if database exist.. and take to appropriate page if required.
        if (Sqlite.exists("nayan.db")) {
            //Database does exist.. 
            //check if the user is a doctor or a patient..
        var promise =new Sqlite("nayan.db", function(err, db) {
            db.get('select * from user', function(err, row) {
              if(row[1]=='doctor'){
                var topmost=FrameModule.topmost();
                topmost.navigate("pages/doctor/home/home");
              }
              if(row[1]=='patient'){
                var topmost=FrameModule.topmost();
                topmost.navigate("pages/patient/home/home");
              }
              if(err!=null){
                alert('Oops! Looks like something went wrong.. Please restart the app!')
              }
            });
        });
      }   else{
        console.log('not found');
      }
    }
    HelloWorldModel.prototype.doctorAction = function () {
       console.log("he/she is a Doctor");
       // this.push();
       var topmost=FrameModule.topmost();
       topmost.navigate("pages/doctor/registration/registration");
    };
    
    HelloWorldModel.prototype.patientAction = function () {
    	 console.log("he/she is a patient");
         var topmost=FrameModule.topmost();
       topmost.navigate("pages/patient/registration/registration");
    };
    return HelloWorldModel;
})(observable.Observable);
page.bindingContext = new HelloWorldModel();
}
exports.pageLoaded = pageLoaded;
