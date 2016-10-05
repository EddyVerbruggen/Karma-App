var applicationSettingsModule = require("application-settings");

var configObject = {
    testData: true,
	apiUrl: "https://www.karmascreen.com/api/v1/",
	invalidateToken: function() {
		this.token = "";
	}
};
Object.defineProperty(configObject, "token", {
	get: function() {
		return applicationSettingsModule.getString("token");
	},
	set: function(token) {
		return applicationSettingsModule.setString("token", token);
	}
});

module.exports = configObject;