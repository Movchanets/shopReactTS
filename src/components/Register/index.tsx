
import { LockClosedIcon } from '@heroicons/react/20/solid'
import { LoginSchema, RegisterSchema } from '../Schemas'
import { Field, Formik } from 'formik';
import { ILogin, IRegister, RegisterDTO } from '../../store/Types';
import { Link, useNavigate } from 'react-router-dom';
import { TextField } from '@mui/material';
import { useActions } from '../../store/Action-Creators/useActions';
import { useTypedSelector } from '../../hooks/useTypedSelector';
import Loader from '../Loader';

export default function Login() {
	const initialValues = { email: '', password: '', confirmPassword: '', firstName: '', lastName: '' };
	const { RegisterUser } = useActions();
	const navigate = useNavigate();
	const { loading } = useTypedSelector((store) => store.accountReducer);
	const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();

		const data = new FormData(event.currentTarget);
		const res: RegisterDTO = {
			email: data.get('email') as string,
			password: data.get('password') as string,
			firstName: data.get('firstName') as string,
			lastName: data.get('lastName') as string,
		}


		await RegisterUser(res);
		navigate('/');
	}
	return (
		<>
			{loading ? <Loader /> : null}
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
										<label htmlFor="firstN" className="sr-only">
											First Name
										</label>
										<Field
											as={TextField}
											id="firstName"
											label="First Name"
											name="firstName"
											type="text"
											autoComplete="given-name"
											required
											className="relative block w-full appearance-none rounded-none rounded-t-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
											placeholder="First Name"
										/>
										{errors.firstName && touched.firstName ? (
											<div style={{ color: "red" }}>{errors.firstName}</div>
										) : null}
									</div>
									<div>
										<label htmlFor="lastN" className="sr-only">
											Surname
										</label>
										<Field
											as={TextField}
											id="lastName"
											label="Last Name"
											name="lastName"
											type="text"
											autoComplete="family-name"
											required
											className="relative block w-full appearance-none rounded-none rounded-t-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
											placeholder="Surname"
										/>
										{errors.lastName && touched.lastName ? (
											<div style={{ color: "red" }}>{errors.lastName}</div>
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
											type="password"
											autoComplete="current-password"
											required
											className="relative block w-full appearance-none rounded-none rounded-b-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
											placeholder="Confirm Password"
										/>
										{errors.confirmPassword && touched.confirmPassword ? (
											<div style={{ color: "red" }}>{errors.confirmPassword}</div>
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
