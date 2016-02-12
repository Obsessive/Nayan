var FrameModule = require("ui/frame");
var observable = require("data/observable");
function doctorProfileLoaded(args) {
var page = args.object;
var DoctorProfileModel = (function (_super) {
    __extends(DoctorProfileModel, _super);
    function DoctorProfileModel() {
        _super.call(this);
        this.set("doctorProfilelist", [{ name: "My Profile" }, { name: "Products" },{ name: "My Patients" },{ name: "Medical Diary" },{ name: "My Inbox" },{ name: "References" },{ name: "Others" },{ name: "Contact Us" }]);
        console.log("doctor Profile is now ready.");
    }
    DoctorProfileModel.prototype.registerAction = function () {
       console.log("Registration button clicked.");
       var topmost=FrameModule.topmost();
       topmost.navigate("pages/doctor/registration/registration");
    };
   
    return DoctorProfileModel;
})(observable.Observable);
page.bindingContext = new DoctorProfileModel();
}

exports.doctorProfileLoaded = doctorProfileLoaded;
