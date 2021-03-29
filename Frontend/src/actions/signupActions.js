import { USER_SIGNUP} from "./types";
import backendServer from "../webConfig"
import axios from "axios";

export const userSignup = (userData) => dispatch => {
    axios.defaults.withCredentials = true;
    axios.post(`${backendServer}/signup`, userData)
        .then(response => dispatch({
            type: USER_SIGNUP,
            payload: response.data
        }))
        .catch(error => {
            if (error.response && error.response.data) {
                return dispatch({
                    type: USER_SIGNUP,
                    payload: error.response.data
                });
            }
            return;
        });
}