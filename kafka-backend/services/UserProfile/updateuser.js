"use strict";
const Users = require("../../Models/userModel");

function handle_request(msg, callback) {
  console.log("*********updateuser on kafka backend ***********");
  console.log("message is", msg);

  Users.findById({ _id: msg.user_id }, (err, user) => {
    console.log("get user result is:", user);

    if (err) {
      console.log("server error:", err);
      callback(null, 500);
    } else if (user === null) {
      console.log("unable to fetch user details");
      callback(null, 207);
    } else {
      Users.find(
        { _id: { $ne: msg.user_id }, email: msg.email },
        (err, result) => {
          if (err) {
            console.log("server error:", err);
            callback(null, 500);
          }
          console.log("Result for checking email: ", result);
          if (result.length > 0) {
            console.log(`Email ${msg.email} already exists`);
            callback(null, 299);
          } else {
            //update user
            console.log("update user details from DB", user);
            console.log("User name is:", msg.name);
            user.username = msg.name;
            user.email = msg.email;
            user.phone_number = msg.phone_number;
            user.currency = msg.currency;
            user.ser_language = msg.ser_language;
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
        }
      );
    }
  });
}
exports.handle_request = handle_request;
