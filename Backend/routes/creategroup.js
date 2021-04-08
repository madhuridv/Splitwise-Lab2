const express = require("express");
const router = express();
const kafka = require("../kafka/client");

router.post("/addgroup", (req, res) => {
  console.log("inside postmethod for create group backend");
  console.log("req.body", req.body);

  kafka.make_request("addgroup", req.body, (err, result) => {
    console.log("group details:", result);
    if (result === 500) {
      res.writeHead(500, {
        "Content-Type": "text/plain",
      });
      res.end("SERVER_ERROR");
    } else if (result === 299) {
      res.writeHead(299, {
        "Content-Type": "text/plain",
      });
      res.end("GROUP_EXISTS");
    } else {
      res.writeHead(200, {
        "Content-Type": "text/plain",
      });
      res.end("GROUP_ADDED");
    }
  });
});

router.get("/getUser", (req, res) => {
  console.log("inside get User details create groups in node backend");
  kafka.make_request("getallusers", req.body, (err, result) => {
    console.log("user details:", result);
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
    } else {
      res.writeHead(200, {
        "Content-Type": "text/plain",
      });
      res.end(JSON.stringify(result));
    }
  });
});
module.exports = router;
