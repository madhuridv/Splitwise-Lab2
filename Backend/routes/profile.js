const express = require("express");
const router = express.Router();
const passwordHash = require("password-hash");
const pool = require("../connection");

router.get("/:user_id", (req, res) => {
  let sql = `CALL getUserDetails('${req.params.user_id}', NULL);`;
  pool.query(sql, (err, result) => {
    if (err) {
      res.writeHead(500, {
        "Content-Type": "text/plain",
      });
      res.end("Error in Data");
    }
    console.log("result is:", result);
    if (result && result.length > 0 && result[0][0]) {
      res.writeHead(200, {
        "Content-Type": "text/plain",
      });
      res.end(JSON.stringify(result[0]));
    }
  });
});

router.post("/user", (req, res) => {
  console.log("inside update");
  console.log(req.body.user_language);
  console.log(req.body.timezone);

  let sql = `CALL updateUser('${req.body.user_id}','${req.body.email}','${req.body.name}', '${req.body.address}', '${req.body.phone_number}', '${req.body.currency}', '${req.body.timezone}', '${req.body.user_language}');`;
  pool.query(sql, (err, result) => {
    console.log("result is", result);
    if (err) {
      console.log(err);
      res.writeHead(500, {
        "Content-Type": "text/plain",
      });
      res.end("Error in Data");
    }
    if (result && result.length > 0 && result[0][0].status === "USER_UPDATED") {
      res.writeHead(200, {
        "Content-Type": "text/plain",
      });
      res.end(result[0][0].status);
    } else if (
      result &&
      result.length > 0 &&
      result[0][0].status === "NO_RECORD"
    ) {
      res.writeHead(401, {
        "Content-Type": "text/plain",
      });
      res.end(result[0][0].status);
    }
  });
});

module.exports = router;
