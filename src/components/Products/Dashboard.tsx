import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Modal, Slide } from '@mui/material';
import { useActions } from '../../store/Action-Creators/useActions';
import { useTypedSelector } from '../../hooks/useTypedSelector';
import { useEffect } from 'react';
import { IProduct } from '../../store/Types';
import { Link } from 'react-router-dom';
import { TransitionProps } from '@mui/material/transitions';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import React from 'react';
import { APP_ENV } from '../../env';
import ModalDelete from '../Modal';
import Loader from '../Loader';

export const ProductDashboard = () => {

	const deleteProductHandler = (id: number) => {

		async function DoAction() {
			await ProductDelete(id)
			await Products();
		}
		DoAction();
	}

	const { Products, ProductDelete } = useActions();

	const { products, loading } = useTypedSelector((store) => store.productReducer);



	const columns: GridColDef[] = [
		{ field: "id", headerName: "Id", width: 50 },
		{ field: "name", headerName: "Name", width: 100 },
		{ field: "description", headerName: "Description", width: 150 },
		{ field: "price", headerName: "Price", width: 50 },
		{ field: "category", headerName: "Category", width: 100 },
		{
			field: "files", headerName: "image", width: 300,
			renderCell: (params) => {
				const images = params.row.files;
				return (
					<div
						style={{
							display: "flex",
							flexDirection: "row",
							justifyContent: "center",
							alignItems: "center",
						}}
					>
						{images.map((image: string) => (
							<img key={image}

								src={`${APP_ENV.REMOTE_HOST_NAME}files/150_${image}`}
								alt="product"
								style={{
									width: "100px",
									height: "100px",
									margin: "5px",
									borderRadius: "5px",
								}}
							/>
						))}

					</div>);
			}
		},
		{
			field: 'Delete',
			headerName: 'Delete',
			sortable: false,

			renderCell: (params) => {
				return <ModalDelete
					id={params.row.id}
					title={params.row.name}
					text={'Ви впевнені, що хочете видалити цей продукт? - ' + params.row.name}
					deleteFunc={deleteProductHandler}
				/>
			}
		},
		{
			field: 'Edit',
			headerName: 'Edit',
			sortable: false,

			renderCell: (params) => {

				return (<Button><Link to={`/Product/Edit/` + params.row.id} >Edit</Link> </Button>);

			}
		}
	];
	useEffect(() => {

		async function DoAction() {
			await Products();
		}
		DoAction();
	}, []);
	let rows: IProduct[] = products;
	return (
		<>
			{loading ? <Loader /> : null}
			<div style={{ height: "50vh", width: "100%" }}>
				<DataGrid
					hideFooter={true}
					rowHeight={75}
					rows={rows}
					columns={columns}
				/>
			</div>
			<div>
				<Button><Link to={`/Product/Create`}
					className="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"

				>Create new Product</Link> </Button>
				<Button><Link to={`/`}
					className="inline-flex justify-center rounded-md border border-transparent bg-gray-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"

				>Return to homepage</Link> </Button>
			</div>
		</>
	);
}