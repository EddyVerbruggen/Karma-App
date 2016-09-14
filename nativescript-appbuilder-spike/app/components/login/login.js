var dialogs = require('ui/dialogs');
var Observable = require('data/observable').Observable;
var platform = require('platform');
var pushPlugin = require('nativescript-push-notifications');
var platform = require('platform');

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
    notificationCallbackAndroid: function(data, pushNotificationObject) { // Android: Callback to invoke when a new push is received.
        var payload = JSON.parse(JSON.parse(pushNotificationObject).data);
        if (appSettings.getBoolean('AppForground') === false){
            switch (payload.action) {

                case "APPOINTMENT_DETAIL":
                    helpers.navigate({
                        moduleName: views.appointmentDetails,
                        context: {
                            id: payload.id
                        }
                    });  
                    break;

                case "MESSAGE":
                    helpers.navigate({
                        moduleName: views.appointmentDetails,
                        context: {
                            id: payload.id,
                            from: "messages"
                        }
                    });
                    break;

                case "REFERENCES":
                    helpers.navigate({
                        moduleName: views.clientDetails,
                        context: {
                            id: payload.id,
                            name: ""
                        }
                    });
                    break;

                default: 
            }
        }
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

exports.onLoaded = function (args) {
    page = args.object;
    user = new UserViewModel({
        username: '',
        password: '',
        device_id: '',
        platform: (platform.device.os).toLowerCase()
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

    pushPlugin.register(settings,
        // Success callback
        function(token) {
            // if we're on android device we have the onMessageReceived function to subscribe
            // for push notifications
            if(pushPlugin.onMessageReceived) {
                pushPlugin.onMessageReceived(settings.notificationCallbackAndroid);
            }

        	user.set('device_id', token);
            // alert('Device registered successfully');
        },
        // Error Callback
        function(error) {
            alert(error);
        }
    );
    
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
