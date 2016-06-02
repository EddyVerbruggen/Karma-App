'use strict';
var isInit = true,
    helpers = require('../../utils/widgets/helper');

// additional functions
function pageLoaded(args) {
    var page = args.object;

    helpers.platformInit(page);
    if (isInit) {
        isInit = false;
    }
}

exports.pageLoaded = pageLoaded;