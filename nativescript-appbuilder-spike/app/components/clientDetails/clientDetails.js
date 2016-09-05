'use strict';

var tabViewModule = require("ui/tab-view");
var ClientDetailsViewModel = require('./clientDetails-view-model');
var Observable = require('data/observable').Observable;
var dialogs = require("ui/dialogs");

var helpers = require('../../utils/widgets/helper');
// var imageCache = require('../../utils/image-cache');

var imageCacheModule = require("ui/image-cache");
var imageSource = require("image-source");
var fs = require("file-system");
var image;
var imgSouce;

var page;
var isInit = true;
var img;
var clientDetails = new ClientDetailsViewModel();
var pageData = new Observable({
    clientDetails: clientDetails,
    profileThumb: "",
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
    
    var cache = new imageCacheModule.Cache();
    cache.placeholder = imageSource.fromFile(fs.path.join(__dirname, "../images/placeholder/temp-client-thumb.jpg"));
    cache.maxRequests = 5;

    cache.enableDownload();
        
	clientDetails
		.load(gotData.id)
		.catch(function(error) {
        	helpers.handleLoadError(error, 'Sorry, we could not load your clients list');
    	})
		.then(function() {
        	pageData.set('clientDetails', clientDetails);
			helpers.togglePageLoadingIndicator(false, pageData);

        	// img = imageCache.getImage("http://images.nationalgeographic.com/wpf/media-live/photos/000/576/overrides/space207-trifid-nebula_57668_600x450.jpg");
        	// setTimeout(function(){ 
        	// alert(img);
        	// pageData.set('profileThumb', img);
        	// }, 10000);
        
        	
        	//IMAGE-CACHE MODULE
        	imgSouce: imageSource.ImageSource;
        	var url = pageData.get('clientDetails').get('Result');//.get('images');
        	url = "http://images.nationalgeographic.com/wpf/media-live/photos/000/576/overrides/space207-trifid-nebula_57668_600x450.jpg";//url.images[0];
        	image = cache.get(url);// Try to read the image from the cache
        	if (image) { // If present -- use it.
        		imgSouce = imageSource.fromNativeSource(image);
        		pageData.set('profileThumb', imgSouce);
                alert(JSON.stringify(pageData.get('profileThumb')));
        	} else { //If not present -- request its download.
                cache.push({
                    key: url,
                    url: url,
                    completed: function (image, key) {
                        // alert(url === key ? 'true' : 'false');
                        if (url === key) {
                            // alert(JSON.stringify(imageSource.fromNativeSource(image)));
	                        imgSouce = imageSource.fromNativeSource(image);
                        }
    	                pageData.set('profileThumb', imgSouce);
                        alert(JSON.stringify(pageData.get('profileThumb')));
                    }
                });
        	}
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