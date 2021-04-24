import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import { connect } from "react-redux";
import "../../styles/dashheader.css";
import { Link } from "react-router-dom";
import { userLogout } from "../../actions/loginAction";
import { Dropdown } from "react-bootstrap";
import profile_icon from "../../images/profile_icon.png";
import { Redirect } from "react-router";

class DashboardHeader extends Component {
  constructor() {
    super();
    this.state = {
      name: localStorage.getItem("name"),
    };
  }
  handleLogout = () => {
    window.localStorage.clear();
    this.props.userLogout();
  };

  render() {
    let nameMsg = null;
    // //if not logged in go to login page
    // let redirectVar = null;
    // if (!localStorage.getItem("token")) {
    //   redirectVar = <Redirect to="/login" />;
    // }
    nameMsg = (
      <Dropdown>
        <Dropdown.Toggle variant="link" id="dropdown-basic">
          Hi {this.state.name}! &nbsp;
        </Dropdown.Toggle>
        <Dropdown.Menu>
          <Dropdown.Item href="/profile">Your Account</Dropdown.Item>
          <Dropdown.Item href="/creategroup">Create Group</Dropdown.Item>
          <Dropdown.Item href="/mygroup">My Group</Dropdown.Item>
          <Dropdown.Item href="/" onClick={this.handleLogout}>
            Logout
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    );

    return (
      <div className="">
        {/* {redirectVar} */}
        <nav className="DashboardNav fixed-top">
          <NavLink to="/Dashboard">
            <h2 className="landing-name">
              <b>Splitwise</b>
            </h2>
          </NavLink>

          <div className="Dashfloat">{nameMsg}</div>
        </nav>
      </div>
    );
  }
}

export default connect(null, { userLogout })(DashboardHeader);
