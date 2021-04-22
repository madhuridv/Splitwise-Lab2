const express = require("express");
const router = express();
const kafka = require("../kafka/client");
const Recent = require("../models/recentActivity");
const Users = require("../models/userModel");
const Balance = require("../models/balanceModel");

router.post("/settleup", (req, res) => {
  console.log("inside settle up backend");
  const settleWithUserId = req.body.settleWithUserId;
  const settlededById = req.body.settlededById;
  const settleUserAmt = req.body.settleUserAmt;
  console.log("settleWithUserId :", settleWithUserId);
  console.log("settlededById :", settlededById);
  console.log("settleUserAmt :", settleUserAmt);

  kafka.make_request("settleup", req.body, (err, results) => {
    console.log("recent activiy details:", results);
    if (err) {
      console.log(err);
      res.writeHead(err.status, {
        "Content-Type": "text/plain",
      });
      res.end();
    } else {
      res.writeHead(results.status, {
        "Content-Type": "text/plain",
      });
      res.end();
    }
  });
  // Balance.updateOne(
  //   {
  //     $and: [
  //       { $or: [{ payableTo: settlededById }, { borrower: settlededById }] },
  //       {
  //         $or: [
  //           { payableTo: settleWithUserId },
  //           { borrower: settleWithUserId },
  //         ],
  //       },
  //     ],
  //   },
  //   { $set: { pendingAmt: 0 } },
  //   (err, result) => {
  //     console.log("result from group model kafka backend is:", result);
  //   }
  // );

  // let recent = new Recent({
  //   paidBy: settlededById,
  //   eventId: "1",
  //   eventType: "Settled Dues",
  //   settleWithUserId: settleWithUserId,
  //   amount: settleUserAmt,
  // });
  // console.log("data to insert into recent activity is:", recent);
  // recent.save();
});

router.post("/recent", async (req, res) => {
  console.log("inside recent backend");
  console.log("req body:", req.body);
  kafka.make_request("getrecentactivity", req.body, (err, results) => {
    console.log("recent activiy details:", results);
    if (err) {
      console.log(err);
      res.writeHead(err.status, {
        "Content-Type": "text/plain",
      });
      res.end(err.data);
    } else {
      res.writeHead(results.status, {
        "Content-Type": "text/plain",
      });
      res.end(results.data);
    }
  });
});

router.post("/getdashdata", async (req, res) => {
  console.log("Backend:: inside getdashdata");
  console.log("req.body :", req.body);
  kafka.make_request("getdashboarddata", req.body, (err, results) => {
    console.log("group details:", results);
    if (err) {
      console.log(err);
      res.writeHead(err.status, {
        "Content-Type": "text/plain",
      });
      res.end(err.data);
    } else {
      res.writeHead(results.status, {
        "Content-Type": "text/plain",
      });
      res.end(results.data);
    }
  });
});

module.exports = router;
