// Setup. Require these dependencies
require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./db/db");

// Setup. This creates an Express application and assigns it to the app constant. The app instance is then used to configure and handle incoming HTTP requests and provide appropriate response
const app = express();

const auth = require("./middleware/auth");

// Setup. Middlewares - body parsers
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
// Setup. Middlewares - static files
// app.use(express.static('public'));

// Setup. Connects to the mongoDB database
connectDB(process.env.MONGODB_URI);

// Setup. The app.listen method starts an HTTP server and listens for incoming connections on the specified port.
app.listen(process.env.PORT || 5001);
