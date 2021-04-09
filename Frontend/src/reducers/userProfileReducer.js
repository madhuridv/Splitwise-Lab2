import { GET_USER, UPDATE_USER } from '../actions/types';

 const initialState = {
     userProfile: {}
 };

 // eslint-disable-next-line import/no-anonymous-default-export
 export default function(state = initialState, action){
    switch(action.type){
        case GET_USER:
            return {
                ...state,
                userProfile: action.payload
            };
        case UPDATE_USER:
            return {
                ...state,
                userProfile: action.payload 
            };
        default:
            return state;
    }
 };