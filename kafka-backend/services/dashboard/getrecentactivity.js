const Recent = require("../../Models/recentActivity");
const Users = require("../../Models/userModel");
const Balance = require("../../Models/balanceModel");

let handle_request = async (msg, callback) => {
  console.log(
    "---------------Kafka backend :: get Recent Activity----------------"
  );
  console.log("Message is: ", msg);
  let err = {};
  let response = {};
  let dashData = { youOwe: [], youAreOwed: [] };

  try {
    let actList = await Recent.find({}).sort({ createdAt: -1 });
    let actData = [];
    if (actList) {
      console.log("length", actList.length);

      for (let i = 0; i < actList.length; i++) {
        await actList[i].populate("paidBy").execPopulate();

        let user = await Users.findById(actList[i].paidBy);
        console.log("user", user);
        await actList[i].populate("settleWithUserId").execPopulate();
        let settle = await Users.findById(actList[i].settleWithUserId);
        console.log("settle", settle);

        if (actList[i].eventId === 0) {
          let actObj = {
            paidBy: user.username,
            groupName: actList[i].groupName,
            expDesc: actList[i].expDesc,
            amount: actList[i].amount,
            eventId: actList[i].eventId,
            eventType: actList[i].eventType,
            createdAt: actList[i].createdAt,
          };
          console.log("actObj1", actObj);
          actData.push(actObj);
        } else {
          let actObj = {
            settlededBy: user.username,
            settleWithUser: settle.username,
            amount: actList[i].amount,
            eventId: actList[i].eventId,
            eventType: actList[i].eventType,
            createdAt: actList[i].createdAt,
          };
          console.log("actObj2", actObj);
          actData.push(actObj);
        }
      }
    }
    console.log("act Data is:", actData);

    response.status = 200;
    response.data = JSON.stringify(actData);
    return callback(null, response);
  } catch (error) {
    console.log(error);
    err.status = 500;
    err.data = "Error in Data";
    return callback(err, null);
  }
};

exports.handle_request = handle_request;
