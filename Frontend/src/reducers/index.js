import { combineReducers } from "redux";
// import customerProfileReducer from './customerProfileReducer'
// import ownerProfileReducer from './ownerProfileReducer'
import signupReducer from "./signupReducer";
import loginReducer from "./loginReducer";
import userProfileReducer from "./userProfileReducer";

export default combineReducers({
  login: loginReducer,
  signup: signupReducer,
  userProfile: userProfileReducer,
  // ownerProfile: ownerProfileReducer
});
