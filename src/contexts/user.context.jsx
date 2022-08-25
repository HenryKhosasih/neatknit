import { useReducer, createContext, useEffect } from "react";
import {
	createUserDocumentFromAuth,
	onAuthStateChangedListener,
} from "../utils/firebase/firebase.utils";
import { createAction } from "../utils/reducer/reducer.utils";

const USER_ACTION_TYPES = {
	SET_CURRENT_USER: "SET_CURRENT_USER",
};

export const UserContext = createContext({
	currentUser: null,
	setCurrentUser: () => null,
});

const userReducer = (state, action) => {
	const { type, payload } = action;

	switch (type) {
		case USER_ACTION_TYPES.SET_CURRENT_USER:
			return {
				...state,
				currentUser: payload,
			};
		default:
			throw new Error(`Unhandled type ${type} in userReducer`);
	}
};

const INITIAL_STATE = {
	currentUser: null,
};

export const UserProvider = ({ children }) => {
	const [{ currentUser }, dispatch] = useReducer(userReducer, INITIAL_STATE);
	const setCurrentUser = (user) =>
		dispatch(createAction(USER_ACTION_TYPES.SET_CURRENT_USER, user));

	const value = {
		currentUser,
		setCurrentUser,
	};

	useEffect(() => {
		onAuthStateChangedListener(() => {
			const unsubscribe = onAuthStateChangedListener((user) => {
				if (user) {
					createUserDocumentFromAuth(user);
				}
				setCurrentUser(user);
			});
			return unsubscribe; // unsubscribe observer on unmount to prevent memory leak
		});
	}, []);

	return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};
