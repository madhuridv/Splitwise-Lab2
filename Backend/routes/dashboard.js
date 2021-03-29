const express = require("express");
const router = express();
const pool = require("../connection");

router.post("/owedata", (req, res) => {
  console.log("inside dashboard owe data");
  const user_id = req.body.user_id;
  console.log(user_id);
  let sql =
    "select groupName,round(sum(amtToPay),2) as totalOwesAmount from splitwise.balance where lentTo = ? group by groupName";

  pool.query(sql, [user_id], (err, result) => {
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

router.post("/oweddata", (req, res) => {
  console.log("inside dashboard owed data");
  const user_id = req.body.user_id;
  console.log(user_id);
  let sql =
    "select groupName,round(sum(amtToPay),2) as totalOwedAmount from splitwise.balance where payableTo = ? group by groupName";

  pool.query(sql, [user_id], (err, result) => {
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

router.post("/settleup", (req, res) => {
  console.log("inside settle up backend");
  const user_id = req.body.user_id;
  console.log(user_id);
  let sql = "update splitwise.balance set amtToPay = 0 where lentTo = ?";
  console.log(sql);
  pool.query(sql, [user_id], (err, result) => {
    if (err) {
      res.writeHead(500, {
        "Content-Type": "text/plain",
      });
      res.end("Error in Data");
    }
    console.log(
      "Number of records inserted for Expense table: ",
      result.affectedRows
    );
    if (result && result.length) {
      res.writeHead(200, {
        "Content-Type": "text/plain",
      });
      res.end();
    }
  });
});
router.post("/recent", (req, res) => {
  console.log("inside recent backend");

  let sql =
    "select distinct expenseDescription, groupName, amount, u.userName,e.createdAt as Date from expense e join users u on e.addedBy = u.id order by e.createdAt desc";
  console.log(sql);
  pool.query(sql, (err, result) => {
    if (err) {
      res.writeHead(500, {
        "Content-Type": "text/plain",
      });
      res.end("Error in Data");
    }
    console.log("select reult is", result);
    if (result && result.length) {
      res.writeHead(200, {
        "Content-Type": "text/plain",
      });
      res.end(JSON.stringify(result));
    } else {
      res.writeHead(400, {
        "Content-Type": "text/plain",
      });
      res.end();
    }
  });
});

router.post("/recentsettle", (req, res) => {
  console.log("inside recent settle backend");
  const user_id = req.body.user_id;
  console.log(user_id);
  let sql =
    "select distinct b.groupName,u.username,b.createdAt as Date from splitwise.balance b join users u on b.lentTo = u.id where b.amtToPay = 0 group by u.username order by b.createdAt desc";
  console.log(sql);
  pool.query(sql, [user_id], (err, result) => {
    if (err) {
      res.writeHead(500, {
        "Content-Type": "text/plain",
      });
      res.end("Error in Data");
    }
    console.log("select result is", result);
    if (result && result.length) {
      res.writeHead(200, {
        "Content-Type": "text/plain",
      });
      res.end(JSON.stringify(result));
    } else {
      res.writeHead(400, {
        "Content-Type": "text/plain",
      });
      res.end();
    }
  });
});
module.exports = router;
