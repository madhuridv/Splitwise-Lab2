const mongoose = require("mongoose");
const Expense = require("../../Models/expenseModel");

let handle_request = async (msg, callback) => {
  console.log("********* delete comment on kafka backend ************");
  console.log("Message is: ", msg);
  let err = {};
  let response = {};

  Expense.findOneAndUpdate(
    { _id: mongoose.Types.ObjectId(msg.expId) },
    {
      $pull: {
        comments: { _id: mongoose.Types.ObjectId(msg.delcommentId) },
      },
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
          console.log("Comment deleted ", result);
          response.status = 200;
          response.data = "COMMENT_DELETED";
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
