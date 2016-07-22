'use strict';

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