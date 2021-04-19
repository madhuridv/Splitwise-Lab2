const express = require("express");
const router = express();
const kafka = require("../kafka/client");

router.post("/getexpensedetails", (req, res) => {
  console.log("inside get expense");
  console.log("req.body.groupNameFromProps", req.body.groupNameFromProps);
  kafka.make_request("getexpense", req.body, (err, result) => {
    console.log("expense details:", result);
    // if (result === 500) {
    //   res.writeHead(500, {
    //     "Content-Type": "text/plain",
    //   });
    //   res.end("SERVER_ERROR");
    // } else if (result === 207) {
    //   res.writeHead(207, {
    //     "Content-Type": "text/plain",
    //   });
    //   res.end("NO_EXPENSE");
    // } else {
    //   res.writeHead(200, {
    //     "Content-Type": "text/plain",
    //   });
    //   res.end(JSON.stringify(result));
    // }
  });
  // let sql =
  //   " select distinct expenseDescription,amount,groupName,u.username,DATE_FORMAT(e.createdAt,'%d-%b-%Y') as Date from splitwise.expense e join users u on u.id = e.addedBy where groupName=? order by e.createdAt desc";

  // pool.query(sql, [groupName], (err, result) => {
  //   if (err) {
  //     res.writeHead(500, {
  //       "Content-Type": "text/plain",
  //     });
  //     res.end("Error in Data");
  //   }
  //   console.log("Query result is:", result);
  //   if (result && result.length) {
  //     res.writeHead(200, {
  //       "Content-Type": "text/plain",
  //     });
  //     res.end(JSON.stringify(result));
  //   }
  // });
});

//   router.post("/expense", (req, res) => {
//     console.log("inside expense backend");
//     console.log(req.body.description);
//     let sql = `CALL insertExpense('${req.body.description}','${req.body.amount}','${req.body.groupName}','${req.body.addedBy}')`;

//     pool.query(sql, (err, result) => {
//       if (err) {
//         res.writeHead(500, {
//           "Content-Type": "text/plain",
//         });
//         res.end("Error in Data");
//       }
//       console.log("result is:", JSON.stringify(result));
//       if (
//         result &&
//         result.length > 0 &&
//         result[0][0].status === "EXPENSE_ADDED"
//       ) {
//         res.writeHead(200, {
//           "Content-Type": "text/plain",
//         });
//         res.end(result[0][0].status);
//       }
//     });
//   });

router.post("/expense", async (req, res) => {
  console.log("inside Add expense");

  const groupMembers = req.body.groupMembers;
  const groupStrength = groupMembers.length;
  console.log("count of grpMembers", groupStrength);
  console.log("Data recieved from client to add expense : ", req.body);
  kafka.make_request("addexpense", req.body, (err, result) => {
    console.log("resposnse status:", result);
    if (result === 500) {
      res.writeHead(500, {
        "Content-Type": "text/plain",
      });
      res.end("SERVER_ERROR");
    } else {
      res.writeHead(200, {
        "Content-Type": "text/plain",
      });
      res.end("EXPENSE_ADDED");
    }
  });
});

module.exports = router;
