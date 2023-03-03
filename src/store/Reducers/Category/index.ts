import { EditCategories } from './../../Action-Creators/Actions/categoryActions';
import { ICategory, ICategoryState, CategoryActionTypes, CommonActionTypes } from './../../Types/index';




const initialState: ICategoryState = {
	categories: [],
	loading: false,
	message: "",
	category: null

};

export const categoryReducer = (state = initialState, action: any): ICategoryState => {
	switch (action.type) {
		case CategoryActionTypes.GET_CATEGORIES_SUCCESS:
			return {
				...state, loading: false, message: action.message, categories: action.categories
			};
		case CategoryActionTypes.GET_CATEGORY_SUCCESS:
			return {
				...state, loading: false, message: action.message, category: action.category
			};
		case CategoryActionTypes.EDIT_CATEGORY_SUCCESS:
			return {
				...state, loading: false, message: action.message, category: action.category
			};
		case CategoryActionTypes.CREATE_CATEGORY_SUCCESS:
			return {
				...state, loading: false, message: action.message, category: action.category
			};
		case CategoryActionTypes.DELETE_CATEGORIES_SUCCESS:
			return {
				...state, loading: false, message: action.message
			};
		case CommonActionTypes.START_REQUEST:
			return {
				...state, loading: true
			};
		case CommonActionTypes.SERVER_USER_ERROR:
			return {
				...state, loading: false
			};
		default:
			return state;
	};
};