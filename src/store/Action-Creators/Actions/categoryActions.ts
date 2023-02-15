import { CategoryActions, CommonActions, CategoryActionTypes, ICategory } from './../../Types/index';
import { toast } from 'react-toastify';

import { Dispatch } from "redux";
import { CommonActionTypes } from '../../Types';
import { CategoriesGet } from '../../../axios/CategoryController';

export const Categories = () => {
	return async (dispatch: Dispatch<CommonActions | CategoryActions>) => {
		try {
			console.log("Here Categories")
			dispatch({ type: CommonActionTypes.START_REQUEST, payload: "Loading" });
			const data = await CategoriesGet();
			const { response } = data;
			console.log(response)
			console.log("1212")
			const res: Array<ICategory> = response;

			console.log(res)
			dispatch({
				type: CategoryActionTypes.GET_CATEGORIES_SUCCESS,
				message: "Categories loaded",
				categories: res
			});

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
