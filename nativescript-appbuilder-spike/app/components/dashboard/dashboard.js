'use strict';

var isInit = true;
var Observable = require('data/observable').Observable;
var helpers = require('../../utils/widgets/helper');
var views = require('../../utils/views');

var pageData = new Observable({
    appointmentsList:[
        {
            "date": "Appointments Today",
            "bookings": [
                {
                    "id": 5,
                    "time": "3:00pm",
                    "length": "30 minutes",
                    "client_name": "John Dowdy",
                    "screening_id": 7,
                    "location": "Outcall - downtown LA",
                    "status": "accepted"
                }
            ]
        }
    ],
    clientsList:[
        {
            "screening_id": 1,
            "client_name": "Client 1",
            "num_bookings": 1,
            "profile_image": "",
            "status_text": "Pending...",
            "status": "pending"
        }
    ],
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
