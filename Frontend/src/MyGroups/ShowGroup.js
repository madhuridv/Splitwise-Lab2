/* eslint-disable */
import React, { Component } from "react";
import DashboardNavbar from "../components/Dashboard/DashboardNavbar";
import AddExpense from "./AddExpense";
import Comments from "./comments";
import axios from "axios";
import { connect } from "react-redux";
import backendServer from "../webConfig";
import expensePic from "../images/expense.png";
import PropTypes from "prop-types";
import { getGroupMembers, getExpense } from "../actions/showGroupAction";
import { Redirect } from "react-router";

//to show list of groups
class ShowGroup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isActive: false,
      groupName: "",
      groupMembers: [],
      accept: [],
      userEmail: localStorage.getItem("email_id"),
      recentExpense: [],
    };
  }

  componentDidMount() {
    const groupNameFromProps = this.props.match.params.groupName;
    this.setState({
      groupName: groupNameFromProps,
    });
    console.log("groupNameFromProps", groupNameFromProps);

    const groupData = { gName: groupNameFromProps };
    console.log("groupData: ", groupData);
    this.props.getGroupMembers(groupData);
    //this.props.getExpense(groupNameFromProps);

    axios
      .post(`${backendServer}/expense/getexpensedetails`, {
        groupNameFromProps,
      })
      .then((response) => {
        console.log("recent activity data is", response.data);
        this.setState({
          recentExpense: this.state.recentExpense.concat(response.data),
        });
      })
      .catch((error) => {
        console.log("error occured in axios post", error);
      });
  }
  componentWillReceiveProps(nextProps) {
    console.log("nextProps.allMembers", nextProps.allMembers);
    this.setState({
      groupMembers: this.state.groupMembers.concat(
        nextProps.allMembers.groupMembers
      ),
    });
  }

  render() {
    //if not logged in go to login page
    let redirectVar = null;
    if (!localStorage.getItem("token")) {
      redirectVar = <Redirect to="/login" />;
    }

    console.log("Props grp members:", this.props.allMembers);
    let expense = this.state.recentExpense;
    console.log("expense", expense);
    //let expense = obj.sort((a, b) => a.Date - b.Date);
    let exp1 = this.state.exp;
    //console.log("expense is :", expense);
    let gName = this.state.groupName;

    console.log("group Members Data:", this.state.groupMembers);

    console.log("groupdata to sent to addexpense", this.state);
    return (
      <div className="showGroup">
        {redirectVar}
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
                  {/* <AddExpense groupMembers={this.props.groupMembers}
											groupName={this.state.groupName}											
											method={this.addExpenseData} /> */}
                  <AddExpense groupData={this.state} />
                </div>
                <div>
                  <div className="">
                    <h5>Recent Activity</h5>
                    {expense.map((exp) => (
                      <div
                        className="list-group list-group-flush"
                        key={exp.expenseID}
                        onClick={() => {
                          this.setState({
                            expenseId: exp.expenseID,
                          });
                        }}
                      >
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
                          Expense : {exp.expDesc}
                        </p>
                        <small className="text-muted">
                          {exp.paidBy} paid ${exp.amount}
                        </small>
                        <div>
                          {this.state.expenseId === exp.expenseID ? (
                            <Comments
                              expId={exp.expenseID}
                              expComment={exp.comment}
                              groupName={this.state.groupName}
                            />
                          ) : null}
                        </div>
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
  getExpense: PropTypes.func.isRequired,
};
const mapStateToProps = (state) => ({
  allMembers: state.showGroups.allMembers,
});

export default connect(mapStateToProps, { getGroupMembers, getExpense })(
  ShowGroup
);
