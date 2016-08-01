var applicationSettingsModule = require("application-settings");

var configObject = {
    testData: false,
	apiUrl: "https://www.karmascreen.com/api/v1/",
	invalidateToken: function() {
		this.token = "";
	}
};
Object.defineProperty(configObject, "token", {
	get: function() {
        return "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOjgwNDIwNzYwMSwiZXhwIjoxNDcxMDA3MzQ0fQ.yBHQI0_13k2gX_fK6Mtjz76OjmAr5FHXgCckejFkWYo";
		//return applicationSettingsModule.getString("token");
	},
	set: function(token) {
		return applicationSettingsModule.setString("token", token);
	}
});

module.exports = configObject;