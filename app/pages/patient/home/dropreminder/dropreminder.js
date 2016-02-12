var FrameModule = require("ui/frame");
var observable = require("data/observable");
var dialogs = require("ui/dialogs");
function dropreminderLoaded(args) {
var page = args.object;
var dropreminderModel = (function (_super) {
    __extends( dropreminderModel, _super);
    function dropreminderModel() {
        _super.call(this);
        console.log(" is now ready.");
    }
 dropreminderModel.prototype.nextAction = function () {
       console.log("nextAction activated");
       var topmost=FrameModule.topmost();
       topmost.navigate("pages/index");
    };
    dropreminderModel.prototype.createReminderAction = function () {
    console.log("moving to create new reminder");
       var topmost=FrameModule.topmost();
       topmost.navigate("pages/patient/home/dropreminder/newreminder/newreminder");
    };
   
    return dropreminderModel;
})(observable.Observable);
page.bindingContext = new dropreminderModel();
}

exports.dropreminderLoaded = dropreminderLoaded;