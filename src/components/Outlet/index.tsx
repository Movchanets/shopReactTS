import React from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";

import { Outlet } from 'react-router-dom';
import ResponsiveAppBar from '../navbar';
const mdTheme = createTheme();
const HomePage: React.FC<any> = () => {
	return (<><ResponsiveAppBar />
		<ThemeProvider theme={mdTheme}>
			<Outlet />
		</ThemeProvider></>
	);
}
export default HomePage;