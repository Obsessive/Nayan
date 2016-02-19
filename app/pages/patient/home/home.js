var FrameModule = require("ui/frame");
var observable = require("data/observable");
var dialogs = require("ui/dialogs");
var pushPlugin = require("nativescript-push-notifications");

// var fontModule = require("ui/styling/font");
function patientHomeLoaded(args) {
var page = args.object;
var patientHomeModel = (function (_super) {
    __extends(patientHomeModel, _super);
    function patientHomeModel() {
        _super.call(this);
        this.set("patienthomelist", [{ icon:"~/images/user.png",name: "My Profile" }, { icon:"~/images/condition.png",name: "Eye conditions" },{ icon:"~/images/inbox.png",name: "My inbox" },{ icon:"~/images/calendar.png",name: "Calendar" },{ icon:"~/images/book.png",name: "Medical Diary" },{ icon:"~/images/eye.png",name: "My Eye" },{ icon:"~/images/alarm.png",name: "Drop Reminder" },{ icon:"~/images/gym.png",name: "Eye Exercises" },{ icon:"~/images/apple.png",name: "Food For Vision" },{ icon:"~/images/phone.png",name: "Contact us" },{ icon:"",name: "Legal" }]);
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
        console.log("patient home is now ready.");
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
exports.patienthomelistitemTap = function (args) {
    var index = args.index;
    console.log('Clicked item with index ' + index);
    //This is shit. change this to id or name based index.
    if(index==0){
      var topmost=FrameModule.topmost();
       topmost.navigate("pages/patient/home/profile/profile");
    }
    //This index is shit too.
    
    if(index==1){
      var topmost=FrameModule.topmost();
       topmost.navigate("pages/patient/home/eyeconditions/eyeconditions");
    }
    if(index==2){
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
      var topmost=FrameModule.topmost();
       topmost.navigate("pages/patient/home/calendar/calendar");
    }
    if(index==4){
      var topmost=FrameModule.topmost();
       topmost.navigate("pages/patient/home/diary/diary");
    }
    if(index==6){
      var topmost=FrameModule.topmost();
       topmost.navigate("pages/patient/home/dropreminder/dropreminder");
    }
   
    if(index==8){
      var topmost=FrameModule.topmost();
       topmost.navigate("pages/patient/home/foodvision/foodvision");
    }
     if(index==9){
      var topmost=FrameModule.topmost();
       topmost.navigate("pages/patient/home/contact/contact");
    }
    if(index==7){
      var topmost=FrameModule.topmost();
       topmost.navigate("pages/patient/home/exercise/exercise");
    }
    if(index==10){
      var topmost=FrameModule.topmost();
       topmost.navigate("pages/patient/home/legal/legal");
    }
};
exports.patientHomeLoaded = patientHomeLoaded;
