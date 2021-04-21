const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const recentSchema = new Schema(
  {
    paidBy: { type: mongoose.Schema.Types.ObjectId, ref: "user" },
    eventId: { type: Number },
    eventType: { type: String },
    groupName: { type: String },
    expDesc: { type: String },
    amount: { type: Number },
    createdAt: { type: Date, default: Date.now },
  },
  {
    versionKey: false,
  }
);

module.exports = mongoose.model("recent", recentSchema);
