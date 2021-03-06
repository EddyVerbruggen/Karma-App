'use strict';
var Observable = require('data/observable').Observable;
var timer = require("timer");
var appSettings = require("application-settings");

var AppointmentsViewModel = require('./appointments-view-model');
var helpers = require('../../utils/widgets/helper');
var views = require('../../utils/views');

var page;
var isInit = true;
var appointmentsList = new AppointmentsViewModel();
var pageData = new Observable({
    appointmentsList: appointmentsList,
    isLoading: true,
    selectConfirmedFilter: true,
    selectPendingFilter: false,
    selectCanceledFilter: false,
    backButtonHidden: true,
    pageTitle: "APPOINTMENTS",
    user_role: ''
});

exports.onLoaded = function(args) {
    page = args.object;
    page.bindingContext = pageData;
    helpers.togglePageLoadingIndicator(true, pageData);
    appSettings.setString('activeTab', 'appointments');

    pageData.set('user_role', appSettings.getString('role'));

	appointmentsList
		.load()
		.catch(function(error) {
        	helpers.handleLoadError(error, 'Sorry, we could not load your appointments list');
    	})
		.then(function() {
        	helpers.togglePageLoadingIndicator(false, pageData);
		});
    
    helpers.platformInit(page);
    if (isInit) {
        isInit = false;
    }
}

exports.onTapStatusFilter = function(args) {
    if (!args.object.status) {
        throw Error('Error not defined');
    }

    helpers.togglePageLoadingIndicator(true, pageData);
    
    pageData.set('select' + args.object.status + 'Filter', !pageData.get('select' + args.object.status + 'Filter'));
    
    // Load new filter data
	appointmentsList
		.load(args.object.status)
		.catch(function(error) {
            pageData.set('select' + args.object.status + 'Filter', !pageData.get('select' + args.object.status + 'Filter'));
            helpers.handleLoadError(error, 'Sorry, we could not update your appointments list');
        })
		.then(function() {
			helpers.togglePageLoadingIndicator(false, pageData);
		});
}

exports.onSelectAppointment = function(args) {
    
    // var modalPageModule = views.appointmentDetails;
    // var context = {
    // 	id: args.view.bookingId,
    //     context: page
    // };
    // var fullscreen = true;
    // page.showModal(modalPageModule, context, function closeCallback(username, password) {
    // 	//Called after closing modal
    // }, fullscreen);
    
    helpers.tapFlash(args.object).then(function() {
        helpers.navigate({
            moduleName: views.appointmentDetails,
            context: {
                id: args.view.bookingId
            }
        });        
    });
}

exports.onLoadMoreItemsRequested = function (args) {
    var that = new WeakRef(this);
    timer.setTimeout(function () {
        var listView = args.object;
        
        appointmentsList
            .loadMore()
            .catch(function(error) {
                helpers.handleLoadError(error, 'Sorry, we could not load your appointments list');
            })
            .then(function() {

            });
        
        listView.notifyLoadOnDemandFinished();
    }, 1000);
    args.returnValue = true;
};