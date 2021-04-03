const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let usersSchema = new Schema(
  {
    username: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
  },
  {
    versionKey: false,
  }
);

const userModel = mongoose.model("user", usersSchema);
module.exports = userModel;
