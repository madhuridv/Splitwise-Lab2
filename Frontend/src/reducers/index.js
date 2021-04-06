import { combineReducers } from "redux";
// import customerProfileReducer from './customerProfileReducer'

import signupReducer from "./signupReducer";
import loginReducer from "./loginReducer";
import userProfileReducer from "./userProfileReducer";
import createGroupReducer from './createGroupReducer'

export default combineReducers({
  login: loginReducer,
  signup: signupReducer,
  userProfile: userProfileReducer,
 createGroup: createGroupReducer
});
