// import imageModel schema
const multer = require("multer");
const ImageModel = require("../models/imageModel");

//////////(ADD IMAGE TO MONGODB) Creating DiskStore for image
const Storage = multer.diskStorage({
  destination: "uploads",
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});
const upload = multer({
  storage: Storage,
}).single("testImage");

// Function to upload new image. PUT method.
const uploadImage = (req, res) => {
  upload(req, res, (err) => {
    if (err) {
      console.log(err);
    } else {
      const newImage = new ImageModel({
        name: req.body.name,
        image: {
          data: req.file.filename,
          contentType: "image/jpg",
        },
      });
      newImage
        .save()
        .then(() => res.send("successfully uploaded"))
        .catch((err) => console.log(err));
    }
  });
};

// app.get("/image/files", (req, res) => {
//   res.send("upload file");
// });

// To export the functions to router
module.exports = { uploadImage };
