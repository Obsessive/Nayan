var FrameModule = require("ui/frame");
var observable = require("data/observable");
function patientexLoaded(args) {
var page = args.object;
var exerciseModel = (function (_super) {
    __extends( exerciseModel, _super);
    function exerciseModel() {
        _super.call(this);
        console.log(" is now ready.");
                this.set("patientexlist", [{name: "Eye Opening Story 1" },{name: "Eye Opening Story 2" },{name: "Eye Opening Story 3" },{name: "Eye Opening Story 4" },{name: "How to open eye drop bottle" },{name: "Glaucoma" }]);
    }
 exerciseModel.prototype.nextAction = function () {
       console.log("nextAction activated");
       var topmost=FrameModule.topmost();
       topmost.navigate("pages/index");
    };

    
   
    return exerciseModel;
})(observable.Observable);
page.bindingContext = new exerciseModel();
}

exports.patientexlistitemTap = function (args) {
    var index = args.index;
    console.log('Clicked item with index ' + index);
    if(index==0){
      var topmost=FrameModule.topmost();
       topmost.navigate("pages/patient/home/exercise/it/it");
    }
    if(index==1){
      var topmost=FrameModule.topmost();
       topmost.navigate("pages/patient/home/exercise/open/open");
    }
    if(index==2){
      var topmost=FrameModule.topmost();
       topmost.navigate("pages/patient/home/exercise/open2/open2");
    }
    if(index==3){
      var topmost=FrameModule.topmost();
       topmost.navigate("pages/patient/home/exercise/open3/open3");
    }
    if(index==4){
      var topmost=FrameModule.topmost();
       topmost.navigate("pages/patient/home/exercise/open4/open4");
    }
    if(index==5){
      var topmost=FrameModule.topmost();
       topmost.navigate("pages/patient/home/exercise/glaucoma/glaucoma");
    }
  };
exports.patientexLoaded = patientexLoaded;