"use strict";
const Users = require("../../Models/userModel");
const Groups = require("../../Models/groupModel");

function handle_request(msg, callback) {
  console.log("-----------------------CREATE GROUP----------------------");
  console.log("Message received for create group kafka backend is:", msg);
  console.log("GroupName:", msg.groupname);
  console.log("created by:", msg.user_id);
  console.log("members:", msg.members);

  Groups.find({ groupName: msg.groupname }, (err, group) => {
    console.log("result from group model kafka backend is:", group);
    if (err) {
      console.log(err);
      callback(null, 500);
    }
    if (group.length > 0) {
      console.log(`group already exists`);
      callback(null, 299);
    } else {
      Groups.create(
        {
          groupName: msg.groupname,
          createdBy: msg.user_id,
          groupMembers: msg.members,
        },
        (err, result) => {
          if (err) {
            console.log("server error:", err);
            callback(null, 500);
          } else {
            console.log("Group Inserted Successfully!");
            callback(null, 200);
          }
        }
      );
    }
  });

  //   Users.find({ email }, (err, results) => {
  //     console.log("signup result is:", results);
  //     if (err) {
  //       console.log(err);
  //       callback(null, 500);
  //     }
  //   });
}

exports.handle_request = handle_request;
