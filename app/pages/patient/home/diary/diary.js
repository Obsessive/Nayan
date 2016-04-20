var FrameModule = require("ui/frame");
var observable = require("data/observable");
var sqlite = require( "nativescript-sqlite" );
var dbname = 'medicaldiary.sqlite';
var db = null;
var arr;
function patientDiaryLoaded(args) {
  var page = args.object;
  var PatientDiaryModel = (function (_super) {
    __extends(PatientDiaryModel, _super);
    function PatientDiaryModel() {
      _super.call(this);
      console.log("patient Diary is now ready.");
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
          db.all("select id,subject from patient",function(err, resultSet) {
            if (err) {
              console.log("error subject ",err);
            }else {
              console.log("Result set is:", resultSet.id);
              arr = [];
              for (var i = 0; i < resultSet.length; i++) {
                console.log(resultSet[i].subject.toString());
                console.log("Result set is:", resultSet[i].id);
                arr.push({
                  id:resultSet[i].id,
                  subjectname: resultSet[i].subject.toString()
                });
              }
              console.log("Result set is:", JSON.stringify(arr));
            }
          });
        }
      });
      console.log(arr.toString());
      this.set("subjectlist",arr);
    }
    PatientDiaryModel.prototype.newentryAction = function () {
      console.log("newentryAction button clicked.");
      var topmost=FrameModule.topmost();
      topmost.navigate("pages/patient/home/diary/entry/entry");
    };

    return PatientDiaryModel;
  })(observable.Observable);
  page.bindingContext = new PatientDiaryModel();
}

exports.patientdiarylistitemTap = function (args) {
    var index = args.index;
    console.log('Clicked item with index ' + arr[index].id);
    var topmost=FrameModule.topmost();
    var navigationEntry = {
    moduleName: "pages/patient/home/diary/mypage/mypage",
    context: {info: arr[index].id},
    animated: false
};
topmost.navigate(navigationEntry);
};

exports.back = function(args){
  console.log("back");
  var topmost=FrameModule.topmost();
  topmost.goBack();
}
exports.patientDiaryLoaded = patientDiaryLoaded;
