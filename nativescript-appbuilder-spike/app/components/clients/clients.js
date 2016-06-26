'use strict';
var Observable = require('data/observable').Observable;
var ClientsViewModel = require('./clients-view-model');
var helpers = require('../../utils/widgets/helper');
//var DropDown = require("nativescript-drop-down/drop-down");

var page;
var isInit = true;
var clientsList = new ClientsViewModel();
var pageData = new Observable({
    clientsList: clientsList,
    statusList: [
        {status: 'All'},
        {status: 'New'},
        {status: 'Approved'},
        {status: 'Rejected'},
        {status: 'Blacklisted'}
    ],
    tagsList: [
        {tag: 'All'},
        {tag: 'new york'},
        {tag: 'los angeles'},
        {tag: 'san francisco'}
    ],
    sortbyList: [
        {field: 'Name (A-Z)'},
        {field: 'Name (Z-A)'},
        {field: 'Status'},
        {field: 'Date (Newest)'},
        {field: 'Date (Oldest)'},
    ],
	statusVisible: false,
    tagsVisible: false,
    sortbyVisible: false,
    selectedStatus: 'Status',
    selectedTag: 'Tags',
    selectedSortby: 'Sort By',
    isLoading: true
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

exports.onTapSortby = function(args) {
    openOverlay('sortbyList', 'sortbyVisible');
}

exports.onTapTags = function(args) {
    openOverlay('tagsList', 'tagsVisible');
}

exports.onTapStatus = function(args) {
    openOverlay('statusList', 'statusVisible');
}

exports.onSelectStatus = function(args) {
    pageData.set('selectedStatus', args.view.text);
    helpers.togglePageLoadingIndicator(true, pageData);
    closeOverlay('statusList', 'statusVisible').then(function() {
        clientsList
            .load(pageData.get('selectedStatus'), pageData.get('selectedTag'), pageData.get('selectedSortby'))
            .catch(function(error) {
                helpers.handleLoadError(error, 'Sorry, we could not load your clients list');
            })
            .then(function() {
                //console.log('done');
                //helpers.togglePageLoadingIndicator(false, pageData);
            });
    });	
}

exports.onSelectTag = function(args) {
    pageData.set('selectedTag', args.view.text);
    helpers.togglePageLoadingIndicator(true, pageData);
    closeOverlay('tagsList', 'tagsVisible').then(function() {
        clientsList
            .load(pageData.get('selectedStatus'), pageData.get('selectedTag'), pageData.get('selectedSortby'))
            .catch(function(error) {
                helpers.handleLoadError(error, 'Sorry, we could not load your clients list');
            })
            .then(function() {
                //console.log('done');
                //helpers.togglePageLoadingIndicator(false, pageData);
            });
    });	
}

exports.onSelectSortby = function(args) {
    pageData.set('selectedSortby', args.view.text);
    helpers.togglePageLoadingIndicator(true, pageData);
    closeOverlay('sortbyList', 'sortbyVisible').then(function() {
        clientsList
            .load(pageData.get('selectedStatus'), pageData.get('selectedTag'), pageData.get('selectedSortby'))
            .catch(function(error) {
                helpers.handleLoadError(error, 'Sorry, we could not load your clients list');
            })
            .then(function() {
                //console.log('done');
                //helpers.togglePageLoadingIndicator(false, pageData);
            });
    });	
}

exports.onTapOverlay = function(args) {
    if (pageData.get('statusVisible')) {
    	closeOverlay('statusList', 'statusVisible');
    }
    if (pageData.get('tagsVisible')) {
    	closeOverlay('tagsList', 'tagsVisible');
    }
    if (pageData.get('sortbyVisible')) {
    	closeOverlay('sortbyList', 'sortbyVisible');
    }
}

function openOverlay(overlayId, visibilityFlag) {
    pageData.set(visibilityFlag, true);
    page.getViewById(overlayId).animate({
        opacity: 0.95,
        duration: 300
    });
}

function closeOverlay(overlayId, visibilityFlag) {
    return page.getViewById(overlayId).animate({
        opacity: 0,
        duration: 300
    }).then(function() {
        pageData.set(visibilityFlag, false);
    });
}
