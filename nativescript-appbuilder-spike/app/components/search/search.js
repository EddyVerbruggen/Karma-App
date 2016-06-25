'use strict';
var Observable = require('data/observable').Observable;
var SearchViewModel = require('./search-view-model');
var helpers = require('../../utils/widgets/helper');

var isInit = true;
var searchResultsList = new SearchViewModel();
var pageData = new Observable({
    searchResultsList: searchResultsList,
    isLoading: false
});

var closeCallback;

exports.onLoaded = function(args) {
    var page = args.object;
    closeCallback = args.closeCallback;
    page.getViewById('searchbar').focus();
    page.bindingContext = pageData;
    if (isInit) {
        isInit = false;
    }
}

exports.onSearch = function(args) {
    var searchText = args.object.text;
    if (searchText != '') {
        search(searchText);
	}
}

exports.onClose = function(args) {
    closeCallback();
}

exports.onShownModally = function(args) {
    closeCallback = args.closeCallback
}

function search(searchText) {
    helpers.togglePageLoadingIndicator(true, pageData);
	return searchResultsList
		.load(searchText)
		.catch(function(error) {
        	helpers.handleLoadError(error, 'Sorry, we could not load your search results list');
        	helpers.togglePageLoadingIndicator(false, pageData)
    	})
    	.then(function() {
            helpers.togglePageLoadingIndicator(false, pageData)
        });
}