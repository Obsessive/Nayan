var application = require("application");
var applicationSettings = require("application-settings");

application.cssFile = "pages/global.css";
application.on(application.launchEvent, function (args) {
	var type=applicationSettings.getString("type");
  
    
    if (type=="doctor") {
    	application.mainModule = "pages/doctor/home/home";
        // For Android applications, args.android is an android.content.Intent class.
        // console.log("Launched Android application with the following intent: " + args.android + ".");
    } else if (type == "patient") {
        // For iOS applications, args.ios is NSDictionary (launchOptions).
		application.mainModule = "pages/patient/home/home";
    }else{
    	application.mainModule = "pages/index";
    }
});
try{
application.start();
}catch(e){
	console.log(e);
}


