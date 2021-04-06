import React, { Component } from "react";
import DashboardNavbar from "../components/Dashboard/DashboardNavbar";
import CreateGroup from "./CreateGroup";
import { Redirect } from "react-router";
import "../styles/signup.css";
import { Provider } from "react-redux";
import store from "../store";
import { BrowserRouter } from "react-router-dom";

class Group extends Component {
  componentWillMount() {
    document.title = "Create group";
  }
  render() {
    let groupComp = null;
    let redirectVar = null;

    if (localStorage.getItem("user_id")) {
      groupComp = <CreateGroup />;
    } else {
      redirectVar = <Redirect to="/" />;
    }

    return (
      <Provider store={store}>
      <div>
      <BrowserRouter>
        {redirectVar}
        <DashboardNavbar />
        {groupComp}
        </BrowserRouter>
      </div>
      </Provider>
    );
  }
}

export default Group;
