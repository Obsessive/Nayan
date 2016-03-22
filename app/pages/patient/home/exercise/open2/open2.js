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
        page.getViewById("open2image1").on(gestures.GestureTypes.doubleTap, function (args) {
          if (page.getViewById("open2image1").className == "doctorproducts") {
            page.getViewById("open2image1").className = "doctorproductszoom";
          }else {
            page.getViewById("open2image1").className = "doctorproducts";
          }
        });
        page.getViewById("open2image2").on(gestures.GestureTypes.doubleTap, function (args) {
          if (page.getViewById("open2image2").className == "doctorproducts") {
            page.getViewById("open2image2").className = "doctorproductszoom";
          }else {
            page.getViewById("open2image2").className = "doctorproducts";
          }
        });
        page.getViewById("open2image3").on(gestures.GestureTypes.doubleTap, function (args) {
          if (page.getViewById("open2image3").className == "doctorproducts") {
            page.getViewById("open2image3").className = "doctorproductszoom";
          }else {
            page.getViewById("open2image3").className = "doctorproducts";
          }
        });
        page.getViewById("open2image4").on(gestures.GestureTypes.doubleTap, function (args) {
          if (page.getViewById("open2image4").className == "doctorproducts") {
            page.getViewById("open2image4").className = "doctorproductszoom";
          }else {
            page.getViewById("open2image4").className = "doctorproducts";
          }
        });
        page.getViewById("open2image5").on(gestures.GestureTypes.doubleTap, function (args) {
          if (page.getViewById("open2image5").className == "doctorproducts") {
            page.getViewById("open2image5").className = "doctorproductszoom";
          }else {
            page.getViewById("open2image5").className = "doctorproducts";
          }
        });
        page.getViewById("open2image6").on(gestures.GestureTypes.doubleTap, function (args) {
          if (page.getViewById("open2image6").className == "doctorproducts") {
            page.getViewById("open2image6").className = "doctorproductszoom";
          }else {
            page.getViewById("open2image6").className = "doctorproducts";
          }
        });
        page.getViewById("open2image7").on(gestures.GestureTypes.doubleTap, function (args) {
          if (page.getViewById("open2image7").className == "doctorproducts") {
            page.getViewById("open2image7").className = "doctorproductszoom";
          }else {
            page.getViewById("open2image7").className = "doctorproducts";
          }
        });
        page.getViewById("open2image8").on(gestures.GestureTypes.doubleTap, function (args) {
          if (page.getViewById("open2image8").className == "doctorproducts") {
            page.getViewById("open2image8").className = "doctorproductszoom";
          }else {
            page.getViewById("open2image8").className = "doctorproducts";
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
