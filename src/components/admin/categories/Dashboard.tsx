import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Slide } from '@mui/material';
import { TransitionProps } from '@mui/material/transitions';
import { GridColDef, DataGrid } from '@mui/x-data-grid';
import React, { useEffect } from 'react';

import { Link } from 'react-router-dom';
import { useTypedSelector } from '../../../hooks/useTypedSelector';
import { useActions } from '../../../store/Action-Creators/useActions';
import { APP_ENV } from '../../../env';
import { ICategory } from '../../../store/Types';
import Loader from '../../Loader';

export const Dashboard = () => {

	const { DeleteCategory, Categories } = useActions();
	const { loading, categories } = useTypedSelector((store) => store.categoryReducer);

	const Transition = React.forwardRef(function Transition(
		props: TransitionProps & {
			children: React.ReactElement<any, any>;
		},
		ref: React.Ref<unknown>,
	) {
		return <Slide direction="up" ref={ref} {...props} />;
	});
	const AlertDialogSlide: React.FC<any> = ({ id }) => {
		const [open, setOpen] = React.useState(false);



		const handleClickOpen = () => {
			setOpen(true);

		};

		const handleClose = () => {
			setOpen(false);

		};

		async function DoAction() {

			await DeleteCategory(id)
			await Categories();
			handleClose();
		}


		return (
			<div>
				<Button variant="outlined" onClick={handleClickOpen}>
					Delete
				</Button>
				<Dialog
					open={open}
					TransitionComponent={Transition}
					keepMounted

					onClose={handleClose}
					aria-describedby="alert-dialog-slide-description"
				>
					<DialogTitle>{"Delete this category?"}</DialogTitle>
					<DialogContent>
						<DialogContentText id="alert-dialog-slide-description">
							You cannot undo this action
						</DialogContentText>
					</DialogContent>
					<DialogActions>
						<Button onClick={handleClose}>Disagree</Button>
						<Button onClick={DoAction}>Agree</Button>
					</DialogActions>
				</Dialog>
			</div>
		);
	}
	const columns: GridColDef[] = [
		{ field: "id", headerName: "Id", width: 50 },
		{ field: "name", headerName: "Name", width: 100 },
		{ field: "description", headerName: "Description", width: 200 },
		{
			field: "urlImage", headerName: "image",
			renderCell: (params) => {
				return <img src={`${APP_ENV.REMOTE_HOST_NAME}files/` + "150_" + (params.value)} alt="image" />;
			}
		},
		{
			field: 'Delete',
			headerName: 'Delete',
			sortable: false,

			renderCell: (params) => {
				return <AlertDialogSlide id={params.row.id} />;
			}
		},
		{
			field: 'Edit',
			headerName: 'Edit',
			sortable: false,

			renderCell: (params) => {

				return (<Button><Link to={`/admin/Category/Edit/` + params.row.id} >Edit</Link> </Button>);

			}
		}
	];
	useEffect(() => {
		async function GetCategories() {
			await Categories();
		}
		GetCategories();
	}, []);

	let rows: ICategory[] = categories;
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
				<Button><Link to={`/admin/Category/Create`}
					className="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"

				>Create new Category</Link> </Button>
				<Button><Link to={`/`}
					className="inline-flex justify-center rounded-md border border-transparent bg-gray-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"

				>Return to homepage</Link> </Button>
			</div>
		</>
	);
}