import { GET_USER, UPDATE_USER } from "./types";
import backendServer from "../webConfig"
import axios from "axios";

export const getUser = () => dispatch => {
    axios.get(`${backendServer}/profile/${localStorage.getItem("user_id")}`)
        .then(response => response.data[0])
        .then(customer => dispatch({
            type: GET_USER,
            payload: customer
        }))
        .catch(error => {
            console.log(error);
        });
}

export const updateUser = (userProfileData) => dispatch => {
    axios.defaults.withCredentials = true;
    axios.post(`${backendServer}/profile/user`, userProfileData)
        .then(response => response.data)
        .then(data => {
            if (data === 'USER_UPDATED') {
                localStorage.setItem("name", userProfileData.name);
                alert("Profile Updated Successfully!");
            }
            return dispatch({
                type: UPDATE_USER,
                payload: data
            })
        })
        .catch(error => {
            console.log(error);
        });
}