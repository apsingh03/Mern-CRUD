require("dotenv").config();

const express = require("express");
const app = express();

// db
const mysql = require("mysql2");

// Cross-origin resource sharing
const cors = require("cors");

require("./db/Connection");
const router = require("./routes/router");

const port = 8001;

// app.get("/" , (req , res) => {
//     res.send("Server Start");
// } );

// middleware
// will receive data from frontend in JSON format
app.use(express.json());
app.use(cors());
app.use(router);

app.listen(port, () => {
  console.log("Server Starts at port No: " + port);
});
