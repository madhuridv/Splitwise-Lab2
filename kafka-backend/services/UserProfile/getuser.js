"use strict";
const Users = require("../../Models/userModel");

function handle_request(msg, callback) {
  console.log("inside get user service kafka backend");
  let email_id = msg.user_id;
  console.log("email_id", email_id);

  Users.findOne({ email: email_id }, (err, userDetail) => {
    console.log("get user result is:", userDetail);

    if (err) {
      callback(null, 500);
    } else if (userDetail === null) {
      callback(null, 207);
    } else {
      callback(null, userDetail);
    }
  });
}

exports.handle_request = handle_request;
