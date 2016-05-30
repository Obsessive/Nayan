var FrameModule = require("ui/frame");
var observable = require("data/observable");
var ObservableArray = require('data/observable-array');
var appSettings = require("application-settings");
var utilities = require("utils/utils");
var page;
var current=0;
var sample;
function doctorProductsLoaded(args) {
page = args.object;
var DoctorProductsModel = (function (_super) {
    __extends(DoctorProductsModel, _super);
    function DoctorProductsModel() {
        _super.call(this);
        self=this;
        console.log("doctor Products is now ready.");
        self.setcontent();
    }

    DoctorProductsModel.prototype.setcontent = function () {
      console.log("setcontent is activated");
      utilities.GC();
      if (current===0) {
        page.getViewById("image_1").src="~/images/product0.jpg";
        page.getViewById("title_1").text="FBN Eye Drops";
        page.getViewById("image_2").src="~/images/product2.jpg";
        page.getViewById("title_2").text="Lubrex DS";
        page.getViewById("image_3").src="~/images/product3.jpg";
        page.getViewById("title_3").text="Lubrex Uno";
        page.getViewById("image_4").src="~/images/product4.jpg";
        page.getViewById("title_4").text="Lopres 0.5 Eye Drops";
        page.getViewById("image_5").src="~/images/product5.jpg";
        page.getViewById("title_5").text="Lubrex Eye Drops";
      }else if (current==1) {
        page.getViewById("image_1").src="~/images/product6.jpg";
        page.getViewById("title_1").text="Lutivit Capsules";
        page.getViewById("image_2").src="~/images/product7.jpg";
        page.getViewById("title_2").text="Misopt Eye Drops";
        page.getViewById("image_3").src="~/images/product8.jpg";
        page.getViewById("title_3").text="Moistane Eye Drops";
        page.getViewById("image_4").src="~/images/product9.jpg";
        page.getViewById("title_4").text="Monosopt Eye Drops";
        page.getViewById("image_5").src="~/images/product10.jpg";
        page.getViewById("title_5").text="Moxigram-KT Eye Drops";
      }else if (current==2) {
        page.getViewById("image_1").src="~/images/product11.jpg";
        page.getViewById("title_1").text="Moxigram-LX Eye Drops";
        page.getViewById("image_2").src="~/images/product12.jpg";
        page.getViewById("title_2").text="Oflacin Eye Drops";
        page.getViewById("image_3").src="~/images/product13.jpg";
        page.getViewById("title_3").text="Oflacin-DX Eye Drops";
        page.getViewById("image_4").src="~/images/product14.jpg";
        page.getViewById("title_4").text="Rapidon-OD Eye Drops";
        page.getViewById("image_5").src="~/images/product15.jpg";
        page.getViewById("title_5").text="Travo-Z Eye Drops";
      }else if (current==3) {
        page.getViewById("image_1").src="~/images/product115.png";
        page.getViewById("title_1").text="Betabrim Uno Eye Drops";
        page.getViewById("image_2").src="~/images/product116.png";
        page.getViewById("title_2").text="Extragat Eye Drops";
        page.getViewById("image_3").src="~/images/product117.png";
        page.getViewById("title_3").text="ExtraLube Eye Drops";
        page.getViewById("image_4").src="~/images/product118.png";
        page.getViewById("title_4").text="Micronac Eye Drops";
        page.getViewById("image_5").src="~/images/product119.png";
        page.getViewById("title_5").text="Vesoret Capsules";
      }
    };

    DoctorProductsModel.prototype.registerAction = function () {
       console.log("Registration button clicked.");
       var topmost=FrameModule.topmost();
       topmost.navigate("pages/doctor/registration/registration");
    };
    DoctorProductsModel.prototype.next = function () {
      current++;
       if (current==4) {
         current=0;
       }
       self.setcontent();
    };

    DoctorProductsModel.prototype.back = function(args){
      console.log("back");
      var topmost=FrameModule.topmost();
      topmost.navigate("pages/doctor/home/home");
    }

    DoctorProductsModel.prototype.prev = function () {
      current--;
       if (current==-1) {
         current=3;
       }
       self.setcontent();
    };

    return DoctorProductsModel;
})(observable.Observable);
page.bindingContext = new DoctorProductsModel();
}

exports.doctorProductsLoaded = doctorProductsLoaded;
