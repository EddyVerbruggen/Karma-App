var frameModule = require("ui/frame");
var config = require("./config");
var views = require('./views');

module.exports = {
    goToPage: function(view) {
        if (views.hasOwnProperty(view)) {
            frameModule.topmost().navigate(views[view]);
        } else {
            frameModule.topmost().navigate(views.dashboard);
        }
    },
	goToLoginPage: function() {
		frameModule.topmost().navigate(views.login);
	},
    goToDashboard: function() {
        frameModule.topmost().navigate({
            moduleName: views.dashboard,
            clearHistory: true
        });
    },
	signOut: function() {
		config.invalidateToken();
		frameModule.topmost().navigate({
			moduleName: views.login,
			animated: false,
			clearHistory: true
		});
	},
	startingPage: function() {
        return config.token ? views.dashboard : views.login;
	}
};