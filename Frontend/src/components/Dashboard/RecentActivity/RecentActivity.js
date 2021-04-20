import React, { Component } from "react";
import DashboardNavbar from "../DashboardNavbar";
import axios from "axios";
import backendServer from "../../../webConfig";
import { Pagination } from "react-bootstrap";

class RecentActivity extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activity: [],
      user_id: localStorage.getItem("user_id"),
      settle: [],
      curPage: 1,
      pageSize: 0,
      act: [
        {
          userName: "Madhuri",
          expenseDescription: "Party",
          groupName: "Dressess",
        },
        {
          userName: "Manish",
          expenseDescription: "Chocolate",
          groupName: "Dressess",
        },
        {
          userName: "Rachel",
          expenseDescription: "Cosmetics",
          groupName: "Bridal shower",
        },
        {
          userName: "Ross",
          expenseDescription: "Beer",
          groupName: "Bachelor's Party",
        },
        {
          userName: "Chandler",
          expenseDescription: "Ice cubes",
          groupName: "Bachelor's Party",
        },
        {
          userName: "Monica",
          expenseDescription: "Cake",
          groupName: "Bridal shower",
        },
        {
          userName: "Kramer",
          expenseDescription: "golf",
          groupName: "sports",
        },
        {
          userName: "Jerry",
          expenseDescription: "Show",
          groupName: "sports",
        },
        {
          userName: "Rachel",
          expenseDescription: "Ralpf",
          groupName: "Dressess",
        },
        {
          userName: "Elaine",
          expenseDescription: "Grocery",
          groupName: "Monthly",
        },
      ],
    };
  }
  onPage = (e) => {
    console.log("In pagination");
    console.log(e.target);
    console.log(e.target.text);
    this.setState({
      curPage: e.target.text,
    });
  };

  OnChange = (e) => {
    console.log("Inside Onchange");
    this.setState({
      [e.target.name]: e.target.value,
    });
  };
  componentDidMount() {
    document.title = "Recent Activiy";
    console.log(this.state.user_id);
    const userInfo = { user_id: this.state.user_id };
    axios.defaults.withCredentials = true;
    axios
      .post(`${backendServer}/dashboard/recent`, userInfo)
      .then((response) => {
        console.log("data is", response.data);
        this.setState({
          activity: this.state.activity.concat(response.data),
        });
      })
      .catch((error) => {
        console.log("error occured while connecting to backend:", error);
      });

    axios.defaults.withCredentials = true;
    axios
      .post(`${backendServer}/dashboard/recentsettle`)
      .then((response) => {
        console.log("data is", response.data);
        this.setState({
          settle: this.state.settle.concat(response.data),
        });
      })
      .catch((error) => {
        console.log("error occured while connecting to backend:", error);
      });
  }
  render() {
    // let paginationItemsTag = [];
    // let items = this.state.act;
    // console.log("page size:",this.state.pageSize);
    // console.log("Total items:", items.length);
    // let count = 1;
    // if (items.length % 4 == 0) {
    //   count = items.length / 5;
    // } else {
    //   count = items.length / 5+ 1;
    // }
    // let active = this.state.curPage;
    // for (let number = 1; number <= count; number++) {
    //   paginationItemsTag.push(
    //     <Pagination.Item key={number} active={number === active}>
    //       {number}
    //     </Pagination.Item>
    //   );
    // }
    // console.log("paginate");
    // let start = 5 * (this.state.curPage - 1);
    // let end = start + 5;
    // console.log("start: ", start, ", end: ", end);
    // let displayitems = [];
    // if (end > items.length) {
    //   end = items.length;
    // }
    // for (start; start < end; start++) {
    //   displayitems.push(items[start]);
    // }
    // console.log("render");
    // console.log("displayitems", displayitems);

    let activityList = this.state.activity;
    let actList = this.state.act;
    console.log(activityList);
    let settleList = this.state.settle;
    let obj = [...activityList, ...settleList];
    console.log("object", obj);
    let recent = obj.sort((a, b) => a.Date - b.Date);
    console.log("recent:", recent);
    return (
      <div className="showGroup">
        <DashboardNavbar />
        <div className="">
          <div className="row">
            <div className="col-sm-2"></div>

            <div className="col" id="dash-center">
              <div className="container">
                <div className="row  align-items-center">
                  <div className="col">
                    <h3>Recent Activities</h3>

                    {settleList.map((set) => (
                      <div className="list-group list-group-horizontal">
                        <ul className="list-group">
                          <li className="list-group-item">
                            {set.username} cleared dues in {set.groupName}
                          </li>
                        </ul>
                      </div>
                    ))}

                    {actList.map((act) => (
                      <div className="list-group list-group-horizontal">
                        <ul className="list-group">
                          <li className="list-group-item">
                            {act.userName} added {act.expenseDescription} to{" "}
                            {act.groupName}
                          </li>
                        </ul>
                      </div>
                    ))}
                  </div>
                </div>
                <center>
                  <br />
                  <br />
                  {/* <Pagination
                    onClick={this.onPage}
                    style={{ display: "inline-flex" }}
                  >
                    {paginationItemsTag}
                  </Pagination> */}
                  &nbsp;&nbsp;
                  <span>
                    <select onChange={this.onChange}>
                      <option>2</option>
                      <option>5</option>
                      <option>10</option>
                    </select>
                  </span>
                </center>
              </div>
            </div>

            <div className="col-sm-2"></div>
          </div>
        </div>
      </div>
    );
  }
}

export default RecentActivity;
