import { GET_MEMBERS, GET_EXPENSE } from "./types";
import backendServer from "../webConfig";
import axios from "axios";

export const getGroupMembers = (memData) => (dispatch) => {
  console.log("Inside show groups actions");
  console.log("group Data from actions:", memData);
  // axios.defaults.headers.common["authorization"] = localStorage.getItem(
  //   "token"
  // );
  axios.defaults.withCredentials = true;
  axios
    .post(`${backendServer}/mygroup/getmembers`, memData)
    .then((response) => {
      console.log("Response from show group actions", response.data);
      dispatch({
        type: GET_MEMBERS,
        payload: response.data,
      });
    })
    .catch((error) => {
      console.log(error);
    });
};

export const getExpense = (groupNameFromProps) => (dispatch) => {
  console.log("Inside show groups get Expense actions");
  console.log("group Name:", groupNameFromProps);
  axios.defaults.headers.common["authorization"] = localStorage.getItem(
    "token"
  );
  axios.defaults.withCredentials = true;
  axios
    .post(`${backendServer}/expense/getexpensedetails`, { groupNameFromProps })
    .then((response) => {
      console.log("Response from get expense actions", response.data);
      dispatch({
        type: GET_EXPENSE,
        payload: response.data,
      });
    })
    .catch((error) => {
      console.log(error);
    });
};
