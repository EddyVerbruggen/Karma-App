'use strict';
var Observable = require('data/observable').Observable;
var SearchViewModel = require('./search-view-model');
var helpers = require('../../utils/widgets/helper');
var searchBarModule = require('ui/search-bar');

var isInit = true;
var searchResultsList = new SearchViewModel();
var pageData = new Observable({
    searchResultsList: searchResultsList,
    isLoading: false
});

var closeCallback;

exports.onLoaded = function(args) {
    var page = args.object;
    
    // Don't remove yet, in case keyboard doesn't show up
    //var searchbar = page.getViewById('searchbar');
    //searchbar.focus();
    //searchbar.visibility = 'visible';
    /*var toprow = page.getViewById('toprow');
    var searchBar = new searchBarModule.SearchBar();
    searchBar.visibility = 'visible';
    searchBar.focus();
    toprow.addChild(searchBar);*/
    
    /*searchBar.on(searchBarModule.SearchBar.submitEvent, function (args: observable.EventData) { 
        console.log("Search for " + (<searchBarModule.SearchBar>args.object).text);
    });
    searchBar.on(searchBarModule.SearchBar.clearEvent, function (args: observable.EventData) {
        console.log("Clear");
    });*/
    
    closeCallback = args.closeCallback;
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

exports.onTapResult = function(args) {
    var tappedResult = pageData.get('searchResultsList').getItem(args.itemIndex);
    closeCallback(tappedResult.type, tappedResult.id);
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
