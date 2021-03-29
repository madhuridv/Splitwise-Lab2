const mongoose = require("mongoose");

const URI =
  "mongodb+srv://madhuri:madhuri@cluster0.mgkdz.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";

var options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  poolSize: 10,
  bufferMaxEntries: 0,
};
const db = async () => {
  await mongoose.connect(URI, options, (err, res) => {
    if (err) {
      console.log("error:", err);
    } else {
      console.log("MongoDB connected");
    }
  });
};

module.exports = db;
