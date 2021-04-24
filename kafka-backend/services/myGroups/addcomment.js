const mongoose = require("mongoose");
const Expense = require("../../Models/expenseModel");
const Recent = require("../../Models/recentActivity");

let handle_request = async (msg, callback) => {
  console.log("******* get comment on Kafka backend*************");
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

          let recent = new Recent({
            paidBy: msg.userId,
            gName: msg.groupName,
            expDesc:msg.expDesc,
            commentedBy: msg.username,
            eventId: "2",
            eventType: "Comment Added",
          });

          console.log("data to insert into recent activity is:", recent);
          recent.save();

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
