import React, { Component } from "react";
import DashboardNavbar from "../DashboardNavbar";
import axios from "axios";
import backendServer from "../../../webConfig";

class RecentActivity extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activity: [],
      user_id: localStorage.getItem("user_id"),
      settle: [],
    };
  }
  componentDidMount() {
    document.title = "Recent Activiy";
    console.log(this.state.user_id);
    const userInfo = { user_id: this.state.user_id };
    axios.defaults.withCredentials = true;
    axios
      .post(`${backendServer}/dashboard/recent`, userInfo)
      .then((response) => {
        console.log("data is", response.data);
        this.setState({
          activity: this.state.activity.concat(response.data),
        });
      })
      .catch((error) => {
        console.log("error occured while connecting to backend:", error);
      });

    axios.defaults.withCredentials = true;
    axios
      .post(`${backendServer}/dashboard/recentsettle`)
      .then((response) => {
        console.log("data is", response.data);
        this.setState({
          settle: this.state.settle.concat(response.data),
        });
      })
      .catch((error) => {
        console.log("error occured while connecting to backend:", error);
      });
  }
  render() {
    let activityList = this.state.activity;
    console.log(activityList);
    let settleList = this.state.settle;
    let obj = [...activityList, ...settleList];
    console.log("object", obj);
    let recent = obj.sort((a, b) => a.Date - b.Date);
    console.log("recent:", recent);
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
                    <h3>Recent Activities</h3>
                    {settleList.map((set) => (
                      <div className="list-group list-group-horizontal">
                        <ul className="list-group">
                          <li className="list-group-item">
                            {set.username} cleared dues in {set.groupName}
                          </li>
                        </ul>
                      </div>
                    ))}

                    {activityList.map((act) => (
                      <div className="list-group list-group-horizontal">
                        <ul className="list-group">
                          <li className="list-group-item">
                            {act.userName} added {act.expenseDescription} to{" "}
                            {act.groupName}
                          </li>
                        </ul>
                      </div>
                    ))}
                  </div>
                </div>
                <div></div>
              </div>
            </div>

            <div className="col-sm-2"></div>
          </div>
        </div>
      </div>
    );
  }
}

export default RecentActivity;
