"use strict";
const Balance = require("../../Models/balanceModel");
const Users = require("../../Models/userModel");

let handle_request = async (msg, callback) => {
  console.log("---------------Kafka backend :: getDashData----------------");
  console.log("Message is: ", msg);
  let err = {};
  let response = {};
  let dashData = { youOwe: [], youAreOwed: [] };

  try {
    let payableData = await Balance.find({ payableTo: msg.userid }, { _id: 0 });
    console.log("payableData is: ", payableData);
    if (payableData && payableData.length > 0) {
      for (let i = 0; i < payableData.length; i++) {
        await payableData[i].populate("borrower").execPopulate();
        let borrowerUser = await Users.findById(payableData[i].borrower);
        console.log("borrower is: ,", borrowerUser.username);
        console.log("payableData[i].pendingAmt: ", payableData[i].pendingAmt);
        if (payableData[i].pendingAmt > 0) {
          let dashObj = {
            borrower: borrowerUser.username,
            pendingAmt: payableData[i].pendingAmt,
          };
          dashData.youAreOwed.push(dashObj);
        } else if (payableData[i].pendingAmt < 0) {
          let dashObj = {
            payableTo: borrowerUser.username,
            pendingAmt: Math.abs(payableData[i].pendingAmt),
          };
          dashData.youOwe.push(dashObj);
        }
        console.log("dashData after first query :", dashData);
      }
    }

    let borrowerData = await Balance.find({ borrower: msg.userid }, { _id: 0 });
    console.log("borrowerData is: ", borrowerData);
    if (borrowerData && borrowerData.length > 0) {
      for (let i = 0; i < borrowerData.length; i++) {
        await borrowerData[i].populate("payableTo").execPopulate();
        let payableToUser = await Users.findById(borrowerData[i].payableTo);
        console.log("payableToUser: ", payableToUser.username);
        console.log("payableToUserID: ", payableToUser._id);

        if (borrowerData[i].pendingAmt > 0) {
          let dashObj = {
            payableToUserId: payableToUser._id,
            payableTo: payableToUser.username,
            pendingAmt: borrowerData[i].pendingAmt,
          };
          dashData.youOwe.push(dashObj);
        } else if (borrowerData[i].pendingAmt < 0) {
          let dashObj = {
            borrower: payableToUser.username,
            pendingAmt: Math.abs(borrowerData[i].pendingAmt),
          };
          dashData.youAreOwed.push(dashObj);
        }
      }
    }
    response.status = 200;
    response.data = JSON.stringify(dashData);
    return callback(null, response);
  } catch (error) {
    console.log(error);
    err.status = 500;
    err.data = "Error in Data";
    return callback(err, null);
  }
};

exports.handle_request = handle_request;
