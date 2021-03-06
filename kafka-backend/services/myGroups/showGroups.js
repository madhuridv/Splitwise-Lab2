"use strict";
const Groups = require("../../Models/groupModel");

function handle_request(msg, callback) {
  console.log(
    "******* get groupmembers on kafka backend***********"
  );
  console.log("Message is: ", msg);
  Groups.findOne(
    { groupName: msg.gName, "groupMembers.isAccepted": 1 },

    { _id: 1, groupMembers: 1 },
    (err, allMembers) => {
      console.log("get group members result is:", allMembers);

      if (err) {
        callback(null, 500);
      } else if (allMembers === null) {
        callback(null, 207);
      } else {
        callback(null, allMembers);
      }
    }
  );
}

exports.handle_request = handle_request;
