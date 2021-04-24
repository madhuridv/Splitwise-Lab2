import React, { Component } from "react";
import DashboardNavbar from "../DashboardNavbar";
import axios from "axios";
import backendServer from "../../../webConfig";
import { Pagination } from "react-bootstrap";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getRecentData } from "../../../actions/recentActivityActions";
import { Redirect } from "react-router";

class RecentActivity extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activity: [],
      user_id: localStorage.getItem("user_id"),
      settle: [],
      curPage: 1,
      pageSize: 2,
    };
  }
  onPage = (e) => {
    console.log("In pagination");
    console.log(e.target);
    console.log(e.target.text);
    this.setState({
      curPage: e.target.text,
    });
  };

  OnChange = (e) => {
    console.log("Inside Onchange");
    console.log(e.target.type);
    console.log(e.target.value);
    this.setState({
      pageSize: parseInt(e.target.value, 10),
    });
  };
  componentDidMount() {
    document.title = "Recent Activity";
    console.log(this.state.user_id);
    const activityInfo = { user_id: this.state.user_id };
    console.log("activityInfo", activityInfo);
    this.props.getRecentData(activityInfo);
    // axios.defaults.withCredentials = true;
    // axios
    //   .post(`${backendServer}/dashboard/recent`, activityInfo)
    //   .then((response) => {
    //     console.log("data is", response.data);
    //     this.setState({
    //       activity: this.state.activity.concat(response.data),
    //     });
    //   })
    //   .catch((error) => {
    //     console.log("error occured while connecting to backend:", error);
    //   });
  }
  componentWillReceiveProps(nextProps) {
    console.log("nextProps.recentData", nextProps.recentData);

    this.setState({
      activity: this.state.activity.concat(nextProps.recentData),
    });
  }
  render() {
    //if not logged in go to login page
    let redirectVar = null;
    if (!localStorage.getItem("token")) {
      redirectVar = <Redirect to="/login" />;
    }

    let paginationItemsTag = [];
    let items = this.state.activity;

    console.log("Recent activity data is:", items);

    let pgSize = this.state.pageSize;

    let count = 1;
    let num = items.length / pgSize;
    console.log(items.length / pgSize);
    console.log(Number.isInteger(items.length / pgSize));
    if (Number.isInteger(num)) {
      count = num;
    } else {
      count = Math.floor(num) + 1;
    }

    // if (items.length % pgSize == 0) {
    //   count =  pgSize;
    // } else {
    //   count =  pgSize + 1;
    // }
    console.log("count:", count);
    console.log("items.length:", items.length);

    let active = this.state.curPage;

    for (let number = 1; number <= count; number++) {
      paginationItemsTag.push(
        <Pagination.Item key={number} active={number === active}>
          {number}
        </Pagination.Item>
      );
    }

    // console.log("paginate");
    let start = parseInt(pgSize * (this.state.curPage - 1));
    let end = this.state.pageSize + start;
    //   console.log("start: ", start, ", end: ", end);
    let displayitems = [];
    if (end > items.length) {
      end = items.length;
    }
    for (start; start < end; start++) {
      displayitems.push(items[start]);
    }
    // console.log("displayitems", displayitems);

    return (
      <div className="showGroups">
        {redirectVar}
        <DashboardNavbar />
        <div className="">
          <div className="row">
            <div className="col-sm-2"></div>

            <div className="col" id="dash-center">
              <div className="container">
                <div className="row  align-items-center">
                  <div className="col">
                    <h3>Recent Activities</h3>
                    <span>
                      <select onChange={this.OnChange}>
                        <option>2</option>
                        <option>5</option>
                        <option>10</option>
                      </select>
                    </span>
                    &nbsp;&nbsp;
                    {displayitems && displayitems.length > 0 ? (
                      <div>
                        {displayitems.map((activity) =>
                          activity.eventId === 1 ? (
                            <div className="list-group list-group-horizontal">
                              <li
                                className="list-group-item"
                                style={{
                                  fontFamily: "sans-serif",
                                  fontSize: "20px",
                                  width: "100%",
                                }}
                              >
                                {activity.settlededBy} settled dues of $
                                {activity.amount} with {activity.settleWithUser}
                              </li>
                            </div>
                          ) : (
                            <div className="list-group list-group-horizontal">
                              <li
                                className="list-group-item"
                                style={{
                                  fontFamily: "sans-serif",
                                  fontSize: "20px",
                                  width: "100%",
                                }}
                              >
                                {activity.paidBy} added an expense "
                                {activity.expDesc}" of amount ${activity.amount}{" "}
                                in "{activity.groupName}"
                              </li>
                            </div>
                          )
                        )}
                      </div>
                    ) : (
                      <h4 className="alert-success">
                        No Recent Activity to show
                      </h4>
                    )}
                  </div>
                </div>
                <center>
                  <br />
                  <br />
                  <Pagination
                    onClick={this.onPage}
                    style={{ display: "inline-flex" }}
                  >
                    {paginationItemsTag}
                  </Pagination>
                </center>
              </div>
            </div>

            <div className="col-sm-2"></div>
          </div>
        </div>
      </div>
    );
  }
}
RecentActivity.propTypes = {
  getRecentData: PropTypes.func.isRequired,
};
const mapStateToProps = (state) => ({
  recentData: state.recentActivity.recentData,
});

export default connect(mapStateToProps, { getRecentData })(RecentActivity);
