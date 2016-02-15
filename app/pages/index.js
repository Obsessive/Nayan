// var PageModule = require("ui/page");
// FrameModule is needed in order to have an option to navigate to the new page.
var FrameModule = require("ui/frame");
var observable = require("data/observable");
var pushPlugin = require("nativescript-push-notifications");
var fetchModule = require("fetch");
function pageLoaded(args) {

var page = args.object;
var settings = {
        // Android settings
        senderID: '316739204235', // Android: Required setting with the sender/project number
        notificationCallbackAndroid: function(message, pushNotificationObject) { // Android: Callback to invoke when a new push is received.
            alert(JSON.stringify(message));
        },

        // iOS settings
        badge: true, // Enable setting badge through Push Notification
        sound: true, // Enable playing a sound
        alert: true, // Enable creating a alert

        // Callback to invoke, when a push is received on iOS
        notificationCallbackIOS: function(message) {
            alert(JSON.stringify(message));
        }
    };
var HelloWorldModel = (function (_super) {
    __extends(HelloWorldModel, _super);
    function HelloWorldModel() {
        
        var self = this;
        _super.call(this);
        console.log("ready.");
        // pushPlugin.register(, function (data){
        //   console.log("push register");
        //   console.log("message", "" + JSON.stringify(data));
        //   fetchModule.fetch("http://localhost:8000/subscribe", {
        //     method: "POST",
        //     body: JSON.stringify({user: "nraboy", type: "android", token: "Raboy"})
        //   })
        // }, function(e) {console.log(e); });

        // pushPlugin.onMessageReceived(function callback(data) {  
        //   console.log("message", "" + JSON.stringify(data));
        // });
    //      pushPlugin.register(settings,
    //     // Success callback 
    //     function(token) {
    //           // if we're on android device we have the onMessageReceived function to subscribe 
    //         // for push notifications 
    //         fetchModule.fetch("http://localhost:8000/subscribe", {

    //           method: "POST",
    //           body: JSON.stringify({user: "nraboy", type: "android", token: token})
    //         }).then(function(response) {
    //             console.log(response);
    //             console.log("done with fetch");
    //           })          
        
    //         if(pushPlugin.onMessageReceived) {
    //             pushPlugin.onMessageReceived(settings.notificationCallbackAndroid);
    //         }
  
    //         console.log('Device registered successfully : ' + token);
    //     },
    //     // Error Callback 
    //     function(error){
    //         console.log(error);
    //         alert(error);
    //     }
    // );
//Testing push notifications. 
//fetch is analogous to volley, it takes care of http requests-to abhijith
//subscribe is our proprietory push server. 
    pushPlugin.register({ senderID: '316739204235' }, function (data){
        console.log("message", "" + JSON.stringify(data));
        fetchModule.fetch("http://192.168.1.128:8000/subscribe", {
              headers: new Headers({
              'Content-Type': 'application/json'
            }),
              method: "POST",
              body: JSON.stringify({user: "nraboy", type: "android", token: data})
            }).then(function(response) {
                console.log(JSON.stringify(response));
                console.log("done with fetch");
                
              }).catch(function(err) {
  // Error :( 
  console.log(err);
});  
   pushPlugin.onMessageReceived(function callback(data) {  
        console.log("message", "" + JSON.stringify(data));
    });
    }, function(e) {console.log(e); });

    // pushPlugin.onMessageReceived(function callback(data) {  
    //     console.log("message", "" + JSON.stringify(data));
    // });
    }
    HelloWorldModel.prototype.doctorAction = function () {
       console.log("he/she is a Doctor");
      
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
