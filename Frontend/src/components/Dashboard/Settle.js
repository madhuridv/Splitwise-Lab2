import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Button, Modal } from "react-bootstrap";
import axios from "axios";
import backendServer from "../../webConfig";
import { Multiselect } from "multiselect-react-dropdown";

function Settle(props) {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [member, setMember] = useState();
  console.log("members from props", props.members);
  const settleUsers = props.members;
  console.log("settleUsers", settleUsers);

  const onSubmitExpense = (e) => {
    e.preventDefault();
    const settleData = {
      settleUserAmt: member[0].pendingAmt,
      settleWithUserId: member[0].payableToUserId,
      settlededById: localStorage.getItem("user_id"),
    };

    console.log("settleData to post", settleData);

    axios.defaults.withCredentials = true;
    axios
      .post(`${backendServer}/dashboard/settleup`, settleData)
      .then((response) => {
        console.log("response after Axios post", response);
        if (response.status == 200) {
          if (alert("Settled up sucessfully!")) {
          } else {
            window.location.reload();
          }
        }
      })
      .catch((error) => {
        alert("Failed to Settle Up");
        console.log("error:", error);
      });
    handleClose();
  };

  return (
    <div>
      <div>
        <button className="btn float-right settle" onClick={handleShow}>
          Settle up
        </button>
      </div>

      <Modal show={show} onHide={handleClose} animation={false} centered>
        <div>
          <Modal.Header closeButton className="modal-header modal-head">
            <Modal.Title className="text-center">Settle Up</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="row">
              <div className="col-md-8">
                <form
                  className="form"
                  id="expense-form"
                  onSubmit={onSubmitExpense}
                >
                  <Multiselect
                    options={settleUsers}
                    singleSelect // Options to display in the dropdown
                    displayValue="payableTo"
                    placeholder="Select to settle"
                    onSelect={(user) => {
                      setMember(user);
                    }}
                    id="multiselect-custom"
                    style={{ chips: { background: "#5bc5a7" } }} // Property name to display in the dropdown options
                  />
                  <br></br>
                  <Button variant="secondary" onClick={handleClose}>
                    Close
                  </Button>

                  <button type="submit" className="btn float-right expense">
                    Settle
                  </button>
                </form>
              </div>
            </div>
          </Modal.Body>
        </div>
      </Modal>
    </div>
  );
}
export default Settle;
