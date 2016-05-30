var FrameModule = require("ui/frame");
var observable = require("data/observable");
var sqlite = require( "nativescript-sqlite" );
var dbname = 'medicaldiary.sqlite';
var db = null;
var arr;
var entry;
var id;
function patientDiaryMyPageLoaded(args) {
  var page = args.object;
  var PatientDiaryMyPageModel = (function (_super) {
    __extends(PatientDiaryMyPageModel, _super);
    function PatientDiaryMyPageModel() {
      _super.call(this);
      console.log("patient mypage is now ready.");
      id = page.navigationContext.info;
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
          db.get("select entry from patient where id=?",[id],function(err, resultSet) {
            if (err) {
              console.log("error subject ",err);
            }else {
              entry=resultSet.entry.toString();
              console.log("Result set is:", resultSet.entry.toString());
            }
          });
        }
      });
      this.set("diarymypagetext",entry);
    }
    PatientDiaryMyPageModel.prototype.mypagedeleteAction = function () {
      console.log("deleteAction button clicked.");
      db.execSQL("DELETE FROM patient where id=?",[id]);
      var topmost=FrameModule.topmost();
      topmost.goBack();

    };

    PatientDiaryMyPageModel.prototype.mypagesaveAction = function () {
      console.log("saveAction button clicked.");
      var content = page.getViewById("diarymypagetextview").text;
      console.log(content);
      if (content.toString().length==0) {
        Toast.makeText("Enter the content in diary", "long").show();
      }else {
      if (content.toString().length<=20) {
        subject = content.toString();
        console.log("less");
      }else {
        subject = content.toString().substring(0,19);
        console.log("more");
      }
     }
      db.execSQL("UPDATE patient SET subject=?,entry=? where id=?",[subject,content,id]);
      var topmost=FrameModule.topmost();
      topmost.goBack();
    };

    return PatientDiaryMyPageModel;
  })(observable.Observable);
  page.bindingContext = new PatientDiaryMyPageModel();
}
exports.back = function(args){
  console.log("back");
  var topmost=FrameModule.topmost();
  topmost.goBack();
}
exports.patientDiaryMyPageLoaded = patientDiaryMyPageLoaded;
