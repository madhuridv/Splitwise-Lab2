import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Button, Modal } from "react-bootstrap";
import axios from "axios";
import backendServer from "../webConfig";

function AddExpense(props) {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [description, setdescription] = useState();
  const [amount, setAmount] = useState();
  const [groupName, setGroupName] = useState();

  const onChangeDesc = (e) => {
    setdescription({
      description: e.target.value,
    });
  };
  const onChangeAmt = (e) => {
    setAmount({
      [e.target.name]: e.target.value,
    });
  };

  const onSubmitExpense = (e) => {
    e.preventDefault();

    console.log(Object.values(description));
    // console.log(props.groupData.groupName)

    const expenseData = {
      description: Object.values(description)[0],
      amount: Object.values(amount)[0],
      groupName: props.groupData.groupName,
      groupMembers: props.groupData.groupMembers,
      addedBy: localStorage.getItem("user_id"), //email
    };
    // const expenseData = {
    //   description: Object.values(description)[0],
    //   amount: Object.values(amount)[0],
    //   groupName: props.groupName,
    //   addedBy: localStorage.getItem("email_id"), //email
    // };

    console.log("expense data to post", expenseData);

    axios.defaults.withCredentials = true;
    axios
      .post(`${backendServer}/expense/expense`, expenseData)
      .then((response) => {
        console.log("response after post", response);
        if (response.status == 200 && response.data === "EXPENSE_ADDED") {
          alert("Expense added sucessfully!");
        }
      })
      .catch((error) => {
        alert("Failed to add expense");
        console.log("error:", error);
      });
    handleClose();
  };

  return (
    <div className="">
      <button className="btn float-right expense" onClick={handleShow}>
        Add an expense
      </button>

      <Modal show={show} onHide={handleClose}>
        <div className="container mt-4">
          <Modal.Header closeButton>
            <Modal.Title className="text-center text-info">
              Add a Bill
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="row">
              <div className="col-md-2"></div>
              <div className="col-md-8">
                <form
                  className="form"
                  id="expense-form"
                  onSubmit={onSubmitExpense}
                >
                  <div className="form-group">
                    <label>Description</label>
                    <input
                      id="description"
                      name="description"
                      onChange={onChangeDesc}
                      className="form-control"
                      type="text"
                      required
                    />
                    <p id="error-description" className="text-danger"></p>
                  </div>

                  <div className="form-group">
                    <label>Amount</label>
                    <input
                      pattern="^[0-9]*$"
                      id="amount"
                      name="amount"
                      placeholder="0.00$"
                      onChange={onChangeAmt}
                      className="form-control"
                      type="number"
                      required
                    />
                    <p id="error-expense-amount" className="text-danger"></p>
                  </div>
                  <Button variant="secondary" onClick={handleClose}>
                    Close
                  </Button>
                  <button type="submit" className="btn float-right expense">
                    Save
                  </button>
                </form>
                <div
                  id="error-message"
                  style={{ display: "none" }}
                  className="mt-4 alert alert-danger"
                ></div>
                <div
                  id="success-message"
                  style={{ display: "none" }}
                  className="mt-4 alert alert-success"
                ></div>
                <br />
              </div>
            </div>
          </Modal.Body>
        </div>
      </Modal>
    </div>
  );
}
export default AddExpense;
