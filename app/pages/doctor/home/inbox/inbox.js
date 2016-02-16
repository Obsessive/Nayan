var viewModule = require("ui/core/view"); 
var FrameModule = require("ui/frame");
var fetchModule = require("fetch");
var Sqlite = require( "nativescript-sqlite" );
// var pages = require("ui/page");
var observable = require("data/observable");
var observableArrayModule = require("data/observable-array");
var panelModule = require("ui/layouts/stack-layout");
var LabelModule = require("ui/label");
function inboxLoaded(args) {
var page = args.object;
var id=0;
var server = "nayanmain.negative.co.in";
var x = new observableArrayModule.ObservableArray([{ inout:0,text: "Test:All systems Go." }]);
var inboxModel = (function (_super) {
    __extends( inboxModel, _super);
    function inboxModel() {
        _super.call(this);
        var promise =new Sqlite("nayan.db", function(err, db) {
        db.get('select id from user', function(err, row) {
            console.log("User identified as: ", row);
            id=row;
          });
      });
        // var result = array.push(4);
        this.set("doctorchatlist",x);

        this.updatechat();
        console.log("inbox is now ready.");
    }
    inboxModel.prototype.updatechat=function(){
      //Temporary long polling approach.. replace with sockets ASAP
      fetchModule.fetch("http://"+server+"/chat/get/"+id, {
        method: "GET",
      }).then(function(response) {
        chatdata=JSON.parse(response._bodyText);
        console.log(chatdata.message);

        x.push({ inout:1,text: "I am "+id });
      }).catch(function(err) {
            // Error :( 
            console.log(err);
          });  
    };

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