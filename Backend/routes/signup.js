const express = require("express");
const router = express.Router();
const kafka = require("../kafka/client");
const jwt = require("jsonwebtoken");
const { auth } = require("../utils/passport");
const { secret } = require("../utils/config");
//auth();

router.post("/", (req, res) => {
 // console.log("inside signup backend");
  kafka.make_request("signup", req.body, (err, result) => {
    console.log("Created user Details:", result);
    if (result === 500) {
      res.writeHead(500, {
        "Content-Type": "text/plain",
      });
      res.end("Server Side Error");
    } else if (result === 299) {
      res.writeHead(299, {
        "Content-Type": "text/plain",
      });
      res.end("USER_EXISTS");
    } else {
      // const payload = { _id: result._id, source: "user" };
      // console.log("payload",payload)
      //   const token = jwt.sign(payload, secret, {
      //     expiresIn: 1008000,
      //   });
      //   result.token = "JWT " + token;
      //   //
      //   res.cookie("cookie", "admin", {
      //     maxAge: 900000,
      //     httpOnly: false,
      //     path: "/",
      //   });
      //   res.writeHead(200, {
      //     "Content-Type": "applicaton/json",
      //   });
      //   console.log("Result sending to frontend:", JSON.stringify(result));
      // res.end(JSON.stringify(result));
      res.writeHead(200, {
        "Content-Type": "text/plain",
      });
      res.end(JSON.stringify(result));
    }
  });
});

module.exports = router;
