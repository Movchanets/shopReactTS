import * as Yup from "yup";

const passwordRegExp = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-_]).{6,}$/;

export const LoginSchema = Yup.object().shape({
	rememberMe: Yup.boolean().label("Remember me"),
	email: Yup.string().email("Invalid email address").required("Required").label('Email address'),
	password: Yup.string()
		.min(6, "Password must be at least 6 characters")
		.required("Required").matches(passwordRegExp, "Password must contains A-Z, a-z, 0-9").label("Password"),
});


export const RegisterSchema = Yup.object().shape({
	email: Yup.string().email("Invalid email address").required("Required").label('Email address'),
	password: Yup.string()
		.min(6, "Password must be at least 6 characters")
		.required("Required").matches(passwordRegExp, "Password must contains A-Z, a-z, 0-9").label("Password"),
	confirmPassword: Yup.string()
		.oneOf([Yup.ref("password")], "Passwords must match")
		.required("Required").label("Confirm password"),


});
export const CategorySchema = Yup.object().shape({
	name: Yup.string().required("Required").label('Category name').min(3, "Category name must be at least 3 characters").max(50, "Category name must be at most 50 characters"),
});