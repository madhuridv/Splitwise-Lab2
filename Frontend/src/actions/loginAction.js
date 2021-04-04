import { USER_LOGIN, USER_LOGOUT } from "./types";
import backendServer from "../webConfig";
import axios from "axios";


export const userLogin = (loginData) => (dispatch) => {
  let data = {};
  axios.defaults.withCredentials = true;
  axios
    .post(`${backendServer}/login`, loginData)
    .then((response) => {
      console.log("response data in login actions:", response);
      if (response.status === 200) {
        localStorage.setItem("user_id", response.data._id);
        window.sessionStorage.setItem("token", response.data.token);

        data = {
          message: "Successfully logged in",
          user_id: response.data._id,
          user: response.data,
        };
        console.log("Data is ----------------", data);
      }
      dispatch({
        type: USER_LOGIN,
        payload: response.data,
      });
    })
    .catch((error) => {
      if (error.response && error.response.data) {
        return dispatch({
          type: USER_LOGIN,
          payload: error.response.data,
        });
      }
    });
};

// export function userLogin6(payload) {
//   let data = {};
//   return (dispatch) => {
//     axios.defaults.withCredentials = true;
//     axios
//       .post(`${backendServer}/login`, payload)
//       .then((response) => {
//         if (response.status === 200) {
//           notification["success"]({
//             message: "User SignedIn",
//             description: "User successfully signed in",
//           });
//           // window.sessionStorage.setItem("isLoggedIn", true)
//           window.sessionStorage.setItem("user_id", response.data._id);
//           window.sessionStorage.setItem("Token", response.data.token);
//           delete response.data.token;
//           data = {
//             message: "Successfully logged in",
//             user_id: response.data._id,
//             user: response.data,
//             authFlag: true,
//           };
//           console.log("Data is ----------------", data);
//         } else if (response.status === 209) {
//           notification["error"]({
//             message: "Invalid credentials",
//             description: "Please enter valid Password",
//             user_id: -1,
//           });
//           data = {
//             message: "Please check your credentials",
//             user_id: -1,
//             authFlag: false,
//           };
//         } else if (response.status === 207) {
//           notification["error"]({
//             message: "Invalid credentials",
//             description: "User doesnt exist",
//             user_id: -1,
//           });
//           data = {
//             message: "Please check your credentials",
//             user_id: -1,
//             authFlag: false,
//           };
//         }

//         dispatch({ type: USER_LOGIN, data });
//       })
//       .catch((err) => {
//         notification["error"]({
//           message: "Invalid credentials ",
//           description: "Please enter valid Email and Password in server",
//           user_id: -1,
//         });
//         data = {
//           msg: "Please check your credentials",
//         };
//         // dispatch({ type: CUSTOMER_LOGIN, data })
//       });
//   };
// }
export const userLogout = () => (dispatch) => dispatch({ type: USER_LOGOUT });
