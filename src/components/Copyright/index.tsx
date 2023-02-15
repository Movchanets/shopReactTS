import { Typography } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";

const Copyright: React.FC<any> = (props) => {
	return (
		<Typography variant="body2" color="text.secondary" align="center" {...props}>
			{'Copyright © '}
			<Link color="inherit" to="/">
				ShopApiReact
			</Link>{' '}
			{new Date().getFullYear()}
			{'.'}
		</Typography>
	)
}

export default Copyright;