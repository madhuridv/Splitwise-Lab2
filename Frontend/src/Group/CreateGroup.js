import React, { Component } from "react";
import backendServer from "../webConfig";
import axios from "axios";
import { Button } from "react-bootstrap";
import { Multiselect } from "multiselect-react-dropdown";
import { getAllUsers, addGroup } from "../actions/createGroupActions";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Redirect } from "react-router";

class CreateGroup extends Component {
  constructor(props) {
    super(props);

    this.state = {
      user_id: localStorage.getItem("user_id"),
      groupname: "",
      userData: [],
      selected: [],
      selectedValue: [
        {
          _id: localStorage.getItem("user_id"),
          email: localStorage.getItem("email_id"),
          name: localStorage.getItem("username"),
        },
      ],
      groupCreatedFlag: 0,
    };
    this.onChange = this.onChange.bind(this);
  }

  onSelect = (data) => {
    this.setState({
      selected: data,
    });
    console.log("selected", this.state.selected);
  };

  componentDidMount() {
    this.props.getAllUsers();
  }

  componentWillReceiveProps(nextProps) {
    console.log("nextProps.user", nextProps.allUsers);

    this.setState({
      userData: this.state.userData.concat(nextProps.allUsers),
    });
    console.log("userdata:", this.state.userData);
  }

  onImageChange = (e) => {
    this.setState({
      file: e.target.files[0],
      fileText: e.target.files[0].name,
    });
  };

  onUpload = (e) => {
    console.log("inside upload");
    e.preventDefault();
    const formData = new FormData();
    formData.append("image", this.state.file);
    const uploadConfig = {
      headers: {
        "content-type": "multipart/form-data",
      },
    };
    axios
      .post(
        `${backendServer}/uploads/${this.state.user_image}`,
        formData,
        uploadConfig
      )
      .then((response) => {
        alert("Image uploaded successfully!");
        this.setState({
          fileText: "Choose file",
          user_image: response.data,
        });
      })
      .catch((err) => {
        console.log("Error" + err);
      });
  };

  onSubmit = (e) => {
    e.preventDefault();
    let user_id = this.state.user_id;
    console.log("selected array", this.state.selected);
    // let members = [];

    // for (var i = 0; i < this.state.selected.length; i++) {
    //   members[i] = this.state.selected[i]._id;
    // }
    // console.log("members array:", members);

    let groupObject = [];
    let data = {};
    const members = this.state.selected;
    for (var i = 0; i < members.length; i++) {
      data = {
        _id: members[i]._id,
        isAccepted: 0,
      };
      groupObject.push(data);
    }
    console.log(groupObject);

    const groupData = {
      createdBy: user_id,
      groupName: this.state.groupname,
      members: groupObject,
    };

    console.log("groupData is :", groupData);
    this.props.addGroup(groupData);
    this.setState({
      groupCreatedFlag: 1,
    });
  };

  onChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };
  render() {
    var imageSrc;
    let redirectVar = null;
    let mygroupComp = null;
    let details = this.state.userData;
    console.log("details", details);
    console.log(
      "group creation status:",
      this.props.createGroupStatus,
      "flag: ",
      this.state.groupCreatedFlag
    );
    if (
      this.props.createGroupStatus === "GROUP_ADDED" &&
      this.state.groupCreatedFlag
    ) {
      console.log("Redirecting to MyGroups Page...");
      redirectVar = <Redirect to="/mygroup" />;
    }

    if (this.state) {
      imageSrc = `${backendServer}/images/${this.state.user_image}`;
    }
    return (
      <div className="container signup">
        {redirectVar}
        <div className="col">
          <img
            className="img-fluid"
            src={imageSrc}
            alt="profile picture"
            style={{ height: 300, width: 300 }}
          />

          <form onSubmit={this.onUpload}>
            <div className="form-group">
              <input
                type="file"
                className="form-control-file"
                name="image"
                accept="image/*"
                onChange={this.onImageChange}
                required
              />
            </div>
            <Button type="submit" variant="primary">
              Upload
            </Button>
          </form>
        </div>
        <div className="col">
          <div className="signup-form">
            <form onSubmit={this.onSubmit}>
              <div className="row">
                <div className="col">
                  <div className="form-group">
                    <label htmlFor="name">START A NEW GROUP</label>
                    <br></br>
                    <label htmlFor="name">My group shall be called...</label>
                    <input
                      type="text"
                      className="form-control"
                      name="groupname"
                      onChange={this.onChange}
                      value={this.state.groupname}
                      placeholder="Group Name"
                      required
                    />
                  </div>
                  <br></br>
                  <label>GROUP MEMBERS</label>
                  <Multiselect
                    options={details}
                    selectedValues={this.state.selectedValue}
                    displayValue="email"
                    onSelect={this.onSelect}
                  />

                  <br></br>

                  <div className="form-group">
                    <br></br>
                    <button type="submit" className="btn btn-primary">
                      Save
                    </button>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}
CreateGroup.propTypes = {
  getAllUsers: PropTypes.func.isRequired,
  addGroup: PropTypes.func.isRequired,
  allUsers: PropTypes.object.isRequired,
  createGroupStatus: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  allUsers: state.createGroup.allUsers,
  createGroupStatus: state.createGroup.createGroupStatus,
});

export default connect(mapStateToProps, { getAllUsers, addGroup })(CreateGroup);
