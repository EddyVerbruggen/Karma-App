'use strict';
var Observable = require('data/observable').Observable;
var MessagesViewModel = require('./messages-view-model');
var helpers = require('../../utils/widgets/helper');
var views = require('../../utils/views');

var page;
var isInit = true;
var clientsList = new MessagesViewModel();
var pageData = new Observable({
    clientsList: clientsList,
	statusVisible: false,
    tagsVisible: false,
    sortbyVisible: false,
    selectedStatus: 'Status',
    selectedTag: 'Tags',
    selectedSortby: 'Sort By',
    isLoading: true,
    backButtonHidden: true,
    selectedIndex0: 0,
    selectedIndex1: 0,
    selectedIndex2: 0
});

exports.onLoaded = function(args) {
    page = args.object;
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

exports.onSelectClient = function(args) {
    helpers.tapFlash(args.object).then(function() {
        helpers.navigate({
            moduleName: views.clientDetails,
            context: {
                id: args.view.screeningId
            }
        });
    });
}