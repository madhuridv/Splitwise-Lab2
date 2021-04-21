import { GET_DASHBOARD_DATA } from "../actions/types";

const initialState = {
	dashboardData: {},
};

export default function dashboardReducer(state = initialState, action) {
	switch (action.type) {
		case GET_DASHBOARD_DATA:
			return {
				...state,
				dashboardData: action.payload,
			};

		default:
			return state;
	}
}
