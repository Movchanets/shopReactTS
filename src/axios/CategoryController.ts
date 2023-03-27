
import { getToken } from '../store/Action-Creators/Actions/accountActions';
import { ICategoryDTO } from './../store/Types/index';

import axios from "axios";
const token = getToken();
const instance = axios.create({
	baseURL: "http://localhost:8080/api/categories",
	headers: {
		"Content-Type": "application/json",
		"Authorization": `Bearer ${token}`
	},

});
const responseBody: any = (response: any) => response.data;
const requests = {
	get: (url: string) => instance.get(url).then().then(responseBody),
	post: (url: string, body?: any) =>
		instance.post(url, body).then().then(responseBody),
	put: (url: string, data: any) =>
		instance.put(url, data).then().then(responseBody),
	patch: (url: string, body: string) =>
		instance.patch(url, body).then().then(responseBody),
	del: (url: string) => instance.delete(url).then().then(responseBody),
};

const Categories = {
	createCategory: (category: ICategoryDTO) => instance.post(`/create`, category, { headers: { 'Content-Type': 'multipart/form-data' } }),
	getCategories: () => requests.get(`/get`),
	getCategory: (id: number) => requests.get(`/get/${id}`),
	deleteCategory: (id: number) => requests.del(`/delete/${id}`),
	editCategory: (id: number, category: ICategoryDTO) => requests.put(`/edit/${id}`,
		{ name: category.name, description: category.description, file: category.file, }),
}
export async function CategoryGet(id: number) {

	const data = await Categories.getCategory(id)
		.then((response) => {
			return {
				response,
			};
		})
		.catch((error) => {
			return error.response;
		});
	return data;

}
export async function CategoriesCreate(category: ICategoryDTO) {

	const data = await Categories.createCategory(category)
		.then((response) => {
			return {
				response,
			};
		})
		.catch((error) => {
			return error.response;
		});
	return data;

}
export async function CategoriesEdit(id: number, category: ICategoryDTO) {

	const data = await Categories.editCategory(id, category)
		.then((response) => {
			return {
				response,
			};
		})
		.catch((error) => {
			return error.response;
		});
	return data;

}
export async function CategoriesGet() {

	const data = await Categories.getCategories()
		.then((response) => {
			return {
				response,
			};
		})
		.catch((error) => {
			return error.response;
		});
	return data;
}
export async function CategoriesDelete(id: number) {

	const data = await Categories.deleteCategory(id)
		.then((response) => {
			return {
				response,
			};
		})
		.catch((error) => {
			return error.response;
		});
	return data;
}