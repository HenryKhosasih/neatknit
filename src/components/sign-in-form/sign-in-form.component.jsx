import { useState } from "react";

import Button from "../button/button.component";
import FormInput from "../form-input/form-input.component";

import {
	signInWithGooglePopup,
	createUserDocumentFromAuth,
	signInAuthUserWithEmailAndPassword,
} from "../../utils/firebase.utils";

import "./sign-in-form.styles.scss";

const SignInForm = () => {
	const defaultFormFields = {
		email: "",
		password: "",
	};

	const [formFields, setFormFields] = useState(defaultFormFields);
	const { email, password } = formFields;

	const resetFormFields = () => {
		setFormFields(defaultFormFields);
	};

	const handleChange = (event) => {
		event.preventDefault();

		const { name, value } = event.target;
		setFormFields({ ...formFields, [name]: value });
	};

	const handleSubmit = async (event) => {
		event.preventDefault();

		try {
			const response = await signInAuthUserWithEmailAndPassword(
				email,
				password
			);
			console.log(response);
			resetFormFields();
		} catch (error) {
			switch (error.code) {
				case "auth/wrong-password":
				case "auth/user-not-found":
					alert("You have entered an invalid username or password");
					break;
				default:
					alert(error);
					break;
			}
		}
	};

	const logGoogleUser = async () => {
		const { user } = await signInWithGooglePopup();
		await createUserDocumentFromAuth(user);
	};

	return (
		<div className="sign-in-container">
			<h2>I already have an account</h2>
			<span>Sign in with your email and password</span>
			<form onSubmit={handleSubmit}>
				<FormInput
					label="Email"
					type="email"
					required
					name="email"
					onChange={handleChange}
					value={email}
				/>
				<FormInput
					label="Password"
					type="password"
					required
					name="password"
					onChange={handleChange}
					value={password}
				/>

				<div className="buttons-container">
					<Button type="submit">Sign In</Button>
					<Button buttonType="google" type="button" onClick={logGoogleUser}>
						Google Sign In
					</Button>
				</div>
			</form>
		</div>
	);
};

export default SignInForm;