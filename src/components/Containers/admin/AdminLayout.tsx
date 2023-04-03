import { Outlet, useNavigate } from "react-router-dom";
import AdminHeader from "./AdminHeader";
import { useTypedSelector } from '../../../hooks/useTypedSelector';
import { useEffect, useState } from 'react';

const AdminLayout = () => {

	const navigate = useNavigate();
	const { isAuth, user } = useTypedSelector(r => r.accountReducer);
	let isAdmin = false;

	if (isAuth && user) {
		isAdmin = user.roles.includes("ADMIN");
	}
	useEffect(() => {
		if (!isAdmin)
			navigate("/login");
	}, []);

	return (
		<>
			<AdminHeader />
			<main>
				{isAdmin && <Outlet />}
			</main>
		</>
	);
}
export default AdminLayout;