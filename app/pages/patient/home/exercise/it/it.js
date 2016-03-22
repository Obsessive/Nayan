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
        page.getViewById("it1").on(gestures.GestureTypes.doubleTap, function (args) {
          if (page.getViewById("it1").className == "doctorproducts") {
            page.getViewById("it1").className = "doctorproductszoom";
          }else {
            page.getViewById("it1").className = "doctorproducts";
          }
        });
        page.getViewById("it2").on(gestures.GestureTypes.doubleTap, function (args) {
          if (page.getViewById("it2").className == "doctorproducts") {
            page.getViewById("it2").className = "doctorproductszoom";
          }else {
            page.getViewById("it2").className = "doctorproducts";
          }
        });
        page.getViewById("it3").on(gestures.GestureTypes.doubleTap, function (args) {
          if (page.getViewById("it3").className == "doctorproducts") {
            page.getViewById("it3").className = "doctorproductszoom";
          }else {
            page.getViewById("it3").className = "doctorproducts";
          }
        });
        page.getViewById("it4").on(gestures.GestureTypes.doubleTap, function (args) {
          if (page.getViewById("it4").className == "doctorproducts") {
            page.getViewById("it4").className = "doctorproductszoom";
          }else {
            page.getViewById("it4").className = "doctorproducts";
          }
        });
        page.getViewById("it5").on(gestures.GestureTypes.doubleTap, function (args) {
          if (page.getViewById("it5").className == "doctorproducts") {
            page.getViewById("it5").className = "doctorproductszoom";
          }else {
            page.getViewById("it5").className = "doctorproducts";
          }
        });
        page.getViewById("it6").on(gestures.GestureTypes.doubleTap, function (args) {
          if (page.getViewById("it6").className == "doctorproducts") {
            page.getViewById("it6").className = "doctorproductszoom";
          }else {
            page.getViewById("it6").className = "doctorproducts";
          }
        });
        page.getViewById("it7").on(gestures.GestureTypes.doubleTap, function (args) {
          if (page.getViewById("it7").className == "doctorproducts") {
            page.getViewById("it7").className = "doctorproductszoom";
          }else {
            page.getViewById("it7").className = "doctorproducts";
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
