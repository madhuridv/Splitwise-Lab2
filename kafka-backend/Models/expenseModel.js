const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const expenseSchema = new Schema(
  {
    groupId: { type: mongoose.Schema.Types.ObjectId, ref: "group" },
    groupName: { type: String },
    paidBy: { type: mongoose.Schema.Types.ObjectId, ref: "user" },
    expDesc: { type: String },
    amount: { type: Number },
    createdAt: { type: Date, default: Date.now },
    comments: [
      {
        message: { type: String },
        userId: { type: mongoose.Schema.Types.ObjectId, ref: "user" },
        username: { type: String },
        msgCreatedAt: { type: Date },
      },
    ],
    borrowers: [
      {
        _id: { type: mongoose.Schema.Types.ObjectId, ref: "user" },
        pendingAmt: { type: Number },
      },
    ],
  },
  {
    versionKey: false,
  }
);

module.exports = mongoose.model("expense", expenseSchema);
