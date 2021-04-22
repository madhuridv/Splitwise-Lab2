const Recent = require("../../Models/recentActivity");
const Users = require("../../Models/userModel");
const Balance = require("../../Models/balanceModel");
const Expense = require("../../Models/expenseModel");

let handle_request = async (msg, callback) => {
  console.log(
    "---------------Kafka backend :: get Recent Activity----------------"
  );
  console.log("Message is: ", msg);
  let err = {};
  let response = {};

  try {
    let expData = [];
    let expDetail = await Expense.find({
      groupName: msg.groupNameFromProps,
    });
    // console.log("expDetail length", expDetail.length);
    if (expDetail) {
      for (let i = 0; i < expDetail.length; i++) {
        await expDetail[i].populate("paidBy").execPopulate();
        let user = await Users.findById(expDetail[i].paidBy);
        console.log("user", user);
        let schema = {
          paidBy: user.username,
          expDesc: expDetail[i].expDesc,
          amount: expDetail[i].amount,
        };
        expData.push(schema);
      }
    }
    console.log("data:", expData);
    response.status = 200;
    response.data = JSON.stringify(expData);
    return callback(null, response);
  } catch (error) {
    console.log(error);
    err.status = 500;
    err.data = "Error in Data";
    return callback(err, null);
  }
};

exports.handle_request = handle_request;
