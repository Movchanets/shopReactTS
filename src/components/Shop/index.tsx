import React, { useEffect, useState } from 'react';
import { Box, Container, Paper } from '@mui/material';

import Copyright from '../Copyright';

import { useTypedSelector } from '../../hooks/useTypedSelector';
import { useActions } from '../../store/Action-Creators/useActions';

import { ICategory } from '../../store/Types';




const Shop: React.FC = () => {

	const { categories } = useTypedSelector((store) => store.categoryReducer)
	const { Categories } = useActions();

	useEffect(() => { Categories() }, []);


	function uuidv4(): React.Key | null | undefined {
		throw new Error('Function not implemented.');
	}

	return (

		<Container maxWidth="lg">

			<Box sx={{ paddingBottom: '100px', width: '100%', display: 'flex', flexWrap: 'wrap' }}>

				{
					categories?.map((category: ICategory) => (

						<Box key={category.id} >
							<h1>{category.id} : {category.name}</h1>
						</Box>
					))}


			</Box>

			<Paper sx={{ position: 'fixed', marginTop: '50px', bottom: 0, left: 0, right: 0 }} elevation={3}>
				<Container>
					<div
						style={{
							display: 'flex',
							alignItems: 'center',
							justifyContent: 'center',

						}}
					>

					</div>
				</Container>
				<Copyright style={{ display: 'flex', justifyContent: 'center' }} />
			</Paper>

		</Container >
	);
}
export default Shop;