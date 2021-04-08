const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const kafka = require("../kafka/client");

const userstorage = multer.diskStorage({
  destination: path.join(__dirname, "..") + "/public/userImage",
  filename: (req, file, cb) => {
    cb(
      null,
      "user" +
        req.params.user_id +
        "-" +
        Date.now() +
        path.extname(file.originalname)
    );
  },
});

const useruploads = multer({
  storage: userstorage,
  limits: { fileSize: 1000000 },
}).single("image");

router.post("/:user_id", (req, res) => {
  console.log("inside upload");
  useruploads(req, res, function (err) {
    console.log("file name is:", req.file.filename);
    console.log("params", req.params);
    kafka.make_request(
      "image",
      { body: req.params, filename: req.file.filename },
      (err, result) => {
        console.log("Image Details:", result);
        if (result === 500) {
          res.writeHead(500, {
            "Content-Type": "text/plain",
          });
          res.end("Server Side Error");
        } else if (result === 207) {
          res.writeHead(299, {
            "Content-Type": "text/plain",
          });
          res.end("No_USER_DETAILS");
        } else {
          res.writeHead(200, {
            "Content-Type": "text/plain",
          });
          res.end(result.user_image);
        }
      }
    );
  });
});

module.exports = router;
