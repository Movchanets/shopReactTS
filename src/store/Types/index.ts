export enum CommonActionTypes {
	START_REQUEST = "START_REQUEST",
	ERROR_MSG = "ERROR_MSG",
	SERVER_USER_ERROR = "SERVER_USER_ERROR",

}
export enum CategoryActionTypes {

	DELETE_CATEGORIES_SUCCESS = "DELETE_CATEGORIES_SUCCESS",
	GET_CATEGORIES_SUCCESS = "GET_CATEGORIES_SUCCESS",
	GET_CATEGORY_SUCCESS = "GET_CATEGORY_SUCCESS",
	CREATE_CATEGORY_SUCCESS = "CREATE_CATEGORY_SUCCESS",
	EDIT_CATEGORY_SUCCESS = "EDIT_CATEGORY_SUCCESS",
}
export enum ProductActionTypes {

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
	| StartRequest
	| DeleteCategoryActionSuccess;

export type ProductActions = CreateProductActionSuccess
	| GetProductsActionSuccess
	| GetProductActionSuccess
	| StartRequest;

interface Error_MSG {
	type: CommonActionTypes.ERROR_MSG,
	payload: any
}
interface StartRequest {
	type: CommonActionTypes.START_REQUEST,
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
	| StartRequest
export const ImageBase = "http://localhost:8080/files/";
