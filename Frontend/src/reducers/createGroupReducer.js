import { GET_ALL_USER, ADD_GROUP } from '../actions/types';

 const initialState = {
     user: {}
 };

 // eslint-disable-next-line import/no-anonymous-default-export
 export default function(state = initialState, action){
    switch(action.type){
        case GET_ALL_USER:
            return {
                ...state,
                user: action.payload
            };
        case ADD_GROUP:
            return {
                ...state,
                user: action.payload
            };
        default:
            return state;
    }
 };