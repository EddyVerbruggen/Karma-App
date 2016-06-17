'use strict';
var isInit = true,
    ClientsViewModel = require('./clientsView-view-model'),
    Observable = require('data/observable').Observable,
    helpers = require('../../utils/widgets/helper');

var clientsList = new ClientsViewModel();
var pageData = new Observable({
    clientsList: clientsList,
    isLoading: false
});

// additional functions
function onLoaded(args) {
    var page = args.object;
    page.bindingContext = pageData;
    //console.dump(pageData.clientsList);
	showPageLoadingIndicator();
	clientsList
		.load()
		.catch(function(error) {
			console.log(error);
			dialogsModule.alert({
				message: "An error occurred while loading your grocery list.",
				okButtonText: "OK"
			});
		})
		.then(function() {
			hidePageLoadingIndicator();

			// Fade in the ListView over 1 second
			/*groceryListElement.animate({
				opacity: 1,
				duration: 1000
			});*/
		});
    /*helpers.platformInit(page);
    if (isInit) {
        isInit = false;
    }*/
}

function showPageLoadingIndicator() {
	pageData.set("isLoading", true);
}
function hidePageLoadingIndicator() {
	pageData.set("isLoading", false);
}

exports.onLoaded = onLoaded;