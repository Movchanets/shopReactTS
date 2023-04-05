import { AccountActionTypes } from './../../Types/index';
import { IAccountState } from '../../Types';



const initialState: IAccountState = {
	loading: false,
	isAuth: false,
};

export const accountReducer = (state = initialState, action: any): IAccountState => {
	switch (action.type) {
		case AccountActionTypes.ACCOUNT_START_REQUEST:
			return {
				...state, loading: true
			};
		case AccountActionTypes.LOGIN_SUCCESS:

			return {
				...state, isAuth: true, loading: false, user: action.user
			};

		case AccountActionTypes.LOGOUT_SUCCESS:
			return {
				...state, loading: false, isAuth: false, user: undefined
			};
		case AccountActionTypes.REGISTER_SUCCESS:
			return {
				...state, loading: false
			};
		case AccountActionTypes.CHANGE_AVATAR_SUCCESS:
			return {
				...state, loading: false, user: action.user
			};
		default:
			return state;
	};
};