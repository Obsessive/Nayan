var FrameModule = require("ui/frame");
var observable = require("data/observable");
var gestures = require("ui/gestures");
function exerciseLoaded(args) {
var page = args.object;
var exerciseModel = (function (_super) {
    __extends( exerciseModel, _super);
    function exerciseModel() {
        _super.call(this);
        console.log(" is now ready.");
        page.getViewById("open4image1").on(gestures.GestureTypes.doubleTap, function (args) {
          if (page.getViewById("open4image1").className == "doctorproducts") {
            page.getViewById("open4image1").className = "doctorproductszoom";
          }else {
            page.getViewById("open4image1").className = "doctorproducts";
          }
        });
    }
 exerciseModel.prototype.nextAction = function () {
       console.log("nextAction activated");
       var topmost=FrameModule.topmost();
       topmost.navigate("pages/index");
    };

    return exerciseModel;
})(observable.Observable);
page.bindingContext = new exerciseModel();
}

exports.exerciseLoaded = exerciseLoaded;
