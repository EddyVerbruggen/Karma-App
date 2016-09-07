'use strict';

var imageCacheModule = require("ui/image-cache");
var imageSource = require("image-source");
var fs = require("file-system");

var image, imgSouce;
// var cache = new imageCacheModule.Cache();

exports.getImage = function(url) {
    alert(url);
    // try{
    //     cache.placeholder = imageSource.fromFile(fs.path.join(__dirname, "../images/placeholder/temp-client-thumb.jpg"));
    //     cache.maxRequests = 5;

    //     cache.enableDownload();

    //     image = cache.get(url);
    //     if (image) {
    //         imgSouce = imageSource.fromNativeSource(image);
    //         alert(imgSouce);
    //         return imgSouce;
    //     } else {
    //         cache.push({
    //             key: url,
    //             url: url,
    //             completed: function (image, key) {
    //                 if (url === key) {
    //                     imgSouce = imageSource.fromNativeSource(image);
    //                 }
    //                 alert(imgSouce);
    //                 return imgSouce;
    //             }
    //         });
    //     }
    // }catch(q){
    //     alert(q);
    // }
}