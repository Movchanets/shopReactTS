
import { LockClosedIcon } from '@heroicons/react/20/solid'
import { LoginSchema, RegisterSchema } from '../Schemas'
import { Field, Formik } from 'formik';
import { ILogin } from '../../store/Types';
import { Link } from 'react-router-dom';
import { TextField } from '@mui/material';

export default function Login() {
	const initialValues = { email: '', password: '', confirmPassword: '' };
	const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();

		const data = new FormData(event.currentTarget);
		const res: ILogin = { email: data.get('email') as string, password: data.get('password') as string }
		console.log(res);

	};
	return (
		<>

			<div className="flex min-h-full items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
				<div className="w-full max-w-md space-y-8">
					<div>
						<img
							className="mx-auto h-12 w-auto"
							src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
							alt="ShopApp"
						/>
						<h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
							Sign up a new account
						</h2>
						<p className="mt-2 text-center text-sm text-gray-600">
							Or{' '}
							<Link to="/Login" className="font-medium text-indigo-600 hover:text-indigo-500">
								Enter your account
							</Link>
						</p>

					</div>
					<Formik
						initialValues={initialValues}
						onSubmit={() => {

						}}
						validationSchema={RegisterSchema}
					>
						{({ errors, touched, isSubmitting, isValid, dirty }) => (
							<form className="mt-8 space-y-6" onSubmit={handleSubmit}>
								<input type="hidden" name="remember" defaultValue="true" />
								<div className="-space-y-px rounded-md shadow-sm">
									<div>
										<label htmlFor="email-address" className="sr-only">
											Email address
										</label>
										<Field
											as={TextField}
											id="email"
											label="Email"
											name="email"
											type="email"
											autoComplete="email"
											required
											className="relative block w-full appearance-none rounded-none rounded-t-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
											placeholder="Email address"
										/>
										{errors.email && touched.email ? (
											<div style={{ color: "red" }}>{errors.email}</div>
										) : null}
									</div>
									<div>
										<label htmlFor="password" className="sr-only">
											Password
										</label>
										<Field
											as={TextField}
											id="password"
											label="Password"
											name="password"
											type="password"
											autoComplete="current-password"
											required
											className="relative block w-full appearance-none rounded-none rounded-b-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
											placeholder="Password"
										/>
										{errors.password && touched.password ? (
											<div style={{ color: "red" }}>{errors.password}</div>
										) : null}
										<Field
											label="Confirm Password"
											as={TextField}
											id="confirmPassword"
											name="confirmPassword"
											type="confirmPassword"
											autoComplete="current-password"
											required
											className="relative block w-full appearance-none rounded-none rounded-b-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
											placeholder="Confirm Password"
										/>
										{errors.password && touched.password ? (
											<div style={{ color: "red" }}>{errors.password}</div>
										) : null}
									</div>
								</div>

								<div className="flex items-center justify-between">



								</div>

								<div>
									<button
										type="submit"
										className="group relative flex w-full justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
									>
										<span className="absolute inset-y-0 left-0 flex items-center pl-3">
											<LockClosedIcon className="h-5 w-5 text-indigo-500 group-hover:text-indigo-400" aria-hidden="true" />
										</span>
										Sign in
									</button>
								</div>
							</form>
						)}
					</Formik>
				</div>
			</div>
		</>
	)
}
