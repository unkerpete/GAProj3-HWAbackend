require("dotenv").config();

const express = require("express");
const cors = require("cors");
const connectDB = require("./db/db");

//////////(ADD IMAGE TO MONGODB) import multer and imageModel
const multer = require("multer");
const fs = require("fs");
const imageModel = require("./models/imageModel");
//////////////////////////////////////////////////////

// import the routes from the different routers
const subs = require("./router/subs");
const User = require("./router/users");
const transport = require("./router/transport");
const homecare = require("./router/homecare");
const volunteer = require("./router/volunteer");
const contact = require("./router/contact");

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
connectDB(process.env.MONGODB_URI);

//////////(ADD IMAGE TO MONGODB) Creating DiskStore for
// TODO: THIS PORTION IS IMPORTANT!!!
const storage = multer.diskStorage({
  // declare the destination for the file in client side
  destination: (req, file, cb) => {
    cb(null, "uploads");
  },
  // file name saved as the original file name when uploaded
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage: storage });
//////////////////////////////////////////////////////
//////////(ADD IMAGE TO MONGODB) Creating App.post
// TODO: THIS PORTION IS IMPORTANT!!!
app.post("/", upload.single("testImage"), (req, res) => {
  const saveImage = new imageModel({
    name: req.body.name,
    img: {
      data: fs.readFileSync("uploads/" + req.file.filename),
      contentType: "image/jpg",
    },
  });
  saveImage
    .save()
    .then((res) => {
      console.log("image is saved");
    })
    .catch((err) => {
      console.log(err, "error has occur");
    });
  res.send("image is saved");
});
//////////////////////////////////////////////////////
//////////(ADD IMAGE TO MONGODB) Creating App.get all data
// TODO: THIS PORTION IS IMPORTANT!!!

app.get("/", async (req, res) => {
  const allData = await imageModel.find();
  res.json(allData.map((data) => ({ name: data.name, img: data.img })));
});
//////////////////////////////////

app.use("/subs", subs);
app.use("/transport", transport);
app.use("/homecare", homecare);
app.use("/volunteer", volunteer);
app.use("/contact", contact);
app.use("/admin", User);

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`server started on port ${PORT}`);
});
