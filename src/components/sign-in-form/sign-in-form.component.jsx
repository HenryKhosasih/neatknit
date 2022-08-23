import { useState } from "react";

import Button, { BUTTON_TYPE_CLASSES } from "../button/button.component";
import FormInput from "../form-input/form-input.component";

import {
	signInWithGooglePopup,
	signInAuthUserWithEmailAndPassword,
} from "../../utils/firebase.utils";

import "./sign-in-form.styles.jsx";
import { ButtonsContainer, SignInContainer } from "./sign-in-form.styles.jsx";

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
			await signInAuthUserWithEmailAndPassword(email, password);
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
		await signInWithGooglePopup();
	};

	return (
		<SignInContainer>
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

				<ButtonsContainer>
					<Button type="submit">Sign In</Button>
					<Button
						buttonType={BUTTON_TYPE_CLASSES.google}
						type="button"
						onClick={logGoogleUser}
					>
						Google Sign In
					</Button>
				</ButtonsContainer>
			</form>
		</SignInContainer>
	);
};

export default SignInForm;
