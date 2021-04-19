"use strict";
const Users = require("../../Models/userModel");
const Groups = require("../../Models/groupModel");
const Expense = require("../../Models/expenseModel");

function handle_request(msg, callback) {
  console.log("-----------------------Add expense----------------------");
  console.log("Message received for create group kafka backend is:", msg);

  let newExpense = new Expense({

      members:msg.groupMembers,
      groupName: msg.groupName,
      expense: msg.expense,
      transaction: msg.transaction, 
      entryType: msg.entryType,
      createdAt:$currentDate,
  })
  newExpense.save(newExpense, (err, result) => {
          if (err) {
            console.log("server error:", err);
            callback(null, 500);
          } else {
            console.log("Expense Added Successfully!");
            callback(null, 200);
          }
        });
}

exports.handle_request = handle_request;
