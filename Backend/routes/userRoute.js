const app = require("express").Router();
//const jwt = require('jsonwebtoken');
const userOperation = require("../Db/CRUD");
const db = require("../connection"); //db connection
const user = require("../Db/models/schema"); //model
const bcrypt = require("bcrypt");
const rounds = 10;

// app.post("/signup", (req, res) => {
//   console.log("Req.body:", req.body);
//  let userObj = req.body;
//   let credentials = req.body.password;
//   console.log("user password is:", credentials);
//   var hash = bcrypt.hashSync(credentials, rounds);
//   userObj.password=hash;
//   console.log("Object is:", userObj);

//   userOperation.AddUser(userObj, res);
// });

// app.get("/signup", (req, res) => {
//   user
//     .findAll()
//     .then((users) => {
//       console.log(users);
//       res.sendStatus(200);
//     })
//     .catch((err) => {
//       console.log(err);
//     });
// });

//adding into table manually
// app.get("/add", (req, res) => {
//   const data = {
//     username: "Madhuri",
//     email: "madhuri@gmail.com",
//     password: "abc123"
//   }

//   let { username, email, password } = data;

//   //inserting into manually
//   user
//     .create({
//       username,
//       email,
//       password,
//     })
//     .then((user) => res.redirect("http://localhost:3000/signup"))
//     .catch((err) => {
//       console.log(err);
//     });
// });
module.exports = app;
