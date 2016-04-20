var application = require("application");
var platform = require("platform");
var applicationSettings = require("application-settings");
// var pushPlugin = require("nativescript-push-notifications");
application.cssFile = "pages/global.css";
application.on(application.launchEvent, function (args) {
     console.log("launching..");
    if(platform.device.os === platform.platformNames.android) {
        console.log("Device is android..");
        console.log("Setting theme..");

        application.onLaunch = function(intent) {
        // hook the onActivityCreated callback upon application launching
        application.android.onActivityCreated = function(activity) {
        // apply the default theme once the Activity is created
        var id = activity.getResources().getIdentifier("AppTheme", "style", activity.getPackageName());
        // activity.setTheme(id);
        }
        }
    
    }
     
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


