var FrameModule = require("ui/frame");
var observable = require("data/observable");
function dryeyesLoaded(args) {
var page = args.object;
var dryeyesModel = (function (_super) {
    __extends( dryeyesModel, _super);
    function dryeyesModel() {
        _super.call(this);
        console.log(" is now ready.");
    }
 dryeyesModel.prototype.nextAction = function () {
       console.log("nextAction activated");
       var topmost=FrameModule.topmost();
       topmost.navigate("pages/index");
    };
   
    return dryeyesModel;
})(observable.Observable);
page.bindingContext = new dryeyesModel();
}
exports.back = function(args){
  console.log("back");
  var topmost=FrameModule.topmost();
  topmost.goBack();
}
exports.dryeyesLoaded = dryeyesLoaded;