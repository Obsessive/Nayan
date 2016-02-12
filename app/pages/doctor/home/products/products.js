var FrameModule = require("ui/frame");
var observable = require("data/observable");
function doctorProductsLoaded(args) {
var page = args.object;
var DoctorProductsModel = (function (_super) {
    __extends(DoctorProductsModel, _super);
    function DoctorProductsModel() {
        _super.call(this);
                this.set("doctorproductlist", []);

        console.log("doctor Products is now ready.");
    }
    DoctorProductsModel.prototype.registerAction = function () {
       console.log("Registration button clicked.");
       var topmost=FrameModule.topmost();
       topmost.navigate("pages/doctor/registration/registration");
    };
   
    return DoctorProductsModel;
})(observable.Observable);
page.bindingContext = new DoctorProductsModel();
}

exports.doctorProductsLoaded = doctorProductsLoaded;
