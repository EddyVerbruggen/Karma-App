'use strict';

var isInit = true;
var Observable = require('data/observable').Observable;
var helpers = require('../../utils/widgets/helper');

var pageData = new Observable({
    backButtonHidden: true,
    pageTitle: "KARMA"
});

exports.onLoaded = function(args) {
    var page = args.object;
    page.bindingContext = pageData;
    helpers.platformInit(page);

    if (isInit) {
        isInit = false;
    }
}
