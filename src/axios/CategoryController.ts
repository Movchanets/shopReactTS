import { ICategoryDTO } from './../store/Types/index';

import axios from "axios";

const instance = axios.create({
	baseURL: "http://localhost:8080/api/categories",
	headers: {
		"Content-Type": "application/json",
	},

});
const responseBody: any = (response: any) => response.data;
const requests = {
	get: (url: string) => instance.get(url).then().then(responseBody),
	post: (url: string, body?: any) =>
		instance.post(url, body).then().then(responseBody),
	put: (url: string, body?: string) =>
		instance.put(url, body).then().then(responseBody),
	patch: (url: string, body: string) =>
		instance.patch(url, body).then().then(responseBody),
	del: (url: string) => instance.delete(url).then().then(responseBody),
};

const Categories = {
	createCategory: (category: ICategoryDTO) => requests.post(`/create`, category),
	getCategories: () => requests.get(`/get`),
	deleteCategory: (id: number) => requests.del(`/delete/${id}`),
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