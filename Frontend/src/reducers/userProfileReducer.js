import { GET_USER, UPDATE_USER } from '../actions/types';

 const initialState = {
     user: {}
 };

 // eslint-disable-next-line import/no-anonymous-default-export
 export default function(state = initialState, action){
    switch(action.type){
        case GET_USER:
            return {
                ...state,
                user: action.payload
            };
        case UPDATE_USER:
            return {
                ...state,
                user: action.payload
            };
        default:
            return state;
    }
 };