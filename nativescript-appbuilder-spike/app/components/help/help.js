'use strict';

var tabViewModule = require("ui/tab-view");
var Observable = require('data/observable').Observable;
var helpers = require('../../utils/widgets/helper');
var view = require("ui/core/view");
var observableArrayModule = require('data/observable-array').ObservableArray;

var page;
var isInit = true;
var parentView;

var pageData = new Observable({
    faqs: [{
        "id":"1",
		"title":"Question 1", 
        "descr":"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
    },{
        "id":"2",
        "title":"Question 2", 
        "descr":"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
    },{
        "id":"3",
        "title":"Question 3", 
        "descr":"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
    },{
        "id":"4",
        "title":"Question 4", 
        "descr":"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
    },{
        "id":"5",
        "title":"Question 5", 
        "descr":"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
    }],
    isLoading: true,
    pageTitle: "HELP"
});

exports.onLoaded = function(args) {
    page = args.object;
    page.bindingContext = pageData;
	helpers.togglePageLoadingIndicator(true, pageData);
	parentView = page.getViewById("help-tabs");
    
    helpers.platformInit(page);
    if (isInit) {
        isInit = false;
    }
}

exports.toggle = function(args){
    var section = args.object.section;
    var a = parentView.getViewById(section);
    var b = parentView.getViewById('ico'+section);
    
    if(a.visibility == "visible"){
    	a.visibility = "collapse";
        b.src = "~/images/ic_keyboard_arrow_right.png";
    }else{
        a.visibility = "visible";
        b.src = "~/images/ic_keyboard_arrow_down.png";
    }  	
}