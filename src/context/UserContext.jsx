import { createContext, useContext, useReducer } from 'react';

const UserContext = createContext();

const initialState = {
	user: null,
	isAuthenticated: true,
};

function reducer(state, action) {
	switch (action.type) {
		case 'login':
			return {
				...state,
				user: action.payload,
				isAuthenticated: true,
			};
		case 'logout':
			return { ...initialState };
		default:
			throw new Error('Unknown action');
	}
}

function UserProvider({ children }) {
	const [{ user, isAuthenticated }, dispatch] = useReducer(reducer, initialState);

	function login(email, password) {}

	function logout() {
		dispatch({ type: 'logout' });
	}

	return <UserContext.Provider value={{ user, isAuthenticated, login, logout }}>{children}</UserContext.Provider>;
}

function useUser() {
	const context = useContext(UserContext);
	if (context === undefined) throw new Error('UserContext used outside of UserProvider scope.');
	return context;
}

export { UserProvider, useUser };
