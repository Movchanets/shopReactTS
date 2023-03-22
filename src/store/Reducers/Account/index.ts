import { AccountActionTypes } from './../../Types/index';
import { IAccountState } from '../../Types';



const initialState: IAccountState = {
	token: null,
	loading: false,

};

export const accountReducer = (state = initialState, action: any): IAccountState => {
	switch (action.type) {
		case AccountActionTypes.ACCOUNT_START_REQUEST:
			return {
				...state, loading: true
			};
		case AccountActionTypes.LOGIN_SUCCESS:
			return {
				...state, token: action.token, loading: false
			};
		case AccountActionTypes.LOGOUT_SUCCESS:
			return {
				...state, token: null
			};
		case AccountActionTypes.REGISTER_SUCCESS:
			return {
				...state, token: action.token, loading: false
			};
		default:
			return state;
	};
};