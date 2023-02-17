# HWA Database and Server

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

`/subs/create` - creates a subscription email entry in database
</br>
`/subs/showall` - retrieves all subscription emails from database

`/transport/create` - creates a transport enquiry form entry in database
</br>
`/transport/showall` - retrieves all transport enquiries from database

`/homecare/create` - creates a homecare enquiry form entry in database
</br>
`/homecare/showall` - retrieves all homecare enquiries from database

`/volunteer/create` - creates a volunteer enquiry form entry in database
</br>
`/volunteer/showall` - retrieves all volunteer enquiries from database
 
`/contact/create` - creates a contact enquiry form entry in database
</br>
`/contact/showall` - retrieves all contact enquiries from database

`/user/create` - creates an admin user 
</br>
`/user/showall` - retrieves all admin users details from database

`/events/create` - creates an events
</br>
`/events/danger_this_deletes_everything` - deletes all events and re-seeds with sample data
</br>
`/events/showall` - retrieves all events
</br>
`/events/showbyrange` - retrieves all events in a specified date range
</br>
`/events/showbytagrange` - retrieves events of a specified tag(category) in a specified date range 
</br>
`/events/update` - updates an event
</br>
`/events/delete` - deletes an event
</br>
`/events/currentevents` - retrieves specified events by tag(category) that are occuring in the next number of specified days 
</br>
`/events/upcomingevents` - retrieves specified events by tag(category) that are occuring after the next number of specified days
</br>
`/events/pastevents` - retrieves specified events by tag(category) that have already occured

## Usage examples for some endpoints

`/transport/create` - body required to submit a form
</br>
<img width="363" alt="image" src="https://user-images.githubusercontent.com/118168304/219418889-13c1b843-389d-4a42-b00a-fd5a661af033.png">

`/transport/showall` - response example when fetching this api
</br>
<img width="373" alt="image" src="https://user-images.githubusercontent.com/118168304/219419039-f6ce8e83-6263-4665-817e-12a696c11cd7.png">

`/events/create`
</br>
This is the body required to create an event.
</br>
<img width="272" alt="image" src="https://user-images.githubusercontent.com/118168304/219424146-2fe0d2e7-1a75-46dc-b00a-4cbf5c2d61d9.png">

`/events/showbytagrange`
</br>
This is the body required when calling this API. The frontend can decide the range by modifying start and end date.
</br>
<img width="179" alt="image" src="https://user-images.githubusercontent.com/118168304/219421817-fd13fe6a-f495-4ae4-a926-16bd0ab1ec8e.png">
</br>
response
</br>
<img width="309" alt="image" src="https://user-images.githubusercontent.com/118168304/219421920-1b9e360f-b610-4272-9879-a5663ebbfb3e.png">

`/events/currentevents`
</br>
This is the body required when calling this API. The frontend can decide what current is by modifying withinTheseDays variable, and also filter events by using the Tag array.
</br>
<img width="448" alt="image" src="https://user-images.githubusercontent.com/118168304/219419337-dff9cc79-e202-4888-a0ee-0e7eaa5c9a90.png">
</br>
response 
</br>
<img width="308" alt="image" src="https://user-images.githubusercontent.com/118168304/219419987-93b1f50d-b557-4d5d-ba5e-958794e74b43.png">

## Image File Handling on Server Side

> This portion is a continuation of the frontend.\
> For more information on how we handle image files in the client side, click [here](https://github.com/unkerpete/GAProj3-HWAfrontend).

To handle image files upload from the client side, we used the `multer` middleware to simplify uploading and saving of images in the body parsing. Here, we will explain on how the incoming request is being handled.

1.  We begin by structuring our Mongo schema model validation to allow for image file to be stored in the database.

```javascript
const EventsSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    dateStart: { type: Date, required: true },
    dateEnd: { type: Date },
    timeString: { type: String },
    description: { type: String, required: true },
    img: {
      data: Buffer,
      contentType: String,
    },
    action: { type: String },
    tag: { type: String },
  },
  { collection: "events2" }
);
```

2. In this project, we separated the router into routers and controllers. In the router, we import `multer` to process the incoming files.

3. We then called for the storage engine `diskStorage` which will store the incoming files on the local disk. Here, the destination to server is defined to be in the `uploads` directory. `cb` is the callback, and null is passed as the error. Also, the filename is specified, and we reused the original filename by specifying `file.originalname`. We the initialize the storage engine by passing it to the storage property.

```javascript
////////////////////////////
// Handling Image Events
const multer = require("multer");

const storage = multer.diskStorage({
  // declare the destination for the file in server side
  destination: (req, file, cb) => {
    cb(null, "uploads");
  },
  // file name saved as the original file name when uploaded
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});
const upload = multer({ storage: storage });
```

4. For the routers that require uploading of files, we included the `multer` middleware to the routers. Here `.single()` method is for processing a single file that we expect to be uploaded. Within the method parameters, the image is passed, and the key was previously set as `eventImg`.

```javascript
// CREATE a single event
router.put("/create", auth, upload.single("eventImg"), createEvent);

// UPDATE event by ID
router.patch("/update", auth, upload.single("eventImg"), updateEvent);
```

5. In our controller, we import `fs` module for handling of file systems.

```javascript
const fs = require("fs");
```

6. Once the request is received, we create a new Event object by matching the key/value pairs. However, for the `img` key that is meant to store the image, additional methods need to be used. Here, we use the file system readFileSync() method, which takes in relative path of the file. We then called for the event entry to be saved, and it will be converted into binary and then saved.

```javascript
const newEvent = new Events({
  title: req.body.title,
  dateStart: req.body.dateStart,
  dateEnd: req.body.dateEnd,
  timeString: req.body.timeString,
  description: req.body.description,
  img: {
    data: fs.readFileSync("uploads/" + req.file.filename),
    contentType: "image/jpg",
  },
  action: req.body.action,
  tag: req.body.tag,
});
```

