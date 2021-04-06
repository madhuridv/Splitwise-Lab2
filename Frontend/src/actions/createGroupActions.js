import { GET_ALL_USER, UPDATE_USER } from "./types";
import backendServer from "../webConfig";
import axios from "axios";

export const getAllUsers = () => (dispatch) => {
  console.log("Inside create group actions");
  axios.defaults.withCredentials = true;
  axios
    .get(`${backendServer}/creategroup/getUser`)
    .then((response) => {
      console.log("response from get User Emails", response.data);
      dispatch({
        type: GET_ALL_USER,
        payload: response.data,
      });
    })
    // response.data[0])
    // .then((user) => {
    //   console.log("user is:", user);
    //   dispatch({
    //     type: GET_USER,
    //     payload: user,
    //   });
    // })
    .catch((error) => {
      console.log(error);
    });
};
