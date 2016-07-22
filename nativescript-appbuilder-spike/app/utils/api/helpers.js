'use strict';

var navigation = require('../../utils/navigation');

exports.handleResponse = function(response) {
	if (response.status != 200) {
        alert(JSON.stringify(response.statusText));
		console.log(JSON.stringify(response));

		if (response.status === 403) {
			navigation.signOut();
		}

		throw Error(response.statusText);
	}
    
    return response.json();
}