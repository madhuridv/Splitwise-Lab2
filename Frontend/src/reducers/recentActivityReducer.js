import { GET_RECENT_DATA } from "../actions/types";

const initialState = {
	recentData: {},
};

export default function dashboardReducer(state = initialState, action) {
	switch (action.type) {
		case GET_RECENT_DATA:
			return {
				...state,
				recentData: action.payload,
			};

		default:
			return state;
	}
}
