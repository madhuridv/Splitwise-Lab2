import { React, Component } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { Landing } from "./components/landing";
import Login from "./components/Login";
import UserSignup from "./components/UserSignup";
import Dashboard from "./containers/Dashboard";
import { Provider } from "react-redux";
import store from "./store";
import "bootstrap/dist/css/bootstrap.min.css";
import Profile from "./Profile/Profile";
import Group from "./Group/Group";
import MyGroup from "./MyGroups/MyGroup";
import ShowGroups from "./MyGroups/ShowGroup";
import RecentActivity from "./components/Dashboard/RecentActivity/RecentActivity";

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <div>
          <BrowserRouter>
            <Switch>
              <Route exact path="/" component={Landing}></Route>
              <Route exact path="/login" component={Login}></Route>
              <Route path="/signup" component={UserSignup} />
              <Route exact path="/dashboard" component={Dashboard}></Route>
              <Route path="/profile" component={Profile} />
               <Route path="/creategroup" component={Group} />
              <Route path="/mygroup" component={MyGroup} />
              <Route path="/groups/:groupName" component={ShowGroups} />
              <Route path="/recentactivity" component={RecentActivity} />
            </Switch>
          </BrowserRouter>
        </div>
      </Provider>
    );
  }
}

export default App;
