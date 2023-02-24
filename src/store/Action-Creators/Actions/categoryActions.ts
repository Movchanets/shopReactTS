import { CategoryActions, CommonActions, CategoryActionTypes, ICategory, ICategoryDTO } from './../../Types/index';
import { toast } from 'react-toastify';

import { Dispatch } from "redux";
import { CommonActionTypes } from '../../Types';
import { CategoriesCreate, CategoriesDelete, CategoriesGet } from '../../../axios/CategoryController';

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
export const CreateCategories = (category: ICategoryDTO) => {
	return async (dispatch: Dispatch<CommonActions | CategoryActions>) => {
		try {
			dispatch({ type: CommonActionTypes.START_REQUEST, payload: "Loading" });
			const data = await CategoriesCreate(category);

			const res: ICategory = data;

			dispatch({
				type: CategoryActionTypes.CREATE_CATEGORY_SUCCESS,
				message: "Category created",
				category: res
			});
			toast.success("Category created");
		}
		catch (e) {
			dispatch({
				type: CommonActionTypes.SERVER_USER_ERROR,
				payload: 'Виникла помилка',
			});
		}
	};
}
export const DeleteCategory = (id: number) => {
	return async (dispatch: Dispatch<CommonActions | CategoryActions>) => {
		try {
			dispatch({ type: CommonActionTypes.START_REQUEST, payload: "Loading" });
			const data = await CategoriesDelete(id);
			dispatch({
				type: CategoryActionTypes.DELETE_CATEGORIES_SUCCESS,
				message: "Category deleted",
			});
			toast.success("Category deleted");
		}
		catch (e) {
			dispatch({
				type: CommonActionTypes.SERVER_USER_ERROR,
				payload: 'Виникла помилка',
			});
		}
	};
}