var FrameModule = require("ui/frame");
var observable = require("data/observable");
var gestures = require("ui/gestures");
function glaucomaLoaded(args) {
var page = args.object;
var glaucomaModel = (function (_super) {
    __extends( glaucomaModel, _super);
    function glaucomaModel() {
        _super.call(this);
        console.log(" is now ready.");
        page.getViewById("glaucoma").on(gestures.GestureTypes.doubleTap, function (args) {
          if (page.getViewById("glaucoma").className == "doctorproducts") {
            page.getViewById("glaucoma").className = "doctorproductszoom";
          }else {
            page.getViewById("glaucoma").className = "doctorproducts";
          }
        });
    }
 glaucomaModel.prototype.nextAction = function () {
       console.log("nextAction activated");
       var topmost=FrameModule.topmost();
       topmost.navigate("pages/index");
    };

    return glaucomaModel;
})(observable.Observable);
page.bindingContext = new glaucomaModel();
}
exports.back = function(args){
  console.log("back");
  var topmost=FrameModule.topmost();
  topmost.goBack();
}
exports.glaucomaLoaded = glaucomaLoaded;
