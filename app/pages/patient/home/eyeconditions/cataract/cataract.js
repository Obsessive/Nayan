var FrameModule = require("ui/frame");
var observable = require("data/observable");
var applicationSettings = require("application-settings");
var i18n=require("../../../i18n");
function cataractLoaded(args) {
var page = args.object;
var cataractModel = (function (_super) {
    __extends( cataractModel, _super);
    function cataractModel() {
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
        console.log(" is now ready.");
    }
 cataractModel.prototype.nextAction = function () {
       console.log("nextAction activated");
       var topmost=FrameModule.topmost();
       topmost.navigate("pages/index");
    };
   
    return cataractModel;
})(observable.Observable);
page.bindingContext = new cataractModel();
}
exports.back = function(args){
  console.log("back");
  var topmost=FrameModule.topmost();
  topmost.goBack();
}
exports.cataractLoaded = cataractLoaded;