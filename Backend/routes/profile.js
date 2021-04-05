const express = require("express");
const router = express.Router();
const kafka = require("../kafka/client");

router.get("/:user_id", (req, res) => {
  console.log("inside getuser backend");
  console.log("req.params", req.params);
  kafka.make_request("getuser", req.params, (err, result) => {
    console.log("Get user Details:", result);
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
      res.end(JSON.stringify(result));
    }
  });
});

router.post("/user", (req, res) => {
  console.log("inside user profile update");
  console.log("req.body", req.body);
  kafka.make_request("updateuser", req.body, (err, result) => {
    console.log("updated details:", result);
    if (result === 500) {
      res.writeHead(500, {
        "Content-Type": "text/plain",
      });
      res.end("SERVER_ERROR");
    } else if (result === 207) {
      res.writeHead(207, {
        "Content-Type": "text/plain",
      });
      res.end("NO_USER_DETAILS");
    } else if (result === 209) {
      res.writeHead(209, {
        "Content-Type": "text/plain",
      });
      res.end("SAVE_FAILED");
    } else {
      res.writeHead(200, {
        "Content-Type": "text/plain",
      });
      res.end(JSON.stringify(result));
    }
  });
});
// router.get("/:user_id", (req, res) => {
//   let sql = `CALL getUserDetails('${req.params.user_id}', NULL);`;
//   pool.query(sql, (err, result) => {
//     if (err) {
//       res.writeHead(500, {
//         "Content-Type": "text/plain",
//       });
//       res.end("Error in Data");
//     }
//     console.log("result is:", result);
//     if (result && result.length > 0 && result[0][0]) {
//       res.writeHead(200, {
//         "Content-Type": "text/plain",
//       });
//       res.end(JSON.stringify(result[0]));
//     }
//   });
// });

// router.post("/user", (req, res) => {
//   console.log("inside update");
//   console.log(req.body.user_language);
//   console.log(req.body.timezone);

//   let sql = `CALL updateUser('${req.body.user_id}','${req.body.email}','${req.body.name}', '${req.body.address}', '${req.body.phone_number}', '${req.body.currency}', '${req.body.timezone}', '${req.body.user_language}');`;
//   pool.query(sql, (err, result) => {
//     console.log("result is", result);
//     if (err) {
//       console.log(err);
//       res.writeHead(500, {
//         "Content-Type": "text/plain",
//       });
//       res.end("Error in Data");
//     }
//     if (result && result.length > 0 && result[0][0].status === "USER_UPDATED") {
//       res.writeHead(200, {
//         "Content-Type": "text/plain",
//       });
//       res.end(result[0][0].status);
//     } else if (
//       result &&
//       result.length > 0 &&
//       result[0][0].status === "NO_RECORD"
//     ) {
//       res.writeHead(401, {
//         "Content-Type": "text/plain",
//       });
//       res.end(result[0][0].status);
//     }
//   });
// });

module.exports = router;
