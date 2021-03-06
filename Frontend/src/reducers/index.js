import { combineReducers } from "redux";
// import customerProfileReducer from './customerProfileReducer'

import signupReducer from "./signupReducer";
import loginReducer from "./loginReducer";
import userProfileReducer from "./userProfileReducer";
import createGroupReducer from "./createGroupReducer";
import myGroupsReducer from "./myGroupReducer";
import showGroupReducer from "./showGroupReducer";
import dashboardReducer from "./dashboardReducer";
import recentActivityReducer from "./recentActivityReducer";

export default combineReducers({
  login: loginReducer,
  signup: signupReducer,
  userProfile: userProfileReducer,
  createGroup: createGroupReducer,
  myGroups: myGroupsReducer,
  showGroups: showGroupReducer,
  dashboard: dashboardReducer,
  recentActivity : recentActivityReducer,
});
