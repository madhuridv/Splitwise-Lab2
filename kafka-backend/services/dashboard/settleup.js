const Recent = require("../../Models/recentActivity");
const Users = require("../../Models/userModel");
const Balance = require("../../Models/balanceModel");

let handle_request = async (msg, callback) => {
  console.log("***********settle up on Kafka backend ************");
  console.log("Message is: ", msg);
  let err = {};
  let response = {};
  try {
    Balance.updateOne(
      {
        $and: [
          {
            $or: [
              { payableTo: msg.settlededById },
              { borrower: msg.settlededById },
            ],
          },
          {
            $or: [
              { payableTo: msg.settleWithUserId },
              { borrower: msg.settleWithUserId },
            ],
          },
        ],
      },
      { $set: { pendingAmt: 0 } },
      (err, result) => {
        console.log("result from group model kafka backend is:", result);
      }
    );

    let recent = new Recent({
      paidBy: msg.settlededById,
      eventId: "1",
      eventType: "Settled Dues",
      settleWithUserId: msg.settleWithUserId,
      amount: msg.settleUserAmt,
    });
    console.log("data to insert into recent activity is:", recent);
    recent.save();

    response.status = 200;
    return callback(null, response);
  } catch (error) {
    console.log(error);
    err.status = 500;
    err.data = "Error in Data";
    return callback(err, null);
  }
};

exports.handle_request = handle_request;
