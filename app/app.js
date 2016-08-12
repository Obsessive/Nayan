var application = require("application");
var platform = require("platform");
var frameModule = require("ui/frame");
var applicationSettings = require("application-settings");
// var pushPlugin = require("nativescript-push-notifications");
application.cssFile = "pages/global.css";
console.log("launching..123");
application.on(application.launchEvent, function (args) {
     console.log("launching..");
     application.on(application.uncaughtErrorEvent, function (args) {
        if (args.android) {
            //remove later
            console.dir(args);
            //remove later
            console.dir(args.android.stackTrace);
            console.log("Obsessive: " + args.android);
            args.android.stackTrace="Contact the folks who caused this.  - Obsessive Inc. +91 7676550018";

            //useless
            frameModule.topmost().navigate("pages/custom");
        } else if (args.ios) {
            console.log("NativeScriptError: " + args.ios);
        }
    });

    if(platform.device.os === platform.platformNames.android) {
        console.log("Device is android..");
        console.log("Setting theme..");

        application.onLaunch = function(intent) {
        // hook the onActivityCreated callback upon application launching
            application.android.onActivityCreated = function(activity) {
            // apply the default theme once the Activity is created
            var id = activity.getResources().getIdentifier("Theme.AppCompat.Light", "style", activity.getPackageName());
            activity.setTheme(id);
            };
        };

    }

	var type=applicationSettings.getString("type");
    if (type=="doctor") {
        console.log("doctor launch");
    	application.mainModule = "pages/doctor/home/home";
        // For Android applications, args.android is an android.content.Intent class.
        // console.log("Launched Android application with the following intent: " + args.android + ".");
    } else if (type == "patient") {
        console.log("patient launch");
        // For iOS applications, args.ios is NSDictionary (launchOptions).
		application.mainModule = "pages/patient/home/home";
    }else{
        console.log("not registered");
                // application.mainModule = "pages/doctor/home/home";

    	application.mainModule = "pages/index";
    }
});
try{
application.start();
}catch(e){
	console.log(e);
}
