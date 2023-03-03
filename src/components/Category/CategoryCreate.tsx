import { Field, Formik } from 'formik';
import { CategorySchema } from '../Schemas';
import { ICategoryDTO } from '../../store/Types';
import { useState } from 'react';
import { Input, TextField } from '@mui/material';
import { useActions } from '../../store/Action-Creators/useActions';
import { useTypedSelector } from '../../hooks/useTypedSelector';
import Loader from '../Loader';
import { useNavigate } from 'react-router';
import React from 'react';
import { Link } from 'react-router-dom';

export default function CreateCategory() {
	const initialValues = {
		name: '',
		description: '',

	};
	const { CreateCategories } = useActions();
	const { loading } = useTypedSelector((store) => store.categoryReducer);

	const navigate = useNavigate();
	const [base64, setBase64] = useState('');
	const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();

		const data = new FormData(event.currentTarget);
		const res: ICategoryDTO = { name: data.get('name') as string, base64: base64, description: data.get('description') as string };
		console.log(res);
		CreateCategories(res);
		navigate('/');
	};
	const handleFileRead = async (event: any) => {
		const file = event.target.files[0]
		const base64: any = await getBase64(file)
		setBase64(base64);


	}
	function getBase64(file: any) {
		return new Promise((resolve, reject) => {
			const reader = new FileReader();
			reader.readAsDataURL(file);
			reader.onload = () => {
				let encoded: any = reader.result?.toString();

				resolve(encoded);
			};
			reader.onerror = error => reject(error);
		});
	}
	return (

		<div className='pt-5'>
			{loading ? <Loader /> : null}


			<div >
				<div className="md:col-span-1 m-5">
					<div className="px-4 sm:px-0">
						<h3 className="text-lg font-medium leading-6 text-gray-900">Category</h3>
						<p className="mt-1 text-sm text-gray-600">
							Add new Category here
						</p>
					</div>
				</div>
				<div className="mt-5 md:col-span-2 md:mt-0">
					<Formik
						initialValues={initialValues}
						onSubmit={() => {

						}}
						validationSchema={CategorySchema}
					>
						{({ errors, touched, isSubmitting, isValid, dirty }) => (
							<form onSubmit={handleSubmit} noValidate>
								<div className="shadow sm:overflow-hidden sm:rounded-md">
									<div className="space-y-6 bg-white px-4 py-5 sm:p-6">


										<div>
											<label htmlFor="name" className="block text-sm font-medium text-gray-700">
												Name
											</label>
											<div className="mt-1">
												<Field
													as={TextField}
													margin="normal"
													required
													fullWidth
													id="name"

													name="name"

													autoFocus
												/>
												{errors.name && touched.name ? (
													<div style={{ color: "red" }}>{errors.name}</div>
												) : null}
											</div>
											<p className="mt-2 text-sm text-gray-500">
												Your new Category name.
											</p>

											<div className="mt-1">
												<Field
													as={TextField}
													margin="normal"
													required

													fullWidth
													id="description"

													name="description"

													autoFocus
												/>
												{errors.description && touched.description ? (
													<div style={{ color: "red" }}>{errors.description}</div>
												) : null}
											</div>
											<p className="mt-2 text-sm text-gray-500">
												Your new Category description.
											</p>
										</div>
										<Input
											id="image"
											type="file"
											inputProps={{ accept: '.jpg*' }}
											required

											name="image"
											onChange={(e: any) => { handleFileRead(e) }}
											size="small"

										/>
										{base64 == '' ? (
											<div style={{ color: "red" }}>{"Picture required"}</div>
										) : null}
										<img width={300} src={base64} />
										<p className="mt-2 text-sm text-gray-500">
											Your new Category image.
										</p>
									</div>
									<div className="bg-gray-50 px-4 py-3 text-right sm:px-6">
										<button
											disabled={!(isValid && dirty && base64 != '')}
											type="submit"
											className="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"

										>
											{isSubmitting ? "Loading..." : "Save"}
										</button>
										<button><Link to={`/Categories`}
											className="m-2 inline-flex justify-center rounded-md border border-transparent bg-gray-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"

										>Return to dashboard</Link> </button>
									</div>
								</div>
							</form>)}
					</Formik>
				</div>
			</div>
		</div >
	)
}
