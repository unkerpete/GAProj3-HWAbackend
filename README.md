# HWA Database and Server

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
