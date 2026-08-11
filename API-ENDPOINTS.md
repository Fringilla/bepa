|RESOURCE|HTTP METHOD|ROUTE|DESCRIPTION|
|-|-|-|-|
|Login|POST|/login|Returns a token upon a successful user login|
|User|GET|/users|Returns all users and their information|
|User|POST|/users|Create a new user|
|User|GET PUT DELETE|/users/:id|Returns a single user, updates it, or deletes it. id is the user's id|
|User|GET|/users?username=jdoe|Returns a user with a specific username (e.g. jdoe)|
|User|GET|/users?email=johndoe@example.com|Returns a user with a specific e-mailadres (e.g. johndoe@example.com)|
|Booking|GET|/bookings|Returns all bookings|
|Booking|POST|/bookings|Create a new booking|
|Booking|GET PUT DELETE |/bookings/:id|Returns a single booking, updates it, or deletes it. id is the booking's id|
|Booking|GET|/bookings?userId=a1234567-89ab-cdef-0123-456789abcdef|Returns information about booking made by user a1234567-89ab-cdef-0123-456789abcdef|
|Property|GET|/properties|Returns all properties|
|Property|POST|/properties|Create a new property|
|Property|GET PUT DELETE|/properties/:id|Returns a single property, updates it, or deletes it. id is the property's id|
|Property|GET|/properties?location=Malibu, California|Shows properties in Malibu, California|
|Property|GET|/properties?pricePerNight=310.25|Shows properties with a pricePerNight of 310.25|
|Property|GET|/properties?location=Malibu, California&pricePerNight=310.25|Shows properties in Malibu, California with a pricePerNight of 310.25|
|Review|GET|/reviews|Returns all reviews|
|Review|POST|/reviews|Create a new review|
|Review|GET PUT DELETE|/reviews/:id|Returns a single review, updates it, or deletes it. id is the review’s id|
|Host|GET|/hosts|Returns all hosts|
|Host|POST|/hosts|Create a new host|
|Host|GET PUT DELETE|/hosts/:id|Returns a single host, updates it, or deletes it. id is the host’s id|
|Host|GET|/hosts?name=John+Doe|Returns a host with a specific name (e.g. John Doe)|