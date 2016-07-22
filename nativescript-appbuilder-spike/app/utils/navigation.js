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
	goToPasswordPage: function() {
		frameModule.topmost().navigate("views/password/password");
	},
    goToDashboard: function() {
        frameModule.topmost().navigate({
            moduleName: 'navigation/navigation',
            clearHistory: true
        });
    },
	goToListPage: function() {
		frameModule.topmost().navigate({
			moduleName: "views/list/list",
			clearHistory: true
		});
	},
	signOut: function() {
		config.invalidateToken();
		frameModule.topmost().navigate({
			moduleName: "views/login/login",
			animated: false,
			clearHistory: true
		});
	},
	startingPage: function() {
		return config.token ? "components/dashboard/dashboard" : "components/home/homeView";
	}
};