const express = require("express");
const router = express.Router();
const kafka = require("../kafka/client");

router.post("/", (req, res) => {
  kafka.make_request("signup", req.body, (err, result) => {
    console.log("Created user Details:",result)
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
    } else  {
      res.writeHead(200, {
        "Content-Type": "text/plain",
      });
      res.end(JSON.stringify(result));
    }
  });
});

module.exports = router;
