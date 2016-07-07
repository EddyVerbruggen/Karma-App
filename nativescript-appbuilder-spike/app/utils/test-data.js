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
            tag: 'new york'
        },
        {
            screening_id: 3,
            client_name: 'Client 2',
            bookings: 0,
            profile_image: 'http://www.image.com',
            status_text: 'Approved',
            status: 'approved',
            tag: 'los angeles'
        },
        {
            screening_id: 4,
            client_name: 'Client 3',
            bookings: 2,
            profile_image: 'http://www.image.com',
            status_text: 'Whitelist',
            status: 'whitelist',
            tag: 'san francisco'
        },
        {
            screening_id: 6,
            client_name: 'Client 4',
            bookings: 0,
            profile_image: 'http://www.image.com',
            status_text: 'Blacklist',
            status: 'blacklist',
            tag: 'san francisco'
        },
        {
            screening_id: 8,
            client_name: 'Client 5',
            bookings: 0,
            profile_image: 'http://www.image.com',
            status_text: 'Rejected',
            status: 'rejected',
            tag: 'new york'
        },
        {
            screening_id: 9,
            client_name: 'Client 6',
            bookings: 0,
            profile_image: 'http://www.image.com',
            status_text: 'No-Show History',
            status: 'noshow',
            tag: 'los angeles'
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

// Results of getting appointment details
exports.appointmentDetails = {
    success: true,
    Result: {
        id: 1,
        date: 'Sunday, June 26, 2016',
        time: '3:30PM (PST)',
        length: '2 hrs',
        location: 'Outcall - Hilton Honors, Room 956',
        status_text: 'Pending - Waiting for you to Accept or Cancel',
        canAccept: true,
        canCancel: true,
        canDelete: true,
        canEdit: true,
        client_id: 1,
        name: 'John Doe',
        email: 'info@cuties-tools.com',
        phone: '718-875-9833',
        client_status_text: 'Approved',
        history: [
            {
                type: 'system',
                title: 'Appointment request from Clayton.',
                created: 'Monday, June 21 - 5:56 PM (PST)'
            },
            {
                type: 'system',
                title: 'You accepted Clayton\'s appointment',
                created: 'Monday, June 21 - 5:56 PM (PST)'
            },
            {
                type: 'message_client',
                message: 'i screwed up babe can we change our date to the wednesday instead?? that would be very helpful!!',
                created: 'Monday, June 21 - 5:56 PM (PST)'
            },
            {
                type: 'message_user',
                message: 'no problem i will make that change. xoxo',
                created: 'Monday, June 21 - 5:56 PM (PST)'
            },
            {
                type: 'edit',
                title: 'You made a change:',
                change: 'Wednesday, June 23, 2016',
                created: 'Monday, June 21 - 5:56 PM (PST)'
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