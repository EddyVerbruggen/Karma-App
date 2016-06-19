'use strict';

var navigation = require('../../utils/navigation');

exports.handleResponse = function(response) {
	if (!response.success) {
		console.log(JSON.stringify(response));

		if (response.status === 403) {
			navigation.signOut();
		}

		throw Error(response.statusText);
	}
    
    return typeof(response) === 'string' ? response.json() : response;
}