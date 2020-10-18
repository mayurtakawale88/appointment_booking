# Appointment Booking

## Problem Statment
    This system is developed to book a doctor's appointment online. By using this system people can able to see all available free slots and as per their convenience they can book an appointment. This will help them to reduce their waiting time.

## Technologies used
* node v14.6.0
* npm v6.15.6

## Index
* [Installation](#markdown-header-installation)
* [API Documentation](#markdown-header-api-documentation)
* [Error Code](#markdown-hearder-error-code)

## Installation
Install node and npm

### mac
> brew install node
> brew install npm

### ubuntu
> sudo apt-get install nodejs
> sudo api-get install npm

Clone repository to your machine
> git clone https://github.com/mayurtakawale88/appointment_booking.git

Using termianl go inside the directory and run command to install all dependancies
> npm install

Start project
> nodemon

## API Documentation
* # Create Event API
Description :- API is developed to book an appointment. This is POST API and it require date time in [UTC] format

API:-
        Endpoint :- http://localhost:8607/api/create-event
        Method :- POST
        Header :- Content-Type: application/json

Request Body :-
```
{
    "date_time": "2020-10-18T04:30:00Z", // Appointment date time in UTC format 
    "duration": 60 // How long you want that appointment in munites
}
```

Response Body :-
```
{
    "success": true,
    "message": "Event Created",
    "data": {
        "event": {
            "date": "2020-10-18",  // Appointment Date
            "startTime": "2020-10-18T04:30:00Z", // Appointement Start Time in UTC
            "endTime": "2020-10-18T05:30:00Z", // Appointement End Time in UTC
            "duration": 60 // Appointment Duration in munites
        }
    }
}
```

Curl Request :-
```
curl --location --request POST 'http://localhost:8607/api/create-event' \
--header 'Content-Type: application/json' \
--data-raw '{
    "date_time": "2020-10-18T04:30:00Z",
    "duration": 60
}'
```

* # Fetch Free Slots API
Description :- Get all avaialble solts for the day as per supplied timezone. Make sure supplied date shuld be grater than and equal to current date.

API:-
        Endpoint :- http://localhost:8607/api/free-slots?date=2020-10-18&timezone=IST
        Method :- GET

Response :- 
```
{
    "success": true,
    "message": "Slots Fetched",
    "data": {
        "slots": {
            "AM": [
                "11:00 AM",
                "11:30 AM"
            ],
            "PM": [
                "12:00 PM",
                "12:30 PM",
                "01:30 PM",
                "02:00 PM",
                "02:30 PM",
                "03:00 PM",
                "03:30 PM",
                "04:00 PM",
                "04:30 PM"
            ]
        }
    }
}
```

Curl :- 
```
curl --location --request GET 'http://localhost:8607/api/free-slots?date=2020-10-18&timezone=IST'
``` 

Supported Timezone:-
| TimeZone Key  |    Timezone       |
| ------------- | ----------------- |
|      IST      | Asia/Kolkata      |
|      EDT      | America/New_York  |
|      JST      | Asia/Tokyo        |
|      AEDT     | Australia/Sydney  |


* # Booked Event API
Description :- API to retrive all booked event between given date range

API:-
        Endpoint :- http://localhost:8607/api/booked-events?dateFrom=2020-10-17&dateTo=2020-10-20
        Method :- GET

Respone :-
```
{
    "success": true,
    "message": "Booked Events",
    "data": {
        "bookedEvent": {
            "2020-10-17": {
                "AM": [
                    "05:30 AM",
                    "06:00 AM",
                    "07:30 AM",
                    "08:00 AM",
                    "08:30 AM"
                ],
                "PM": []
            },
            "2020-10-18": {
                "AM": [
                    "04:30 AM",
                    "05:00 AM",
                    "07:30 AM"
                ],
                "PM": []
            },
            "2020-10-19": {
                "AM": [],
                "PM": []
            },
            "2020-10-20": {
                "AM": [],
                "PM": []
            }
        }
    }
}
```

Curl :-
```
curl --location --request GET 'http://localhost:8607/api/booked-events?dateFrom=2020-10-17&dateTo=2020-10-20'
```

## Error Code
| Error Code    |    Description            |
| ------------- | ------------------------- |
|      200      | OK                        |
|      400      | Invalid Param             |
|      422      | Slot not Available        |

