//to be done
//
var FrameModule = require("ui/frame");
var observable = require("data/observable");
var observableArrayModule = require("data/observable-array");
var fetchModule = require("fetch");
var Sqlite = require( "nativescript-sqlite" );
var viewModule = require("ui/core/view"); 
var platform = require("platform");
var connectivity = require("connectivity");
var dialog = require("nativescript-dialog");
var application = require("application");
var x;
function mypatientLoaded(args) {
  var page = args.object;
  var id=0;
  var code;
  var server = "nayanmain.negative.co.in";
  x = new observableArrayModule.ObservableArray([]);
  var mypatientModel = (function (_super) {
    __extends( mypatientModel, _super);
    function mypatientModel() {
      _super.call(this);
      self=this;
      self.set("mypatientlist",x);
      new Sqlite("nayan.db", function(err, db) {
        var promisea = db.get('select * from user'); 
        promisea.then(function(row){

          id=row[0];
          code=row[2]+"-"+id;
          console.log(" patients are now ready.");
          return self.getpatients(row[0]);
        });
      });
    };

    mypatientModel.prototype.nextAction = function () {
      console.log("nextAction activated");
      var topmost=FrameModule.topmost();
      topmost.navigate("pages/index");
    };

    mypatientModel.prototype.getpatients = function (id) {
      this.showLoading();
      this.checkconnection();
        fetchModule.fetch("http://"+server+"/user/getpatients/"+id, {
            method: "GET",
          }).then(function(response) {
            console.dir(response);
            try{
            pdata=JSON.parse(response._bodyInit);
            dialog.close();
            if(pdata.length==0){
              x.push({ patientid:'0',name: "Referral code: " });
              x.push({ patientid:'0',name:  code });
            }
            for(var i=0;i<pdata.length;i++){
              console.log(pdata[i].id);
              var name=pdata[i].firstname+" "+pdata[i].lastname;
              console.log(name);
              x.push({ patientid:pdata[i].id,name: name });
            } 
          }
          catch (e) {
            console.log("no json");
            // x.push({ patientid:'0',name: "No Patients" });
            x.push({ patientid:'0',name: "Referral code: " });
            x.push({ patientid:'0',name:  code });
            dialog.close();
          }
            
          }).catch(function(err) {
                // Error :( 
                console.log(err);
                alert("Please try again in some time..");
                dialog.close();
              });  
    };

    mypatientModel.prototype.showLoading = function () {
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
          message: "Please wait!",
          cancelButtonText: "Cancel",
          nativeView: nativeView}
        ).then(function(r){ 
          console.log("Result: " + r); 
        },
        function(e){
          console.log("Error: " + e)
        });
    };

    mypatientModel.prototype.checkconnection=function(){
      var connectionType = connectivity.getConnectionType();
      switch (connectionType) {
          case connectivity.connectionType.none:
              alert("Please check your internet connection and try again! ");
              dialog.close();
              return 0;
              break;
          case connectivity.connectionType.wifi:
              console.log("WiFi connection");
              return 1;
              break;
          case connectivity.connectionType.mobile:
              console.log("Mobile connection");
              return 1;
              break;
      }
    };

    return mypatientModel;
  })(observable.Observable);
  page.bindingContext = new mypatientModel();
}

exports.mypatientlistitemTap = function (args) {
    var index = args.index;
    var topmost=FrameModule.topmost();
    var navigationEntry = {
      moduleName: "pages/doctor/home/inbox/inbox",
      context: {id:x._array[index].patientid,name: x._array[index].name},
      animated: true
    };
    topmost.navigate(navigationEntry);

};
exports.back = function(args){
  console.log("back");
  var topmost=FrameModule.topmost();
  topmost.goBack();
}


exports.mypatientLoaded = mypatientLoaded;