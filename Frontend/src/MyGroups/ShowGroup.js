/* eslint-disable */
import React, { Component } from "react";
import DashboardNavbar from "../components/Dashboard/DashboardNavbar";
import AddExpense from "./AddExpense";
import axios from "axios";
import { connect } from "react-redux";
import backendServer from "../webConfig";
import expensePic from "../images/expense.png";
import PropTypes from "prop-types";
import { getGroupMembers } from "../actions/showGroupAction";

//to show list of groups
class ShowGroup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      groupName: "",
      groupMembers: [],
      userEmail: localStorage.getItem("email_id"),
      recentExpense: [],
    };
  }

  componentDidMount() {
    const groupNameFromProps = this.props.match.params.groupName;
    this.setState({
      groupName: groupNameFromProps,
    });
    console.log(groupNameFromProps);

    const groupData = { gName: groupNameFromProps };
    console.log("groupData: ", groupData);
    this.props.getGroupMembers(groupData);
    // axios.defaults.withCredentials = true;
    // axios
    //   .post(`${backendServer}/mygroup/getmembers`, groupData)
    //   .then((response) => {
    //     console.log("response from Axios query", response.data);
    //     this.setState({
    //       groupMembers: this.state.groupMembers.concat(response.data),
    //     });
    //   })
    //   .catch((error) => {
    //     console.log("error occured while connecting to backend:", error);
    //   });
    // axios
    //   .post(`${backendServer}/expense/getexpensedetails`, {
    //     groupNameFromProps,
    //   })
    //   .then((response) => {
    //     console.log("data is", response.data);
    //     this.setState({
    //       recentExpense: this.state.recentExpense.concat(response.data),
    //     });
    //   })
    //   .catch((error) => {
    //     console.log("error occured in axios post", error);
    //   });
  }
  componentWillReceiveProps(nextProps) {
    console.log("nextProps.allMembers", nextProps.allMembers.groupMembers);

    // this.setState({
    //   groupMembers: this.state.groupMembers.concat(
    //     nextProps.allMembers.groupMembers
    //   ),
    // });
    this.setState({
      groupMembers: nextProps.allMembers.groupMembers.map((a) => a._id),
    });
    console.log("group Members Data:", this.state.groupMembers);
  }

  render() {
    //let expense = this.state.recentExpense;
    let obj = [...this.state.recentExpense];
    let expense = obj.sort((a, b) => a.Date - b.Date);
    //console.log("expense is :", expense);
    let gName = this.state.groupName;

    console.log("groupdata to sent to addexpense", this.state);
    return (
      <div className="showGroup">
        <DashboardNavbar />
        <div className="">
          <div className="row">
            <div className="col-sm-2"></div>

            <div className="col" id="dash-center">
              <div className="container">
                <div className="row  align-items-center">
                  <div className="col">
                    <h3>{gName}</h3>
                  </div>
                  <AddExpense groupData={this.state} />
                </div>
                <div>
                  <div className="">
                    <h5>Recent Activity</h5>
                    {expense.map((exp) => (
                      <div className="list-group list-group-flush">
                        <div className="d-flex w-100 justify-content-between">
                          <h5 className="mb-1"></h5>
                          <small className="text-muted">{exp.Date}</small>
                        </div>

                        <p className="mb-1">
                          {" "}
                          {/* <img
                            src={expensePic}
                            style={{ height: "fit-content" }}
                            alt="Expense"
                          /> */}
                          {exp.expenseDescription}
                        </p>
                        <small className="text-muted">
                          {exp.username} paid ${exp.amount}
                        </small>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="col-sm-2"></div>
          </div>
        </div>
      </div>
    );
  }
}
ShowGroup.propTypes = {
  getGroupMembers: PropTypes.func.isRequired,
};
const mapStateToProps = (state) => ({
  allMembers: state.showGroups.allMembers,
});

export default connect(mapStateToProps, { getGroupMembers })(ShowGroup);
