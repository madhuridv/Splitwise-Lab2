import { GET_ALL_GROUPS, JOIN_GROUP } from "./types";
import backendServer from "../webConfig";
import axios from "axios";

export const getAllGroups = (memData) => (dispatch) => {
  console.log("Inside getallgroups actions");
  console.log("Member Data:", memData);
  axios.defaults.withCredentials = true;
  axios
    .post(`${backendServer}/mygroup/getGroup`, memData)
    .then((response) => {
      console.log("Actions::response from getGroup", response.data);
      dispatch({
        type: GET_ALL_GROUPS,
        payload: response.data,
      });
    })
    .catch((error) => {
      console.log(error);
    });
};

export const joinGroup = (memData) => (dispatch) => {
  console.log("Inside join groups actions");
  console.log("Data to backend:", memData);
  axios.defaults.withCredentials = true;
  axios
  	.post(`${backendServer}/mygroup/joingroup`, memData)
  	.then((response) => {
  		console.log("response from joinGroup", response.data);
  		dispatch({
  			type: JOIN_GROUP,
  			payload: response.data,
  		});
  	})
  	.catch((error) => {
  		console.log(error);
  	});
};
