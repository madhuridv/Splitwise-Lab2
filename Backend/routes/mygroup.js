const express = require("express");
const router = express();
const kafka = require("../kafka/client");
const { checkAuth } = require("../utils/passport");


//from mygroups page
router.post("/getGroup",checkAuth, (req, res) => {
  console.log("inside getGroup backend");
  console.log("req.body : ", req.body);
  kafka.make_request("getgroups", req.body, (err, result) => {
    console.log("group details:", result);
    if (result === 500) {
      res.writeHead(500, {
        "Content-Type": "text/plain",
      });
      res.end("SERVER_ERROR");
    } else if (result === 207) {
      res.writeHead(207, {
        "Content-Type": "text/plain",
      });
      res.end("NO_GROUPS");
    } else {
      res.writeHead(200, {
        "Content-Type": "text/plain",
      });
      res.end(JSON.stringify(result));
    }
  });
});

router.post("/joingroup",checkAuth, (req, res) => {
  console.log("inside join groups backend");
  console.log("req.body : ", req.body);
  kafka.make_request("joingroup", req.body, (err, result) => {
    console.log("join group details:", result);
    if (result === 500) {
      res.writeHead(500, {
        "Content-Type": "text/plain",
      });
      res.end("SERVER_ERROR");
    } else {
      res.writeHead(200, {
        "Content-Type": "text/plain",
      });
      res.end("JOINED_GROUP");
    }
  });
});
router.post("/exitgroup",checkAuth,  (req, res) => {
  console.log("inside exitgroup backend");
  const groupMember = req.body.groupMember;
  console.log("groupMember", groupMember);
  console.log("req.body : ", req.body);  
  
  // let sql = `CALL leaveGroup('${req.body.groupName}','${groupMember}')`;
  // console.log(sql);
  // pool.query(sql, [groupMember], (err, result) => {
  //   if (err) {
  //     res.writeHead(500, {
  //       "Content-Type": "text/plain",
  //     });
  //     res.end("Error in Data");
  //   }
  //   console.log("Query result is:", result);
  //   if (
  //     result &&
  //     result.length > 0 &&
  //     result[0][0].status === "GROUP_DELETED"
  //   ) {
  //     res.writeHead(200, {
  //       "Content-Type": "text/plain",
  //     });
  //     res.end(result[0][0].status);
  //   } else if (
  //     result &&
  //     result.length > 0 &&
  //     result[0][0].status === "CLEAR_DUES"
  //   ) {
  //     res.writeHead(401, {
  //       "Content-Type": "text/plain",
  //     });
  //     res.end(result[0][0].status);
  //   }
  // });
});

//from show groups page
router.post("/getmembers",checkAuth,  (req, res) => {
  console.log("inside get Members backend");
  const gName = req.body.gName;
  console.log("gName", gName);
  console.log("req.body : ", req.body);
  kafka.make_request("getgroupmembers", req.body, (err, result) => {
    console.log("group members are:", result);
    if (result === 500) {
      res.writeHead(500, {
        "Content-Type": "text/plain",
      });
      res.end("SERVER_ERROR");
    } else {
      res.writeHead(200, {
        "Content-Type": "text/plain",
      });
      res.end(JSON.stringify(result));
    }
  });

});

module.exports = router;
