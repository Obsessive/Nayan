var FrameModule = require("ui/frame");
var observable = require("data/observable");
function doctorDiaryLoaded(args) {
var page = args.object;
var DoctorDiaryModel = (function (_super) {
    __extends(DoctorDiaryModel, _super);
    function DoctorDiaryModel() {
        _super.call(this);
        console.log("doctor Diary is now ready.");
    }
    DoctorDiaryModel.prototype.registerAction = function () {
       console.log("Registration button clicked.");
       var topmost=FrameModule.topmost();
       topmost.navigate("pages/doctor/registration/registration");
    };
   
    return DoctorDiaryModel;
})(observable.Observable);
page.bindingContext = new DoctorDiaryModel();
}
exports.back = function(args){
  console.log("back");
  var topmost=FrameModule.topmost();
  topmost.goBack();
}
exports.doctorDiaryLoaded = doctorDiaryLoaded;
