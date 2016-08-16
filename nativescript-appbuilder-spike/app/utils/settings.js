'use strict';

var _ = require('underscore');
var dialogs = require('ui/dialogs');
var config = require('./config');
var handleResponse = require('./api/helpers').handleResponse;

// List all settings
var screeningSettingsOptions = {
    flag_screening_work_information: [
        <option value="3">Yes, verify both their work email AND their profile</option>
        <option value="2">Yes, verify their work email OR their profile</option>
        <option value="1">Yes, ask for work information but don't need to verify</option>
        <option value="0">No, never ask for work information</option>
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
        <option value="0">No, verified references don't need to have a website</option>
        <option value="3">Yes, all references need an established website</option>
        <option value="1">At least 1 verified reference needs an established website</option>
        <option value="2">At least 2 verified reference need an established website</option>
    ],
    flag_screening_client_photos: [
        <option value="0">No, never ask for photos from clients</option>
        <option value="1">At least 1</option>
        <option value="2">At least 2</option>
        <option value="3">At least 3</option>
    ],
    flag_screening_last_name: [
        <option value="1">Only first letter (no Sex Offender check)</option>
        <option value="2">Only first 2 letters</option>
        <option value="0">Require full last name</option>
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
        <option value="1">Yes, ask them for their year of birth (to calculate their age)</option>
        <option value="0">No, don't ask them for their year of birth</option>
    ],
    flag_screening_residence: [
        <option value="1">Yes, ask them where they currently live</option>
        <option value="0">No, don't ask them for their current residence</option>
    ]
};

var bookingSettingsOptions = {
    flag_booking: [
        <option value="1">Turn On - Require a date/time/location for appointment</option>
        <option value="0">Turn Off - Screening-only. Don't ask for a date/time</option>
    ],
    minimum_booking_time: [
        <option value="0">None</option>
        <option value="15">15 minute sessions</option>
        <option value="30">30 minute sessions</option>
        <option value="45">45 minute sessions</option>
        <option value="60">1 hour sessions</option>
        <option value="90">1.5 hour sessions</option>
        <option value="120">2 hour sessions</option>  
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
        <option value="1">On</option>
        <option value="0">Off</option>
    ],
    flag_terms1: [
        <option value="1">Show</option>
        <option value="0">Hide</option>
    ],
    flag_terms2: [
        <option value="1">Show</option>
        <option value="0">Hide</option>
    ],
    flag_terms3: [
        <option value="1">Show</option>
        <option value="0">Hide</option>
    ],
    flag_terms4: [
        <option value="1">Show</option>
        <option value="0">Hide</option>
    ],
    flag_terms5: [
        <option value="1">Show</option>
        <option value="0">Hide</option>
    ]
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