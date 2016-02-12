var viewModule = require("ui/core/view"); 
var FrameModule = require("ui/frame");

// var pages = require("ui/page");
var observable = require("data/observable");
var panelModule = require("ui/layouts/stack-layout");
var LabelModule = require("ui/label");
function inboxLoaded(args) {
var page = args.object;
var inboxModel = (function (_super) {
    __extends( inboxModel, _super);
    function inboxModel() {
        _super.call(this);
        this.set("doctorchatlist", [{ inout:0,text:"test message was sent" },{ inout:1,text: "Server side implementation test" },{ inout:1,text: "chat servers deployment pending.." },{ inout:1,text: "All systems Go." }]);
        console.log(" is now ready.");
    }
 inboxModel.prototype.nextAction = function () {
       console.log("nextAction activated");
       var topmost=FrameModule.topmost();
       topmost.navigate("pages/index");
    };
   
    return inboxModel;
})(observable.Observable);
page.bindingContext = new inboxModel();
}

exports.inboxLoaded = inboxLoaded;