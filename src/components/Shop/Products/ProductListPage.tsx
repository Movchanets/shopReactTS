import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { APP_ENV } from "../../../env";
import { IProduct } from '../../../store/Types';
import { useTypedSelector } from '../../../hooks/useTypedSelector';
import { useActions } from '../../../store/Action-Creators/useActions';
import Loader from '../../Loader';


const ProductListPage = () => {
	const { products, loading } = useTypedSelector((store) => store.productReducer);
	const { Products } = useActions();
	useEffect(() => {
		async function fetchData() {
			await Products();
		}
		fetchData();
	}, []);



	const content = products.map((p) => (
		<div key={p.id}>
			<div className="group relative">
				<div className="relative h-80 w-full overflow-hidden rounded-lg bg-white group-hover:opacity-75 sm:aspect-w-2 sm:aspect-h-1 sm:h-64 lg:aspect-w-1 lg:aspect-h-1">
					<img
						src={`${APP_ENV.REMOTE_HOST_NAME}files/600_${p.files[0]}`}
						alt={p.name}
						className="h-full w-full object-cover object-center"
					/>
				</div>
				<h3 className="mt-6 text-sm text-gray-500">
					<a href="#">
						<span className="absolute inset-0" />
						{p.name}
					</a>
				</h3>
				<p className="text-base font-semibold text-gray-900">
					{p.price}&nbsp;грн.
				</p>
			</div>

		</div>
	));
	return (
		<>
			{loading ? <Loader /> : null}
			<div className="bg-gray-100">
				<div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
					<div className="mx-auto max-w-2xl py-16 sm:py-24 lg:max-w-none lg:py-32">
						<h2 className="text-2xl font-bold text-gray-900">Список товарів</h2>
						<div className="mt-2">
							<Link
								to="/product/create"
								className="py-2 px-4 bg-white border border-gray-200 text-gray-600 rounded hover:bg-gray-100 active:bg-gray-200 disabled:opacity-50"
							>
								Додати
							</Link>
						</div>

						<div className="mt-6 space-y-12 lg:grid lg:grid-cols-3 lg:gap-x-6 lg:space-y-0">
							{content}
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default ProductListPage;