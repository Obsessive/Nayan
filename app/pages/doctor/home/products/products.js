var FrameModule = require("ui/frame");
var observable = require("data/observable");
var ObservableArray = require('data/observable-array');
var appSettings = require("application-settings");
var page;
var current;
var sample;
function doctorProductsLoaded(args) {
page = args.object;
var DoctorProductsModel = (function (_super) {
    __extends(DoctorProductsModel, _super);
    function DoctorProductsModel() {
        _super.call(this);
        self=this;
        console.log("doctor Products is now ready.");
        appSettings.setBoolean("boolKey", false);
        current=appSettings.getNumber("current",0);
        if (current==0) {
          sample = [{ name:"FBN Eye Drops",product: "~/images/product0.jpg" },{ name:"Lubrex DS",product: "~/images/product2.jpg" },{ name:"Lubrex Uno",product: "~/images/product3.jpg" },{ name:"Lopres 0.5 Eye Drops",product: "~/images/product4.jpg" },{ name:"Lubrex Eye Drops",product: "~/images/product5.jpg" }];
        }else if (current==1) {
          sample = [{ name:"Lutivit Capsules",product: "~/images/product6.jpg" },{ name:"Misopt Eye Drops",product: "~/images/product7.jpg" },{ name:"Moistane Eye Drops",product: "~/images/product8.jpg" },{ name:"Monosopt Eye Drops",product: "~/images/product9.jpg" },{ name:"Moxigram-KT Eye Drops",product: "~/images/product10.jpg" }];
        }else if (current==2) {
          sample = [{ name:"Moxigram-LX Eye Drops",product: "~/images/product11.jpg" },{ name:"Oflacin Eye Drops",product: "~/images/product12.jpg" },{ name:"Oflacin-DX Eye Drops",product: "~/images/product13.jpg" },{ name:"Rapidon-OD Eye Drops",product: "~/images/product14.jpg" },{ name:"Travo-Z Eye Drops",product: "~/images/product15.jpg" }];
        }
        self.set("doctorproductlist", sample);
    }
    DoctorProductsModel.prototype.registerAction = function () {
       console.log("Registration button clicked.");
       var topmost=FrameModule.topmost();
       topmost.navigate("pages/doctor/registration/registration");
    };
    DoctorProductsModel.prototype.next = function () {
      current++;
       if (current==3) {
         current=0;
       }
       appSettings.setNumber("current", current);
       appSettings.setBoolean("boolKey", true);
       var topmost=FrameModule.topmost();
       topmost.goBack();
    };

    DoctorProductsModel.prototype.back = function(args){
      console.log("back");
      var topmost=FrameModule.topmost();
      topmost.navigate("pages/doctor/home/home");
    }

    DoctorProductsModel.prototype.prev = function () {
      current--;
       if (current==-1) {
         current=2;
       }
       appSettings.setNumber("current", current);
       appSettings.setBoolean("boolKey", true);
       var topmost=FrameModule.topmost();
       topmost.goBack();
    };

    return DoctorProductsModel;
})(observable.Observable);
page.bindingContext = new DoctorProductsModel();
}

exports.doctorProductsLoaded = doctorProductsLoaded;
