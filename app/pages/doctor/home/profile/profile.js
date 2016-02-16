var FrameModule = require("ui/frame");
var observable = require("data/observable");
var Sqlite = require( "nativescript-sqlite" );
var viewModule = require("ui/core/view");
function doctorProfileLoaded(args) {
var page = args.object;
var DoctorProfileModel = (function (_super) {
    __extends(DoctorProfileModel, _super);
    function DoctorProfileModel() {
        _super.call(this);
        var promise =new Sqlite("nayan.db", function(err, db) {
            db.get('select * from user', function(err, row) {
              firstname = viewModule.getViewById(page, "doctorprofilefirstname");
              lastname = viewModule.getViewById(page, "doctorprofilelastname");
              email = viewModule.getViewById(page, "doctorprofileemail");
              phone = viewModule.getViewById(page, "doctorprofilephone");
              code = viewModule.getViewById(page, "doctorprofilemcn");
              firstname.text=row[2];
              lastname.text=row[3];
              email.text=row[4];
              phone.text=row[5];
              code.text=row[6];

            });
          });
        
        console.log("doctor Profile is now ready.");
    }
    DoctorProfileModel.prototype.registerAction = function () {
       console.log("Registration button clicked.");
       var topmost=FrameModule.topmost();
       topmost.navigate("pages/doctor/registration/registration");
    };
    DoctorProfileModel.prototype.resetAction = function () {
      
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
   
    return DoctorProfileModel;
})(observable.Observable);
page.bindingContext = new DoctorProfileModel();
}

exports.doctorProfileLoaded = doctorProfileLoaded;
