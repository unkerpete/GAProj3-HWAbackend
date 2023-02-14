require("dotenv").config();

const express = require("express");
const cors = require("cors");
const connectDB = require("./db/db");

// import the routes from the different routers
const subs = require("./router/subs");
const User = require("./router/users");
const transport = require("./router/transport");
const homecare = require("./router/homecare");
const volunteer = require("./router/volunteer");
const contact = require("./router/contact");
const image = require("./router/image");
const events = require("./router/events");

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
connectDB(process.env.MONGODB_URI);

app.use("/subs", subs);
app.use("/transport", transport);
app.use("/homecare", homecare);
app.use("/volunteer", volunteer);
app.use("/contact", contact);
app.use("/image", image);
app.use("/events", events);
app.use("/admin", User);

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`server started on port ${PORT}`);
});
