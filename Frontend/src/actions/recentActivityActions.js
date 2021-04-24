import { GET_RECENT_DATA } from "./types";
import backendServer from "../webConfig";
import axios from "axios";

export const getRecentData = (actData) => (dispatch) => {
  console.log("Inside recent actions");
  // axios.defaults.headers.common["authorization"] = localStorage.getItem(
  //   "token"
  // );
  axios.defaults.withCredentials = true;
  axios
    .post(`${backendServer}/dashboard/recent`, actData)
    .then((response) => {
      console.log("Actions::response from get recent data", response.data);
      dispatch({
        type: GET_RECENT_DATA,
        payload: response.data,
      });
    })
    .catch((error) => {
      console.log(error);
    });
};
