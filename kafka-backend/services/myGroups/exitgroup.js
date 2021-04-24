const mongoose = require("mongoose");
const Groups = require("../../Models/groupModel");
const Balance = require("../../Models/balanceModel");

let handle_request = async (msg, callback) => {
  console.log("**********Exit group************");
  console.log("Message is: ", msg);
  const groupMember = msg.groupMember;

  let response = {};
  let err = {};
  let dues = await Balance.find(
    { borrower: mongoose.Types.ObjectId(msg.groupMember), pendingAmt: 0 },
    {}
  );
  if (dues) {
    for (let i = 0; i < dues.length; i++) {
      console.log("dues", dues.length);
      if (dues[i].pendingAmt > 0) {
        console.log("Clear dues");
      } else {
        Groups.findOneAndUpdate(
          {
            groupName: msg.groupName,
          },
          {
            $pull: {
              groupMembers: { _id: groupMember },
            },
          },
          (err, result) => {
            if (err) {
              console.log("Unable to fetch details.", err);
              let err = {};
              err.status = 500;
              err.data = "ERROR";
              return callback(err, null);
            } else {
              if (result) {
                console.log("member sucessfully exited", result);
                response.status = 200;
                response.data = "GROUP_DELETED";
                return callback(null, response);
              } else {
                console.log("server error");
                let err = {};
                err.status = 400;
                err.data = "ERROR";
                return callback(err, null);
              }
            }
          }
        );
      }
    }
  }
};

exports.handle_request = handle_request;
