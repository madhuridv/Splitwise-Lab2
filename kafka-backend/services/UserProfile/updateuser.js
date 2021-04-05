"use strict";
const Users = require("../../Models/userModel");

function handle_request(msg, callback) {
  console.log("inside update user service kafka backend", msg);
  // let username = msg.name;
  // console.log("name is", username);
  // console.log(msg.phone_number);

  Users.findOne({ email: msg.email }, (err, user) => {
    console.log("get user result is:", user);

    if (err) {
      console.log("server error:", err);
      callback(null, 500);
    } else if (user === null) {
      console.log("unable to fetch user details");
      callback(null, 207);
    } else {
      console.log("update user details from DB", user);
      console.log("User name is:", msg.name);
      user.username = msg.name;
      user.email = msg.email;
      user.phone_number = msg.phone_number;
      user.currency = msg.currency;
      user.language = msg.user_language;
      user.timezone = msg.timezone;

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
