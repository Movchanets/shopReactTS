import { Field, Formik } from 'formik';
import { ProductSchema } from '../Schemas';
import { ICategory, ICategoryDTO, ICreateProduct, IEditProduct, IProduct } from '../../store/Types';
import { ChangeEvent, useEffect, useState } from 'react';
import { Button, InputLabel, MenuItem, Select, TextField } from '@mui/material';
import { useActions } from '../../store/Action-Creators/useActions';
import { useTypedSelector } from '../../hooks/useTypedSelector';
import Loader from '../Loader';
import { useNavigate, useParams } from 'react-router';
import React from 'react';
import { Link } from 'react-router-dom';
import { APP_ENV } from '../../env';
import { FaTrash } from 'react-icons/fa'

export default function EditProduct() {
	const params = useParams();
	const id: number = Number.parseInt(params.id as string);
	const initialValues = {
		name: '',
		description: '',
		price: 0,
		removeFiles: Array<string>(),

	};
	const { EditProduct, Categories, GetProduct } = useActions();
	const { loading, product } = useTypedSelector((store) => store.productReducer);
	const { categories } = useTypedSelector((store) => store.categoryReducer);
	const CategoryLoad = useTypedSelector((store) => store.categoryReducer.loading);
	const [oldImages, setOldImages] = useState<string[]>([]);
	const navigate = useNavigate();

	const [category, setCategory] = useState<any>(null);
	useEffect(() => {
		console.log(category)
	}, [category])

	const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();

		const data = new FormData(event.currentTarget);

		const res: IEditProduct = {
			name: data.get('name') as string,
			files: model,
			description: data.get('description') as string,
			price: Number(data.get('price')),
			category_id: category?.id ?? product?.category_id,
			removeFiles: fileToRemove
		};
		console.log(res);

		await EditProduct(id, res);
		navigate('/');
	};



	useEffect(() => {
		(async () => {

			await GetProduct(id);

			await Categories();

			async function setData() {
				if (product === null) return;

				setOldImages(product.files);


			}

			await setData();
		})();




	}, [])
	useEffect(() => {



	}, [product])

	const [fileToRemove, setFileToRemove] = useState<string[]>([]);

	const [model, setModel] = useState<File[]>([]);


	const onFileHandler = (e: ChangeEvent<HTMLInputElement>) => {
		//console.log("Select files: ", e.target.files);
		const { target } = e;
		const { files } = target;
		if (files) {
			setModel([...model, ...Array.from(files)]);

		}
		target.value = "";
	}


	const contentCategories = categories.map((category) => (
		<option key={category.id} value={category.id}>{category.name}</option>
	));
	const onChangeHandler = (
		e:
			| ChangeEvent<HTMLInputElement>
			| ChangeEvent<HTMLTextAreaElement>
			| ChangeEvent<HTMLSelectElement>
	) => {
		//console.log(e.target.name, e.target.value);
		setCategory({ [e.target.name]: e.target.value });
	};
	const DeleteProductOldImagesHandler = (imageSrc: string) => {
		setFileToRemove([...fileToRemove, imageSrc]);
		setOldImages(oldImages.filter(x => x !== imageSrc));
	};

	const DataProductsOld = oldImages.map((product, index) => (
		<div key={index} className="inline  m-2 ">
			<div
				style={{ cursor: "pointer" }}
				className="flex justify-center ... border-2 border-black  rounded-lg ... "
				onClick={(e) => {
					DeleteProductOldImagesHandler(product);
				}}
			>
				<FaTrash className="m-2 " />
			</div>
			<div className="p-2">
				<img
					className=" w-20 h-20 "
					src={`${APP_ENV.REMOTE_HOST_NAME}files/600_${product}`}
				></img>
			</div>
		</div>
	));
	return (

		<div className='pt-5'>
			{loading || CategoryLoad ? <Loader /> : null}


			<div >
				<div className="md:col-span-1 m-5">
					<div className="px-4 sm:px-0">
						<h3 className="text-lg font-medium leading-6 text-gray-900">Category</h3>
						<p className="mt-1 text-sm text-gray-600">
							Edit Product here
						</p>
					</div>
				</div>
				<div className="mt-5 md:col-span-2 md:mt-0">
					<Formik
						enableReinitialize={true}
						initialValues={
							{
								name: product?.name ?? '',
								price: product?.price ?? 0,
								description: product?.description ?? '',
							}}

						onSubmit={() => {

						}}
						validationSchema={ProductSchema}
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
												Your new Product name.
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
												Your new Product description.
											</p>
											<div className="mt-1">
												<Field
													as={TextField}
													margin="normal"
													required

													fullWidth
													id="price"

													name="price"

													autoFocus
												/>
												{errors.price && touched.price ? (
													<div style={{ color: "red" }}>{errors.price}</div>
												) : null}
											</div>
											<p className="mt-2 text-sm text-gray-500">
												Your new Product price.
											</p>
											<div>
												<label
													htmlFor="countries"
													className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
												>
													Оберіть категорію
												</label>
												<select
													value={product?.category_id}
													onChange={onChangeHandler}
													id="category_id"
													name="category_id"
													className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
												>

													{contentCategories}
												</select>
											</div>
											<div className="mt-1 flex items-center">
												<label className="flex ">
													<>{DataProductsOld}</>
												</label>
											</div>
											{/* <div className="mt-1">
												<InputLabel id="select-label">Category</InputLabel>
												<Select labelId="select-label" value={SelectValue} onChange={(e) => {
													setCategory(categories.find(i => i.id.toString() == (e.target.value)));
													setSelectValue(e.target.value)
												}}>

													{categories?.map((c) => {

														return <MenuItem key={c.id} value={c.id}>{c.name}</MenuItem>
													})}
												</Select>
											</div> */}
										</div>
										<div>
											<label className="block text-sm font-medium text-gray-700">
												Фото
											</label>

											<div className="mt-1 flex items-center">
												<label
													htmlFor="selectImage"
													className="inline-block w-20 overflow-hidden bg-gray-100"
												>

													{model.map((file, index) =>
														<div key={index + '_item'} >
															<img key={index} src={URL.createObjectURL(file)} />
															<Button onClick={() => {
																console.log(model)
																console.log(index)
																if (index > -1) { // only splice array when item is found
																	model.splice(index, 1);
																	let m = [...model];
																	setModel(m); // 2nd parameter means remove one item only
																}
															}} >Delete</Button>
														</div>
													)
													}

												</label>
												<label
													htmlFor="selectImage"
													className="ml-5 rounded-md border border-gray-300 bg-white 
                        py-2 px-3 text-sm font-medium leading-4 text-gray-700 
                        shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 
                        focus:ring-indigo-500 focus:ring-offset-2"
												>
													Обрати фото
												</label>
											</div>

											<input
												type="file"
												id="selectImage"
												onChange={onFileHandler}
												className="hidden"
												multiple
											/>
										</div>
									</div>



									<div className="bg-gray-50 px-4 py-3 text-right sm:px-6">
										<button
											disabled={!(isValid && dirty && model != null)}
											type="submit"
											className="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"

										>
											{isSubmitting ? "Loading..." : "Save"}
										</button>
										<button><Link to={`/products/`}
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
