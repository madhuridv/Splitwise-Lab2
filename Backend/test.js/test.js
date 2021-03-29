var assert = require("chai").assert;
var app = require("../index");

var chai = require("chai");
chai.use(require("chai-http"));
var expect = require("chai").expect;

var agent = require("chai").request.agent(app);

describe("Splitwise", function () {
  describe("Login Test", function () {
    it("Incorrect Password", () => {
      agent
        .post("/login")
        .send({ email_id: "manish@gmail.com", password: "manish1" })
        .then(function (res) {
          expect(res.text).to.equal("NO_USER");
        })
        .catch((error) => {
          console.log(error);
        });
    });

    it("Invalid User", () => {
      agent
        .post("/login")
        .send({ email_id: "manish1@gmail.com", password: "manish1" })
        .then(function (res) {
          expect(res.text).to.equal("NO_USER");
        })
        .catch((error) => {
          console.log(error);
        });
    });

    it("Successful Login", () => {
      agent
        .post("/login")
        .send({ email_id: "manish@gmail.com", password: "manish" })
        .then(function (res) {
          expect(res.status).to.equal(200);
        })
        .catch((error) => {
          console.log(error);
        });
    });
  });
});

describe("User Signup Test", () => {
  it("User Exists", () => {
    agent
      .post("/signup")
      .send({
        name: "manish",
        email_id: "manish@gmail.com",
        password: "manish",
      })
      .then(function (res) {
        expect(res.text).to.equal("USER_EXISTS");
      })
      .catch((error) => {
        console.log(error);
      });
  });

  it("Successful User Signup", () => {
    agent
      .post("/signup")
      .send({
        name: "manish",
        email_id: "manish@gmail.com",
        password: "manish",
      })
      .then(function (res) {
        expect(res.status).to.equal(200);
      })
      .catch((error) => {
        console.log(error);
      });
  });
});

describe("User Profile Test", () => {
  it("Fetch user Name from user id", function () {
    agent
      .get("/profile/2")
      .then(function (res) {
        expect(JSON.parse(res.text)[0].name).to.equal("manish");
      })
      .catch((error) => {
        console.log(error);
      });
  });
  describe("Create group Test", () => {
    it("Fetch all registered users for grouop creation", function () {
      agent
        .get("/creategroup/getUser")
        .then(function (res) {
          expect(res.status).to.equal(200);
        })
        .catch((error) => {
          console.log(error);
        });
    });
  });
  describe("Dashboard Test", () => {
    it("Get Details of balance data", () => {
      agent
        .post("/owedata")
        .send({
          user_id: "5",
        })
        .then(function (res) {
          expect(res.status).to.equal(404);
        })
        .catch((error) => {
          console.log(error);
        });
    });
  });
});
