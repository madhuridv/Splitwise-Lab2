"use strict";
const Users = require("../../Models/userModel");
const Groups = require("../../Models/groupModel");
function handle_request(msg, callback) {
  console.log("----------kafka backend: JOIN GROUP-----------");
  console.log("Message received for join group kafka backend is:", msg);
  console.log("GroupName:", msg.groupName);
  console.log("groupId:", msg.groupId);
  console.log("groupMember:", msg.groupMember);

  Groups.updateOne(
    {
      _id: msg.groupId,
      groupName: msg.groupName,
      groupMembers: { $elemMatch: { _id: msg.groupMember } },
    },
    { $set: { "groupMembers.$.isAccepted": 1 } },
    (err, result) => {
      console.log("result from group model kafka backend is:", result);
      if (err) {
        console.log(err);
        callback(null, 500);
      } else {
        console.log("updated group:", result);
        callback(null, 200);
      }
    }
  );
}

exports.handle_request = handle_request;
