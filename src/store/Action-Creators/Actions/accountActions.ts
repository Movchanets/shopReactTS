import { LoginSchema } from './../../../components/Schemas/index';
import { CommonActions, RegisterDTO, AccountActions, AccountActionTypes, CommonActionTypes } from './../../Types/index';
import { Login, RegisterAccount } from '../../../axios/AccountController';
import { ILogin, IRegister } from '../../Types';
import { Dispatch } from 'react';
export const RegisterUser = (user: RegisterDTO) => {
	return async (dispatch: Dispatch<CommonActions | AccountActions>) => {
		try {

			dispatch({ type: AccountActionTypes.ACCOUNT_START_REQUEST });

			const data = await RegisterAccount(user);
			const { response } = data;
			console.log(response)
			dispatch({ type: AccountActionTypes.REGISTER_SUCCESS, token: response.token });
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
			console.log(response)
			dispatch({ type: AccountActionTypes.LOGIN_SUCCESS, token: response.token });
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