const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const groupSchema = new Schema(
  {
    groupName: { type: String, required: true },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "user" },
    groupMembers: [
      {
        _id: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "user",
        },
        isAccepted: { type: Number, default: 0 },
      },
    ],
  },
  {
    versionKey: false,
  }
);

module.exports = mongoose.model("group", groupSchema);
