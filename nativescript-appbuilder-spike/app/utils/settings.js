'use strict';

var _ = require('underscore');
var dialogs = require('ui/dialogs');
var view = require('ui/core/view');
var config = require('./config');
var handleResponse = require('./api/helpers').handleResponse;

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
	    }
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
	    }
    ],
    flag_screening_residence: [
		{
			label: 'Yes, ask them where they currently live',
			value: 1
		},
   	    {
			label: 'No, don\'t ask them for their current residence',
			value: 0
	    }
    ]
};

var screeningSettingsCheckboxes = {
    flag_screening_skip: [
        {
            const: 'SKIP_SCREENING_USER_WHITELIST',
            value: 1
        },
        {
        	const: 'SKIP_SCREENING_ANY_WHITELIST',
        	value: 2
        },
        {
            const: 'SKIP_SCREENING_USER_APPROVED_BOOKING',
            value: 3
        },
        {
            const: 'SKIP_SCREENING_ANY_APPROVED_BOOKING',
            value: 4
        }
    ]
}

var bookingSettingsOptions = {
    flag_booking: [
		{
			label: 'Turn On - Require a date/time/location for appointment',
			value: 1
		},
   	    {
			label: 'Turn Off - Screening-only. Don\'t ask for a date/time',
			value: 0
	    }
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
	    }
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
        {
            label: 'text',
            value: 0
        }
    ],
    booking_location_fields: [

    ],
    accepted_locations: [
		{
			label: 'Incalls',
			value: 1
		},
   	    {
			label: 'Outcalls',
			value: 0
	    },
        {
			label: 'Travel',
			value: 4
	    }
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
		{
			label: 'Email',
			value: 1
		},
   	    {
			label: 'SMS/TEXT',
			value: 2
	    }
    ],
    client_confirm_notification: [
		{
			label: 'Email',
			value: 1
		}
   	],
    new_booking_notification: [
		{
			label: 'Email',
			value: 1
		},
   	    {
			label: 'SMS/TEXT',
			value: 2
	    }
    ],
    reference_rejected_notification: [
		{
			label: 'Email',
			value: 1
		}
   	],
    client_cancel_notification: [
		{
			label: 'Email',
			value: 1
		},
   	    {
			label: 'SMS/TEXT',
			value: 2
	    }
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
	    }
    ],
    flag_terms1: [
		{
			label: 'Show',
			value: 1
		},
   	    {
			label: 'Hide',
			value: 0
	    }
    ],
    flag_terms2: [
		{
			label: 'Show',
			value: 1
		},
   	    {
			label: 'Hide',
			value: 0
	    }
    ],
    flag_terms3: [
		{
			label: 'Show',
			value: 1
		},
   	    {
			label: 'Hide',
			value: 0
	    }
    ],
    flag_terms4: [
		{
			label: 'Show',
			value: 1
		},
   	    {
			label: 'Hide',
			value: 0
	    }
    ],
    flag_terms5: [
		{
			label: 'Show',
			value: 1
		},
   	    {
			label: 'Hide',
			value: 0
	    }
    ]
};

function saveSettings(settings) {
    // If 1 setting pair {flag: value}, convert to a single array
	if (settings instanceof Array === false &&
        typeof settings === 'object' &&
        typeof settings.flag !== 'undefined') {
            settings = [settings];
    }

    var fetchData = fetch(config.apiUrl + 'settings/update.json', {
        method: 'POST',
        headers: {
            Authorization: 'Bearer ' + config.token,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(settings)
    });

    // Figure out why fetchData isn't working
    return fetchData
        .then(handleResponse)
        .then(function(data) {
        	// Save in pageData.settings
        	return true;
    });
};

exports.saveSettings = saveSettings;

exports.onToggle = function(args, page, pageData) {
    var setting = args.view.setting;
    var checkboxConst = args.view.checkboxConst;
    
    // Get value of all boxes (eg. [1, 3, 4])
    var selectedCheckboxes = pageData.get('settings').get(setting);    
    
    // Get array of all options for this checkbox (eg. [{const: 'XXX', value: 1}])
    var checkboxOptions = eval(page + 'SettingsCheckboxes[setting]');
    
    var newCheckboxData = [];
    var newIsChecked = false;
    
    // Check the already checked boxes, and uncheck the selected one if it is checked
    _.each(checkboxOptions, function(option) {
        if ((option.const === checkboxConst && selectedCheckboxes.indexOf(option.value) === -1) ||
            (option.const !== checkboxConst && selectedCheckboxes.indexOf(option.value) !== -1)) {
			newCheckboxData.push(option.value);
        }
        if (option.const === checkboxConst) {
            newIsChecked = selectedCheckboxes.indexOf(option.value) === -1;
        }
    });

	var saveData = {};
	saveData[setting] = newCheckboxData;
	saveSettings(saveData);
    
    pageData.get('settings').set(setting, newCheckboxData);
	setCheckbox(view.getViewById(args.object.parent, checkboxConst), newIsChecked);
};

// Generic function to handle tapping on dialog-based settings for current page
exports.onTapDialog = function(args, page, pageData) {
    var setting = args.view.setting;
    var settingsOptions = eval(page + 'SettingsOptions');
    var selectedSettingsOption = settingsOptions[setting];
 	dialogs.action({
		message: "Edit",
      	actions: _.map(selectedSettingsOption, function(currSetting) {
            return currSetting.label;
        })
    }).then(function (selectedLabel) {
      	if (selectedLabel) {
            var selectedOption = _.findWhere(selectedSettingsOption, {label: selectedLabel});
            var saveData = {};
            saveData[setting] = selectedOption.value;
            saveSettings(saveData);
            pageData.set(setting + '_label', selectedLabel);
        }
    });
};

// Update all labels for selected options on current page
exports.updateSettingsLabels = function(page, pageData) {
    var selectedSettings = pageData.get('settings');
    var settingsOptions = eval(page + 'SettingsOptions');
    _.each(settingsOptions, function(options, setting) {
        var selectedOption = _.findWhere(options, {value: selectedSettings[setting]});
        if (selectedOption) {
        	pageData.set(setting + '_label', selectedOption.label);
        }
    });
};

// Update all checkboxes for selected options on current page
exports.updateSettingsCheckboxes = function(parent, page, pageData) {
    var selectedSettings = pageData.get('settings');
    var settingsCheckboxes = eval(page + 'SettingsCheckboxes');
    
    // Iterate all checkbox flags for this page and check which ones are checked in pageData
    _.each(settingsCheckboxes, function(options, setting) {
        if (selectedSettings[setting]) {
            _.each(options, function(option) {
                setCheckbox(view.getViewById(parent, option.const),
                            selectedSettings[setting].indexOf(option.value) !== -1);
            });
        }
    });
}

// Helper function that sets checkbox view to a checked/unchecked box
var setCheckbox = function(checkboxImg, isChecked) {
    if (checkboxImg) {
        if (isChecked) {
            checkboxImg.src = "~/images/ic_check_box_white.png";
        } else {
            checkboxImg.src = "~/images/ic_check_box_outline_blank_white.png";
        }
    }
}