// console.log("its workingsad ")

const mysql = require("mysql2");

const conn = mysql.createConnection({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  // password: "Ankupran@1",
  password: "",
  database: process.env.DB_DATABASE,
  port: process.env.DB_PORT,
});

conn.connect((err) => {
  if (err) {
    throw err;
  } else {
    console.log("Database connected");
  }
});

module.exports = conn;
