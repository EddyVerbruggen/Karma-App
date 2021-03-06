'use strict';

var frame = require('ui/frame');
var dialogsModule = require('ui/dialogs');
var platform = require('platform');
var colorModule = require('color');
var timer = require('timer');
var appSettings = require("application-settings");

var views = require('~/utils/views');

exports.platformInit = function(page) {
    var top = frame.topmost(),
        ios = top.ios,
        android = top.android;

    if (android) {
        android.defaultAnimatedNavigation = true;
    }

    if (ios) {
        ios.navBarVisibility = 'always';
        // Restore back swipe gesture
        if (top.canGoBack()) {
            page.ios.navigationController.interactivePopGestureRecognizer.delegate = page.ios;
        }
    }
}

// TODO: Remove and use utils/navigation
exports.navigate = function(location) {
    // alert(JSON.stringify(location));
    frame.topmost().navigate(location);
    // frame.topmost().navigate({
    //   	moduleName: location.moduleName,
    //   	transition: { name: "slide" },
    //     context: location.context
    // });
}

exports.onOpenUrl = function(url) {
    if (!url) {
        return;
    }

    if (platform.device.os === platform.platformNames.ios) {
        var nsUrl = NSURL.URLWithString(url),
            sharedApp = UIApplication.sharedApplication();

        if (sharedApp.canOpenURL(nsUrl)) {
            sharedApp.openURL(nsUrl);
        }
    } else if (platform.device.os === platform.platformNames.android) {
        var intent = new android.content.Intent(android.content.Intent.ACTION_VIEW, android.net.Uri.parse(url)),
            activity = frame.topmost().android.activity;

        activity.startActivity(android.content.Intent.createChooser(intent, 'share'));
    }
}

exports.togglePageLoadingIndicator = function(toggleValue, pageData) {
    pageData.set("isLoading", toggleValue);
}

exports.handleLoadError = function(error, errorMessage) {
    errorMessage = errorMessage || 'Sorry, there was an error loading information.'
    dialogsModule.alert({
        message: errorMessage,
        okButtonText: "OK"
    });
}

exports.tapFlash = function(targetView, fromBgColor, toBgColor) {
    toBgColor = toBgColor || '#fcfcfc';
    fromBgColor = fromBgColor || '#eee';
    targetView.backgroundColor = new colorModule.Color(fromBgColor);
    return targetView.animate({
        duration: 200,
        backgroundColor: new colorModule.Color(toBgColor)
    });
}

exports.registerAndroid = function() {

}

exports.registerIOS = function() {

}