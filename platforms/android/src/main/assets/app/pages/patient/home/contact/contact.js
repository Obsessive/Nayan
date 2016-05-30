var FrameModule = require("ui/frame");
var observable = require("data/observable");
function patientDiaryLoaded(args) {
var page = args.object;
var legalModel = (function (_super) {
    __extends( legalModel, _super);
    function legalModel() {
        _super.call(this);
        console.log(" is now ready.");
    }
 legalModel.prototype.nextAction = function () {
       console.log("nextAction activated");
       var topmost=FrameModule.topmost();
       topmost.navigate("pages/index");
    };
   
    return legalModel;
})(observable.Observable);
page.bindingContext = new legalModel();
}

exports.back = function(args){
  console.log("back");
  var topmost=FrameModule.topmost();
  topmost.goBack();
}

exports.patientDiaryLoaded = patientDiaryLoaded;