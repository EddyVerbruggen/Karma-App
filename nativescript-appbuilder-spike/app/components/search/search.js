'use strict';
var Observable = require('data/observable').Observable;
var SearchViewModel = require('./search-view-model');
var helpers = require('../../utils/widgets/helper');
var searchBarModule = require('ui/search-bar');
var timer = require('timer');

var isInit = true, pageIndex = 1, searchText = '';
var searchResultsList = new SearchViewModel();
var pageData = new Observable({
    searchResultsList: searchResultsList,
    isLoading: false
});

var closeCallback;

exports.onLoaded = function (args) {
    var page = args.object;
    var actionBarLayout = page.getViewById('actionBarLayout');
    var searchBar = new searchBarModule.SearchBar();

    timer.setTimeout(() => {
        actionBarLayout.addChild(searchBar);
    }, 1000);

    searchBar.on(searchBarModule.SearchBar.submitEvent, onSearch);

    closeCallback = args.closeCallback;
    page.bindingContext = pageData;

    if (isInit) {
        isInit = false;
    }
}

function onSearch(args) {
    searchText = args.object.text;
    searchText = encodeURI(searchText);
    if (searchText != '') {
        helpers.togglePageLoadingIndicator(true, pageData);
        search(searchText, pageIndex, 5);
    }
}

exports.onClose = function (args) {
    closeCallback();
}

exports.onShownModally = function (args) {
    closeCallback = args.closeCallback
}

exports.onTapResult = function (args) {
    var tappedResult = pageData.get('searchResultsList').getItem(args.itemIndex);
    closeCallback(tappedResult.type, tappedResult.id);
}

function search(searchText, pageIndex, pageSize) {
    return searchResultsList
        .load(searchText, pageIndex, pageSize)
        .catch(function (error) {
            helpers.handleLoadError(error, 'Sorry, we could not load your search results list');
            helpers.togglePageLoadingIndicator(false, pageData)
        })
        .then(function () {
            helpers.togglePageLoadingIndicator(false, pageData)
        });
}

exports.onLoadMoreItemsRequested = function (args) {
    timer.setTimeout(function () {
        var listView = args.object;

        searchText = encodeURI(searchText);
        if (searchText != '') {
            search(searchText, pageIndex + 1, 5);
        }

        listView.notifyLoadOnDemandFinished();
    }, 1000);
    args.returnValue = true;
}
