import { useEffect } from 'react';
import { useNavigate } from 'react-router';
import { useTypedSelector } from '../../hooks/useTypedSelector';
import { APP_ENV } from '../../env';
import { useActions } from '../../store/Action-Creators/useActions';
import { ILoadAvatar } from '../../store/Types';
const toBase64 = (file: any) => new Promise((resolve, reject) => {
	const reader = new FileReader();
	reader.readAsDataURL(file);
	reader.onload = () => resolve(reader.result);
	reader.onerror = error => reject(error);
});

export const Profile = () => {
	const navigate = useNavigate();
	const { isAuth } = useTypedSelector(r => r.accountReducer);

	const { user } = useTypedSelector(r => r.accountReducer);
	const { ChangePicture } = useActions();
	useEffect(() => {
		if (!isAuth)
			navigate("/login");
	}, []);
	return (
		<div className="md:flex items-start justify-center py-12 2xl:px-20 md:px-6 px-4">
			<div className="w-4/12  ">

				<img src={`${APP_ENV.REMOTE_HOST_NAME}files/300_` + user?.image}
					alt="..."
					className=" block" />

				<input
					type="file"
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
					onChange={async (e) => {


						const dto: ILoadAvatar
							= {
							base64: (await toBase64(e.target.files?.item(0)) as string),
							email: user?.email ?? ''
						}
						await ChangePicture(dto);
					}}
				/>



			</div>
			<div className="xl:w-2/5 md:w-1/2 lg:ml-8 md:ml-6 md:mt-0 mt-6">
				<div className="border-b border-gray-200 pb-6">
					<p className="text-sm leading-none text-gray-600"></p>
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
						{user?.email}
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
						{user?.phone}
					</p>
				</div>



				<div className="border-b border-gray-200 py-6">
					<p className="text-base leading-4 text-gray-800">{user?.roles[0]}</p>


				</div>
				<div>

				</div>
				<div>

				</div>
			</div>
		</div>
	);
};