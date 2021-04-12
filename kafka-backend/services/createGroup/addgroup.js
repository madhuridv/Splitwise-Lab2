"use strict";
const Users = require("../../Models/userModel");
const Groups = require("../../Models/groupModel");

function handle_request(msg, callback) {
  console.log("-----------------------CREATE GROUP----------------------");
  console.log("Message received for create group kafka backend is:", msg);
  console.log("GroupName:", msg.groupName);
  console.log("created by:", msg.createdBy);
  console.log("members:", msg.members);

  Groups.find({ groupName: msg.groupName }, (err, group) => {
    console.log("result from group model kafka backend is:", group);
    if (err) {
      console.log(err);
      callback(null, 500);
    }
    if (group.length > 0) {
      console.log(`group already exists`);
      callback(null, 299);
    } else {
      let newGroup = new Groups({
        groupName: msg.groupName,
        createdBy: msg.createdBy,
        groupMembers: msg.members,
      });

      newGroup.save(newGroup, (err, result) => {
        if (err) {
          console.log("server error:", err);
          callback(null, 500);
        } else {
          console.log("Group Inserted Successfully!");
          callback(null, 200);
        }
      });
      // Groups.create(
      //   {
      //     groupName: msg.groupname,
      //     createdBy: msg.user_id,
      //     groupMembers: msg.members,
      //   },
      //   (err, result) => {
      //     if (err) {
      //       console.log("server error:", err);
      //       callback(null, 500);
      //     } else {
      //       console.log("Group Inserted Successfully!");
      //       callback(null, 200);
      //     }
      //   }
      // );
    }
  });

 
}

exports.handle_request = handle_request;
