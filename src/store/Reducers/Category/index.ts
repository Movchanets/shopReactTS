import { ICategory, ICategoryState, CategoryActionTypes } from './../../Types/index';




const initialState: ICategoryState = {
	categories: [],
	loading: false,
	message: ""
};

export const categoryReducer = (state = initialState, action: any): ICategoryState => {
	switch (action.type) {
		case CategoryActionTypes.GET_CATEGORIES_SUCCESS:
			return {
				...state, loading: false, message: action.message, categories: action.categories
			};
		default:
			return state;
	}
}