'use strict';

var tabViewModule = require("ui/tab-view");
var ClientDetailsViewModel = require('./clientDetails-view-model');
var Observable = require('data/observable').Observable;
var helpers = require('../../utils/widgets/helper');

var page;
var isInit = true;
var clientDetails = new ClientDetailsViewModel();
var pageData = new Observable({
    clientDetails: clientDetails,
    isLoading: true,
    screen_id: null
});

exports.onLoaded = function(args) {
    page = args.object;
    page.bindingContext = pageData;
	helpers.togglePageLoadingIndicator(true, pageData);
    var gotData = page.navigationContext;

	clientDetails
		.load(gotData.id)
		.catch(function(error) {
        	helpers.handleLoadError(error, 'Sorry, we could not load your clients list');
    	})
		.then(function() {
        	console.log(JSON.stringify(clientDetails.Result));
        	pageData.set('clientDetails', clientDetails.Result);
			helpers.togglePageLoadingIndicator(false, pageData);
		});
	
    helpers.platformInit(page);
    if (isInit) {
        isInit = false;
    }
}
