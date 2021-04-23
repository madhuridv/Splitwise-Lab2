import { GET_DASHBOARD_DATA } from "./types";
import backendServer from "../webConfig";
import axios from "axios";

export const getDashData = (memData) => (dispatch) => {
  console.log("Inside getDashData actions");

  axios.defaults.withCredentials = true;
  axios
    .post(`${backendServer}/dashboard/getdashdata`, memData)
    .then((response) => {
      console.log("Actions::response from getDashData", response.data);
      dispatch({
        type: GET_DASHBOARD_DATA,
        payload: response.data,
      });
    })
    .catch((error) => {
      console.log(error);
    });
};
