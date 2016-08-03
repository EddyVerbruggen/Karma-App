var dialogs = require('ui/dialogs');
var Observable = require('data/observable').Observable;
var platform = require('platform');
var UserViewModel = require('../../utils/view-models/user');
var navigation = require('../../utils/navigation');

var pageData;
var user;
var page;
var username;
var password;
var submitButton;

exports.onLoaded = function (args) {
    page = args.object;
    user = new UserViewModel({
        username: '',
        password: ''
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
