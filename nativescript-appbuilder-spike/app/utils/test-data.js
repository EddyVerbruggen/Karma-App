'use strict';

// Results of getting all clients
exports.clients = {
    success: true,
    Result: [
        {
            screening_id: 1,
            client_name: 'Client 1',
            bookings: 1,
            profile_image: 'http://www.image.com',
            status_text: 'Pending...',
            status: 'pending',
            tag: 'new york',
            last_message: "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
            message_time: "09:25",
            new_message: 1
        },
        {
            screening_id: 3,
            client_name: 'Client 2',
            bookings: 0,
            profile_image: 'http://www.image.com',
            status_text: 'Approved',
            status: 'approved',
            tag: 'los angeles',
            last_message: "Lorem Ipsum is simply dummy text.",
            message_time: "09:00"
        },
        {
            screening_id: 4,
            client_name: 'Client 3',
            bookings: 2,
            profile_image: 'http://www.image.com',
            status_text: 'Whitelist',
            status: 'whitelist',
            tag: 'san francisco',
            last_message: "Lorem Ipsum is simply dummy.",
            message_time: "06/05/2016"
        },
        {
            screening_id: 6,
            client_name: 'Client 4',
            bookings: 0,
            profile_image: 'http://www.image.com',
            status_text: 'Blacklist',
            status: 'blacklist',
            tag: 'san francisco',
            last_message: "Hey there",
            message_time: "05/05/2016"
        },
        {
            screening_id: 8,
            client_name: 'Client 5',
            bookings: 0,
            profile_image: 'http://www.image.com',
            status_text: 'Rejected',
            status: 'rejected',
            tag: 'new york',
            last_message: "Hi",
            message_time: "05/05/2016"
        },
        {
            screening_id: 9,
            client_name: 'Client 6',
            bookings: 0,
            profile_image: 'http://www.image.com',
            status_text: 'No-Show History',
            status: 'noshow',
            tag: 'los angeles',
            last_message: "Hello",
            message_time: "03/05/2016"
        },
        {
            screening_id: 10,
            client_name: 'Client 7',
            bookings: 0,
            profile_image: 'http://www.image.com',
            status_text: 'Rejected',
            status: 'rejected',
            tag: 'new york',
            last_message: "Hi",
            message_time: "01/05/2016"
        }
    ]
};

// Results of getting all Messages
exports.messages = {
    success: true,
    Result: [
        {
            screening_id: 1,
            client_name: 'Client 1',
            bookings: 1,
            profile_image: 'http://www.image.com',
            last_message: "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
            message_time: "09:25",
            new_message: 1
        },
        {
            screening_id: 3,
            client_name: 'Client 2',
            bookings: 0,
            profile_image: 'http://www.image.com',
            last_message: "Lorem Ipsum is simply dummy text.",
            message_time: "09:00"
        },
        {
            screening_id: 4,
            client_name: 'Client 3',
            bookings: 2,
            profile_image: 'http://www.image.com',
            last_message: "Lorem Ipsum is simply dummy.",
            message_time: "06/05/2016"
        },
        {
            screening_id: 6,
            client_name: 'Client 4',
            bookings: 0,
            profile_image: 'http://www.image.com',
            last_message: "Hey there",
            message_time: "05/05/2016"
        },
        {
            screening_id: 8,
            client_name: 'Client 5',
            bookings: 0,
            profile_image: 'http://www.image.com',
            last_message: "Hi",
            message_time: "05/05/2016"
        },
        {
            screening_id: 9,
            client_name: 'Client 6',
            bookings: 0,
            profile_image: 'http://www.image.com',
            last_message: "Hello",
            message_time: "03/05/2016"
        },
        {
            screening_id: 10,
            client_name: 'Client 7',
            bookings: 0,
            profile_image: 'http://www.image.com',
            last_message: "Hi",
            message_time: "01/05/2016"
        }
    ]
};

// Results of getting client details
exports.clientDetails = {
    success: true,
    Result: {
        client_id: 1,
        screening_id: 2,
        client: {
        	username: 'client',
            created: '2015-01-01 10:10:10',
            created_formatted: 'May 1, 2016 - 4:37am',
            email: 'info@cuties-tools.com',
            phone: '718-875-9833',
            location_signup: 'Orlando, FL',
            ip_signup: '128.98.11.131',
            host_signup: 'cable.rogers.com'
    	},
        client_profile: {
            name: 'John Doe',
            no_shows: 5,
            residence: 'Miami, FL',
            age: 54,
            ter_username: 'ter',
            datecheck_username: 'datecheck',
            p411_username: 'p411'
        },
        screening: {
            karmascore: 89,
            num_bookings: 4,
            num_noshows: 2,
            status_text: 'Approved'
        },
        tags: [
            {
                name: 'new york'
            },
            {
                name: 'los angeles'
            }
        ],
        bookings: [
            {
                id: 1,
                date: 'Jan 5 - 9:00PM PST'
            },
            {
                id: 2,
                date: 'Jan 7 - 8:30PM PST'
            }
        ]
    }
}

// Results of search
exports.search_results = {
    success: true,
    Result: [
        {
            type: 'client',
            screening_id: 1,
            client_name: 'Client 1',
            status_text: 'Approved',
            status: 'approved',
            profile_image: 'http',
            bookings: 2,
            no_shows: 0
        },
        {
            type: 'client',
            screening_id: 2,
            client_name: 'Client 2',
            status_text: 'Pending',
            status: 'pending',
            profile_image: 'http',
            bookings: 0,
            no_shows: 1
        },
        {
            type: 'booking',
            id: 1,
            client_name: 'Client 1',
            date: 'Nov 12',
            time: '2:00pm PST',
            location: 'Incall',
            status: 'Approved'
        }
    ]
}