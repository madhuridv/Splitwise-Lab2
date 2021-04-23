const mongoose = require("mongoose");
const Expense = require("../../Models/expenseModel");

let handle_request = async (msg, callback) => {
  console.log("---------------Kafka backend :: get comment---------------");
  console.log("Message is: ", msg);
  let err = {};
  let response = {};

  const comment = {
    message: msg.message,
    userId: msg.userId,
    username: msg.username,
    msgCreatedAt: new Date(),
  };

  Expense.findOneAndUpdate(
    { _id: mongoose.Types.ObjectId(msg.expId) },
    {
      $push: { comments: comment },
    },
    (err, result) => {
      if (err) {
        console.log("Unable to fetch user details.", err);
        let err = {};
        err.status = 500;
        err.data = "ERROR";
        return callback(err, null);
      } else {
        if (result) {
          console.log("Comments ", result);
          response.status = 200;
          response.data = "COMMENT_ADDED";
          return callback(null, response);
        } else {
          let err = {};
          err.status = 400;
          err.data = "ERROR";
          return callback(err, null);
        }
      }
    }
  );
};

exports.handle_request = handle_request;
