var Observable = require('data/observable').Observable;
var validator = require('email-validator');
var dialogs = require('ui/dialogs');
var config = require('../config');
var navigation = require('../navigation');

function User(info) {
	info = info || {};

	var viewModel = new Observable({
		username: info.username || "",
		password: info.password || ""
	});

	viewModel.login = function() {
        return fetch(config.apiUrl + "users/token.json", {
            // Do a regular form POST instead of JSON body string
            method: "POST",
			headers: {
				"Content-Type": "application/x-www-form-urlencoded"
			},
            body: "username=" + viewModel.get("username") + "&password=" + viewModel.get("password")
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
                // Set other user information in application-settings
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