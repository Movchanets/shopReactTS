export enum CommonActionTypes {

	ERROR_MSG = "ERROR_MSG",
	SERVER_USER_ERROR = "SERVER_USER_ERROR",

}
export enum CategoryActionTypes {
	CATEGORY_START_REQUEST = "CATEGORY_START_REQUEST",
	DELETE_CATEGORIES_SUCCESS = "DELETE_CATEGORIES_SUCCESS",
	GET_CATEGORIES_SUCCESS = "GET_CATEGORIES_SUCCESS",
	GET_CATEGORY_SUCCESS = "GET_CATEGORY_SUCCESS",
	CREATE_CATEGORY_SUCCESS = "CREATE_CATEGORY_SUCCESS",
	EDIT_CATEGORY_SUCCESS = "EDIT_CATEGORY_SUCCESS",
}
export enum ProductActionTypes {
	PRODUCT_START_REQUEST = "PRODUCT_START_REQUEST",
	DELETE_PRODUCT_SUCCESS = "DELETE_PRODUCT_SUCCESS",
	GET_PRODUCT_SUCCESS = "GET_PRODUCT_SUCCESS",
	GET_PRODUCTS_SUCCESS = "GET_PRODUCTS_SUCCESS",
	CREATE_PRODUCT_SUCCESS = "CREATE_PRODUCT_SUCCESS",

	EDIT_PRODUCT_SUCCESS = "EDIT_PRODUCT_SUCCESS",
}
interface CreateProductActionSuccess {
	type: ProductActionTypes.CREATE_PRODUCT_SUCCESS,
	message: any,
	product: IProduct
}
interface EditProductActionSuccess {
	type: ProductActionTypes.EDIT_PRODUCT_SUCCESS,
	message: any,
	product: IProduct
}
interface GetProductActionSuccess {
	type: ProductActionTypes.GET_PRODUCT_SUCCESS,
	message: any,
	product: IProduct

}
interface DeleteProductActionSuccess {
	type: ProductActionTypes.DELETE_PRODUCT_SUCCESS,
	message: any,

}
interface CreateCategoryActionSuccess {
	type: CategoryActionTypes.CREATE_CATEGORY_SUCCESS,
	message: any,
	category: ICategory

}
interface EditCategoryActionSuccess {
	type: CategoryActionTypes.EDIT_CATEGORY_SUCCESS,
	message: any,
	category: ICategory
}
interface DeleteCategoryActionSuccess {
	type: CategoryActionTypes.DELETE_CATEGORIES_SUCCESS,
	message: any,
}

interface GetCategoriesActionSuccess {
	type: CategoryActionTypes.GET_CATEGORIES_SUCCESS,
	message: any,
	categories: Array<ICategory>
}
interface GetProductsActionSuccess {
	type: ProductActionTypes.GET_PRODUCTS_SUCCESS,
	message: any,
	products: Array<IProduct>
}
interface GetCategoryActionSuccess {
	type: CategoryActionTypes.GET_CATEGORY_SUCCESS,
	message: any,
	category: ICategory
}
interface GetProductActionSuccess {
	type: ProductActionTypes.GET_PRODUCT_SUCCESS,
	message: any,
	product: IProduct
}
export type CategoryActions = GetCategoriesActionSuccess
	| CreateCategoryActionSuccess
	| EditCategoryActionSuccess
	| GetCategoryActionSuccess
	| CategoryStartRequest
	| DeleteCategoryActionSuccess;

export type ProductActions = CreateProductActionSuccess
	| GetProductsActionSuccess
	| GetProductActionSuccess
	| DeleteProductActionSuccess
	| EditProductActionSuccess
	| ProductStartRequest;

interface Error_MSG {
	type: CommonActionTypes.ERROR_MSG,
	payload: any
}
interface CategoryStartRequest {
	type: CategoryActionTypes.CATEGORY_START_REQUEST,
	payload: any
}
interface ProductStartRequest {
	type: ProductActionTypes.PRODUCT_START_REQUEST,
	payload: any
}
interface ServerUserErrorAction {
	type: CommonActionTypes.SERVER_USER_ERROR,
	payload: any
}
export interface ICategory {
	id: number
	name: string
	description: string
	urlImage: string
}
export interface IProduct {
	id: number
	name: string
	description: string
	price: number
	category: string
	category_id: number
	files: Array<string>
}

export interface ICategoryDTO {
	name: string
	file: File | null
	description: string
}
export interface ICreateProduct {
	name: string
	description: string
	price: number
	categoryId: number
	files: Array<File> | null


}
export interface IEditProduct {
	name: string
	description: string
	price: number
	category_id: number
	files: Array<File> | null
	removeFiles: Array<string> | null
}
export interface ILogin {
	email: string,
	password: string,

}
export interface IRegister {
	email: string,
	password: string,
	confirmPassword: string
}
export interface ICategoryState {
	categories: Array<ICategory>
	loading: boolean
	message: string
	category: ICategory | null
}
export interface IProductState {
	products: Array<IProduct>
	loading: boolean
	message: string
	product: IProduct | null

}
export type CommonActions = Error_MSG
	| ServerUserErrorAction

export const ImageBase = "http://localhost:8080/files/";
