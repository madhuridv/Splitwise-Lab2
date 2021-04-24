const express = require("express");
const router = express();
const kafka = require("../kafka/client");
const Expense = require("../models/expense");
const mongoose = require("mongoose");
const { checkAuth } = require("../utils/passport");

router.post("/add",checkAuth, async (req, res) => {
  console.log("inside add comment");
  console.log("req.body: ", req.body);
  kafka.make_request("addcomment", req.body, (err, results) => {
    console.log("result from kafka for addcomment", results);
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

router.post("/delete", checkAuth,(req, res) => {
  console.log("inside Delete comment");
  console.log("req.body: ", req.body);
  kafka.make_request("deletecomment", req.body, (err, results) => {
    console.log("result from kafka for delete comment", results);
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

//   Expense.findOneAndUpdate(
//     { _id: mongoose.Types.ObjectId(req.body.expId) },
//     {
//       $pull: {
//         comments: { _id: mongoose.Types.ObjectId(req.body.delcommentId) },
//       },
//     },
//     (err, result) => {
//       if (err) {
//         console.log("Unable to fetch user details.", err);
//         let err = {};
//         err.status = 500;
//         err.data = "ERROR";
//         return res.status(err.status).send(err.data);
//       } else {
//         if (result) {
//           console.log("Comment deleted ", result);
//           return res.status(200).send("COMMENT_DELETED");
//         } else {
//           let err = {};
//           err.status = 401;
//           err.data = "ERROR";
//           return res.status(err.status).send(err.data);
//         }
//       }
//     }
//   );
});

module.exports = router;
