const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let usersSchema = new Schema(
  {
    username: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    phone_number: { type: String, required: false },
    user_image: { type: String, required: false },
    timezone: {
      type: String,
      required: false,
      default: "(GMT-08:00) Pacific Time",
    },
    currency: { type: String, required: false, default: "USD" },
    user_language: { type: String, required: false, default: "English" },
  },
  {
    versionKey: false,
  }
);

const userModel = mongoose.model("user", usersSchema);
module.exports = userModel;
