var FrameModule = require("ui/frame");
var observable = require("data/observable");
function referencesLoaded(args) {
var page = args.object;
var referencesModel = (function (_super) {
    __extends( referencesModel, _super);
    function referencesModel() {
        _super.call(this);
        console.log(" is now ready.");
    }
 referencesModel.prototype.nextAction = function () {
       console.log("nextAction activated");
       var topmost=FrameModule.topmost();
       topmost.navigate("pages/index");
    };
   
    return referencesModel;
})(observable.Observable);
page.bindingContext = new referencesModel();
}

exports.referencesLoaded = referencesLoaded;