var _ = require('underscore');

var imageCacheModule = require("ui/image-cache");
var imageSource = require("image-source");
var fs = require("file-system");

var cache = new imageCacheModule.Cache();
var image, imgSource;

function getImage (url, pageData) {
    
    cache.placeholder = imageSource.fromFile("~/images/placeholder/temp-client-thumb.jpg");
    cache.maxRequests = 5;
    pageData.set('profileThumb', cache.placeholder);
    
    cache.enableDownload();
    
    // imgSource = ImageCache(url);
    // if(imgSource)
    // pageData.set('profileThumb', imgSource);
    
    image = cache.get(url);
    if (image) {
        imgSource = imageSource.fromNativeSource(image);
        pageData.set('profileThumb', imgSource);
    } else {
        cache.push({
            key: url,
            url: url,
            completed: function (image, key) {
                if (url === key) {
                    imgSource = imageSource.fromNativeSource(image);
                    if(imgSource)
                    	pageData.set('profileThumb', imgSource);
                }
            }
        });
    }
}

exports.getImage = getImage;

function getImages (pageData) {
    
    cache.placeholder = imageSource.fromFile("~/images/placeholder/temp-client-thumb.jpg");
    cache.maxRequests = 5;
    imgSource = cache.placeholder;
    
    cache.enableDownload();
        
    _.each(pageData.get('clientsList'), function(element, index, list) {
        console.log(element + index + list);
        ImageCache(url)
    });
}

exports.getImages = getImages;

function ImageCache(url) {
    image = cache.get(url);
    if (image) {
        imgSource = imageSource.fromNativeSource(image);
    } else {
        cache.push({
            key: url,
            url: url,
            completed: function (image, key) {
                if (url === key) {
                    if(imageSource.fromNativeSource(image))
                    	imgSource = imageSource.fromNativeSource(image);
                }
            }
        });
    }
    return imgSource;
}