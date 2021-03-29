import React, { Component } from "react";
import { Route, BrowserRouter as Switch } from "react-router-dom";
import DashboardNavbar from "../components/Dashboard/DashboardNavbar";
import DashboardHeader from "../components/Dashboard/DashboardHeader";
import { Provider } from "react-redux";
import store from "../store";

class Dashboard extends Component {
  render() {
    return (
      <Provider store={store}>
        <div className="main-content">
          <div className="dashboard-content">
            <Switch>
              <DashboardNavbar />
              <DashboardHeader />
            </Switch>
          </div>
        </div>
      </Provider>
    );
  }
}

export default Dashboard;
