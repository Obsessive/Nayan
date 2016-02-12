var FrameModule = require("ui/frame");
var observable = require("data/observable");
function registrationLoaded(args) {
var page = args.object;
var RegistrationModel = (function (_super) {
    __extends(RegistrationModel, _super);
    function RegistrationModel() {
        _super.call(this);
        console.log("registration ready.");
    }
    RegistrationModel.prototype.registerAction = function () {
       console.log("Registration button clicked.");
       var topmost=FrameModule.topmost();
       topmost.navigate("pages/doctor/home/home");
    };
   
    return RegistrationModel;
})(observable.Observable);
page.bindingContext = new RegistrationModel();
}
exports.registrationLoaded = registrationLoaded;
