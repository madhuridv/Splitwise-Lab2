import React, { Component } from "react";
import axios from "axios";
import backendServer from "../../webConfig.js";
import man from "../../images/man.png";
import lady from "../../images/lady.png";

class DashboardMiddle extends Component {
  state = {};
  constructor(props) {
    super(props);
    this.state = {
      owe: [],
      owed: [],
      user_id: localStorage.getItem("user_id"),
    };
  }
  componentDidMount() {
    document.title = "Dashboard";
    const userInfo = { user_id: this.state.user_id };
    console.log("user data", userInfo);

    axios.defaults.withCredentials = true;
    axios
      .post(`${backendServer}/dashboard/owedata`, userInfo)
      .then((response) => {
        console.log("response from Axios query", response.data);
        this.setState({
          owe: this.state.owe.concat(response.data),
        });
      })
      .catch((error) => {
        console.log("error occured while connecting to backend:", error);
      });
    axios.defaults.withCredentials = true;
    axios
      .post(`${backendServer}/dashboard/oweddata`, userInfo)
      .then((response) => {
        console.log("response from Axios query for owed data", response.data);
        this.setState({
          owed: this.state.owed.concat(response.data),
        });
      })
      .catch((error) => {
        console.log("error occured while connecting to backend:", error);
      });
  }
  render() {
    let oweList = this.state.owe;
    let owedList = this.state.owed;
    console.log(oweList.length);
    return (
      <div className="">
        <div className="MidDash">
          <div className="DashHeader">
            {/* <div className="total">
              <div className="">
                <label htmlFor="">total balance</label>
                <p className="green">$ 0.00</p>
              </div>
              <div className="">
                <label htmlFor="">you owe</label>
                <p style={{ color: "red" }}>$ 0.000</p>
              </div>
              <div className="">
                  <label htmlFor="">you are owed</label>
                <p className="green">$ 0.00</p>
              </div>
            </div> */}
          </div>

          <div className="totalCollection">
            <div>
              <label htmlFor="">YOU OWE</label>
            </div>
            <div>
              <label htmlFor="" className="float-right mr-4">
                YOU ARE OWED
              </label>
            </div>
          </div>
          <div className="flex">
            <div className="float-left ml-3 borders">
              <ul>
                {oweList.length == 0 ? (
                  <li>
                    You do not owe anything
                    <img className="imgs" src={man} alt="" align="left" />
                  </li>
                ) : (
                  oweList.map((value) => (
                    <li>
                      <div className="inline">
                        <h5>To {value.groupName} group</h5>
                        <span>
                          <p style={{ color: "red" }}>
                            you owe ${value.totalOwesAmount}
                          </p>
                        </span>
                      </div>
                    </li>
                  ))
                )}
                {/* <li>
                 <img
                className="imgs"
                src={require("../../images/person-profile.png")}
                alt="" align="left"
              /> 
                <div className="inline">
                  <h5>Ram</h5>
                  <span>you owe $500</span>
                </div>
              </li> */}
              </ul>
            </div>

            <div>
              <ul>
                {owedList.length == 0 ? (
                  <li>
                    You are not owed anything
                    <img className="imgs" src={lady} alt="" align="left" />
                  </li>
                ) : (
                  owedList.map((value) => (
                    <li>
                      <div className="inline">
                        <h5>From {value.groupName} group</h5>
                        <span>owes you ${value.totalOwedAmount}</span>
                      </div>
                    </li>
                  ))
                )}

                {/* <li>
              <img
                className="imgs"
                src={require("../../images/person-profile.png")}
                alt=""
                align="left"
              />
              <div className="inline">
                <h5>Ram</h5>
                <span>you owe $500</span>
              </div>
            </li>  */}
              </ul>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default DashboardMiddle;
