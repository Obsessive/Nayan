// var PageModule = require("ui/page");
// FrameModule is needed in order to have an option to navigate to the new page.
var FrameModule = require("ui/frame");

var observable = require("data/observable");
function pageLoaded(args) {
var page = args.object;
var HelloWorldModel = (function (_super) {
    __extends(HelloWorldModel, _super);
    function HelloWorldModel() {
        _super.call(this);
        
        console.log("ready.");
    }
    HelloWorldModel.prototype.doctorAction = function () {
       console.log("he/she is a Doctor");
      
       var topmost=FrameModule.topmost();
       topmost.navigate("pages/doctor/registration/registration");
    };
    HelloWorldModel.prototype.patientAction = function () {
    	 console.log("he/she is a patient");
         var topmost=FrameModule.topmost();
       topmost.navigate("pages/patient/registration/registration");
    };
    return HelloWorldModel;
})(observable.Observable);
page.bindingContext = new HelloWorldModel();
}
exports.pageLoaded = pageLoaded;
