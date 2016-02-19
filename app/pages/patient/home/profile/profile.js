var FrameModule = require("ui/frame");
var observable = require("data/observable");
var Sqlite = require( "nativescript-sqlite" );
var viewModule = require("ui/core/view");
function patientProfileLoaded(args) {
var page = args.object;
var PatientProfileModel = (function (_super) {
    __extends(PatientProfileModel, _super);
    function PatientProfileModel() {
        _super.call(this);
        var promise =new Sqlite("nayan.db", function(err, db) {
            db.get('select * from user', function(err, row) {
              firstname = viewModule.getViewById(page, "patientprofilefirstname");
              lastname = viewModule.getViewById(page, "patientprofilelastname");
              email = viewModule.getViewById(page, "patientprofileemail");
              phone = viewModule.getViewById(page, "patientprofilephone");
              code = viewModule.getViewById(page, "patientprofilecode");
              firstname.text=row[2];
              lastname.text=row[3];
              email.text=row[5];
              phone.text=row[4];
              code.text=row[6];

            });
          });
        
        console.log("patient Profile is now ready.");
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
       console.log("Verifying delete...");
       if (!Sqlite.exists("nayan.db")) {
        console.log("Done. Account reset");
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

exports.patientProfileLoaded = patientProfileLoaded;
