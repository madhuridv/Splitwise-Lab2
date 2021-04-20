const express = require("express");
const router = express();
const kafka = require("../kafka/client");
//const Expense = require("../models/expense");
//const Users = require("../models/userModel");

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
  console.log("inside Add expense");

  const groupMembers = req.body.groupMembers;
  const groupStrength = groupMembers.length;
  console.log("count of grpMembers", groupStrength);
  console.log("Data recieved from client to add expense : ", req.body);

  kafka.make_request("addexpense", req.body, (err, result) => {
    console.log("resposnse status:", result);
    if (result === 500) {
      res.writeHead(500, {
        "Content-Type": "text/plain",
      });
      res.end("SERVER_ERROR");
    } else {
      res.writeHead(200, {
        "Content-Type": "text/plain",
      });
      res.end("EXPENSE_ADDED");
    }
  });

  // let expResult = await Expense.find({ groupName: req.body.groupName });
  // console.log("expResult", expResult);
  // let expenseObj = {
  //   paidBy: req.body.paidBy,
  //   expDesc: req.body.description,
  //   amount: req.body.amount,
  // };
  // if (expResult.length > 0 && expResult) {
  //   console.log(expResult[0].exp);
  //   //push expense entry
  //   expResult[0].exp.push(expenseObj);

  //   let updated = await expResult[0].save();

  //   if (!updated) {
  //     res.writeHead(400, {
  //       "Content-Type": "text/plain",
  //     });
  //     console.log("Error");
  //     res.end("ERROR");
  //   } else {
  //     res.writeHead(200, {
  //       "Content-Type": "text/plain",
  //     });
  //     console.log("EXPENSE_ADDED");
  //     res.end("EXPENSE_ADDED");
  //   }
  // } //first time to create entry
  // else {
  //   let expenseData = new Expense({
  //     groupName: req.body.groupName,
  //     exp: [],
  //     groupTransaction: [],
  //   });

  //   expenseData.exp.push(expenseObj);

  //   // groupMembers
  //   // 	.filter((member) => {
  //   // 		return member !== paidBy;
  //   // 	})
  //   // 	.forEach((mem) => {
  //   // 		console.log(mem);
  //   // 		transObj = {
  //   // 			borrower: mem,
  //   // 			payableTo: paidBy,
  //   // 			pendingAmt: amount / groupStrength,
  //   // 		};
  //   // 		//transArray.push(transObj);
  //   // 		expenseData.groupTransaction.push(transObj);
  //   // 	});

  //   console.log("expenseData is: ", expenseData);

  //   const saveExp = await expenseData.save();
  //   if (!saveExp) {
  //     res.writeHead(400, {
  //       "Content-Type": "text/plain",
  //     });
  //     console.log("ERROR");
  //     res.end("ERROR");
  //   } else {
  //     res.writeHead(200, {
  //       "Content-Type": "text/plain",
  //     });
  //     console.log("EXPENSE_ADDED");
  //     res.end("EXPENSE_ADDED");
  //   }
  // }
});

module.exports = router;
