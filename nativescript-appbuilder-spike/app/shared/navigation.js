var config = require("./config");
var frameModule = require("ui/frame");

module.exports = {
	goToLoginPage: function() {
		frameModule.topmost().navigate("components/loginView/loginView");
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
		return config.token ? "views/list/list" : "components/loginView/loginView";
	}
};