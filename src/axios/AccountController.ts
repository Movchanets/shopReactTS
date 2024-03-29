
import { ICreateProduct, IEditProduct, ILoadAvatar, ILogin, IRegister, RegisterDTO } from './../store/Types/index';

import axios from "axios";

const instance = axios.create({
	baseURL: "http://localhost:8080/account",
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

const Account = {
	register: (user: RegisterDTO) => instance.post(`/register`, user),
	login: (user: ILogin) => instance.post(`/login`, user),
	googleAuth(token: string) {
		return instance.post(`/google-auth`, { token: token });
	},
	changeAvatar: (data: ILoadAvatar) => instance.post(`/set-avatar`, data),
}
export async function ChangeAvatar(ava: ILoadAvatar) {
	const data = await Account.changeAvatar(ava)
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

export async function RegisterAccount(user: RegisterDTO) {

	const data = await Account.register(user)
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
export async function Login(user: ILogin) {
	const data = await Account.login(user)
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
export async function Google(token: string) {
	const data = await Account.googleAuth(token)
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