import { CategoryActions, CommonActions, CategoryActionTypes, ICategory, ICategoryDTO } from './../../Types/index';
import { toast } from 'react-toastify';

import { Dispatch } from "redux";
import { CommonActionTypes } from '../../Types';
import { CategoriesCreate, CategoriesDelete, CategoriesEdit, CategoriesGet, CategoryGet } from '../../../axios/CategoryController';

export const Categories = () => {
	return async (dispatch: Dispatch<CommonActions | CategoryActions>) => {
		try {
			console.log("Here Categories")
			dispatch({ type: CategoryActionTypes.CATEGORY_START_REQUEST, payload: "Loading" });
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
export const GetCategory = (id: number) => {
	return async (dispatch: Dispatch<CommonActions | CategoryActions>) => {
		try {

			dispatch({ type: CategoryActionTypes.CATEGORY_START_REQUEST, payload: "Loading" });
			const data = await CategoryGet(id);
			const { response } = data;
			const res: ICategory = response;

			dispatch({
				type: CategoryActionTypes.GET_CATEGORY_SUCCESS,
				message: "Category loaded",
				category: res
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
			dispatch({ type: CategoryActionTypes.CATEGORY_START_REQUEST, payload: "Loading" });
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
export const EditCategories = (id: number, category: ICategoryDTO) => {
	return async (dispatch: Dispatch<CommonActions | CategoryActions>) => {
		try {
			dispatch({ type: CategoryActionTypes.CATEGORY_START_REQUEST, payload: "Loading" });
			const data = await CategoriesEdit(id, category);
			const res: ICategory = data;
			dispatch({
				type: CategoryActionTypes.EDIT_CATEGORY_SUCCESS,
				message: "Category edited",
				category: res
			});
			toast.success("Category edited");
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
			dispatch({ type: CategoryActionTypes.CATEGORY_START_REQUEST, payload: "Loading" });
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