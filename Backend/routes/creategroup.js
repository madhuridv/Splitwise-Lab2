const express = require("express");
const router = express();
const pool = require("../connection");

router.post("/addgroup", (req, res) => {
  console.log("inside post create group backend");
  let groupMem = req.body.members;
  let list = groupMem.join(",");

  let sql = `CALL insertGroupLoop('${req.body.groupname}','${req.body.user_id}','${list}')`;
  pool.query(sql, (err, result) => {
    if (err) {
      res.writeHead(500, {
        "Content-Type": "text/plain",
      });
      res.end("Error in Data");
    }
    console.log("result is:", result[0][0].status);
    if (result && result.length > 0 && result[0][0].status === "GROUP_ADDED") {
      res.writeHead(200, {
        "Content-Type": "text/plain",
      });
      res.end(result[0][0].status);
    } else {
      res.writeHead(400, {
        "Content-Type": "text/plain",
      });
      res.end(result[0][0].status);
    }
  });
});

router.get("/getUser", (req, res) => {
 // console.log("inside get groups");
  let sql = `select distinct id,username,email from splitwise.users`;
  pool.query(sql, (err, result) => {
    if (err) {
      res.writeHead(500, {
        "Content-Type": "text/plain",
      });
      res.end("Error in Data");
    }
    console.log("result is:", result);
    if (result && result.length) {
      res.writeHead(200, {
        "Content-Type": "text/plain",
      });
      res.end(JSON.stringify(result));
    }
  });
});
module.exports = router;
