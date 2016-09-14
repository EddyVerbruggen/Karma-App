var dialogs = require('ui/dialogs');
var Observable = require('data/observable').Observable;
var platform = require('platform');
var pushPlugin = require('nativescript-push-notifications');
var platform = require('platform');
var appSettings = require("application-settings");

var UserViewModel = require('../../utils/view-models/user');
var navigation = require('../../utils/navigation');

var pageData;
var user;
var page;
var username;
var password;
var submitButton;

var settings = {
    // Android settings
    senderID: '935398670281', // Android: Required setting with the sender/project number
    notificationCallbackAndroid: function(data, pushNotificationObject) { },

    // iOS settings
    badge: true, // Enable setting badge through Push Notification
    sound: true, // Enable playing a sound
    alert: true, // Enable creating a alert

    // Callback to invoke, when a push is received on iOS
    notificationCallbackIOS: function(message) { }
};

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

exports.onLoaded = function (args) {
    page = args.object;
    user = new UserViewModel({
        username: '',
        password: '',
        device_id: '',
        platform: ''
    });
    pageData = new Observable({
        user: user,
        authenticating: false
    });
    page.bindingContext = pageData;
    // statusBarUtil.configure();
    
	username = page.getViewById("username");
	password = page.getViewById("password");
	submitButton = page.getViewById("submit-button");
	//formUtil.hideKeyboardOnBlur(page, [username, password]);

    if (platform.device.os === platform.platformNames.android) {
        pushPlugin.register(settings,
            // Success callback
            function(token) {
                // if we're on android device we have the onMessageReceived function to subscribe
                // for push notifications
                if(pushPlugin.onMessageReceived) {
                    pushPlugin.onMessageReceived(settings.notificationCallbackAndroid);
                }

                user.set('device_id', token);
                user.set('platform', 'android');
            },
            // Error Callback
            function(error) {
                alert(error);
            }
        );
    } else {
        pushPlugin.register(iosSettings, function (data) {
            user.set('platform', 'ios');
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
    
	handleAndroidFocus();
    
    setHintColors();
};

exports.submit = function() {
    toggleForm(false);
    login();
};

exports.focusPassword = function() {
    password.focus();
};

function toggleForm(enable) {
    username.isEnabled = enable;
    password.isEnabled = enable;
    submitButton.isEnabled = enable;
    pageData.set('authenticating', !enable);
}

function setHintColors() {
	var placeHolderColor = pageData.get("isLogin") ? "#52545B" : "#52545B";

	if (username.android) {
		var color = android.graphics.Color.parseColor(placeHolderColor);
		username.android.setHintTextColor(color);
		password.android.setHintTextColor(color);
	}
	if (username.ios) {
		var dictionary = new NSDictionary([new Color(placeHolderColor).ios], [NSForegroundColorAttributeName]);
		username.ios.attributedPlaceholder = NSAttributedString.alloc().initWithStringAttributes(
			username.hint, dictionary);
		password.ios.attributedPlaceholder = NSAttributedString.alloc().initWithStringAttributes(
			password.hint, dictionary);
	}
}

// Prevent the first textfield from receiving focus on Android
// See http://stackoverflow.com/questions/5056734/android-force-edittext-to-remove-focus
function handleAndroidFocus() {
	var container = page.getViewById("container");
	if (container.android) {
		container.android.setFocusableInTouchMode(true);
		container.android.setFocusable(true);
		username.android.clearFocus();
	}
}

function login() {
    user.login()
    	.then(function(response) {
			toggleForm(true);
    	});
}