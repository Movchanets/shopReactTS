import { Dispatch } from 'react';
import { CommonActionTypes, CommonActions, ICreateProduct, IProduct, ProductActionTypes, ProductActions, IEditProduct } from './../../Types/index';
import { DeleteProduct, GetAllProducts, ProductCreate, ProductEdit, ProductGet } from '../../../axios/ProductController';
import { toast } from 'react-toastify';
export const CreateProduct = (product: ICreateProduct) => {
	return async (dispatch: Dispatch<CommonActions | ProductActions>) => {
		try {
			dispatch({ type: ProductActionTypes.PRODUCT_START_REQUEST, payload: "Loading" });
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
export const EditProduct = (id: number, product: IEditProduct) => {
	return async (dispatch: Dispatch<CommonActions | ProductActions>) => {
		try {
			dispatch({ type: ProductActionTypes.PRODUCT_START_REQUEST, payload: "Loading" });
			const data = await ProductEdit(id, product);
		}
		catch (e) {
			dispatch({
				type: CommonActionTypes.SERVER_USER_ERROR,
				payload: 'Виникла помилка',
			});
		}
	}
}

export const Products = () => {
	return async (dispatch: Dispatch<CommonActions | ProductActions>) => {
		try {
			dispatch({ type: ProductActionTypes.PRODUCT_START_REQUEST, payload: "Loading" });
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
export const ProductDelete = (id: number) => {
	return async (dispatch: Dispatch<CommonActions | ProductActions>) => {
		try {
			dispatch({ type: ProductActionTypes.PRODUCT_START_REQUEST, payload: "Loading" });
			const data = await DeleteProduct(id);

			console.log(data)
			dispatch({
				type: ProductActionTypes.DELETE_PRODUCT_SUCCESS,
				message: "Product deleted",

			});
			toast.success("Product deleted");
		}
		catch (e) {
			dispatch({
				type: CommonActionTypes.SERVER_USER_ERROR,
				payload: 'Виникла помилка',
			});
		}
	};
}
export const GetProduct = (id: number) => {
	return async (dispatch: Dispatch<CommonActions | ProductActions>) => {
		try {
			dispatch({ type: ProductActionTypes.PRODUCT_START_REQUEST, payload: "Loading" });
			const data = await ProductGet(id);
			const { response } = data;

			const res: IProduct = response;


			dispatch({
				type: ProductActionTypes.GET_PRODUCT_SUCCESS,
				message: "Product loaded",
				product: res
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