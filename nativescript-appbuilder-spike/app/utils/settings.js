'use strict';

var _ = require ("underscore");
var dialogs = require("ui/dialogs");

// List all settings
var screeningSettingsOptions = {
    flag_screening_work_information: [

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

    ],
    flag_screening_client_photos: [

    ],
    flag_screening_last_name: [

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

    ],
    flag_screening_residence: [
        {
            label: 'No do not screen for residence',
            value: 0
        },
        {
            label: 'Yes screen for residence',
            value: 1
        }
    ]
};

var bookingSettingsOptions = {
    flag_booking: [
        {
            label: '',
            value: 0
        },
        {
            label: '',
            value: 1
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
    flag_booking_miultiple_dates: [
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

    ],
    client_confirm_notification: [

    ],
    new_booking_notification: [

    ],
    reference_rejected_notification: [

    ],
    client_cancel_notification: [

    ]
}

var servicesSettingsOptions = {

}

var termsSettingsOptions = {
    flag_terms_page: [

    ],
    flag_terms1: [

    ],
    flag_terms2: [

    ],
    flag_terms3: [

    ],
    flag_terms4: [

    ],
    flag_terms5: [

    ]
}

exports.onToggle = function(args) {
    var setting = args.view.setting;
};

exports.onTapDialog = function(args) {
    var setting = args.view.setting;
 	dialogs.action({
		message: "Edit",
      	actions: _.map(screeningSettings[setting], function(currSetting) {
            return currSetting.label;
        })
    }).then(function (result) {
      	if (result) {
            alert(result);
        }
    });
}

exports.saveSettings = function(settings) {
    // If 1 setting pair {flag: value}, convert to a single array
    if (!settings.isArray() &&
        typeof settings === 'object' &&
        typeof settings.flag !== 'undefined') {
            settings = [settings];
        }
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
            /*viewModel.empty();
            data.Result.forEach(function(result) {
                viewModel.push(result);*/
        });
    });
};

exports.screeningSettings = screeningSettings;
