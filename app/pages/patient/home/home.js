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

        this.set("patienthomelist", [{ name:  "My Profile" }, { name: "Eye conditions" },{ name: "Calender" },{ name: "Medical Diary" },{ name: "My Eye" },{ name: "Drop Reminder" },{ name: "Eye Exercises" },{ name: "Food 4 vision" },{ name: "Contact us" }]);
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
