import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import { connect } from "react-redux";
import "../../styles/dashheader.css";
import { Link } from "react-router-dom";
import { userLogout } from "../../actions/loginAction";
import { Dropdown } from "react-bootstrap";
import profile_icon from "../../images/profile_icon.png";

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

    nameMsg = (
      <Dropdown>
        <Dropdown.Toggle variant="link" id="dropdown-basic">
          Hi {this.state.name}! &nbsp;
          {/* <img className="picture" src={profile_icon} alt="profile_icon" /> */}
        </Dropdown.Toggle>
        <Dropdown.Menu>
          <Dropdown.Item>
            <Link to="/profile" class="nav-link">
              &nbsp;&nbsp;Your Account
            </Link>
          </Dropdown.Item>
          <Dropdown.Item>
            <Link to="/creategroup" class="nav-link">
              &nbsp;&nbsp;Create Group
            </Link>
          </Dropdown.Item>
          <Dropdown.Item>
            <Link to="/mygroup" class="nav-link">
              &nbsp;&nbsp; My Group
            </Link>
          </Dropdown.Item>

          <Dropdown.Item>
            <Link to="/" class="nav-link" onClick={this.handleLogout}>
              &nbsp;&nbsp;Logout
            </Link>
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    );

    return (
      <nav className="DashboardNav fixed-top">
        <NavLink to="/Dashboard">
          <h2 className="landing-name">
            <b>Splitwise</b>
          </h2>
        </NavLink>

        <div className="Dashfloat">{nameMsg}</div>
      </nav>
    );
  }
}

export default connect(null, { userLogout })(DashboardHeader);

// const DashHeader = (props) => {

//   return (
//     <nav className="DashboardNav fixed-top">
//       <NavLink to="/Dashboard">
//         <h2 className="landing-name">
//           <b>Splitwise</b>
//         </h2>
//       </NavLink>

//       <div className="Dashfloat">
//         <NavLink to="/login">
//           <button
//             className="logoutbtn"
//             onClick={() => {
//               localStorage.removeItem("jwtToken");
//             }}
//           >
//             Log Out
//           </button>
//         </NavLink>

//         {console.log("inside DashHeader")}

//         <img
//           className="picture"
//           src={require("../../images/profile_icon.png")}
//           alt=""
//           srcset="Man"
//         />
//         {/* <label htmlFor="">{props.user.username}</label> */}
//       </div>
//     </nav>
//   );
// };
