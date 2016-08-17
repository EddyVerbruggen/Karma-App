'use strict';

var _ = require('underscore');
var dialogs = require('ui/dialogs');
var config = require('./config');
var handleResponse = require('./api/helpers').handleResponse;

// List all settings
var screeningSettingsOptions = {
    flag_screening_work_information: [
        {
            label: 'Yes, verify both their work email AND their profile',
            value: 3
        },
        {
            label: 'Yes, verify their work email OR their profile',
            value: 2
        },
        {
            label: 'Yes, ask for work information but don\'t need to verify',
            value: 1
        },
        {
            label: 'No, never ask for work information',
            value: 0
        }
    ],
    flag_screening_references: [
        {
            label: 'No, never ask for references',
            value: 0
        },
        {
            label: 'At least 1 reference',
            value: 1
        },
        {
            label: 'At least 2 references',
            value: 2
        },
        {
            label: 'At least 3 references',
            value: 3
        }
    ],
    flag_screening_reference_website: [
		{        
			label: 'No, verified references don\'t need to have a website',
			value: 0
		},
   	    {        
			label: 'Yes, all references need an established website',
			value: 3
	    },
        {        
			label: 'At least 1 verified reference needs an established website',
			value: 1
	    },
        {        
			label: 'At least 2 verified reference need an established website',
	  		value: 2
    	}
    ],
	flag_screening_client_photos: [
		{        
			label: 'No, never ask for photos from clients',
			value: 0
		},
   	    {        
			label: 'At least 1',
			value: 1
	    },
        {        
			label: 'At least 2',
			value: 2
	    },
        {        
			label: 'At least 3',
	  		value: 3
    	}
    ],
    flag_screening_last_name: [
		{        
			label: 'Only first letter (no Sex Offender check)',
			value: 1
		},
   	    {        
			label: 'Only first 2 letters',
			value: 2
	    },
        {        
			label: 'Require full last name',
			value: 0
	    },
    ],
  
    flag_screening_skip: [

    ],
    flag_required_custom_label_1: [

    ],
    flag_required_custom_label_2: [

    ],
    flag_required_custom_label_3: [

    ],
    flag_required_custom_label_4: [

    ],
    flag_required_custom_label_5: [

    ],
    custom_label_1: [

    ],
    custom_label_2: [

    ],
    custom_label_3: [

    ],
    custom_label_4: [

    ],
    custom_label_5: [

    ],
    flag_screening_birth_date: [
		{        
			label: 'Yes, ask them for their year of birth (to calculate their age)',
			value: 1
		},
   	    {        
			label: 'No, don\'t ask them for their year of birth',
			value: 0
	    },
    ],
    flag_screening_residence: [
		{        
			label: 'Yes, ask them where they currently live',
			value: 1
		},
   	    {        
			label: 'No, don\'t ask them for their current residence',
			value: 0
	    },
    ],
};

var bookingSettingsOptions = {
    flag_booking: [
		{        
			label: 'Turn On - Require a date/time/location for appointment',
			value: 1
		},
   	    {        
			label: 'Turn Off - Screening-only. Don\'t ask for a date/time',
			value: 0
	    },
    ],
    minimum_booking_time: [
		{        
			label: 'None',
			value: 0
		},
   	    {        
			label: '15 minute sessions',
			value: 15
	    },
        {        
			label: '30 minute sessions',
			value: 30
	    },
        {        
			label: '45 minute sessions',
			value: 45
	    },
        {        
			label: '1 hour sessions',
			value: 60
	    },
        {        
			label: '1.5 hour sessions',
			value: 90
	    },
        {        
			label: '2 hour sessions',
			value: 120
	    },
    ],
    
    flag_calendar: [
        {
            label: '',
            value: 0
        },
        {
            label: '',
            value: 1
        }
    ],
    flag_booking_multiple_dates: [
        {
            label: '',
            value: 0
        },
        {
            label: '',
            value: 1
        }
    ],
    flag_booking_final_reminder_time: [
        {
            label: '',
            value: 0
        },
        {
            label: '',
            value: 1
        }
    ],
    flag_reminder_email: [
        'text'
    ],
    booking_location_fields: [

    ],
    accepted_locations: [
1, Incalls
2, Outcalls
4, Travel
    ],
    default_appointment_notes: [

    ]
};

var landingSettingsOptions = {
    name: [

    ]
};

var notificationSettingsOptions = {
    final_confirmation_notification: [
1, Email
2, SMS/TEXT
    ],
    client_confirm_notification: [
1 Email
    ],
    new_booking_notification: [
1 Email
2 SMS/Text
    ],
    reference_rejected_notification: [
1 Email
    ],
    client_cancel_notification: [
1 Email
2 SMS/Text
    ]
};

var servicesSettingsOptions = {

};

var termsSettingsOptions = {
    flag_terms_page: [
		{        
			label: 'On',
			value: 1
		},
   	    {        
			label: 'Off',
			value: 0
	    },
    ],
    flag_terms1: [
		{        
			label: 'Show',
			value: 1
		},
   	    {        
			label: 'Hide',
			value: 0
	    },
    ],
    flag_terms2: [
		{        
			label: 'Show',
			value: 1
		},
   	    {        
			label: 'Hide',
			value: 0
	    },
    ],
    flag_terms3: [
		{        
			label: 'Show',
			value: 1
		},
   	    {        
			label: 'Hide',
			value: 0
	    },
    ],
    flag_terms4: [
		{        
			label: 'Show',
			value: 1
		},
   	    {        
			label: 'Hide',
			value: 0
	    },
    ],
    flag_terms5: [
		{        
			label: 'Show',
			value: 1
		},
   	    {        
			label: 'Hide',
			value: 0
	    },
    ],  
};

exports.onToggle = function(args) {
    var setting = args.view.setting;
};

exports.onTapDialog = function(args) {
    var setting = args.view.setting;
 	dialogs.action({
		message: "Edit",
      	actions: _.map(screeningSettingsOptions[setting], function(currSetting) {
            return currSetting.label;
        })
    }).then(function (result) {
        // Set in view model
      	if (result) {
            alert(result);
        }
    });
};

exports.saveSettings = function(settings) {
    // If 1 setting pair {flag: value}, convert to a single array
	if (!settings.isArray() &&
        typeof settings === 'object' &&
        typeof settings.flag !== 'undefined') {
            settings = [settings];
    }

    var fetchData = fetch(config.apiUrl + 'settings/updates.json', {
        method: 'POST',
        headers: {
            Authorization: 'Bearer ' + config.token,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(settings)
    });

    return fetchData
        .then(handleResponse)
        .then(function(data) {
            // Update settings model with latest setting

    });
};