'use strict';

var tabViewModule = require("ui/tab-view");
var ClientDetailsViewModel = require('./clientDetails-view-model');
var Observable = require('data/observable').Observable;
var dialogs = require("ui/dialogs");

var helpers = require('../../utils/widgets/helper');
var imageCache = require('../../utils/image-cache');

// var imageCacheModule = require("ui/image-cache");
// var imageSource = require("image-source");
// var fs = require("file-system");
// var cache = new imageCacheModule.Cache();
// var image, imgSource;

var page;
var isInit = true;
var clientDetails = new ClientDetailsViewModel();
var pageData = new Observable({
    clientDetails: clientDetails,
    profileThumb: '',
    isLoading: true,
    pageTitle: "",
    SideMenuHidden: true,
    SearchButtonHidden: true
});

exports.onLoaded = function(args) {
    page = args.object;
    page.bindingContext = pageData;
	helpers.togglePageLoadingIndicator(true, pageData);
    var gotData = page.navigationContext;
	pageData.set('pageTitle', gotData.name);
    
    // cache.placeholder = imageSource.fromFile("~/images/placeholder/temp-client-thumb.jpg");
    // cache.maxRequests = 5;
    // pageData.set('profileThumb', cache.placeholder);
    // cache.enableDownload();
        
	clientDetails
		.load(gotData.id)
		.catch(function(error) {
        	helpers.handleLoadError(error, 'Sorry, we could not load your clients list');
    	})
		.then(function() {
        	pageData.set('clientDetails', clientDetails);
			helpers.togglePageLoadingIndicator(false, pageData);

        	var url = pageData.get('clientDetails').get('Result');//.get('images');
        	url = url.images[0].href;
   			imageCache.getImage(url, pageData);
        	        	
        	//IMAGE-CACHE MODULE
        	// var url = pageData.get('clientDetails').get('Result');//.get('images');
        	// url = url.images[0];//"http://images.nationalgeographic.com/wpf/media-live/photos/000/576/overrides/space207-trifid-nebula_57668_600x450.jpg";
        	// image = cache.get(url);// Try to read the image from the cache
        	// if (image) { // If present -- use it.
        	// 	imgSource = imageSource.fromNativeSource(image);
        	// 	pageData.set('profileThumb', imgSource);
        	// } else { //If not present -- request its download.
        	// cache.push({
        	// key: url,
        	// url: url,
        	// completed: function (image, key) {
        	// if (url === key) {
        	// imgSource = imageSource.fromNativeSource(image);
        	// }
        	// pageData.set('profileThumb', imgSource);
        	// }
        	// });
        	// }
		});
	
    helpers.platformInit(page);
    if (isInit) {
        isInit = false;
    }
}

exports.approve = function(args){
    dialogs.confirm({
      	title: "Approve",
      	message: "Are you sure you want to confirm ?",
      	okButtonText: "Approve",
      	cancelButtonText: "Cancel"
    }).then(function (result) {
      	// result argument is boolean
      	console.log("Dialog result: " + result);
    });
}

exports.reject = function(args){
    dialogs.confirm({
      	title: "Reject",
      	message: "Are you sure you want to reject ?",
      	okButtonText: "Reject",
      	cancelButtonText: "Cancel"
    }).then(function (result) {
      	// result argument is boolean
      	console.log("Dialog result: " + result);
    });
}

exports.delete = function(args){
    dialogs.confirm({
      	title: "Delete",
      	message: "Are you sure you want to delete ?",
      	okButtonText: "Delete",
      	cancelButtonText: "Cancel"
    }).then(function (result) {
      	// result argument is boolean
      	console.log("Dialog result: " + result);
    });
}

exports.tagTap = function(args){
	console.log(args.object.text);
}