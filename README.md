# HWA Backend

## Project Overview
This is the backend server for a charity website. It is built with Node.js, Express, and MongoDB. Elements on the website frontend that requires communication with the backend are forms, events(blogs) & images fetching, adminstration access with full CRUD functions for managing events.

## Requirements
Node.js
</br>
MongodDB database

## Dependencies
npm i dotenv express cors mongoose

## Connection
For connection to our database, you will need to include these variables in your .env file. Full URI has been redacted.
</br>
<img width="451" alt="image" src="https://user-images.githubusercontent.com/118168304/219410560-0b9e9c1d-08a5-497a-b3bf-a7849d77bd0e.png">

## Endpoints

The following endpoints are available:

/subs/create - creates a subscription email entry in database
</br>
/subs/showall - retrieves all subscription emails from database

/transport/create - creates a transport enquiry form entry in database
</br>
/transport/showall - retrieves all transport enquiries from database

/homecare/create - creates a homecare enquiry form entry in database
</br>
/homecare/showall - retrieves all homecare enquiries from database

/volunteer/create - creates a volunteer enquiry form entry in database
</br>
/volunteer/showall - retrieves all volunteer enquiries from database
 
/contact/create - creates a contact enquiry form entry in database
</br>
/contact/showall - retrieves all contact enquiries from database

/user/create - creates an admin user 
</br>
/user/showall - retrieves all admin users details from database


