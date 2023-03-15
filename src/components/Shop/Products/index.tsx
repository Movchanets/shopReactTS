import React, { useEffect, useState } from "react";
import { useParams } from 'react-router';
import { useTypedSelector } from '../../../hooks/useTypedSelector';
import { useActions } from '../../../store/Action-Creators/useActions';
import { APP_ENV } from '../../../env';
import Loader from '../../Loader';
import Carousel from 'react-material-ui-carousel';
import { Paper } from '@mui/material';
import { Button } from 'reactstrap';

const Product = () => {
	const params = useParams();
	const id: number = Number.parseInt(params.id as string);
	const { GetProduct } = useActions();
	const { product } = useTypedSelector((store) => store.productReducer);
	const [show, setShow] = useState(false);
	const [show2, setShow2] = useState(false);







	const Item = (props: any) => {
		return (
			<Paper >


				<img src={`${APP_ENV.REMOTE_HOST_NAME}files/600_` + props.item} className="absolute block w-full  -translate-x-1/2  -translate-y-1/2 top-1/2 left-1/2" alt="..." />

			</Paper>
		)
	}
	useEffect(() => {
		async function fetchData() {
			await GetProduct(id);
		}
		fetchData();
	}, []);

	if (product === null) {
		return (<Loader />);
	}
	return (

		<div className="md:flex items-start justify-center py-12 2xl:px-20 md:px-6 px-4">
			<div className="w-4/12 ">
				<Carousel
					className="h-96 w-full"
					animation='slide'
					next={() => {/* Do stuff */ }}
					prev={() => {/* Do other stuff */ }}
				>
					{
						product?.files.map(((item, i) => <Item key={i} item={item} />))
					}
				</Carousel>
			</div>
			<div className="xl:w-2/5 md:w-1/2 lg:ml-8 md:ml-6 md:mt-0 mt-6">
				<div className="border-b border-gray-200 pb-6">
					<p className="text-sm leading-none text-gray-600">{product.category}</p>
					<h1
						className="
							lg:text-2xl
							text-xl
							font-semibold
							lg:leading-6
							leading-7
							text-gray-800
							mt-2
						"
					>
						{product.name}
					</h1>
					<p
						className="
							lg:text-xl
							text-l
							
							lg:leading-6
							leading-7
							text-gray-800
							mt-2
						"
					>
						{product.price} &#8372;
					</p>
				</div>


				<button
					className="
						focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-800
						text-base
						flex
						items-center
						justify-center
						leading-none
						text-white
						bg-gray-800
						w-full
						py-4
						hover:bg-gray-700
					"
				>

					Купити

				</button>

				<div>
					<div className="border-t border-b py-4 mt-7 border-gray-200">
						<div onClick={() => setShow(!show)} className="flex justify-between items-center cursor-pointer">
							<p className="text-base leading-4 text-gray-800">Shipping and returns</p>
							<button
								className="
									cursor-pointer
									focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-400
									rounded
								"
								aria-label="show or hide"
							>
								<svg className={"transform " + (show ? "rotate-180" : "rotate-0")} width="10" height="6" viewBox="0 0 10 6" fill="none" xmlns="http://www.w3.org/2000/svg">
									<path d="M9 1L5 5L1 1" stroke="#4B5563" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
								</svg>
							</button>
						</div>
						<div className={"pt-4 text-base leading-normal pr-12 mt-4 text-gray-600 " + (show ? "block" : "hidden")} id="sect">
							You will be responsible for paying for your own shipping costs for returning your item. Shipping costs are nonrefundable
						</div>
					</div>
				</div>
				<div>
					<div className="border-b py-4 border-gray-200">
						<div onClick={() => setShow2(!show2)} className="flex justify-between items-center cursor-pointer">
							<p className="text-base leading-4 text-gray-800">Contact us</p>
							<button
								className="
									cursor-pointer
									focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-400
									rounded
								"
								aria-label="show or hide"
							>
								<svg className={"transform " + (show2 ? "rotate-180" : "rotate-0")} width="10" height="6" viewBox="0 0 10 6" fill="none" xmlns="http://www.w3.org/2000/svg">
									<path d="M9 1L5 5L1 1" stroke="#4B5563" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
								</svg>
							</button>
						</div>
						<div className={"pt-4 text-base leading-normal pr-12 mt-4 text-gray-600 " + (show2 ? "block" : "hidden")} id="sect">
							If you have any questions on how to return your item to us, contact us.
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Product;
