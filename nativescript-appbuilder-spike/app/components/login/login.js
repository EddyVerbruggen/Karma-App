var dialogs = require('ui/dialogs');
var Observable = require('data/observable').Observable;
var platform = require('platform');
var UserViewModel = require('../../utils/view-models/user');
var navigation = require('../../utils/navigation');

var pageData;
var user;
var page;
var email;
var password;
var submitButton;

exports.onLoaded = function (args) {
    page = args.object;
    user = new UserViewModel({
        email: '',
        password: ''
    });
    pageData = new Observable({
        user: user,
        authenticating: false
    });
    page.bindingContext = pageData;
    // statusBarUtil.configure();
    
	email = page.getViewById("email");
	password = page.getViewById("password");
	submitButton = page.getViewById("submit-button");
	//formUtil.hideKeyboardOnBlur(page, [email, password]);

	handleAndroidFocus();
    
    setHintColors();
};

exports.submit = function() {
    if (!user.isValidEmail()) {
        dialogs.alert({
            message: 'Enter a valid email address.',
            okButtonText: 'OK'
        });
        return;
    }
    toggleForm(false);
    login();
};

exports.focusPassword = function() {
    password.focus();
};

function toggleForm(enable) {
    email.isEnabled = enable;
    password.isEnabled = enable;
    submitButton.isEnabled = enable;
    pageData.set('authenticating', !enable);
}

function setHintColors() {
	var placeHolderColor = pageData.get("isLogin") ? "#52545B" : "#52545B";

	if (email.android) {
		var color = android.graphics.Color.parseColor(placeHolderColor);
		email.android.setHintTextColor(color);
		password.android.setHintTextColor(color);
	}
	if (email.ios) {
		var dictionary = new NSDictionary([new Color(placeHolderColor).ios], [NSForegroundColorAttributeName]);
		email.ios.attributedPlaceholder = NSAttributedString.alloc().initWithStringAttributes(
			email.hint, dictionary);
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
		email.android.clearFocus();
	}
}

function login() {
    navigation.goToDashboard();
    /*user.login()
    	.catch(function() {
        	dialogs.alert({
                message: 'Sorry, your username/password could not be found.',
                okButtonText: 'OK'
            });
        	toggleForm(true);
        	return Promise.reject();
    	})
    	.then(toggleForm(true))
    	.then(navigation.goToDashboardView());*/
}
