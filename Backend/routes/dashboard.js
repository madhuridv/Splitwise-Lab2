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

  Balance.updateOne(
    {
      $and: [
        { $or: [{ payableTo: settlededById }, { borrower: settlededById }] },
        { $or: [{ payableTo: settleWithUserId }, { borrower: settleWithUserId }] },
      ],
    },
    { $set: { pendingAmt: 0 } },
    (err, result) => {
      console.log("result from group model kafka backend is:", result);
    }
  );

  let recent = new Recent({
    paidBy: settlededById,
    eventId: "1",
    eventType: "Settled Dues",
    settleWithUserId: settleWithUserId,
    amount: settleUserAmt,
  });
  console.log("data to insert into recent activity is:", recent);
  recent.save();

  // const user_id = req.body.user_id;
  // console.log(user_id);
  // let sql = "update splitwise.balance set amtToPay = 0 where lentTo = ?";
  // console.log(sql);
  // pool.query(sql, [user_id], (err, result) => {
  //   if (err) {
  //     res.writeHead(500, {
  //       "Content-Type": "text/plain",
  //     });
  //     res.end("Error in Data");
  //   }
  //   console.log(
  //     "Number of records inserted for Expense table: ",
  //     result.affectedRows
  //   );
  //   if (result && result.length) {
  //     res.writeHead(200, {
  //       "Content-Type": "text/plain",
  //     });
  //     res.end();
  //   }
  // });
});

router.post("/recent", async (req, res) => {
  console.log("inside recent backend");
  console.log("req body:", req.body);

  let actList = await Recent.find({}).sort({ createdAt: -1 });

  if (actList) {
    console.log("length", actList.length);
    let actData = [];
    for (let i = 0; i < actList.length; i++) {
      await actList[i].populate({ path: "paidBy" }).execPopulate();

      let user = await Users.findById(actList[i].paidBy);
      let actObj = {
        paidBy: user.username,
        groupName: actList[i].groupName,
        expDesc: actList[i].expDesc,
        amount: actList[i].amount,
        eventId: actList[i].eventId,
        eventType: actList[i].eventType,
        createdAt: actList[i].createdAt,
      };
      console.log("actObj", actObj);
      actData.push(actObj);
    }
    console.log("actData", actData);
    res.end(JSON.stringify(actData));
  }

  // let sql =
  //   "select distinct expenseDescription, groupName, amount, u.userName,e.createdAt as Date from expense e join users u on e.addedBy = u.id order by e.createdAt desc";
  // console.log(sql);
  // pool.query(sql, (err, result) => {
  //   if (err) {
  //     res.writeHead(500, {
  //       "Content-Type": "text/plain",
  //     });
  //     res.end("Error in Data");
  //   }
  //   console.log("select reult is", result);
  //   if (result && result.length) {
  //     res.writeHead(200, {
  //       "Content-Type": "text/plain",
  //     });
  //     res.end(JSON.stringify(result));
  //   } else {
  //     res.writeHead(400, {
  //       "Content-Type": "text/plain",
  //     });
  //     res.end();
  //   }
  // });
});

// router.post("/recentsettle", (req, res) => {
//   console.log("inside recent settle backend");
//   const user_id = req.body.user_id;
//   console.log(user_id);
//   let sql =
//     "select distinct b.groupName,u.username,b.createdAt as Date from splitwise.balance b join users u on b.lentTo = u.id where b.amtToPay = 0 group by u.username order by b.createdAt desc";
//   console.log(sql);
//   pool.query(sql, [user_id], (err, result) => {
//     if (err) {
//       res.writeHead(500, {
//         "Content-Type": "text/plain",
//       });
//       res.end("Error in Data");
//     }
//     console.log("select result is", result);
//     if (result && result.length) {
//       res.writeHead(200, {
//         "Content-Type": "text/plain",
//       });
//       res.end(JSON.stringify(result));
//     } else {
//       res.writeHead(400, {
//         "Content-Type": "text/plain",
//       });
//       res.end();
//     }
//   });
// });

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
