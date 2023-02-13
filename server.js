<<<<<<< HEAD
require("dotenv").config();

const express = require("express");
const cors = require("cors");
const connectDB = require("./db/db");

// import the routes from the different routers
const subs = require("./router/subs");

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
connectDB(process.env.MONGODB_URI);

app.use("/subs", subs);

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`server started on port ${PORT}`);
});
=======
import { useState } from "react";
import "./App.css";

function App() {
  return <div className="App">Hello Team</div>;
}

export default App;
>>>>>>> main
