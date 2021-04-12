import React, { Component } from "react";
import { Link } from "react-router-dom";
import DashboardNavbar from "../components/Dashboard/DashboardNavbar";
import "../styles/dashboard.css";
import { connect } from "react-redux";
import "../styles/signup.css";
import backendServer from "../webConfig";
import axios from "axios";
import { getAllGroups } from "../actions/myGroupActions";
import PropTypes from "prop-types";

export class MyGroup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      search: "",
      groups: [],
      email: localStorage.getItem("email_id"),
      user_id: localStorage.getItem("user_id"),
    };
    this.groupLoad = this.groupLoad.bind(this);
  }

  groupLoad = (memberInfo) => {
    this.props.getAllGroups(memberInfo);
  };
  //To get the all  groups where user is member of those groups
  componentDidMount() {
    document.title = "My Group";
    const memberInfo = { groupMember: this.state.user_id };
    console.log("Members data", memberInfo);
    this.groupLoad(memberInfo);
  }

  componentWillReceiveProps(nextProps) {
    console.log("nextProps.allGroups", nextProps.allGroups);

    this.setState({
      groups: this.state.groups.concat(nextProps.allGroups),
    });
    console.log("allGroupData:", this.state.groups);
  }

  onchange = (e) => {
    this.setState({ search: e.target.value });
  };

  //to change the isAccepted status true
  onJoinClick = (gName) => {
    console.log(gName);
    const groupData = { groupName: gName, groupMember: this.state.user_id };
    console.log("groupData", groupData);
    axios.defaults.withCredentials = true;
    axios
      .post(`${backendServer}/mygroup/joingroup`, groupData)
      .then((response) => {
        console.log("Response after Axios call", response);
        if (response.status == 200 && response.data === "JOINED_GROUP") {
          alert("Joined group successfully!");
          window.location.reload(false);
        }
      })
      .catch((error) => {
        console.log("error occured while connecting to backend:", error);
      });
  };

  onLeaveClick = (gName) => {
    console.log(gName);
    const exitData = { groupName: gName, groupMember: this.state.user_id };
    console.log(exitData);
    axios.defaults.withCredentials = true;
    axios
      .post(`${backendServer}/mygroup/exitgroup`, exitData)
      .then((response) => {
        console.log("Response after Axios call", response);
        if (response.status == 200 && response.data === "GROUP_DELETED") {
          alert("Sad to see you leave this group!");
        } else if (response.status == 401 && response.data === "CLEAR_DUES") {
          alert("Please clear your dues before leaving the group!");
        }
      })
      .catch((error) => {
        console.log("error occured while connecting to backend:", error);
        alert("Please cleaer your dues before leaving the group!");
      });
  };

  render() {
    const { search } = this.state;
    console.log("search", search);
    let groupList = this.state.groups;
    console.log("groupList", groupList);

    const searchList = groupList.filter((group) => {
      return group.groupName.toLowerCase().indexOf(search.toLowerCase()) !== -1;
    });

    console.log("searchList", searchList);

    return (
      <div className="">
        <DashboardNavbar />
        <div className="showGroup">
          <div className="">
            <div className="row">
              <div className="col-sm-2"></div>
              <div className="col">
                <div className="container">
                  <div className="row ">
                    <div className="col ">
                      <h3>My Groups</h3>
                    </div>
                    <div className="col">
                      <form className="form-inline my-2 my-lg-0">
                        <input
                          className="form-control mr-sm-2"
                          type="search"
                          placeholder="Search"
                          aria-label="Search"
                          onChange={this.onchange}
                        />
                      </form>
                    </div>
                  </div>
                  <br></br>

                  <div className="">
                    {searchList.map((group) =>
                      group.groupMembers[0].isAccepted === 0 ? (
                        <div
                          className="list-group list-group-horizontal"
                          key={group.groupName}
                        >
                          <Link
                            className="list-group-item list-group-item-action"
                            style={{ width: "80%", marginRight: "10px" }}
                            to={`/groups/${group.groupName}`}
                          >
                            {group.groupName}
                          </Link>

                          <span>
                            <button
                              className="btn btn-outline-success my-2 my-sm-0"
                              onClick={() => this.onJoinClick(group.groupName)}
                            >
                              Accept
                            </button>
                          </span>
                        </div>
                      ) : (
                        <div
                          className="list-group list-group-horizontal"
                          key={group.groupName}
                        >
                          <Link
                            className="list-group-item list-group-item-action"
                            style={{ width: "80%", marginRight: "10px" }}
                            to={`/groups/${group.groupName}`}
                          >
                            {group.groupName}
                          </Link>
                          <span>
                            <button
                              className="btn btn-outline-danger my-2 my-sm-0"
                              onClick={() => this.onLeaveClick(group.groupName)}
                            >
                              Quit
                            </button>
                          </span>
                        </div>
                      )
                    )}
                  </div>
                </div>
              </div>
              <div className="col-sm-2"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

MyGroup.propTypes = {
  getAllGroups: PropTypes.func.isRequired,
  joinGroup: PropTypes.func.isRequired,
};
const mapStateToProps = (state) => ({
  allGroups: state.myGroups.allGroups,
  JoinStatus: state.myGroups.JoinStatus,
});
export default connect(mapStateToProps, { getAllGroups })(MyGroup);
