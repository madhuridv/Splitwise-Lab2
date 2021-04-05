import { GET_USER, UPDATE_USER } from "./types";
import backendServer from "../webConfig";
import axios from "axios";

export const getUser = () => (dispatch) => {
  let email_id = localStorage.getItem("email_id");
  console.log(`${email_id}`);
  axios
    .get(`${backendServer}/profile/${email_id}`)
    .then((response) => {
      console.log("response from axios", response.data);
      dispatch({
        type: GET_USER,
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

export const updateUser = (userProfileData) => (dispatch) => {
  console.log("userProfileData is", userProfileData);
  axios.defaults.withCredentials = true;
  axios
    .post(`${backendServer}/profile/user`, userProfileData)
    .then((response) => {
      console.log("response for update profile is", response.status);
      if (response.status === 200) {
        alert("User Profile updated successfully!");
      } else if (response.status === 209) {
        alert("Update Failed! Please Try Again");
      } else if (response.status === 207) {
        alert("No User Found");
      } else {
        alert("Server Error!");
      }
      return dispatch({
        type: UPDATE_USER,
        payload: response.data,
      });
    })
    // .then((data) => {
    //   console.log("data from backend:", data);
    //   if (data === "USER_UPDATED") {
    //     // localStorage.setItem("name", userProfileData.name);
    //     alert("Profile Updated Successfully!");
    //   }
    //   return dispatch({
    //     type: UPDATE_USER,
    //     payload: data,
    //   });
    // })
    .catch((error) => {
      console.log(error);
    });
};
