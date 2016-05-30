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
var patient;
var x;

function inboxLoaded(args) {
var page = args.object;

var pushserver = "nayanpush.negative.co.in";
x = new observableArrayModule.ObservableArray([]);
var inboxModel = (function (_super) {
    __extends( inboxModel, _super);
    function inboxModel() {
      _super.call(this);

      //binding
      self=this;
      self.set("doctorinboxlist",x);

      //Gather patient recieved patient data
      patient=page.navigationContext; 

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
                if(row[3]==patient.id){
                  console.log("sent `"+row[1]+"` to this patient");
                  x.push({ text: row[1] });
                }    
          });
        });  
      });
      // this.set("inboxpatientlist",x);
      console.log("inbox is now ready.");
  };


    inboxModel.prototype.notifyPatient = function (msg) {
      //TO DO: 
      //Internet check and error messages 
      this.showLoading('Please wait...Notifying Patient');
      //prepare data
      var post_data={
        "users": [patient.name],
        "android": {
          "collapseKey": "optional",
          "data": {
            "message": "Inbox:"+msg
          }
        },
        "ios": {
          "badge": 0,
          "alert": "Inbox:"+msg,
          "sound": "soundName"
        }
      };
     
      console.log(JSON.stringify(post_data));

      fetchModule.fetch("http://"+pushserver+"/send", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(post_data)
      }).then(function(response) {
        try{
          // chatdata=JSON.parse(response);
          console.dir(response);
          dialog.close();
        }
        catch (e) {
          dialog.close();
          alert("please check your internet connection.");
          console.log("not json");
        }
        dialog.close();
      }).catch(function(err) {
        //  alert("Please try again..");
        // console.log(err);
        dialog.close();
      }); 

    };

    inboxModel.prototype.showLoading = function (msg) {
      var nativeView;
      if(platform.device.os === platform.platformNames.ios){
          nativeView = UIActivityIndicatorView.alloc().initWithActivityIndicatorStyle(UIActivityIndicatorViewStyle.UIActivityIndicatorViewStyleGray);
          nativeView.startAnimating();
      } else if(platform.device.os === platform.platformNames.android){
          nativeView = new android.widget.ProgressBar(application.android.currentContext);
          nativeView.setIndeterminate(true);
      }
      dialog.show({
          title: "Loading...",
          message: msg,
          cancelButtonText: "Cancel",
          nativeView: nativeView}
        ).then(function(r){ 
          console.log("Result: " + r); 
        },
        function(e){
          console.log("Error: " + e)
        });
    };
   
    inboxModel.prototype.sendMessage =function(){
      var self=this;
      var msg=this.get("messageInput");
      if(msg==""){
          return 0;
      }
      console.log(msg+'to be sent');
      new Sqlite("nayan.db", function(err, db) {
          var promise =db.execSQL("INSERT INTO chat (`message`,`fromid`,`toid`) VALUES(?,?,?)",[msg,id,patient.id]);
          promise.then(function(){
              console.log(JSON.stringify({"payload":[{"fromid":id,"toid":patient.id,"message":msg}]}));
              x.push({text: msg });
              return self.notifyPatient(msg);
          });
      });

      var scrollview=page.getViewById("messageScroll");
      // console.log(x._array.length);
       console.log(scrollview.scrollableHeight);
      self.set("messageInput","");
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