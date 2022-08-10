import { createContext, useEffect, useState } from "react";
import {
	createUserDocumentFromAuth,
	onAuthStateChangedListener,
} from "../../utils/firebase.utils";

export const UserContext = createContext({
	currentUser: null,
	setCurrentUser: () => null,
});

export const UserProvider = ({ children }) => {
	const [currentUser, setCurrentUser] = useState(null);
	const value = { currentUser, setCurrentUser };

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
