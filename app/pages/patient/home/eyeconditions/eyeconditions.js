var FrameModule = require("ui/frame");
var observable = require("data/observable");
function patientEyeConditionsLoaded(args) {
var page = args.object;
var patientEyeConditionsModel = (function (_super) {
    __extends(patientEyeConditionsModel, _super);
    function patientEyeConditionsModel() {
        _super.call(this);
        this.set("patientEyeConditionslist", [{ name: "Age-Related Macular Degeneration" },{ name: "Cataract" },{ name: "Dry Eyes" },{ name: "Red Eye/Infection" },{ name: "Glaucoma" }]);
        console.log("doctor home is now ready.");
    }
    patientEyeConditionsModel.prototype.registerAction = function () {
       console.log("Registration button clicked.");
       var topmost=FrameModule.topmost();
       topmost.navigate("pages/doctor/registration/registration");
    };
   
    return patientEyeConditionsModel;
})(observable.Observable);
page.bindingContext = new patientEyeConditionsModel();
}
//For time being.. doing it outside. 
exports.patientEyeConditionslistitemTap = function (args) {
    var index = args.index;
    console.log('Clicked item with index ' + index);
    //This is shit. change this to id or name based index.
   
    if(index==4){
      var topmost=FrameModule.topmost();
       topmost.navigate("pages/patient/home/eyeconditions/glucoma/glucoma");
    }

    if(index==0){
      var topmost=FrameModule.topmost();
       topmost.navigate("pages/patient/home/eyeconditions/degeneration/degeneration");
    }
    if(index==1){
      var topmost=FrameModule.topmost();
       topmost.navigate("pages/patient/home/eyeconditions/cataract/cataract");
    }
    if(index==2){
      var topmost=FrameModule.topmost();
       topmost.navigate("pages/patient/home/eyeconditions/dryeyes/dryeyes");
    }
    if(index==3){
      var topmost=FrameModule.topmost();
       topmost.navigate("pages/patient/home/eyeconditions/redeyes/redeyes");
    }
};
exports.back = function(args){
  console.log("back");
  var topmost=FrameModule.topmost();
  topmost.goBack();
}
exports.patientEyeConditionsLoaded = patientEyeConditionsLoaded;
