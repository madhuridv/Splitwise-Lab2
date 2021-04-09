import { GET_ALL_USER, ADD_GROUP } from "../actions/types";

const initialState = {
  allUsers: {},
  createGroupStatus: {},
};

// eslint-disable-next-line import/no-anonymous-default-export
export default function (state = initialState, action) {
  switch (action.type) {
    case GET_ALL_USER:
      return {
        ...state,
        allUsers: action.payload,
        createGroupStatus: null,
      };
    case ADD_GROUP:
      return {
        ...state,
        createGroupStatus: action.payload,
      };
    default:
      return state;
  }
}
