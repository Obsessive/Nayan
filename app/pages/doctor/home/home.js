var FrameModule = require("ui/frame");
var observable = require("data/observable");
function doctorHomeLoaded(args) {
var page = args.object;
var DoctorHomeModel = (function (_super) {
    __extends(DoctorHomeModel, _super);
    function DoctorHomeModel() {
        _super.call(this);
        this.set("doctorhomelist", [{ name: "My Profile" }, { name: "Products" },{ name: "My Patients" },{ name: "Medical Diary" },{ name: "My Inbox" },{ name: "References" },{ name: "Others" },{ name: "Contact Us" }]);
        console.log("doctor home is now ready.");
    }
    DoctorHomeModel.prototype.registerAction = function () {
       console.log("Registration button clicked.");
       var topmost=FrameModule.topmost();
       topmost.navigate("pages/doctor/registration/registration");
    };
   
    return DoctorHomeModel;
})(observable.Observable);
page.bindingContext = new DoctorHomeModel();
}
//For time being.. doing it outside. 
exports.doctorhomelistitemTap = function (args) {
    var index = args.index;
    console.log('Clicked item with index ' + index);
    //This is shit. change this to id or name based index.
    if(index==0){
      var topmost=FrameModule.topmost();
       topmost.navigate("pages/doctor/home/profile/profile");
    }
    //This index is shit too.
    if(index==1){
      var topmost=FrameModule.topmost();
       topmost.navigate("pages/doctor/home/products/products");
    }
    if(index==3){
      var topmost=FrameModule.topmost();
       topmost.navigate("pages/doctor/home/diary/diary");
    }
    if(index==4){
      var topmost=FrameModule.topmost();
       topmost.navigate("pages/doctor/home/inbox/inbox");
    }
};
exports.doctorHomeLoaded = doctorHomeLoaded;
