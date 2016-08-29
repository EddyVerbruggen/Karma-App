'use strict';
var Observable = require('data/observable').Observable;
var timer = require("timer");
var MessagesViewModel = require('./messages-view-model');
var helpers = require('../../utils/widgets/helper');
var views = require('../../utils/views');

var page;
var isInit = true;
var messageList = new MessagesViewModel();
var pageData = new Observable({
    messageList: messageList,
    isLoading: true,
    backButtonHidden: true,
    pageTitle: "MESSAGES"
});

exports.onLoaded = function(args) {
    page = args.object;
    page.bindingContext = pageData;
    helpers.togglePageLoadingIndicator(true, pageData);
	messageList
		.load()
		.catch(function(error) {
        	helpers.handleLoadError(error, 'Sorry, we could not load your clients list');
    	})
		.then(function() {
        	helpers.togglePageLoadingIndicator(false, pageData);
		});
    helpers.platformInit(page);
    if (isInit) {
        isInit = false;
    }
}

exports.onSelectMessage  = function(args) {
    helpers.tapFlash(args.object).then(function() {
        try{
            helpers.navigate({
 				// moduleName: views.clientDetails,
                moduleName: views.appointmentDetails,
                context: {
                    id: args.view.screeningId,
                    from: "messages"
                }
            });
		}catch(w){
            alert(w.message);
        }
    });
}

exports.onLoadMoreItemsRequested = function (args) {
    var that = new WeakRef(this);
    timer.setTimeout(function () {
        var listView = args.object;
        // var initialNumberOfItems = that.get()._numberOfAddedItems;
        // for (var i = that.get()._numberOfAddedItems; i < initialNumberOfItems + 2; i++) {
        //     if (i > posts.names.length - 1) {
        //         listView.loadOnDemandMode = listViewModule.ListViewLoadOnDemandMode[listViewModule.ListViewLoadOnDemandMode.None];
        //         break;
        //     }
        //     var imageUri = application.android ? posts.images[i].toLowerCase() : posts.images[i];
        //     that.get()._items.push(new DataItem(posts.names[i], posts.titles[i], posts.text[i], "res://" + imageUri));
        //     that.get()._numberOfAddedItems++;
        // }
        listView.notifyLoadOnDemandFinished();
    }, 1000);
    args.returnValue = true;
};