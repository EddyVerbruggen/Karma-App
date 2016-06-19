'use strict';
var Observable = require('data/observable').Observable;
var ClientsViewModel = require('./clients-view-model');
var helpers = require('../../utils/widgets/helper');

var isInit = true;
var clientsList = new ClientsViewModel();
var pageData = new Observable({
    clientsList: clientsList,
    isLoading: true
});

function onLoaded(args) {
    var page = args.object;
    page.bindingContext = pageData;
    helpers.togglePageLoadingIndicator(true, pageData);
	clientsList
		.load()
		.catch(function(error) {
        	helpers.handleLoadError(error, 'Sorry, we could not load your clients list');
    	})
		.then(function() {
        	helpers.togglePageLoadingIndicator(false, pageData);
		});
    helpers.platformInit(page);
    if (isInit) {
        isInit = false;
    }
}

exports.onLoaded = onLoaded;