/* eslint-disable jsx-a11y/img-redundant-alt */
import React, { Component } from "react";
//import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";
import Image from "react-bootstrap/Image";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import axios from "axios";
import backendServer from "../webConfig";
import { getUser, updateUser } from "../actions/userProfileActions";

//import "../styles/userProfile.css";

class UserProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // name: localStorage.getItem("name"),
      // email: localStorage.getItem("email_id"),
    };

    this.onChange = this.onChange.bind(this);
    this.onImageChange = this.onImageChange.bind(this);
    this.onUpdate = this.onUpdate.bind(this);
    this.onUpload = this.onUpload.bind(this);
  }

  componentWillMount() {
    this.props.getUser();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.user) {
      var { user } = nextProps;

      var userData = {
        user_id: user.id || this.state.user_id,
        name: user.username || this.state.name,
        email: user.email || this.state.email,
        address: user.address || this.state.address,
        phone_number: user.phone_number || this.state.phone_number,
        user_image: user.user_image || this.state.user_image,
        currency: user.currency || this.state.currency,
        user_language: user.user_language || this.state.user_language,
        timezone: user.timezone || this.state.timezone,
      };

      this.setState(userData);
    }
  }

  onChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

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
        `${backendServer}/uploads/${this.state.user_id}`,
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

  onUpdate = (e) => {
    //prevent page from refresh
    e.preventDefault();

    let data = Object.assign({}, this.state);
    console.log("data" + this.state);
    this.props.updateUser(data);
  };

  render() {
    var imageSrc;

    if (this.state) {
      imageSrc = `${backendServer}/images/${this.state.user_image}`;
    }
    return (
      <div className="container signup">

        <div className="col">
          
         <img
            className="img-fluid"
            src={imageSrc}
            alt="profile picture"
           style={{ height: 300, width :300 }}
          /> 

          <form onSubmit={this.onUpload}>
            <div class="form-group">
              <label for="image">Change your avatar</label>
              <input
                type="file"
                class="form-control-file"
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
        <div class="signup-form">
          <form onSubmit={this.onUpdate}>
            <div className="row">
              <div className="col">
                <div className="form-group">
                  <label htmlFor="name">Your name</label>
                  <input
                    type="text"
                    className="form-control"
                    name="name"
                    onChange={this.onChange}
                    value={this.state.name}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="email">Your email address</label>
                  <input
                    type="text"
                    name="email"
                    className="form-control"
                    onChange={this.onChange}
                    value={this.state.email}
                  />
                </div>

                <div className="form-group">
                  <label
                    htmlFor="phone_number
                  "
                  >
                    Your phone number
                  </label>
                  <input
                    type="text"
                    name="phone_number"
                    className="form-control"
                    onChange={this.onChange}
                    value={this.state.phone_number}
                  />
                </div>
              </div>

              <div className="col">
                <div className="signup-block">
                  <div className="form-group">
                    <label htmlFor="">Your Default currency</label>
                    <br />
                    <label htmlFor="">
                      <small>(for new expenses)</small>
                    </label>
                    <select
                      name="currency"
                      className="form-control"
                      value={this.state.currency}
                      onChange={this.onChange}
                    >
                      <option value="USD">USD</option>
                      <option value="EUR">EUR</option>
                      <option value="GBP">GBP</option>
                      <option value="HUF">HUF</option>
                      <option value="HUF">INR</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label htmlFor="">You timezone</label>
                    <select
                      name="timezone"
                      className="form-control"
                      value={this.state.timezone}
                      onChange={this.onChange}
                    >
                      <option value="(GMT-08:00) Pacific Time">
                        (GMT-08:00) Pacific Time
                      </option>
                      <option value="(GMT-06:00) Central America">
                        (GMT-06:00) Central America
                      </option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label htmlFor="">Language</label>
                    <select
                      name="user_language"
                      className="form-control"
                      value={this.state.user_language}
                      onChange={this.onChange}
                    >
                      <option value="English">English</option>
                      <option value="Spanish">Spanish</option>
                      <option value="Deutch">Deutch</option>
                    </select>
                  </div>
                  <button type="submit" className="btn btn-primary">
                    Save
                  </button>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

UserProfile.propTypes = {
  getUser: PropTypes.func.isRequired,
  updateUser: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  user: state.userProfile.user,
});

export default connect(mapStateToProps, { getUser, updateUser })(UserProfile);
