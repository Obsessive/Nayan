var FrameModule = require("ui/frame");
var observable = require("data/observable");
function exerciseLoaded(args) {
var page = args.object;
var exerciseModel = (function (_super) {
    __extends( exerciseModel, _super);
    function exerciseModel() {
        _super.call(this);
        console.log(" is now ready.");
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