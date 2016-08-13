var platform = require("platform");
var application = require("application");
var connectivity = require("connectivity");
var FrameModule = require("ui/frame");
var dialog = require("nativescript-dialog");
var observable = require("data/observable");
var Sqlite = require( "nativescript-sqlite" );
var viewModule = require("ui/core/view");
var fetchModule = require("fetch");
var pushPlugin = require("nativescript-push-notifications");
var applicationSettings = require("application-settings");
var i18n=require("../i18n");
function registrationLoaded(args) {


  var page = args.object;
  var langchange=0;
  var debug=0;
  var server = "nayanmain.negative.co.in";
  var id;
  // var termsagreed=true;
  var firstname;
  var lastname;
  var check_code;
  var type='patient';
  var email;
  var code;
  var phone;
  var RegistrationModel = (function (_super) {
    __extends(RegistrationModel, _super);
    function RegistrationModel() {
      _super.call(this);
      // Uncache the package


      // var s=JSON.stringify({type:type , firstname:firstname , lastname:lastname ,number:phone,email:email,code:code,address:'',hospital:''})
      // console.log(s);
      // if(applicationSettings.getString("language")==="hindi" && langchange===0){
      //   langchange=1;
      //   //reload the page
      //   var topmost=FrameModule.topmost();
      //   topmost.ReloadPage();
      // }


      //Set all labels and other i18n bindings here
      //getting it from i18n
      //var i18n=require("../i18n");
      //will ensure no internal var conflicts.
      //Not the best solution. -Zee
      //I'm sure. Abhijith will improve this.
      // console.dir(i18n);
      for(var x in i18n){
        if(applicationSettings.getString("language")==="hindi" && x==="hindi"){
          for(var y in i18n[x]){
            this.set(y,i18n[x][y]);
          }
        }
        if(applicationSettings.getString("language")==="english" && x==="english"){
          for(var y in i18n[x]){
            this.set(y,i18n[x][y]);
          }
        }
        // this.set(x,i18n[x]);
      }

      console.log("registration ready.");
    }

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
        db.execSQL("insert into user (id,type,firstname,lastname,number,email,code) values (?,?,?,?,?,?,?)", [id,type,firstname,lastname,phone,email,code], function(err, d) {
          // console.log(err);
          applicationSettings.setString("type", "patient");
          //Replace code to verify the email against inserted value.
          //This is inexpensive.
          db.get('select * from user', function(err, row) {
            console.log("Row of data was: ", row);  // Prints [["Field1", "Field2",...]]
            dialog.close();
            var topmost=FrameModule.topmost();
            topmost.navigate("pages/patient/home/home");
            if(err!=null){
              alert('Oops! Looks like something went wrong.. Please restart the app!')
            }
          });
        });
      });
    };

    RegistrationModel.prototype.check_referral_code = function () {
      console.log("check_referral_code is activated");
      var self = this;
      this.showLoading();
      var split_array = check_code.split("-");
      console.log(split_array);
      fetchModule.fetch("http://"+server+"/user/getdoctor/" + split_array[0] + "/" + split_array[1], {
        method: "GET",
      }).then(function(response) {
        console.log("id: "+response._bodyText);
        id_temp=response._bodyText;
        if(id_temp=="0"){
          alert("Sorry, Couldn't get you registered.. kindly check the data you entered and try again!");
          dialog.close();
        }else{
          id=self.serverRegister();
        }
      }).catch(function(err) {
        // Error :(
        console.log(err);
        alert("Sorry, Couldn't get you registered.. kindly check your internet connection and the data you entered!");
        dialog.close();
      });
    };

    RegistrationModel.prototype.serverRegister = function () {


      var self=this;
      fetchModule.fetch("http://"+server+"/user/create", {
        method: "POST",
        body: JSON.stringify({type:type , firstname:firstname , lastname:lastname ,number:phone,email:email,code:code,address:'',hospital:'',referral:''})
      }).then(function(response) {
        console.log("id: "+response._bodyText);
        id=response._bodyText;
        if(id=="0"){
          alert("Sorry, Couldn't get you registered.. kindly check the data you entered and try again!");
          dialog.close();
        }else{
          self.localRegister(id);
          // if (application.android) {
          self.pushnotification();
        // }
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
        alert("Please check your internet connection and try again!");
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

       var settings = {
        // Android settings
        senderID: '316739204235', // Android: Required setting with the sender/project number
        notificationCallbackAndroid: function(message, pushNotificationObject) { // Android: Callback to invoke when a new push is received.
            alert("Message: "+JSON.stringify(message));
        },

        // iOS settings
        badge: true, // Enable setting badge through Push Notification
        sound: true, // Enable playing a sound
        alert: true, // Enable creating a alert

        // Callback to invoke, when a push is received on iOS
        notificationCallbackIOS: function(message) {
             alert("Message: "+JSON.stringify(message));
             console.log("push received: "+data );
            var substring = "Inbox:";
            console.log(data.indexOf(substring) > -1);
            if(data.indexOf(substring) > -1){
              var msg=data.slice(6);
              console.log(msg);
               new Sqlite("nayan.db", function(err, db) {
                  var promise =db.execSQL("INSERT INTO chat (`message`,`fromid`,`toid`) VALUES(?,?,?)",[msg,'1','1']);
                  promise.then(function(){
                      console.log(JSON.stringify({"payload":[{"fromid":id,"toid":patient.id,"message":msg}]}));
                  });
              });
              // var topmost=FrameModule.topmost();
              // var navigationEntry = {
              //   moduleName: "pages/patient/home/inbox/inbox",
              //   context: {msg:msg},
              //   animated: true
              // };
              // topmost.navigate(navigationEntry);
            }else{
                var options = {
                    title: "Notification",
                    message: data,
                    okButtonText: "OK"
                };
                dialogs.alert(options).then(function () {
                    console.log("Done!");
                });
            }
        }
    };

      var result='';
      // pushPlugin.register({ senderID: '316739204235' }, function (data){
      pushPlugin.register(settings, function (data){
        console.log("message", "" + JSON.stringify(data));
        var push_post_data=JSON.stringify({user: firstname+" "+lastname, type: "android", token: data});
        console.log(push_post_data);
        fetch("http://nayanpush.negative.co.in/subscribe", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: push_post_data
        }).then(function (r) { return r.json(); console.log("done with subscribing to push server");}).then(function (r) {
          console.dir(r);
        }, function (e) {
          console.log("Error occurred " + e);
        });
        //     fetchModule.fetch("http://nayanpush.negative.co.in/subscribe", {
        //       method: "POST",
        //       headers: { "Content-Type": "application/json" },
        //       body: JSON.stringify({user: firstname+" "+lastname, type: "android", token: data})
        //   }).then(function(response) {
        //     console.log(JSON.stringify(response));
        //     console.log("done with subscribing to push server");
        // }).catch(function(err) {
        //   // Error :(
        //   console.log(err);
        // });
      }, function(e) {
        console.log(e);
      });
      // mostly not required untill we reach home.. please consider posibility of this being useful here.
      // pushPlugin.onMessageReceived(function callback(data) {
      //   alert("message", "" + JSON.stringify(data));
      // });
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
        console.log("Error: " + e)
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
        console.log("Error: " + e);
      });
    }else{
      firstname = viewModule.getViewById(page, "patientregistrationfirstname").text;
      lastname = viewModule.getViewById(page, "patientregistrationlastname").text;
      email = viewModule.getViewById(page, "patientregistrationemail").text;
      phone = viewModule.getViewById(page, "patientregistrationphone").text;
      code = viewModule.getViewById(page, "patientregistrationcode").text;
      check_code = code;
      code = code.substring(code.indexOf("-") + 1);
      console.log("Check Internet connectivity..");
      var con=this.checkconnection();
      if(con){
        if(!debug){
          this.check_referral_code();
        }else{
          FrameModule.topmost().navigate({
              moduleName: "pages/patient/home/home",
              backstackVisible: false
          });
          // var topmost=FrameModule.topmost();
          // topmost.navigate("pages/patient/home/home");
        }
      }
    }
  };

  RegistrationModel.prototype.showtermsAction = function () {
    var topmost=FrameModule.topmost();
    topmost.navigate("pages/patient/home/legal/legal");
  };

  return RegistrationModel;
})(observable.Observable);
page.bindingContext = new RegistrationModel();
}


exports.registrationLoaded = registrationLoaded;
