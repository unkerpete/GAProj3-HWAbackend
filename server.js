require("dotenv").config();

const express = require("express");
const cors = require("cors");
const connectDB = require("../backend/db/db");
// const appointments = require("../backend/router/appointments");
// const users = require("../backend/router/users");

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
connectDB(process.env.MONGODB_URI);

app.use("/appt", appointments);
app.use("/users", users);

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`server started on port ${PORT}`);
});
