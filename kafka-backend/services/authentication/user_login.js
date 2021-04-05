var express = require("express");
var router = express.Router();
const bcrypt = require("bcrypt");
const saltRounds = 10;
const Users = require("../../Models/userModel");

function handle_request(message, callback) {
  console.log("inside handle req user login", message.email);
  let emailId = message.email;
  console.log("EmailId is:", emailId);

  Users.findOne({ email: emailId }, function (err, user) {
    console.log("user from DB received", user);

    if (err) {
      callback(null, 500);
    } else if (user === null) {
      callback(null, 207);
    } else {
      bcrypt.compare(message.password, user.password, (err, isPasswordTrue) => {
        if (err) {
          callback(null, 500);
        } else {
          if (isPasswordTrue) {
            // delete user.password;
            callback(null, user);
          } else {
            callback(null, 209);
          }
        }
      });
    }
  });
  // callback(null, "something vague")
}
exports.handle_request = handle_request;
