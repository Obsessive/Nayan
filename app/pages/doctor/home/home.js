var FrameModule = require("ui/frame");
var application = require("application");
var observable = require("data/observable");
if (application.android) {
var pushPlugin = require("nativescript-push-notifications");
var Toast = require("nativescript-toast");
}
var dialogs = require("ui/dialogs");
var appSettings = require("application-settings");
function doctorHomeLoaded(args) {
var page = args.object;
var DoctorHomeModel = (function (_super) {
    __extends(DoctorHomeModel, _super);
    function DoctorHomeModel() {
        _super.call(this);
        this.set("doctorhomelist", [{ icon:"~/images/user.png",name: "My Profile" }, { icon:"~/images/product.png",name: "Products" },{ icon:"~/images/patient.png",name: "My patients" },{ icon:"~/images/book.png",name: "Medical Diary" },{ icon:"~/images/gym.png",name: "References" },{ icon:"~/images/reference.png",name: "Others" },{ icon:"~/images/phone.png",name: "Contact us" },{ icon:"",name: "Legal" }]);

        console.log("doctor home is now ready.");
        if (application.android) {
        pushPlugin.onMessageReceived(function callback(data) {
            console.log("push received: "+data );
            var msg=data.trimLeft("inbox:")
              console.log(msg);
                var options = {
                    title: "Notification",
                    message: data,
                    okButtonText: "OK"
                };
                dialogs.alert(options).then(function () {
                    console.log("Done!");
                });
        });
      }
}

    // DoctorHomeModel.prototype.registerAction = function () {
    //    console.log("Registration button clicked.");
    //    var topmost=FrameModule.topmost();
    //    topmost.navigate("pages/doctor/registration/registration");
    // };

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
    if(index==2){
      var topmost=FrameModule.topmost();
       topmost.navigate("pages/doctor/home/mypatient/mypatient");
    }
    if(index==3){
      var topmost=FrameModule.topmost();
       topmost.navigate("pages/doctor/home/diary/diary");
    }

    if(index==4){
      var topmost=FrameModule.topmost();
       topmost.navigate("pages/doctor/home/references/references");
    }
    if(index==5){
      var topmost=FrameModule.topmost();
       topmost.navigate("pages/doctor/home/others/others");
    }
    if(index==6){
      var topmost=FrameModule.topmost();
       topmost.navigate("pages/doctor/home/contact/contact");
    }
    if(index==7){
      var topmost=FrameModule.topmost();
       topmost.navigate("pages/doctor/home/legal/legal");
    }
};
exports.doctorHomeLoaded = doctorHomeLoaded;
