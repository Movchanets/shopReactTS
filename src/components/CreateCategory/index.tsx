import { Field, Formik } from 'formik';
import { CategorySchema } from '../Schemas';
import { ICategoryDTO } from '../../store/Types';
import { useEffect, useState } from 'react';
import { Button, TextField } from '@mui/material';
import { useActions } from '../../store/Action-Creators/useActions';
import { useTypedSelector } from '../../hooks/useTypedSelector';
import Loader from '../Loader';
import { Navigate } from 'react-router';

export default function CreateCategory() {
	const initialValues = {
		name: ''
	};
	const { CreateCategories } = useActions();
	const { loading } = useTypedSelector((store) => store.categoryReducer);
	const [submit, setSubmit] = useState(false);

	const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();

		const data = new FormData(event.currentTarget);
		const res: ICategoryDTO = { name: data.get('name') as string };
		console.log(res);
		CreateCategories(res);
		setSubmit(true);
	};
	if (submit) {
		<Navigate to="/" />
	}
	useEffect(() => { console.log(initialValues) }, [initialValues]);
	if (loading) {

	}


	return (

		<div className='pt-5'>
			{loading ? <Loader /> : null}
			{submit ? <Navigate to="/" /> : null}
			<div >
				<div className="md:col-span-1">
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
													id="email"

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
										</div>
									</div>
									<div className="bg-gray-50 px-4 py-3 text-right sm:px-6">
										<button
											disabled={!(isValid && dirty)}
											type="submit"
											className="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"

										>
											{isSubmitting ? "Loading..." : "Save"}
										</button>

									</div>
								</div>
							</form>)}
					</Formik>
				</div>
			</div>
		</div>
	)
}
