const express = require("express");
const router = express.Router();
const kafka = require("../kafka/client");
const { checkAuth } = require("../utils/passport");

router.get("/:user_id", checkAuth, (req, res) => {
  //console.log("inside getuser backend");
  console.log("req.params", req.params);
  kafka.make_request("getuser", req.params, (err, result) => {
    console.log("Get user Details:", result);
    if (result === 500) {
      res.writeHead(500, {
        "Content-Type": "text/plain",
      });
      res.end("Server Side Error");
    } else if (result === 207) {
      res.writeHead(299, {
        "Content-Type": "text/plain",
      });
      res.end("No_USER_DETAILS");
    } else {
      res.writeHead(200, {
        "Content-Type": "text/plain",
      });
      res.end(JSON.stringify(result));
    }
  });
});

router.post("/user", checkAuth,(req, res) => {
  console.log("inside user profile update");
  console.log("req.body", req.body);
  kafka.make_request("updateuser", req.body, (err, result) => {
    console.log("updated details:", result);
    if (result === 500) {
      res.writeHead(500, {
        "Content-Type": "text/plain",
      });
      res.end("SERVER_ERROR");
    } else if (result === 207) {
      res.writeHead(207, {
        "Content-Type": "text/plain",
      });
      res.end("NO_USER_DETAILS");
    } else if (result === 209) {
      res.writeHead(209, {
        "Content-Type": "text/plain",
      });
      res.end("SAVE_FAILED");
    } else if (result === 299) {
      res.writeHead(299, {
        "Content-Type": "text/plain",
      });
      res.end("EMAIL_EXIST");
    } else {
      res.writeHead(200, {
        "Content-Type": "text/plain",
      });
      res.end(JSON.stringify(result));
    }
  });
});

module.exports = router;
