const mongoose = require("mongoose");
const Expense = require("../../Models/expenseModel");
const Balance = require("../../Models/balanceModel");
const Recent = require("../../Models/recentActivity");

let handle_request = async (msg, callback) => {
  console.log("---------------Kafka backend :: add expense---------------");
  console.log("Message is: ", msg);
  let err = {};
  let response = {};

  let groupMembers = msg.groupMembers;
  let groupStrength = groupMembers.length;
  let paidBy = msg.paidBy;
  let amount = msg.amount;
  let splittedAmt = amount / groupMembers.length;
 
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
  groupName: msg.groupName,
  expDesc: msg.description,
  amount: amount,
});
console.log("data to insert into recent activity is:", recent);
recent.save();

let expResult = await Expense.find({ groupName: msg.groupName });
console.log("expResult", expResult);

  let expenseData = new Expense({
    groupId: msg.groupId,
    groupName: msg.groupName,
    paidBy: paidBy,
    expDesc: msg.description,
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
    err.status = 400;
    err.data = "ERROR";
    return callback(err, null);
  } else {
    response.status = 200;
    response.data = "EXPENSE_ADDED";
    return callback(null, response);
  }

 

};

exports.handle_request = handle_request;
