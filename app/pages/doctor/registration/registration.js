var platform = require("platform");
var application = require("application");
var connectivity = require("connectivity");
var FrameModule = require("ui/frame");
var dialog = require("nativescript-dialog");
var observable = require("data/observable");
var Sqlite = require( "nativescript-sqlite" );
var viewModule = require("ui/core/view");
var fetchModule = require("fetch");
var applicationSettings = require("application-settings");
var pushPlugin = require("nativescript-push-notifications");
var validator = require('validator');
var Toast = require("nativescript-toast");
var sanitize = require('validator').sanitize;
function registrationLoaded(args) {
  var page = args.object;
  var server = "nayanmain.negative.co.in";
  var id;
  var termsagreecheck=false;
  var debug=0;
  var firstname;
  var lastname;
  var type='doctor';
  var email;
  var code;
  var phone;
  var referral;
  var RegistrationModel = (function (_super) {
    __extends(RegistrationModel, _super);
    function RegistrationModel() {
      _super.call(this);
      // var s=JSON.stringify({type:type , firstname:firstname , lastname:lastname ,number:phone,email:email,code:code,address:'',hospital:''})
      // console.log(s);
      console.log("registration ready.");
    };

    RegistrationModel.prototype.localRegister = function (){


      if (Sqlite.exists("nayan.db")) {
        Sqlite.deleteDatabase("nayan.db");
      }
      if (!Sqlite.exists("nayan.db")) {
        Sqlite.copyDatabase("nayan.db");
      }
      var promise =new Sqlite("nayan.db", function(err, db) {
        if(id=="0"){
        return 0;
      }
        db.execSQL("insert into user (id,type,firstname,lastname,number,email,code,referral) values (?,?,?,?,?,?,?,?)", [id,type,firstname,lastname,phone,email,code,referral], function(err, d) {
          // console.log(err);
           applicationSettings.setString("type", "doctor");
          //Replace code to verify the email against inserted value.
          //This is inexpensive.
          db.get('select * from user', function(err, row) {
            console.log("Row of data was: ", row);  // Prints [["Field1", "Field2",...]]
            dialog.close();
            var topmost=FrameModule.topmost();
            topmost.navigate("pages/doctor/home/home");
            if(err!=null){
              alert('Oops! Looks like something went wrong.. Please restart the app!')
            }
          });
        });
      });
    };

    RegistrationModel.prototype.serverRegister = function () {

      this.showLoading();
      var self=this;
      fetchModule.fetch("http://"+server+"/user/create", {
        method: "POST",
        body: JSON.stringify({type:type , firstname:firstname , lastname:lastname ,number:phone,email:email,code:code,address:'',hospital:''})
      }).then(function(response) {
        console.log("id: "+response._bodyText);
        id=response._bodyText;
        if(id=="0"){
            alert("Sorry, Couldn't get you registered.. kindly check the data you entered and try again!");
            dialog.close();
          }else{
        self.localRegister(id);
        self.pushnotification();
        console.log("Registered on server.");
        return id;
        }
      }).catch(function(err) {
            // Error :(
            console.log(err);
            alert("Sorry, Couldn't get you registered.. kindly check your internet connection and the data you entered!");
          });

    };

    RegistrationModel.prototype.checkconnection=function(){
      var connectionType = connectivity.getConnectionType();
      switch (connectionType) {
          case connectivity.connectionType.none:
              alert("Please check your internet connection and try again! ");
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

    RegistrationModel.prototype.pushnotification=function(){
            //Testing push notifications.
        //fetch is analogous to volley, it takes care of http requests-to abhijith
        //subscribe is our proprietory push server.
        console.log("push start");
        pushPlugin.register({ senderID: '316739204235' }, function (data){
            console.log("message", "" + JSON.stringify(data));
            fetchModule.fetch("http://nayanpush.negative.co.in/subscribe", {
              headers: { "Content-Type": "application/json" },
              method: "POST",
              body: JSON.stringify({user: firstname+" "+lastname, type: "android", token: data})
          }).then(function(response) {
            console.log(JSON.stringify(response));
            console.log("done with subscribing to push server");

        }).catch(function(err) {
          // Error :(
          console.log(err);
        });
           // pushPlugin.onMessageReceived(function callback(data) {
           //      alert("messagee", "" + JSON.stringify(data));
           //  });

        }, function(e) {console.log(e); });

        pushPlugin.onMessageReceived(function callback(data) {
            alert("message", "" + JSON.stringify(data));
        });
    };
    RegistrationModel.prototype.showLoading = function () {
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
          console.log("Error: " + e);
        });
    };
    RegistrationModel.prototype.registerAction = function () {
      console.log("Registration button clicked.");
      check=viewModule.getViewById(page,"termsagreedid").checked;
      console.log(check);
      if(!check){

        dialog.show({
          title: "Attention...",
          message: "You must read and agree to the terms and conditions!",
          cancelButtonText: "Cancel",
          }
        ).then(function(r){
          console.log("Result: " + r);
        },
        function(e){
          console.log("Error: " + e)
        });
      }else{
        firstname = viewModule.getViewById(page, "doctorregistrationfirstname").text;
      lastname = viewModule.getViewById(page, "doctorregistrationlastname").text;
      email = viewModule.getViewById(page, "doctorregistrationemail").text;
      phone = viewModule.getViewById(page, "doctorregistrationphone").text;
      code = viewModule.getViewById(page, "doctorregistrationcode").text;
      referral = viewModule.getViewById(page, "doctorregistrationreferral").text;
      if (validator.matches(referral.toString(),'[Nn][Aa][Yy][Aa][Nn]-([1-5][0-9][0-9]|[1-9][0-9]|[1-9])','i')) {
        console.log("right");
      }else {
        Toast.makeText("You must enter a valid referral code!","long").show();
        console.log("wrong");
        return ;
      }
      console.log("Check Internet connectivity..");
      var con=this.checkconnection();
      if(con){
        if(!debug){
          id=this.serverRegister();
        }else{
           var topmost=FrameModule.topmost();
            topmost.navigate("pages/doctor/home/home");
        }
      }
      }

      // dialog.close();

    };
    RegistrationModel.prototype.showtermsAction = function () {
      var topmost=FrameModule.topmost();
       topmost.navigate("pages/doctor/home/legal/legal");
    };

    return RegistrationModel;
  })(observable.Observable);
  page.bindingContext = new RegistrationModel();
}
exports.registrationLoaded = registrationLoaded;
