"use strict";
const Users = require("../../Models/userModel");

function handle_request(msg, callback) {
  console.log("inside get user service kafka backend");
  //let email_id = msg.user_id;
  console.log("user id", msg.body.user_id);
  console.log("filename", msg.filename);

  Users.findById({ _id: msg.body.user_id }, (err, user) => {
    console.log("get user result is:", user);

    if (err) {
      console.log("server error:", err);
      callback(null, 500);
    } else if (user === null) {
      console.log("No User");
      callback(null, 207);
    } else {
      console.log("update user details from DB", user);

      user.user_image = msg.filename;

      console.log("Save user information:", user);

      user.save((error) => {
        if (error) {
          console.log(`Saving Error in update profile: ${error}`);
          callback(null, 500);
        }
        console.log("Successfully Updated");
        //callback(null, 200);
        callback(null, user);
      });
    }
  });
}

exports.handle_request = handle_request;
