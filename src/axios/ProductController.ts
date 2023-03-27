
import { getToken } from '../store/Action-Creators/Actions/accountActions';
import { ICreateProduct, IEditProduct } from './../store/Types/index';

import axios from "axios";
const token = getToken();
const instance = axios.create({
	baseURL: "http://localhost:8080/api/products",
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

const Product = {
	createProduct: (product: ICreateProduct) => instance.post(`/create`, product, { headers: { 'Content-Type': 'multipart/form-data' } }),
	getProduct: (id: number) => requests.get(`/get/${id}`),
	editProduct: (id: number, product: IEditProduct) => instance.put(`/update/${id}`, product, { headers: { 'Content-Type': 'multipart/form-data' } }),
	getAllProducts: () => requests.get(`/get`),
	delProduct: (id: number) => requests.del(`/delete/${id}`),
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
export async function ProductEdit(id: number, product: IEditProduct) {
	const data = await Product.editProduct(id, product)
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
export async function DeleteProduct(id: number) {
	const data = await Product.delProduct(id)
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
export async function ProductGet(id: number) {
	const data = await Product.getProduct(id)
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