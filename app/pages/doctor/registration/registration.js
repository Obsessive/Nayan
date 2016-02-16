var FrameModule = require("ui/frame");
var observable = require("data/observable");
var Sqlite = require( "nativescript-sqlite" );
var viewModule = require("ui/core/view");
var fetchModule = require("fetch");
var pushPlugin = require("nativescript-push-notifications");
function registrationLoaded(args) {
  var page = args.object;
  var server = "nayanmain.negative.co.in";
  var id;
  var firstname;
  var lastname;
  var type='doctor';
  var email;
  var code;
  var phone;
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
        db.execSQL("insert into user (id,type,firstname,lastname,number,email,code) values (?,?,?,?,?,?,?)", [id,type,firstname,lastname,phone,email,code], function(err, d) {
          // console.log(err);
          //Replace code to verify the email against inserted value.
          //This is inexpensive.
          db.get('select * from user', function(err, row) {
            console.log("Row of data was: ", row);  // Prints [["Field1", "Field2",...]]
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
     
        var self=this;
      fetchModule.fetch("http://"+server+"/user/create", {
        method: "POST",
        body: JSON.stringify({type:type , firstname:firstname , lastname:lastname ,number:phone,email:email,code:code,address:'',hospital:''})
      }).then(function(response) {
        console.log("id: "+response._bodyText);
        id=response._bodyText;
        if(id=="0"){
            alert("Sorry, Couldn't get you registered.. kindly check your internet connection and try again!");
          }else{
        self.localRegister(id);
        self.pushnotification();
        console.log("Registered on server.");
        return id;
        }
      }).catch(function(err) {
            // Error :( 
            console.log(err);
            // alert("Sorry, Couldn't get you registered.. kindly check your internet connection and try again!");
          });  
      
    };
    RegistrationModel.prototype.pushnotification=function(){
            //Testing push notifications. 
        //fetch is analogous to volley, it takes care of http requests-to abhijith
        //subscribe is our proprietory push server. 
        pushPlugin.register({ senderID: '316739204235' }, function (data){
            console.log("message", "" + JSON.stringify(data));
            fetchModule.fetch("http://nayanpush.negative.co.in/subscribe", {
              headers: new Headers({
                  'Content-Type': 'application/json'
              }),
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
    RegistrationModel.prototype.registerAction = function () {
      console.log("Registration button clicked.");
      firstname = viewModule.getViewById(page, "doctorregistrationfirstname").text;
      lastname = viewModule.getViewById(page, "doctorregistrationlastname").text;
      email = viewModule.getViewById(page, "doctorregistrationemail").text;
      phone = viewModule.getViewById(page, "doctorregistrationphone").text;
      code = viewModule.getViewById(page, "doctorregistrationcode").text;
      console.log("Check Internet connectivity..");
      id=this.serverRegister();
      
      
    };

    return RegistrationModel;
  })(observable.Observable);
  page.bindingContext = new RegistrationModel();
}
exports.registrationLoaded = registrationLoaded;
