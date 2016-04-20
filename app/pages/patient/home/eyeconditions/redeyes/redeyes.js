var FrameModule = require("ui/frame");
var observable = require("data/observable");
function redeyesLoaded(args) {
var page = args.object;
var redeyesModel = (function (_super) {
    __extends( redeyesModel, _super);
    function redeyesModel() {
        _super.call(this);
        console.log(" is now ready.");
    }
 redeyesModel.prototype.nextAction = function () {
       console.log("nextAction activated");
       var topmost=FrameModule.topmost();
       topmost.navigate("pages/index");
    };
   
    return redeyesModel;
})(observable.Observable);
page.bindingContext = new redeyesModel();
}
exports.back = function(args){
  console.log("back");
  var topmost=FrameModule.topmost();
  topmost.goBack();
}
exports.redeyesLoaded = redeyesLoaded;