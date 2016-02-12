var FrameModule = require("ui/frame");
var observable = require("data/observable");
function degenerationLoaded(args) {
var page = args.object;
var degenerationModel = (function (_super) {
    __extends( degenerationModel, _super);
    function degenerationModel() {
        _super.call(this);
        console.log(" is now ready.");
    }
 degenerationModel.prototype.nextAction = function () {
       console.log("nextAction activated");
       var topmost=FrameModule.topmost();
       topmost.navigate("pages/index");
    };
   
    return degenerationModel;
})(observable.Observable);
page.bindingContext = new degenerationModel();
}

exports.degenerationLoaded = degenerationLoaded;