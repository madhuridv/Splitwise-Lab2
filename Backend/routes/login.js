const express = require("express");
const router = express.Router();
const Users = require("../models/userModel");
const db = require("../connection");
const jwt = require("jsonwebtoken");
const { auth } = require("../utils/passport");
const { secret } = require("../utils/config");
auth();

router.post("/", (req, res) => {
  console.log("inside post login request");
  console.log("req.body", req.body);
   Users.findOne({ email: req.body.email, password: req.body.password }, (error, user) => {
    if (error) {
        res.status(500).end("Error Occured");
    }
    if (user) {
      console.log("user",user);
        const payload = { _id: user._id, username: user.username};
        const token = jwt.sign(payload, secret, {
            expiresIn: 1008000
        });
      console.log("auth successful")
       res.status(200).end("JWT " + token);
    }
    else {
        res.status(401).end("Invalid Credentials");
  }
})
});

module.exports = router;
