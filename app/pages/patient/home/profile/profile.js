var FrameModule = require("ui/frame");
var observable = require("data/observable");
var Sqlite = require( "nativescript-sqlite" );
var viewModule = require("ui/core/view");
var applicationSettings = require("application-settings");

var i18n=require("../../i18n");
function patientProfileLoaded(args) {
var page = args.object;
var PatientProfileModel = (function (_super) {
    __extends(PatientProfileModel, _super);
    function PatientProfileModel() {
        _super.call(this);
        var self=this;
              //Set all labels and other i18n bindings here
      //getting it from i18n 
      //var i18n=require("../i18n");
      //will ensure no internal var conflicts.
      //Not the best solution. -Zee
      //I'm sure. Abhijith will improve this.
      
      new Sqlite("nayan.db", function(err, db) {
       if (err) {
         console.log(err);
       }
       
         console.log("db is now ready.");
         
         try{
         db.get('select * from user', function(err, row) {
          console.log(err);
          console.log(row);
          console.log("asdf");
              var firstname = viewModule.getViewById(page, "patientprofilefirstname");
              var lastname = viewModule.getViewById(page, "patientprofilelastname");
              var email = viewModule.getViewById(page, "patientprofileemail");
              var phone = viewModule.getViewById(page, "patientprofilephone");
              var code = viewModule.getViewById(page, "patientprofilecode");
              firstname.text=row[2];
              console.log(row[2]);
              lastname.text=row[3];
              email.text=row[5];
              phone.text=row[4];
              code.text=row[6];
              self.setlang();
            });
       }catch(e){
        console.log(e);
       }

         // db.resultType(sqlite.RESULTSASOBJECT);
       
       
     });
      // setTimeout(function(){
      //     var promise =new Sqlite("nayan.db", function(err, db) {
      //       db.get('select * from user', function(err, row) {
      //         firstname = viewModule.getViewById(page, "patientprofilefirstname");
      //         lastname = viewModule.getViewById(page, "patientprofilelastname");
      //         email = viewModule.getViewById(page, "patientprofileemail");
      //         phone = viewModule.getViewById(page, "patientprofilephone");
      //         code = viewModule.getViewById(page, "patientprofilecode");
      //         firstname.text=row[2];
      //         console.log(row[2]);
      //         lastname.text=row[3];
      //         email.text=row[5];
      //         phone.text=row[4];
      //         code.text=row[6];

      //       });
      //     });
      // },1000);
        
        
        console.log("patient Profile is now ready.");
    }
    PatientProfileModel.prototype.setlang = function () {
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
    }
    PatientProfileModel.prototype.registerAction = function () {
       console.log("Registration button clicked.");
       var topmost=FrameModule.topmost();
       topmost.navigate("pages/patient/registration/registration");
    };
    PatientProfileModel.prototype.resetAction = function () {
      
       console.log("Will Reset the profile.. and app.");
       console.log("deleting nayan db...");
       Sqlite.deleteDatabase("nayan.db");
       applicationSettings.setString("language", "english");
       console.log("Verifying delete...");
       if (!Sqlite.exists("nayan.db")) {
        console.log("Done. Account reset");
        applicationSettings.setString("type","");
        var topmost=FrameModule.topmost();
        topmost.navigate("pages/index");
      }
    };

    PatientProfileModel.prototype.saveAction = function () {
       new Sqlite("nayan.db", function(err, db) {
              firstname = viewModule.getViewById(page, "patientprofilefirstname");
              lastname = viewModule.getViewById(page, "patientprofilelastname");
              email = viewModule.getViewById(page, "patientprofileemail");
              phone = viewModule.getViewById(page, "patientprofilephone");
              code = viewModule.getViewById(page, "patientprofilemcn");
              // referral = viewModule.getViewById(page, "patientprofilereferral");
              hospital = viewModule.getViewById(page, "patientprofilehospital");
              address = viewModule.getViewById(page, "patientprofileaddress");
              db.execSQL("UPDATE user SET firstname=?,lastname=?,email=?,number=?,code=?,hospital=?,address=?", [firstname.text,lastname.text,email.text,phone.text,code.text,hospital.text,address.text], function(err, id) {
               console.log("updated");
              });
          });
       var topmost=FrameModule.topmost();
        topmost.navigate("pages/patient/home/home");
    };
   
    return PatientProfileModel;
})(observable.Observable);
page.bindingContext = new PatientProfileModel();
}
exports.back = function(args){
  console.log("back");
  var topmost=FrameModule.topmost();
  topmost.goBack();
}
exports.patientProfileLoaded = patientProfileLoaded;
