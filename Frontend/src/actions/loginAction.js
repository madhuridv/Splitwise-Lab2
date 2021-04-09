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

export const userLogout = () => (dispatch) => dispatch({ type: USER_LOGOUT });
