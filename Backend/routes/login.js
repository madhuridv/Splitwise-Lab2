const express = require("express");
const router = express.Router();
const kafka = require("../kafka/client");
//const Users = require("../models/userModel");
//const db = require("../connection");
const jwt = require("jsonwebtoken");
const { auth } = require("../utils/passport");
const { secret } = require("../utils/config");
auth();

router.post("/", (req, res) => {
  console.log("inside login backend");
  kafka.make_request("user_login", req.body, (err, result) => {
    console.log("result is:", result);
    if (err) {
      console.log(err);
    } else {
      if (result === 500) {
        res.writeHead(500, {
          "Content-Type": "text/plain",
        });
        res.end("Server Side Error");
      } else if (result === 207) {
        res.writeHead(207, {
          "Content-Type": "text/plain",
        });
        res.end("NO_USER");
      } else if (result === 209) {
        res.writeHead(209, {
          "Content-Type": "text/plain",
        });
        res.end("INCORRECT_PASSWORD");
      } else {
        const payload = { _id: result._id, source: "customer" };
        const token = jwt.sign(payload, secret, {
          expiresIn: 1008000,
        });
        result.token = "JWT " + token;
        //
        res.cookie("cookie", "admin", {
          maxAge: 900000,
          httpOnly: false,
          path: "/",
        });
        res.writeHead(200, {
          "Content-Type": "applicaton/json",
        });
        console.log("Result sending to frontend:", JSON.stringify(result));
        res.end(JSON.stringify(result));
      }
    }
  });
});
module.exports = router;
