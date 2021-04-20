const app = require("./app");
const mongoose = require("mongoose");
//const db = require("./connection");

//db();
const URI =
  "mongodb+srv://madhuri:madhuri@cluster0.mgkdz.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";

var options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  poolSize: 10,
  bufferMaxEntries: 0,
};
const mongoConnection = async () => {
  await mongoose.connect(URI, options, (err, res) => {
    if (err) {
      console.log("error:", err);
    } else {
      console.log("MongoDB connected");
    }
  });
};

mongoConnection();

const login = require("./routes/login");
const signup = require("./routes/signup");
const profile = require("./routes/profile");
const images = require("./routes/images");
const uploads = require("./routes/uploads");
const creategroup = require("./routes/creategroup");
const mygroup = require("./routes/mygroup");
 const expense = require("./routes/expense");
// const dashboard = require("./routes/dashboard");

app.use("/login", login);
app.use("/signup", signup);
app.use("/profile", profile);
app.use("/images", images);
app.use("/uploads", uploads);
app.use("/creategroup", creategroup);
app.use("/mygroup",mygroup);
app.use("/expense",expense);
// app.use("/dashboard",dashboard);

const port = process.env.PORT || 3001;
var server = app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});

module.exports = app;
