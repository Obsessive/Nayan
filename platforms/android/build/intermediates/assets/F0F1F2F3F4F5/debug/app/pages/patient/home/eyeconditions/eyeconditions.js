var FrameModule = require("ui/frame");
var applicationSettings = require("application-settings");
var observable = require("data/observable");
var i18n=require("../../i18n");
function patientEyeConditionsLoaded(args) {
var page = args.object;
var patientEyeConditionsModel = (function (_super) {
    __extends(patientEyeConditionsModel, _super);
    function patientEyeConditionsModel() {
        _super.call(this);
        //Set all labels and other i18n bindings here
      //getting it from i18n 
      //var i18n=require("../i18n");
      //will ensure no internal var conflicts.
      //Not the best solution. -Zee
      //I'm sure. Abhijith will improve this.
      for(var x in i18n){
         if(applicationSettings.getString("language")==="hindi" && x==="hindi"){
            for(var y in i18n[x]){
              this.set(y,i18n[x][y]);
            }
         }
         if(applicationSettings.getString("language")==="english" && x==="english"){
             for(var y in i18n[x]){
              this.set(y,i18n[x][y]);
            }
         }
        // this.set(x,i18n[x]);
      }
        // this.set("patientEyeConditionslist", [{ name: "Age-Related Macular Degeneration" },{ name: "Cataract" },{ name: "Dry Eyes" },{ name: "Red Eye/Infection" },{ name: "Glaucoma" }]);
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
