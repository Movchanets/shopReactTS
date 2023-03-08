
import { CommonActionTypes, IProductState, ProductActionTypes } from './../../Types/index';




const initialState: IProductState = {
	products: [],
	loading: false,
	message: "",
	product: null

};

export const productReducer = (state = initialState, action: any): IProductState => {
	switch (action.type) {

		case CommonActionTypes.START_REQUEST:
			return {
				...state, loading: true
			};
		case CommonActionTypes.SERVER_USER_ERROR:
			return {
				...state, loading: false
			};
		case ProductActionTypes.GET_PRODUCTS_SUCCESS:
			return {
				...state, loading: false, products: action.products
			};
		default:
			return state;
	};
};