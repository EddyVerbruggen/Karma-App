var imageCacheModule = require("ui/image-cache");
var imageSource = require("image-source");
var fs = require("file-system");

var image;
var imgSouce;

exports.getImage = function(url) {

    var cache = new imageCacheModule.Cache();
    cache.placeholder = imageSource.fromFile(fs.path.join(__dirname, "../images/placeholder/temp-client-thumb.jpg"));
    cache.maxRequests = 5;

    cache.enableDownload();
    
    imgSouce: imageSource.ImageSource;// = imageSource.ImageSource;
    image = cache.get(url);
    if (image) {
        imgSouce = imageSource.fromNativeSource(image);
        return imgSouce;
    } else {
        cache.push({
            key: url,
            url: url,
            completed: function (image, key) {
                alert(url === key ? 'true' : 'false');
                if (url === key) {
                    alert(JSON.stringify(imageSource.fromNativeSource(image)));
                    imgSouce = imageSource.fromNativeSource(image);
                }
                return key;
            }
        });
    }
}