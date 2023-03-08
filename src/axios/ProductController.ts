
import { ICreateProduct } from './../store/Types/index';

import axios from "axios";

const instance = axios.create({
	baseURL: "http://localhost:8080/api/products",
	headers: {
		"Content-Type": "application/json",
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

const Product = {
	createProduct: (product: ICreateProduct) => instance.post(`/create`, product, { headers: { 'Content-Type': 'multipart/form-data' } }),
	getProduct: (id: number) => requests.get(`/get/${id}`),
	getAllProducts: () => requests.get(`/get`),
}

export async function ProductCreate(product: ICreateProduct) {

	const data = await Product.createProduct(product)
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
export async function GetAllProducts() {
	const data = await Product.getAllProducts()
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