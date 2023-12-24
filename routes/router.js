const express = require("express");

const router = new express.Router();

const conn = require("../db/Connection");

// register user data

router.get("/", (req, res) => {
  res.send("Welcome to Mern CRUD APP");
});

router.post("/create", (req, res) => {
  // console.log(req.body);
  // res.send("POST request")
  const { name, email, age, address } = req.body;

  // validate if any field are blank
  if (!name || !email || !age || !address) {
    res.status(422).json({ msg: "plz fill the all data" });
  }

  try {
    conn.query("SELECT * FROM users WHERE email = ?", email, (err, result) => {
      if (result.length) {
        res.status(422).json("This Data is Already Exist");
      } else {
        conn.query(
          "INSERT INTO users SET ?",
          { name, email, age, address },
          (err, result) => {
            if (err) {
              console.log("Error ", err);
            } else {
              // 201 - created
              res.status(201).json({
                msg: "Data inserted successfully",
                result: result,
                data: req.body,
              });
            }
          }
        );
      }
    });
  } catch (error) {
    res.status(422).json({ Error: error });
  }
});

router.get("/getuser", (req, res) => {
  conn.query("SELECT * FROM users", (err, result) => {
    if (err) {
      res.status(422).json("No data available");
    } else {
      res.status(200).json({ data: result });
    }
  });
});

router.delete("/deleteuser/:id", (req, res) => {
  const { id } = req.params;

  conn.query("DELETE FROM users WHERE id = ? ", id, (err, result) => {
    if (err) {
      res.status(422).json("error");
    } else {
      res.status(200).json({ data: result });
    }
  });
});

router.get("/individualuser/:id", (req, res) => {
  const { id } = req.params;

  conn.query("SELECT * FROM users WHERE id = ? ", id, (err, result) => {
    if (err) {
      res.status(422).json("error");
    } else {
      res.status(200).json({ data: result });
    }
  });
});

module.exports = router;
