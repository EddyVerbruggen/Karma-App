'use strict';
var Observable = require('data/observable').Observable;
var helpers = require('../../../../utils/widgets/helper');

var page;
var isInit = true;
var pageData = new Observable({
    "terms" :[
        {"def":"You are atleast 18 years of age and you enter into legally binding contract under aplicable law."},
        {"def":"You are atleast 18 years of age and you enter into legally binding contract under aplicable law."},
        {"def":"You are atleast 18 years of age and you enter into legally binding contract under aplicable law."},
        {"def":"You are atleast 18 years of age and you enter into legally binding contract under aplicable law."},
        {"def":"You are atleast 18 years of age and you enter into legally binding contract under aplicable law."}
    ],
    pageTitle: "TERMS & CONDITIONS",
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

exports.fabTap = function(args) {
    alert('tapped');
} 