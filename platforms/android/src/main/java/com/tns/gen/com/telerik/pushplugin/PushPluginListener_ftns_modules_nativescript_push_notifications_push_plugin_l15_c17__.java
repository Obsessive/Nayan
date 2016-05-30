package com.tns.gen.com.telerik.pushplugin;

public class PushPluginListener_ftns_modules_nativescript_push_notifications_push_plugin_l15_c17__ implements com.telerik.pushplugin.PushPluginListener {
	public PushPluginListener_ftns_modules_nativescript_push_notifications_push_plugin_l15_c17__() {
		com.tns.Runtime.initInstance(this);
	}

	public void success(java.lang.Object param_0, java.lang.Object param_1)  {
		java.lang.Object[] args = new java.lang.Object[2];
		args[0] = param_0;
		args[1] = param_1;
		com.tns.Runtime.callJSMethod(this, "success", void.class, args);
	}

	public void success(java.lang.Object param_0)  {
		java.lang.Object[] args = new java.lang.Object[1];
		args[0] = param_0;
		com.tns.Runtime.callJSMethod(this, "success", void.class, args);
	}

	public void error(java.lang.Object param_0)  {
		java.lang.Object[] args = new java.lang.Object[1];
		args[0] = param_0;
		com.tns.Runtime.callJSMethod(this, "error", void.class, args);
	}

}
