'use strict';

// Results of getting all clients
exports.clients = {
    success: true,
    Result: [
        {
            client_id: 1,
            screening_id: 1,
            client_name: 'Client 1',
            profile_image: 'http://www.image.com',
            status_text: 'Pending...'
        },
        {
            client_id: 2,
            screening_id: 3,
            client_name: 'Client 2',
            profile_image: 'http://www.image.com',
            status_text: 'Approved'
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

// Results of getting all appointments
exports.appointments = {
    success: true,
    Result: {
        booking_dates: [
            {
                date: 'Tuesday, Febuary 12',
                bookings: [
                	{
                		id: 1,
                		time: '2:00pm',
                		length: '1 hour',
                		client_name: 'Peter Johnson',
                		screening_id: 10,
                		location: 'Incall',
                		status: 'confirmed'
            		},
                	{
                		id: 2,
    					time: '8:00pm',
                		length: '2 hours',
                		client_name: 'Mitchell Jones',
                		screening_id: 5,
                		location: 'Incall',
                		status: 'pending'
            		}
                ]
            },
            {
                date: 'Friday, Febuary 16',
                bookings: [
                	{
                		id: 5,
    					time: '3:00pm',
                		length: '30 minutes',
                		client_name: 'John Dowdy',
                		screening_id: 7,
                		location: 'Outcall - downtown LA',
                		status: 'accepted'
            		}
                ]
            }
        ],
        types: {
            confirmed: 12,
            pending: 10,
            cancelled: 1,
            completed: 25
        }
    }

}