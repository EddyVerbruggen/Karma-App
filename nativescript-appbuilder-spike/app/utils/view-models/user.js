var appSettings = require("application-settings");
var Observable = require('data/observable').Observable;
var validator = require('email-validator');
var dialogs = require('ui/dialogs');
var config = require('../config');
var navigation = require('../navigation');

function User(info) {
	info = info || {};

	var viewModel = new Observable({
		username: info.username || "",
		password: info.password || "",
        device_id: info.device_id || "",
        platform: info.platform || ""
	});

	viewModel.login = function() {
        return fetch(config.apiUrl + "users/token.json", {
            // Do a regular form POST instead of JSON body string
            method: "POST",
			headers: {
				"Content-Type": "application/x-www-form-urlencoded",
                TestData: config.testData
			},
            body: "username=" + viewModel.get("username") + "&password=" + viewModel.get("password") + "&device_id=" + viewModel.get("device_id") + "&platform=" + viewModel.get("platform")
        })
        .then(function(response) {
            return response.json().then(function(data) {
                return {
                    data: data,
                    status: response.status
                };
            });
        })
        .then(function(resp) {
            if (resp.status === 200 && resp.data && resp.data.token) {
                config.token = resp.data.token;
                appSettings.setNumber('id', resp.data.id);
                appSettings.setString('username', resp.data.username);
                appSettings.setString('email', resp.data.email);
                appSettings.setString('profile_image', resp.data.profile_image);
                appSettings.setString('name', resp.data.name);
                appSettings.setString('timezone', resp.data.timezone);
                navigation.goToDashboard();
            } else {
                dialogs.alert({
                    message: 'Sorry, your username/password could not be found.',
                    okButtonText: 'OK'
                });
            }
		});
	};

	viewModel.isValidEmail = function() {
		var email = this.get("email");
		return validator.validate(email);
	};

	return viewModel;
}

module.exports = User;