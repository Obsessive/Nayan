var FrameModule = require("ui/frame");
var observable = require("data/observable");
// var fontModule = require("ui/styling/font");
function patientHomeLoaded(args) {
var page = args.object;
var patientHomeModel = (function (_super) {
    __extends(patientHomeModel, _super);
    function patientHomeModel() {
        _super.call(this);
        // fontModule.android.registerFont("fontawesome-webfont.ttf");

        this.set("patienthomelist", [{ icon:"~/images/user.png",name: "My Profile" }, { icon:"~/images/condition.png",name: "Eye conditions" },{ icon:"~/images/calendar.png",name: "Calendar" },{ icon:"~/images/book.png",name: "Medical Diary" },{ icon:"~/images/eye.png",name: "My Eye" },{ icon:"~/images/alarm.png",name: "Drop Reminder" },{ icon:"~/images/gym.png",name: "Eye Exercises" },{ icon:"~/images/apple.png",name: "Food 4 vision" },{ icon:"~/images/phone.png",name: "Contact us" }]);
        console.log("patient home is now ready.");
    }
    patientHomeModel.prototype.registerAction = function () {
       console.log("Registration button clicked.");
       var topmost=FrameModule.topmost();
       topmost.navigate("pages/patient/registration/registration");
    };
   
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
       topmost.navigate("pages/patient/home/calendar/calendar");
    }
    if(index==3){
      var topmost=FrameModule.topmost();
       topmost.navigate("pages/patient/home/diary/diary");
    }
    if(index==5){
      var topmost=FrameModule.topmost();
       topmost.navigate("pages/patient/home/dropreminder/dropreminder");
    }
    if(index==7){
      var topmost=FrameModule.topmost();
       topmost.navigate("pages/patient/home/foodvision/foodvision");
    }
};
exports.patientHomeLoaded = patientHomeLoaded;
