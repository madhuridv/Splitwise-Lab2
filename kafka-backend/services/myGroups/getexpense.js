"use strict";
const Groups = require("../../Models/groupModel");
const Expense = require("../../Models/expenseModel");
const Users = require("../../Models/userModel");

async function handle_request(msg, callback) {
  console.log(
    "---------------Kafka backend :: Get All Expenses----------------"
  );
  console.log("Message is: ", msg);
  let error = {};
  let response = {};
  try {
    let expenseDetail = await Expense.find({ groupName: "Dresses" });

    console.log("expenseDetail", expenseDetail);
    if (expenseDetail) {
      //await expenseDetail.populate({ path: "expense" }).execPopulate();
      let data = [];
     //console.log("number of expenses per group:",expenseDetail.expense.length);
     // console.log("expenseDetail", expenseDetail);
      //   for (let i = 0; i < expenseDetail.expense.length; i++) {
      //     let user = await Users.findById(expenseDetail.expense[i].user_id);
      //     if (!user) {
      //       console.log("Data Error");
      //       response.status = 500;
      //       response.data = "Data error";
      //       //return callback(null, response);
      //     }
      //     let schema = {
      //       paidBy: user.username,
      //       expDesc: expenseDetail.expense[i].expDesc,
      //       amount: expenseDetail.expense[i].amount,
      //       //   order_id: restaurants.order[i]._id,
      //       //   restaurant_id: restaurants._id,
      //       //   order_status: restaurants.order[i].order_status,
      //       //   order_date: restaurants.order[i].order_date,
      //       //   order_cost: restaurants.order[i].order_cost,
      //       //   order_delivery_status: restaurants.order[i].order_delivery_status,
      //       //   order_type: restaurants.order[i].order_type,
      //       //   restaurant_name: restaurants.restaurant_name,
      //       //   restaurant_image: restaurants.restaurant_image,
      //       //   zip_code: restaurants.zip_code,
      //       //   customer_id: cust._id,
      //       //   cust_name: cust.cust_name,
      //       //   phone_number: cust.phone_number,
      //       //   city: cust.city,
      //     };
      //     data.push(schema);
      //     console.log("data is :", data);
      //   }
    }
  } catch (error) {
    console.log(error);
    error.status = 500;
    error.data = "Error in Data";
    return callback(error, null);
  }
  //   Groups.find(
  //     { "groupMembers._id": msg.groupMember },
  //     {
  //       _id: 1,
  //       groupName: 1,
  //       groupMembers: { $elemMatch: { _id: msg.groupMember } },
  //     },
  //     (err, allGroups) => {
  //       console.log("getallgroups result is:", allGroups);

  //       if (err) {
  //         callback(null, 500);
  //       } else if (allGroups === null) {
  //         callback(null, 207);
  //       } else {
  //         callback(null, allGroups);
  //       }
  //     }
  // );
}

exports.handle_request = handle_request;
