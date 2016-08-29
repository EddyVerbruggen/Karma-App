'use strict';

var isInit = true;
var Observable = require('data/observable').Observable;
var helpers = require('../../utils/widgets/helper');
var views = require('../../utils/views');
var DashboardViewModel = require('./dashboard-view-model');

var page;
var dashboard = new DashboardViewModel();
var pageData = new Observable({
    appointmentsList:[
        {
            "date": "Appointments",
            "bookings": [
                {
                    "id": 5,
                    "time": "3:00pm",
                    "length": "1 Hour",
                    "client_name": "John Dowdy",
                    "screening_id": 7,
                    "location": "Outcall - downtown LA",
                    "status": "accepted"
                },
                {
                    "id": 6,
                    "time": "8:00pm",
                    "length": "3 Hours",
                    "client_name": "Eric Karlsson",
                    "screening_id": 7,
                    "location": "Outcall - Marriott, Room 56",
                    "status": "accepted"
                }
            ]
        }
    ],
    clientsList:[
        {
            "screening_id": 1,
            "client_name": "Peter Jones",
            "num_bookings": 1,
            "profile_image": "",
            "status_text": "Pending...",
            "status": "pending"
        },
        {
            "screening_id": 2,
            "client_name": "John Smith",
            "num_bookings": 1,
            "profile_image": "images/placeholder/temp-client-thumb.jpg",
            "status_text": "Approved",
            "status": "pending"
        },
        {
            "screening_id": 2,
            "client_name": "Martin Page",
            "num_bookings": 0,
            "profile_image": "",
            "status_text": "Pending...",
            "status": "pending"
        },
        {
            "screening_id": 2,
            "client_name": "Matthew Johnson",
            "num_bookings": 0,
            "profile_image": "",
            "status_text": "Pending...",
            "status": "pending"
        }
    ],
    dashboard: dashboard,
    backButtonHidden: true,
    pageTitle: "KARMA"
});

exports.onLoaded = function(args) {
    page = args.object;
    page.bindingContext = pageData;
	helpers.togglePageLoadingIndicator(true, pageData);
    helpers.platformInit(page);

	dashboard
		.load()
		.catch(function(error) {
        	helpers.handleLoadError(error, 'Sorry, we could not load your settings');
    	})
		.then(function() {
        	// pageData.set('Dashboard', Dashboard);
			helpers.togglePageLoadingIndicator(false, pageData);
		});
}

exports.onSelectAppointment = function(args) {
    helpers.tapFlash(args.object).then(function() {
        helpers.navigate({
            moduleName: views.appointmentDetails,
            context: {
                id: args.view.bookingId
            }
        });        
    });
}

exports.onSelectClient = function(args) {
    // alert(args.view.screeningId);
    helpers.tapFlash(args.object).then(function() {
        helpers.navigate({
            moduleName: views.clientDetails,
            context: {
                id: args.view.screeningId,
                name: args.view.clientName
            }
        });
    });
}
