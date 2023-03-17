import { Field, Formik } from 'formik';
import { ProductSchema } from '../Schemas';
import { ICategory, ICategoryDTO, ICreateProduct } from '../../store/Types';
import { ChangeEvent, useEffect, useRef, useState } from 'react';
import { Button, InputLabel, MenuItem, Select, TextField } from '@mui/material';
import { useActions } from '../../store/Action-Creators/useActions';
import { useTypedSelector } from '../../hooks/useTypedSelector';
import Loader from '../Loader';
import { useNavigate } from 'react-router';
import React from 'react';
import { Link } from 'react-router-dom';
import { Editor } from '@tinymce/tinymce-react';


export default function CreateProduct() {
	const initialValues = {
		name: '',
		description: 'valid description',
		price: 0


	};
	const { CreateProduct, Categories, } = useActions();
	const { loading } = useTypedSelector((store) => store.productReducer);
	const { categories } = useTypedSelector((store) => store.categoryReducer);
	const categoryLoading = useTypedSelector((store) => store.categoryReducer).loading;
	const navigate = useNavigate();




	const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();

		const data = new FormData(event.currentTarget);
		if (category == null) return;
		console.log(editorRef.current?.getContent() ?? '')
		const res: ICreateProduct = {
			name: data.get('name') as string,
			files: model,
			description: editorRef.current?.getContent() ?? '',
			price: Number(data.get('price')),
			categoryId: category.category_id
		};
		console.log(res);
		await CreateProduct(res);
		navigate('/');
	};



	useEffect(() => {
		async function fetchCategories() {
			await Categories()
		}
		fetchCategories();
	}, [])
	const contentCategories = categories.map((category) => (
		<option key={category.id} value={category.id}>{category.name}</option>
	));

	const [category, setCategory] = useState<any>(null);
	useEffect(() => {
		console.log(category?.category_id)
	}, [category])
	const onChangeHandler = (
		e:
			| ChangeEvent<HTMLInputElement>
			| ChangeEvent<HTMLTextAreaElement>
			| ChangeEvent<HTMLSelectElement>
	) => {
		//console.log(e.target.name, e.target.value);
		setCategory({ [e.target.name]: e.target.value });
	};
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
	const dataFileView: any = model.map((file, index) =>
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
	);
	useEffect(() => {
		console.log(category);
		console.log(editorRef?.current?.getContent());
	}, [category])
	const editorRef = useRef<any>(null);

	return (

		<div className='pt-5'>
			{loading || categoryLoading ? <Loader /> : null}


			<div >


				<div />
				<div className="md:col-span-1 m-5">
					<div className="px-4 sm:px-0">
						<h3 className="text-lg font-medium leading-6 text-gray-900">Product</h3>
						<p className="mt-1 text-sm text-gray-600">
							Add new Product here
						</p>
					</div>
				</div>
				<div className="mt-5 md:col-span-2 md:mt-0">
					<Formik
						initialValues={initialValues}
						onSubmit={() => {

						}}
						onInit
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

											<Editor

												initialValue="<p>Standart Descriprion</p>"
												onInit={(evt, editor) => editorRef.current = editor}
												apiKey='fhugnp7lkscyajt3l9x8rj6xxxbbuf612l86093z5i4d93c6'
												init={{
													height: 500,
													menubar: false,
													plugins: [
														'advlist autolink lists link image',
														'charmap print preview anchor help',
														'searchreplace visualblocks code',
														'insertdatetime media table paste wordcount'
													],
													toolbar:
														'undo redo | formatselect | bold italic | \
														alignleft aligncenter alignright | \
														bullist numlist outdent indent | help',
													forced_root_block: ""

												}}
											/>

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
													onChange={onChangeHandler}
													id="category_id"
													name="category_id"
													className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
												>
													<option hidden selected>Виберіть категорію</option>
													{contentCategories}
												</select>
											</div>
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
													{dataFileView}
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
									{/* <div>

											{itemList.length > 0 ?

												<DragDropContext onDragEnd={handleDrop}>

													<Droppable droppableId="list-container">
														{(provided) => (
															<div
																className="list-container"
																{...provided.droppableProps}
																ref={provided.innerRef}
															>

																{itemList.map((item, index) => (
																	<Draggable key={item} draggableId={item} index={index}>

																		{(provided) => (
																			<div
																				className="item-container"
																				ref={provided.innerRef}

																			>
																				<div>
																					<label htmlFor='first' >
																						<img src={"https://placehold.jp/3d4070/ffffff/200x200.png"} className="rounded h-20 w-20" />
																					</label>
																					<input type="file" hidden id='first' onChange={handleFileRead} onClick={() => console.log("file+")} />

																				</div>
																			</div>
																		)}
																	</Draggable>
																))}
																{provided.placeholder}
															</div>
														)}
													</Droppable>
												</DragDropContext>
												:
												<div>

													<input type="file" id='first' multiple onChange={(e) => {
														const a: File[] = Array.from(e.target.files || []);
														console.log(a);
														setItemList(a.map((i) => i.name));
														setFiles(a);
													}} onClick={() => console.log(itemList)} />

												</div>
											}
										</div> */}


									<div className="bg-gray-50 px-4 py-3 text-right sm:px-6">
										<button
											disabled={!(isValid && dirty && model != null)}
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
