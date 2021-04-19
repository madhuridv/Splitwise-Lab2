import { GET_MEMBERS, GET_EXPENSE } from "../actions/types";

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
    case GET_EXPENSE:
      return {
        ...state,
        allMembers: action.payload,
      };
    default:
      return state;
  }
}
