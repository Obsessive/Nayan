var FrameModule = require("ui/frame");
var observable = require("data/observable");
var viewModule = require("ui/core/view");
var application = require("application");
var sqlite = require( "nativescript-sqlite" );
if (application.android) {
var Toast = require("nativescript-toast");
}
var dbname = 'medicaldiary.sqlite';
var db = null;
var page;
function patientDiaryEntryLoaded(args) {
  page = args.object;
  var PatientDiaryEntryModel = (function (_super) {
    __extends(PatientDiaryEntryModel, _super);
    function PatientDiaryEntryModel() {
      _super.call(this);
      console.log("patient entry is now ready.");
    }
    PatientDiaryEntryModel.prototype.saveAction = function () {
      console.log("saveAction button clicked.");
      if (!sqlite.exists(dbname)) {
        sqlite.copyDatabase(dbname);
      }
      new sqlite(dbname, function(err, dbConnection) {
        if (err) {
          console.log(err);
        }
        if (dbConnection) {
          console.log("db is now ready.");
          db = dbConnection;
          db.resultType(sqlite.RESULTSASOBJECT);
          var content = viewModule.getViewById(page,"patientDiaryEntrytextfield").text;
          console.log("string ",content.toString().length);
          var subject;
          if (content.toString().length==0) {
            if (application.android) {
              Toast.makeText("Enter the content in diary", "long").show();
            }else {
              alert("Enter the content in diary");
            }
          }else {
          if (content.toString().length<=20) {
            subject = content.toString();
            console.log("less");
          }else {
            subject = content.toString().substring(0,19);
            console.log("more");
          }
          db.execSQL("insert into patient (subject,entry) values (?,?)", [subject,content]);
          console.log("inserted");
          var topmost=FrameModule.topmost();
          topmost.goBack();
          /*db.get("select * from patient where subject=?", [subject] ,function(err,data){
            if (err) {
              this.set("testsample",err);
              console.log(err);
            }
            if (data) {
              this.set("testsample",data);
              console.log(data.subject);
            }
          });*/
        }
        }
      });
    };
    return PatientDiaryEntryModel;
  })(observable.Observable);
  page.bindingContext = new PatientDiaryEntryModel();
}
exports.back = function(args){
  console.log("back");
  var topmost=FrameModule.topmost();
  topmost.goBack();
}
exports.patientDiaryEntryLoaded = patientDiaryEntryLoaded;

//
