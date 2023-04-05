
import { LockClosedIcon } from '@heroicons/react/20/solid'
import { LoginSchema } from '../Schemas'
import { Field, Formik } from 'formik';
import { ILogin } from '../../store/Types';
import { Link, useNavigate } from 'react-router-dom';

import { GoogleReCaptchaProvider, useGoogleReCaptcha } from 'react-google-recaptcha-v3';
import { useEffect, useState } from 'react';
import { FcGoogle } from "react-icons/fc";
import loginImg from "../../assets/login.jpg";
import { useFormik } from "formik";
import axios from "axios";
import { APP_ENV } from '../../env';
import { useActions } from '../../store/Action-Creators/useActions';
import { TextField } from '@mui/material';
import GoogleButton from 'react-google-button';

const Login = () => {

	return (
		<GoogleReCaptchaProvider reCaptchaKey="6LfT4kAlAAAAAEHq6QPyv3Yo2_UwFanxFX0ibBWs">
			<LoginPage />
		</GoogleReCaptchaProvider>
	);
}




const LoginPage = () => {


	const { executeRecaptcha } = useGoogleReCaptcha();

	const initValues: ILogin = {
		email: "",
		password: "",
		reCaptchaToken: ""
	};

	const { LoginUser, GoogleLogin } = useActions();
	const navigator = useNavigate();
	const responseGoogle = (response: any) => {
		console.log(response);
	}
	const handleLoginSuccess = async (res: any) => {

		console.log("Login google result", res);
		const { credential } = res;
		console.log("Token Idsss", credential);

		await GoogleLogin(credential)

	}

	useEffect(() => {
		console.log(window);
		const clientId =
			"143421263160-084q981ptbv0a391tpr2thhf9au8csi9.apps.googleusercontent.com";
		window?.google?.accounts!.id.initialize({
			client_id: clientId,
			callback: handleLoginSuccess,
		});

		window?.google?.accounts!.id.renderButton(document.getElementById("loginGoogleBtn"),
			{ theme: "outline", size: "Large" });

	}, []);
	const onSubmitFormik = async (values: ILogin) => {

		const DoLogin = async () => {
			const data = await LoginUser(values)
		}
		try {
			if (!executeRecaptcha)
				return;
			//Перевірка чи пройшов перевірку гугл, користувач, чи не є він бот  
			values.reCaptchaToken = await executeRecaptcha();

			await DoLogin();
			console.log("Login user token", values.reCaptchaToken);
			navigator("/");
		} catch (error: any) {
			console.log("Щось пішло не так", error);
		}
	}

	const formik = useFormik({
		initialValues: initValues,
		onSubmit: onSubmitFormik,
		validationSchema: LoginSchema
	});

	const { values, errors, touched, handleSubmit, handleChange, setFieldValue } = formik;

	return (
		<>
			<div className="relative w-full h-screen bg-zinc-900/90">
				<img
					className="absolute w-full h-full object-cover mix-blend-overlay"
					src={loginImg}
					alt="/"
				/>

				<div className="flex justify-center py-10 ">
					<form className="max-w-[400px] w-full mx-auto bg-white p-8" onSubmit={handleSubmit}>
						<h2 className="text-3xl font-bold text-center py-2">Вхід на сайт</h2>

						<div className="flex flex-col mb-4">
							<label>Username</label>
							<TextField className="border relative bg-gray-100 p-2"
								type="text"
								name="email"
								id="email"
								onChange={handleChange}
								value={values.email}
							/>
							{errors.email &&
								<p className="mt-2 text-sm text-red-600 dark:text-red-500">
									<span className="font-medium">{errors.email}</span>

								</p>
							}
						</div>
						<div className="flex flex-col ">
							<label>Password</label>
							<TextField
								className="border relative bg-gray-100 p-2"
								type="password"
								name="password"
								id="password"
								onChange={handleChange}
								value={values.password}
							/>
							{errors.password &&
								<p className="mt-2 text-sm text-red-600 dark:text-red-500">
									<span className="font-medium">{errors.password}</span>

								</p>
							}
						</div>
						<button className="w-full py-3 mt-8 bg-indigo-600 hover:bg-indigo-500 relative text-white">
							Sign In
						</button>
						<p className="flex items-center mt-2">
							<input className="mr-2" type="checkbox" />
							Remember Me
						</p>
						<Link to="/" className="relative">
							<p className="text-center mt-8">Not a member? Sign up now</p>
						</Link>

						<div className="flex justify-between py-8">
							{/* <p className="border shadow-lg hover:shadow-xl px-6 py-2 relative flex items-center">
                <AiFillFacebook className="mr-2" /> Facebook
              </p> */}
							<div id="loginGoogleBtn">

							</div>

						</div>
					</form>
				</div>
			</div>
		</>
	);
};


export default Login;