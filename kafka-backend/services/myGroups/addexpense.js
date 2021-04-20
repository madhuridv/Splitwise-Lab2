"use strict";
const Users = require("../../Models/userModel");
const Groups = require("../../Models/groupModel");
const Expense = require("../../Models/expenseModel");

async function handle_request(msg, callback) {
  console.log("-----------------------Add expense----------------------");
  console.log("Message received for create group kafka backend is:", msg);

  let expResult = await Expense.find({ groupName: msg.groupName });
  console.log("expResult", expResult);
  let expenseObj = {
    paidBy: msg.paidBy,
    expDesc: msg.description,
    amount: msg.amount,
    createdAt: Date.now()
  };
  if (expResult.length > 0 && expResult) {
    console.log(expResult[0].exp);
    //push expense entry
    expResult[0].exp.push(expenseObj);

    let updated = await expResult[0].save();

    if (!updated) {
      callback(null, 500);
    } else {
      callback(null, 200);
    }
  } //first time to create entry
  else {
    let expenseData = new Expense({
      groupName: msg.groupName,
      exp: [],
      groupTransaction: [],
    });

    expenseData.exp.push(expenseObj);

    // groupMembers
    // 	.filter((member) => {
    // 		return member !== paidBy;
    // 	})
    // 	.forEach((mem) => {
    // 		console.log(mem);
    // 		transObj = {
    // 			borrower: mem,
    // 			payableTo: paidBy,
    // 			pendingAmt: amount / groupStrength,
    // 		};
    // 		//transArray.push(transObj);
    // 		expenseData.groupTransaction.push(transObj);
    // 	});

    console.log("expenseData is: ", expenseData);

    const saveExp = await expenseData.save();
    if (!saveExp) {
      callback(null, 500);
    } else {
      callback(null, 200);
    }
  }
}

exports.handle_request = handle_request;
