export enum CommonActionTypes {
	START_REQUEST = "START_REQUEST",
	ERROR_MSG = "ERROR_MSG",
	SERVER_USER_ERROR = "SERVER_USER_ERROR",

}
export enum CategoryActionTypes {

	GET_CATEGORIES_SUCCESS = "GET_CATEGORIES_SUCCESS",
	CREATE_CATEGORY_SUCCESS = "CREATE_CATEGORY_SUCCESS",
}
interface CreateCategoryActionSuccess {
	type: CategoryActionTypes.CREATE_CATEGORY_SUCCESS,
	message: any,
	category: ICategory

}
interface GetCategoriesActionSuccess {
	type: CategoryActionTypes.GET_CATEGORIES_SUCCESS,
	message: any,
	categories: Array<ICategory>
}

export type CategoryActions = GetCategoriesActionSuccess | CreateCategoryActionSuccess;

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
}
export interface ICategoryDTO {

	name: string
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
	categories: Array<ICategory> | null
	loading: boolean
	message: string
}
export type CommonActions = Error_MSG
	| ServerUserErrorAction
	| StartRequest

