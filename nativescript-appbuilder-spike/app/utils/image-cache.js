'use strict';

var imageCacheModule = require("ui/image-cache");
var imageSource = require("image-source");
var fs = require("file-system");

var image, imgSouce;
var cache = new imageCacheModule.Cache();

exports.getImage = function(url) {
    cache.placeholder = imageSource.fromFile("~/images/placeholder/temp-client-thumb.jpg");
    cache.maxRequests = 5;

    image = cache.get(url);
    if (image) {
        imgSouce = imageSource.fromNativeSource(image);
        return imgSouce;
    } else {
        cache.push({
            key: url,
            url: url,
            completed: function (image, key) {
                if (url === key) {
                    imgSouce = imageSource.fromNativeSource(image);
                }
                return imgSouce;
            }
        });
    }
}