import React, { Component } from "react";
import "../../styles/dashboard.css";
import DashboardMiddle from "./DashboardMiddle";
import axios from "axios";
import backendServer from "../../webConfig.js";
import { Link } from "react-router-dom";
import { BrowserRouter } from "react-router-dom";

class DashboardHeader extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user_id: localStorage.getItem("user_id"),
    };
  }
  onSettleUp = (e) => {
    e.preventDefault();
    alert("Ready to Settle Up?");
    console.log(this.state.user_id);
    const userInfo = { user_id: this.state.user_id };
    axios.defaults.withCredentials = true;
    axios
      .post(`${backendServer}/dashboard/settleup`, userInfo)
      .then((response) => {
        console.log("response from Axios query", response.data);
        // this.setState({
        //   groupMembers: this.state.groupMembers.concat(response.data),
        // });
      })
      .catch((error) => {
        console.log("error occured while connecting to backend:", error);
      });
  };
  render() {
    return (
      <div className="">
        <div className="showGroup">
          <div className="col-sm-2"></div>
          <div className="DashHeader">
            <h3>Dashboard</h3>
            <BrowserRouter>
            <Link
              className="btn float-right"
              style={{ marginRight: "10px" }}
              to={`/recentactivity`}
            >
              Recent Activity
            </Link>
            </BrowserRouter>
            <button
              className="btn float-right settle"
              onClick={this.onSettleUp}
            >
              Settle up
            </button>

            <DashboardMiddle />
          </div>
        </div>
        <div className="col-sm-2"></div>
      </div>
    );
  }
}
export default DashboardHeader;
