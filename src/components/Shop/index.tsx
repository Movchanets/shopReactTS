import React, { useEffect, useState } from 'react';
import { Box, Container, Paper } from '@mui/material';

import Copyright from '../Copyright';
import { uuid } from 'uuidv4';
import { useTypedSelector } from '../../hooks/useTypedSelector';
import { useActions } from '../../store/Action-Creators/useActions';
import { ImageBase } from '../../store/Types';
import Loader from '../Loader';




interface ICategoryView {

	name: string,
	description: string,
	imageSrc: string,
	imageAlt: string,
	href: string
}
const CategoryView = (callout: ICategoryView) => {


	return (<>
		<div key={callout.name + '_id'} className="group relative  scroll-smooth">
			<div className="relative h-80 w-full overflow-hidden rounded-lg bg-white group-hover:opacity-75 sm:aspect-w-2 sm:aspect-h-1 sm:h-64 lg:aspect-w-1 lg:aspect-h-1">
				<img
					src={callout.imageSrc}
					alt={callout.imageAlt}
					className="h-full w-full object-cover object-center"
				/>
			</div>
			<h3 className="mt-6 text-sm text-gray-500">
				<a href={callout.href}>
					<span className="absolute inset-0" />
					{callout.name}
				</a>
			</h3>
			<p className="text-base font-semibold text-gray-900">{callout.description}</p>
		</div>
	</>);
}
const Shop: React.FC = () => {

	const { categories, loading } = useTypedSelector((store) => store.categoryReducer)
	const { Categories } = useActions();

	useEffect(() => {
		async function fetchData() {
			await Categories();
		}
		fetchData();
	}, []);



	return (

		<Container maxWidth="lg" style={{ display: 'block' }}>
			{loading ? <Loader /> : null}




			<div className="bg-gray-100">
				<div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
					<div className="mx-auto max-w-2xl py-16 sm:py-24 lg:max-w-none lg:py-32">
						<h2 className="text-2xl font-bold text-gray-900">Collections</h2>

						<div className="mt-6 space-y-12 lg:grid lg:grid-cols-3 lg:gap-x-6 lg:space-y-0">

							{categories?.map((callout) => (
								CategoryView({

									name: callout.name,
									description: callout.description,
									imageSrc: ImageBase + '600_' + callout.urlImage,
									imageAlt: callout.name,
									href: '#'
								})))}

						</div>
					</div>
				</div>
			</div>
			<Copyright style={{ display: 'flex', justifyContent: 'center' }} />


		</Container >

	);
}
export default Shop;