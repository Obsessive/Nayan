var FrameModule = require("ui/frame");
var observable = require("data/observable");
function cataractLoaded(args) {
var page = args.object;
var cataractModel = (function (_super) {
    __extends( cataractModel, _super);
    function cataractModel() {
        _super.call(this);
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

exports.cataractLoaded = cataractLoaded;