const express = require("express");
const router = express();
const kafka = require("../kafka/client");
const Expense = require("../models/expense");
const Users = require("../models/userModel");
const Balance = require("../models/balanceModel");
const Recent = require("../models/recentActivity");

router.post("/getexpensedetails", async (req, res) => {
  console.log("inside get expense");
  console.log("req.body.groupNameFromProps", req.body.groupNameFromProps);

  kafka.make_request("getexpense", req.body, (err, result) => {
    console.log("resposnse status:", result);
    console.log("result from kafka for get expense is", result);
    if (result === 500) {
      res.writeHead(500, {
        "Content-Type": "text/plain",
      });
      res.end("SERVER_ERROR");
    } else if (result === 207) {
      res.writeHead(207, {
        "Content-Type": "text/plain",
      });
      res.end("NO_RECORD");
    } else {
      res.writeHead(200, {
        "Content-Type": "text/plain",
      });
      res.end(JSON.stringify(result));
    }
  });
  //   let err = {};
  //   let response = {};
  // try{
  //   let expDetail = await Expense.findOne({
  //     groupName: req.body.groupNameFromProps,
  //   });

  //   if (expDetail) {
  //     await expDetail.populate({ path: "exp" }).execPopulate();
  //     let data = [];
  //     console.log("number of expenses per group:", expDetail.exp.length);
  //     for (let i = 0; i < expDetail.exp.length; i++) {
  //       let user = await Users.findById(expDetail.exp[i].paidBy);
  //       if (!user) {
  //         console.log("Data Error");
  //         response.status = 500;
  //         response.data = "Data error";
  //       }

  //       let schema = {
  //         paidBy: user.username,
  //         expDesc: expDetail.exp[i].expDesc,
  //         amount: expDetail.exp[i].amount,
  //       };
  //       data.push(schema);
  //     }
  //     response.data = JSON.stringify(data);
  //     console.log("response", response);
  //     return callback(null, response);
  //   }else {
  //     response.status = 500;
  //     response.data = "NO_RECORD";
  //     return callback(null, response);
  //   }
  // }
  //   catch(error) {
  //     console.log(error);
  //     err.status = 500;
  //     err.data = "Error in Data";
  //     return callback(err, null);
  //   }
});

router.post("/expense", async (req, res) => {
  // kafka.make_request("addexpense", req.body, (err, result) => {
  //   console.log("resposnse status:", result);
  //   if (result === 500) {
  //     res.writeHead(500, {
  //       "Content-Type": "text/plain",
  //     });
  //     res.end("SERVER_ERROR");
  //   } else {
  //     res.writeHead(200, {
  //       "Content-Type": "text/plain",
  //     });
  //     res.end("EXPENSE_ADDED");
  //   }
  // });

  console.log("inside addexpense  backend");
  console.log("req.body", req.body);
  let groupMembers = req.body.groupMembers;
  let groupStrength = groupMembers.length;
  let paidBy = req.body.paidBy;
  let amount = req.body.amount;
  let splittedAmt = amount / groupMembers.length;
  let expResult = await Expense.find({ groupName: req.body.groupName });
  console.log("expResult", expResult);

  let expenseData = new Expense({
    groupId: req.body.groupId,
    groupName: req.body.groupName,
    paidBy: paidBy,
    expDesc: req.body.description,
    amount: amount,
    borrowers: [],
  });

  groupMembers
    .filter((member) => {
      console.log("Member", member === paidBy);
      return member !== paidBy;
    })
    .forEach((mem) => {
      let borrowersObj = {
        _id: mem,
        pendingAmt: splittedAmt,
      };
      expenseData.borrowers.push(borrowersObj);
    });

  console.log("expenseData is: ", expenseData);

  const saveExp = await expenseData.save();
  if (!saveExp) {
    res.writeHead(400, {
      "Content-Type": "text/plain",
    });
    res.end("ERROR");
  } else {
    res.writeHead(200, {
      "Content-Type": "text/plain",
    });
    res.end("EXPENSE_ADDED");
  }

  //to insert into Balance Model

  for (let i = 0; i < groupMembers.length; i++) {
    if (groupMembers[i] !== paidBy) {
      const amtResult = await Balance.find(
        { borrower: groupMembers[i], payableTo: paidBy },
        { pendingAmt: 1 }
      );

      if (amtResult.length > 0 && amtResult) {
        console.log("amtResult pendingAmt: ", amtResult[0].pendingAmt);
        //update pendingAmt +
        let newAmt = amtResult[0].pendingAmt + splittedAmt;
        let amountUpdate = await Balance.updateOne(
          { borrower: groupMembers[i], payableTo: paidBy },
          { $set: { pendingAmt: newAmt } }
        );
        if (amountUpdate) {
          console.log("Pending Amount updated at place 1");
        }
      } else {
        const amtResultRev = await Balance.find(
          { borrower: paidBy, payableTo: groupMembers[i] },
          { pendingAmt: 1 }
        );

        if (amtResultRev.length > 0 && amtResultRev) {
          console.log("amtResultRev pendingAmt: ", amtResultRev[0].pendingAmt);
          //update pendingAmt -
          let newAmt = amtResultRev[0].pendingAmt - splittedAmt;
          let amountUpdate = await Balance.updateOne(
            { borrower: paidBy, payableTo: groupMembers[i] },
            { $set: { pendingAmt: newAmt } }
          );
          if (amountUpdate) {
            console.log("Pending Amount updated at place 2");
          }
        } else {
          //insert new entry here
          let balance = new Balance({
            borrower: groupMembers[i],
            payableTo: paidBy,
            pendingAmt: amount / groupStrength,
          });

          balance.save();
        }
      }
    }
  }
  // to insert into recentactivity
  let recent = new Recent({
    paidBy: paidBy,
    eventId: "0",
    eventType: "Expense Added",
    groupName: req.body.groupName,
    expDesc: req.body.description,
    amount: amount,
  });
  console.log("data to insert into recent activity is:", recent);
  recent.save();
});

module.exports = router;
