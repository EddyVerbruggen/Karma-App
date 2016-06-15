var dialogs = require('ui/dialogs');
var Obervable = require('data/observable').Observable;
var platform = require('platform');
var UserViewModel = require('shared/viewModels/user-view-model');

exports.onLoaded = function (args) {
    page = args.object
    user = new UserViewModel({
        email: 'username or email',
        password: ''
    });
    pageData = new Observable({
        user: user,
        authenticating: false
    });
    page.bindingContext = pageData;
    // statusBarUtil.configure();
    
    setHintColors();
}

exports.submit = function() {
    if (!user.isValidEmail()) {
        dialogs.alert({
            message: 'Enter a valid email address.',
            okButtonText: 'OK'
        });
        return;
    }
    disableForm();
    login();
}

exports.focusPassword = function() {
    password.focus();
}

function toggleForm(enable) {
    email.isEnabled = enable;
    password.isEnabled = enable;
    submitButton.isEnabled = enable;
    pageData.set('authenticating', !enable);
}

function setHintColors() {
	var placeHolderColor = pageData.get("isLogin") ? "#ACA6A7" : "#C4AFB4";

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

function login() {
    user.login()
    	.catch(function() {
        	dialogs.alert({
                message: 'Sorry, your username/password could not be found.',
                okButtonText: 'OK'
            });
        	enableForm();
        	return Promise.reject();
    	})
    	.then(enableForm)
    	.then(navigation.goToDashboard);
    })
}