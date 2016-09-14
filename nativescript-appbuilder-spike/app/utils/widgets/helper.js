'use strict';

var frame = require('ui/frame');
var dialogsModule = require('ui/dialogs');
var platform = require('platform');
var colorModule = require('color');
var timer = require('timer');
var pushPlugin = require('nativescript-push-notifications');
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

    var settings = {
        // Android settings
        senderID: '935398670281', // Android: Required setting with the sender/project number
        notificationCallbackAndroid: function(data, pushNotificationObject) { // Android: Callback to invoke when a new push is received.
            var payload = JSON.parse(JSON.parse(pushNotificationObject).data);
            // if (appSettings.getBoolean('AppForground') === false){
                switch (payload.action) {

                    case "APPOINTMENT_DETAIL":
                        frame.topmost().navigate({
                            moduleName: views.appointmentDetails,
                            context: {
                                id: payload.id
                            }
                        });  
                        break;

                    case "MESSAGE":
                        frame.topmost().navigate({
                            moduleName: views.appointmentDetails,
                            context: {
                                id: payload.id,
                                from: "messages"
                            }
                        });
                        break;

                    case "REFERENCES":
                        frame.topmost().navigate({
                            moduleName: views.clientDetails,
                            context: {
                                id: payload.id,
                                name: ""
                            }
                        });
                        break;

                    default: 
                }
            // }
        },

        // iOS settings
        badge: true, // Enable setting badge through Push Notification
        sound: true, // Enable playing a sound
        alert: true, // Enable creating a alert

        // Callback to invoke, when a push is received on iOS
        notificationCallbackIOS: function(message) {
            alert(JSON.stringify(message));
        }
    };
    pushPlugin.register(settings,
        // Success callback
        function(token) {
            // if we're on android device we have the onMessageReceived function to subscribe
            // for push notifications
            if(pushPlugin.onMessageReceived) {
                pushPlugin.onMessageReceived(settings.notificationCallbackAndroid);
            }
        },
        // Error Callback
        function(error) {
            alert(error);
        }
    );
}

exports.registerIOS = function() {
    
    var iosSettings = {
        badge: true,
        sound: true,
        alert: true,
        interactiveSettings: {
            actions: [{
                identifier: 'READ_IDENTIFIER',
                title: 'Read',
                activationMode: "foreground",
                destructive: false,
                authenticationRequired: true
            }, {
                identifier: 'CANCEL_IDENTIFIER',
                title: 'Cancel',
                activationMode: "foreground",
                destructive: true,
                authenticationRequired: true
            }],
            categories: [{
                identifier: 'READ_CATEGORY',
                actionsForDefaultContext: ['READ_IDENTIFIER', 'CANCEL_IDENTIFIER'],
                actionsForMinimalContext: ['READ_IDENTIFIER', 'CANCEL_IDENTIFIER']
            }]
        },
        notificationCallbackIOS: function (data) {
            alert("message", "" + JSON.stringify(data));
        }
    };
    pushPlugin.register(iosSettings, function (data) {
        // Register the interactive settings
            if(iosSettings.interactiveSettings) {
                pushPlugin.registerUserNotificationSettings(function() {
                    alert('Successfully registered for interactive push.');
                }, function(err) {
                    alert('Error registering for interactive push: ' + JSON.stringify(err));
                });
            }
    }, function() { });
}