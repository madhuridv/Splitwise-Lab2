import React, { Component } from "react";
import axios from "axios";
import backendServer from "../../webConfig.js";
import man from "../../images/man.png";
import lady from "../../images/lady.png";
import { getDashData } from "../../actions/dashboardActions";
import PropTypes from "prop-types";
import { connect } from "react-redux";

class DashboardMiddle extends Component {
  state = {};
  constructor(props) {
    super(props);
    this.state = {
      dashData: {},
      user_id: localStorage.getItem("user_id"),
    };
    // this.getDashSummary = this.getDashSummary.bind(this);
  }

  // getDashSummary = (userData) => {
  //   axios.defaults.withCredentials = true;
  //   axios
  //     .post(`${backendServer}/dashboard/getdashdata`, userData)
  //     .then((response) => {
  //       console.log("Data came from Axios call", response.data);
  //       this.setState({
  //         dashData: response.data,
  //       });
  //     })
  //     .catch((error) => {
  //       console.log("error occured while connecting to backend:", error);
  //     });
  // };
  componentDidMount() {
    document.title = "Dashboard";
    const data = { userid: this.state.user_id };
    console.log("userData : ", data);
    this.props.getDashData(data);
  }
  render() {
    // let dashBoardData = this.state.dashData;
    // console.log("dashBoardData: ", dashBoardData);
    // let youAreOwed = this.state.dashData.keyYouAreOwed;
    // console.log("youAreOwed: ", youAreOwed);
    // let youOwed = this.state.dashData.keyYouOwe;
    // console.log("youOwed: ", youOwed);

    let dashBoardData = this.props.dashboardData;
    console.log("dashBoardData: ", dashBoardData);
    let youAreOwed = this.props.dashboardData.youAreOwed;
    console.log("youAreOwed: ", youAreOwed);
    let youOwed = this.props.dashboardData.youOwe;
    console.log("youOwed: ", youOwed);

    let TotalOwe = 0;
    let TotalOwed = 0;
    if (youAreOwed && youAreOwed.length > 0) {
      for (let i = 0; i < youAreOwed.length; i++) {
        TotalOwed = TotalOwed + youAreOwed[i].amtToPay;
      }
    }
    if (youOwed && youOwed.length > 0) {
      for (let i = 0; i < youOwed.length; i++) {
        TotalOwe = TotalOwe + youOwed[i].amtToPay;
      }
    }
    let TotalBalance = TotalOwed - TotalOwe;

    return (
      <div className="">
        <div className="MidDash">
          <div className="DashHeader"></div>

          <div className="totalCollection">
            <div>
              <label htmlFor="">YOU OWE</label>
            </div>
            <div>
              <label htmlFor="" className="float-right mr-4">
                YOU ARE OWED
              </label>
            </div>
          </div>
          <div className="flex">
            <div className="float-left ml-3 borders">
              <ul>
                {youOwed && youOwed.length > 0 ? (
                  youOwed.map((blog) => (
                    <span>
                      <p style={{ color: "red" }}>
                        You owe {blog.payableTo} $
                        {(Math.round(blog.pendingAmt * 100) / 100).toFixed(2)}
                      </p>
                    </span>
                  ))
                ) : (
                  <li>
                    You do not owe anything
                    <img className="imgs" src={man} alt="" align="left" />
                  </li>
                )}
              </ul>
            </div>

            <div>
              <ul>
                {youAreOwed && youAreOwed.length > 0 ? (
                  youAreOwed.map((blog) => (
                    <span>
                      <p className="green">
                        {blog.borrower} owes $
                        {(Math.round(blog.pendingAmt * 100) / 100).toFixed(2)}
                      </p>
                    </span>
                  ))
                ) : (
                  <li>
                    You are not owed anything
                    <img className="imgs" src={lady} alt="" align="left" />
                  </li>
                )}
              </ul>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

DashboardMiddle.propTypes = {
  getDashData: PropTypes.func.isRequired,
};
const mapStateToProps = (state) => ({
  dashboardData: state.dashboard.dashboardData,
});

export default connect(mapStateToProps, { getDashData })(DashboardMiddle);
