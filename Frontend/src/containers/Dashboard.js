import React, { Component } from "react";
import { Route, BrowserRouter as Switch } from "react-router-dom";
import DashboardNavbar from "../components/Dashboard/DashboardNavbar";
//import DashboardHeader from "../components/Dashboard/DashboardHeader";
import DashHeadMid from "../components/Dashboard/DashHeadMid";
import { Provider } from "react-redux";
import store from "../store";
import { Redirect } from "react-router";

class Dashboard extends Component {
  render() {
    //if not logged in go to login page
    // let redirectVar = null;
    // if (!localStorage.getItem("token")) {
    //   redirectVar = <Redirect to="/login" />;
    // }

    return (
      <Provider store={store}>
        <div className="main-content">
          {/* {redirectVar} */}
          <div className="dashboard-content">
            <Switch>
              <DashboardNavbar />
              {/* <DashboardHeader /> */}
              <DashHeadMid />
            </Switch>
          </div>
        </div>
      </Provider>
    );
  }
}

export default Dashboard;
