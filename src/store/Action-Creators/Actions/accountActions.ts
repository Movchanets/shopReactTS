import { LoginSchema } from './../../../components/Schemas/index';
import { CommonActions, RegisterDTO, AccountActions, AccountActionTypes, CommonActionTypes } from './../../Types/index';
import { Login, RegisterAccount } from '../../../axios/AccountController';
import { ILogin, IRegister } from '../../Types';
import { Dispatch } from 'react';
import jwt_decode from "jwt-decode";
export const RegisterUser = (user: RegisterDTO) => {
	return async (dispatch: Dispatch<CommonActions | AccountActions>) => {
		try {

			dispatch({ type: AccountActionTypes.ACCOUNT_START_REQUEST });

			const data = await RegisterAccount(user);
			const { response } = data;
			const token = response.data.token;
			const decoded: any = jwt_decode(token);
			console.log(decoded.roles as Array<string>);
			if (decoded.roles.includes("ADMIN")) {
				dispatch({ type: AccountActionTypes.REGISTER_SUCCESS, token: token, role: "ADMIN" });
			}
			else {
				dispatch({ type: AccountActionTypes.REGISTER_SUCCESS, token: token, role: "USER" });
			}
			saveToken(response.data.token)
		}
		catch (e) {
			console.log(e)
			dispatch({
				type: CommonActionTypes.SERVER_USER_ERROR,
				payload: 'Виникла помилка',
			});
		}
	};
};
export const LoginUser = (user: ILogin) => {
	return async (dispatch: Dispatch<CommonActions | AccountActions>) => {
		try {

			dispatch({ type: AccountActionTypes.ACCOUNT_START_REQUEST });

			const data = await Login(user);
			const { response } = data;
			const token = response.data.token;

			const decoded: any = jwt_decode(token);
			console.log(decoded.roles as Array<string>);
			if (decoded.roles.includes("ADMIN")) {
				dispatch({ type: AccountActionTypes.LOGIN_SUCCESS, token: token, role: "ADMIN" });

			}
			else {
				dispatch({ type: AccountActionTypes.LOGIN_SUCCESS, token: token, role: "USER" });
			}
			saveToken(response.data.token)
		}
		catch (e) {
			console.log(e)
			dispatch({
				type: CommonActionTypes.SERVER_USER_ERROR,
				payload: 'Виникла помилка',
			});
		}
	};
};
const saveToken = (token: string) => {
	localStorage.setItem('token', token);
};
export const getToken = () => {
	return localStorage.getItem('token');
}
const removeToken = () => {
	localStorage.removeItem('token');
}
export const LogoutUser = () => {
	return async (dispatch: Dispatch<CommonActions | AccountActions>) => {
		try {
			dispatch({ type: AccountActionTypes.ACCOUNT_START_REQUEST });
			removeToken();
			dispatch({ type: AccountActionTypes.LOGOUT_SUCCESS });
		}
		catch (e) {
			dispatch({
				type: CommonActionTypes.SERVER_USER_ERROR,
				payload: 'Виникла помилка',
			});
		}
	};
}