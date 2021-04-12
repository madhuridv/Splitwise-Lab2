const app = require("./app");
//const db = require("./connection");

//db();

const login = require("./routes/login");
const signup = require("./routes/signup");
const profile = require("./routes/profile");
const images = require("./routes/images");
const uploads = require("./routes/uploads");
const creategroup = require("./routes/creategroup");
const mygroup = require("./routes/mygroup");
// const expense = require("./routes/expense");
// const dashboard = require("./routes/dashboard");

app.use("/login", login);
app.use("/signup", signup);
app.use("/profile", profile);
app.use("/images", images);
app.use("/uploads", uploads);
app.use("/creategroup", creategroup);
app.use("/mygroup",mygroup);
// app.use("/expense",expense);
// app.use("/dashboard",dashboard);

const port = process.env.PORT || 3001;
var server = app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});

module.exports = app;
