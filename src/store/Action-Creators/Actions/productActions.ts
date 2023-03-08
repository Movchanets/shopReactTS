import { Dispatch } from 'react';
import { CommonActionTypes, CommonActions, ICreateProduct, IProduct, ProductActionTypes, ProductActions } from './../../Types/index';
import { GetAllProducts, ProductCreate } from '../../../axios/ProductController';
import { toast } from 'react-toastify';
export const CreateProduct = (product: ICreateProduct) => {
	return async (dispatch: Dispatch<CommonActions | ProductActions>) => {
		try {
			dispatch({ type: CommonActionTypes.START_REQUEST, payload: "Loading" });
			const data = await ProductCreate(product);

			const res: IProduct = data;

			dispatch({
				type: ProductActionTypes.CREATE_PRODUCT_SUCCESS,
				message: "Product created",
				product: res
			});
			toast.success("Product created");
		}
		catch (e) {
			dispatch({
				type: CommonActionTypes.SERVER_USER_ERROR,
				payload: 'Виникла помилка',
			});
		}
	};
}
export const Products = () => {
	return async (dispatch: Dispatch<CommonActions | ProductActions>) => {
		try {
			dispatch({ type: CommonActionTypes.START_REQUEST, payload: "Loading" });
			const data = await GetAllProducts();
			const { response } = data;
			const res: Array<IProduct> = response;

			dispatch({
				type: ProductActionTypes.GET_PRODUCTS_SUCCESS,
				message: "Products loaded",
				products: res
			});
			toast.success("Product loaded");
		}
		catch (e) {
			dispatch({
				type: CommonActionTypes.SERVER_USER_ERROR,
				payload: 'Виникла помилка',
			});
		}
	};
}