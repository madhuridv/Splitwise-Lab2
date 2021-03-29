const express = require("express");
const router = express();
const pool = require("../connection");

router.post("/getexpensedetails", (req, res) => {
  console.log("inside get expense");
  let groupName = req.body.groupNameFromProps;
  console.log(req.body.groupNameFromProps);
  let sql =
    " select distinct expenseDescription,amount,groupName,u.username,DATE_FORMAT(e.createdAt,'%d-%b-%Y') as Date from splitwise.expense e join users u on u.id = e.addedBy where groupName=? order by e.createdAt desc";

  pool.query(sql, [groupName], (err, result) => {
    if (err) {
      res.writeHead(500, {
        "Content-Type": "text/plain",
      });
      res.end("Error in Data");
    }
    console.log("Query result is:", result);
    if (result && result.length) {
      res.writeHead(200, {
        "Content-Type": "text/plain",
      });
      res.end(JSON.stringify(result));
    }
  });
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
  const expenseDesc = req.body.description;
  const amount = req.body.amount;
  const groupName = req.body.groupName;
  const paidBy = req.body.addedBy;
  const groupMembers = req.body.groupMembers;
  const groupStrength = groupMembers.length;
  console.log("count of grpMembers", groupStrength);
  console.log(
    "Data recieved from client to add expense : ",
    expenseDesc,
    amount,
    groupName,
    paidBy,
    groupMembers
  );
  //to insert in expense  table
  let insertExpenseSql =
    "INSERT INTO splitwise.expense (expenseDescription, amount, groupName, addedBy, lentTo, groupBalance) VALUES ?";
  console.log(insertExpenseSql);
  let expValues = [expenseDesc, amount, groupName, paidBy];
  let newExpValues = [];
  for (let i = 0; i < groupMembers.length; i++) {
    if (groupMembers[i].groupMembers !== paidBy) {
      expValue = [
        ...expValues,
        groupMembers[i].groupMembers,
        amount / groupMembers.length,
      ];
      newExpValues.push(expValue);
    }
  }
  console.log("newValues is: ", newExpValues);
  pool.query(insertExpenseSql, [newExpValues], (err, result) => {
    if (err) {
      console.log(err);
    } else {
      console.log(
        "Number of records inserted for Expense table: " + result.affectedRows
      );
    }
  });

  //to create multiple entries on Bal_summary table

  if (groupMembers.length > 0) {
    let insertBalSumSql =
      "INSERT INTO splitwise.balance ( amtToPay, groupName, payableTo, lentTO) VALUES (?,?,?,?)";
    let memExistSql =
      "select amtToPay from splitwise.balance where lentTo=? and payableTo=?";
    let updateAmtSql =
      "update splitwise.balance set amtToPay=? where lentTo=? and payableTo=?";
    splittedAmt = amount / groupMembers.length;
    console.log("splittedAmt :", splittedAmt);
    for (let i = 0; i < groupMembers.length; i++) {
      if (groupMembers[i].groupMembers !== paidBy) {
        pool.query(
          memExistSql,
          [groupMembers[i].groupMembers, paidBy],
          (err, result) => {
            if (err) {
              console.log(err);
            } else if (result.length === 0) {
              //check for reverse entry, if present substract it
              pool.query(
                memExistSql,
                [paidBy, groupMembers[i].groupMembers],
                (err, result) => {
                  if (err) {
                    console.log(err);
                  } else if (result.length > 0) {
                    let newAmt = result[0].amtToPay - splittedAmt;
                    pool.query(
                      updateAmtSql,
                      [newAmt, paidBy, groupMembers[i].groupMembers],
                      (err, result) => {
                        if (err) {
                          console.log(err);
                        } else {
                          console.log("Place1 : Amount updated.");
                        }
                      }
                    );
                  } else {
                    pool.query(
                      insertBalSumSql,
                      [
                        splittedAmt,
                        groupName,
                        paidBy,
                        groupMembers[i].groupMembers,
                      ],
                      (err, result) => {
                        if (err) {
                          console.log(err);
                        } else {
                          console.log("New entry added.");
                          console.log(
                            "Number of records inserted: " + result.affectedRows
                          );
                        }
                      }
                    );
                  }
                }
              );
            } else {
              //update entry
              let newAmount = splittedAmt + result[0].amtToPay;
              pool.query(
                updateAmtSql,
                [newAmount, groupMembers[i].groupMembers, paidBy],
                (err, result) => {
                  if (err) {
                    console.log(err);
                  } else {
                    console.log("Amount updated.");
                  }
                }
              );
            }
          }
        );
      }
    }
  }
});

module.exports = router;
