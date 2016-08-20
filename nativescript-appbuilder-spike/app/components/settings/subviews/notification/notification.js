'use strict';
var Observable = require('data/observable').Observable;
var helpers = require('../../../../utils/widgets/helper');

var page;
var isInit = true;
var pageData = new Observable({
    new_client_apt: {
    	inapp: true,
        email: false,
        text: false
    },
    msg_clnt: {
        inapp: true,
        email: false,
        text: false
    },
    ref_clnt_ref: {
        inapp: true,
        email: false,
        text: false
    },
    can_apt: {
        inapp: true,
        email: false,
        text: false
    },
    pageTitle: "NOTIFICATIONS",
    SideMenuHidden: true,
    SearchButtonHidden: true
});

exports.onLoaded = function(args) {
    page = args.object;
    page.bindingContext = pageData;
    
    helpers.platformInit(page);
    if (isInit) {
        isInit = false;
    }
}