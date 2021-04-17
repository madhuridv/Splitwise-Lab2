import { GET_MEMBERS} from "../actions/types";

const initialState = {
  allMembers: {},
 
};

export default function myGroupsReducer(state = initialState, action) {
  switch (action.type) {
    case GET_MEMBERS:
      return {
        ...state,
        allMembers: action.payload,
       
      };
    // case JOIN_GROUP:
    //   return {
    //     ...state,
    //     JoinStatus: action.payload,
    //   };
    default:
      return state;
  }
}
