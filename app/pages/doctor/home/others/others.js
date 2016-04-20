var FrameModule = require("ui/frame");
var observable = require("data/observable");
function othersLoaded(args) {
var page = args.object;
var othersModel = (function (_super) {
    __extends( othersModel, _super);
    function othersModel() {
        _super.call(this);
        console.log(" is now ready.");
    }
 othersModel.prototype.nextAction = function () {
       console.log("nextAction activated");
       var topmost=FrameModule.topmost();
       topmost.navigate("pages/index");
    };
   
    return othersModel;
})(observable.Observable);
page.bindingContext = new othersModel();
}
exports.back = function(args){
  console.log("back");
  var topmost=FrameModule.topmost();
  topmost.goBack();
}
exports.othersLoaded = othersLoaded;