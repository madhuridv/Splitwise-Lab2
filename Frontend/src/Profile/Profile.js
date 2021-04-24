import React, { Component } from "react";
import { Redirect } from "react-router";
import DashboardNavbar from "../components/Dashboard/DashboardNavbar";
import UserProfile from "./UserProfile";
import "../styles/userProfile.css";
import { Provider } from "react-redux";
import store from "../store";
import { BrowserRouter } from "react-router-dom";

class Profile extends Component {
  componentWillMount() {
    document.title = "Your Profile";
  }
  render() {
    let profileComponent = null;

    let redirectVar = null;
    if (localStorage.getItem("user_id")) {
      profileComponent = <UserProfile />;
    } else {
      redirectVar = <Redirect to="/" />;
    }
    return (
      <Provider store={store}>
        <div>
          <BrowserRouter>
            {redirectVar}
            <DashboardNavbar />
            <br />
            {profileComponent}
          </BrowserRouter>
        </div>
      </Provider>
    );
  }
}
export default Profile;
