'use strict';

var navigation = require('../../utils/navigation');

exports.handleResponse = function(response) {
	if (response.status !== 200) {
        //alert(JSON.stringify(response.statusText));

		if (response.status === 403 || response.status === 401) {
			navigation.signOut();
		}

		throw Error(response.statusText);
	}
    
    return response.json();
}