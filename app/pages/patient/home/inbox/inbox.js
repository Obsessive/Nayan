var viewModule = require("ui/core/view"); 
var platform = require("platform");
var dialog = require("nativescript-dialog");
var application = require("application");
var FrameModule = require("ui/frame");
var fetchModule = require("fetch");
var Sqlite = require( "nativescript-sqlite" );
// var pages = require("ui/page");
var observable = require("data/observable");
var observableArrayModule = require("data/observable-array");
// var panelModule = require("ui/layouts/stack-layout");
// var LabelModule = require("ui/label");
var x = new observableArrayModule.ObservableArray();
var id;
function inboxLoaded(args) {
var page = args.object;



var inboxModel = (function (_super) {
    __extends( inboxModel, _super);
    function inboxModel() {
        _super.call(this);
        var self=this;
        x = new observableArrayModule.ObservableArray();
        self.set("patientchatlist",x);
        var push=page.navigationContext; 

    //Create db
      new Sqlite("nayan.db", function(err, db) {
        //Create promise for db
        var promise=db.get('select * from user'); 
        promise.then(function(row){
          console.log("User identified as: ", row);
          id=row[0];
          firstname=row[2];
          var promise = db.each('select * from chat', 
            function (err, row) {
                console.log("Row results:", row); 
                  x.push({ text: row[1] });
                  
          });
         self.newMessage(push);
        });  
        
      });
      
    
        console.log("inbox is now ready.");
    }
    
    inboxModel.prototype.newMessage =function(push){
      // console.log(push.msg);
        try{
          if(typeof push.msg!=="undefined"){
            console.log("in chat "+push.msgmsg);
            new Sqlite("nayan.db", function(err, db) {
              var promise =db.execSQL("INSERT INTO chat (`message`,`fromid`,`toid`) VALUES(?,?,?)",[push.msg,1,id]);
              promise.then(function(){
                  console.log(JSON.stringify({"payload":[{"fromid":1,"toid":id,"message":push.msg}]}));
                  x.push({text: push.msg });
              });
          });
        }  
      }
      catch(e){
        console.log("not a push attempt");
      }
    };
   
    return inboxModel;
})(observable.Observable);
page.bindingContext = new inboxModel();
}
exports.back = function(args){
  console.log("back");
  var topmost=FrameModule.topmost();
  topmost.goBack();
}
exports.inboxLoaded = inboxLoaded;