"use strict";
const Groups = require("../../Models/groupModel");
const Expense = require("../../Models/expenseModel");
const Users = require("../../Models/userModel");

async function handle_request(msg, callback) {
  console.log(
    "---------------Kafka backend :: Get All Expenses----------------"
  );
  console.log("Message is: ", msg);
  // let err = {};
  // let response = {};
  try {
    let expDetail = await Expense.findOne({
      groupName: msg.groupNameFromProps,
    });

    if (expDetail) {
      await expDetail.populate({ path: "exp" }).execPopulate();
      let data = [];
      console.log("number of expenses per group:", expDetail.exp.length);
      for (let i = 0; i < expDetail.exp.length; i++) {
        let user = await Users.findById(expDetail.exp[i].paidBy);
        if (!user) {
          console.log("Data Error");
          callback(null,500);
        }

        let schema = {
          paidBy: user.username,
          expDesc: expDetail.exp[i].expDesc,
          amount: expDetail.exp[i].amount,
        };
        data.push(schema);
      }
      
      console.log("data", data);
       callback(null, data);
    } else {
      callback(null,207);
    }
  } catch (error) {
    console.log(error);
    callback(null,500);
  }
}

exports.handle_request = handle_request;
