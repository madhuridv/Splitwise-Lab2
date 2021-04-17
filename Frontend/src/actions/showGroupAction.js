import { GET_MEMBERS} from "./types";
import backendServer from "../webConfig";
import axios from "axios";

export const getGroupMembers = (memData) => (dispatch) => {
  console.log("Inside show groups actions");
  console.log("group Data from actions:", memData);
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