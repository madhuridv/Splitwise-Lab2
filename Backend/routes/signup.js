const express = require("express");
const router = express.Router();
const Users = require("../models/userModel");
const db = require("../connection");

router.post("/", async (req, res) => {
  console.log("inside signup");
  console.log("req.body", req.body);
  let userModel = new Users({
    username: req.body.username,
    email: req.body.email,
    password: req.body.password,
  });
  Users.findOne({ email: req.body.email }, (error, user) => {
    if (error) {
      res.writeHead(500, {
        "Content-Type": "text/plain",
      });
      res.end("Error Occured");
    }
    if (user) {
      res.writeHead(400, {
        "Content-Type": "text/plain",
      });
      res.end("USER_EXISTS");
    } else {
      userModel.save((error, data) => {
        if (error) {
          res.writeHead(500, {
            "Content-Type": "text/plain",
          });
          res.end();
        } else {
          res.writeHead(200, {
            "Content-Type": "text/plain",
          });
          console.log("User model",userModel);
          res.end(JSON.stringify(userModel));
        }
      });
    }
  });
 
});

module.exports = router;
