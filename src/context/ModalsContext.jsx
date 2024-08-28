import { createContext, useContext, useReducer } from 'react';

const ModalsContext = createContext();

const initialState = {
	isAddOpen: false,
	isDelOpen: false,
	isFilterOpen: false,
	isImportOpen: false,
};

function reducer(state, action) {
	switch (action.type) {
		case 'toggleAdd':
			return {
				...initialState,
				isAddOpen: !state.isAddOpen,
			};
		case 'toggleDelete':
			return {
				...initialState,
				isDelOpen: !state.isDelOpen,
			};
		case 'toggleFilter':
			return {
				...initialState,
				isFilterOpen: !state.isFilterOpen,
			};
		case 'toggleImport':
			return {
				...initialState,
				isImportOpen: !state.isImportOpen,
			};
		default:
			throw new Error('Wrong operation!');
	}
}

function ModalsProvider({ children }) {
	const [state, dispatch] = useReducer(reducer, initialState);
	const { isAddOpen, isDelOpen, isFilterOpen, isImportOpen } = state;

	return (
		<ModalsContext.Provider value={{ isAddOpen, isDelOpen, isFilterOpen, isImportOpen, dispatch }}>{children}</ModalsContext.Provider>
	);
}

function useModals() {
	const context = useContext(ModalsContext);
	if (context === undefined) throw new Error('ModalsContext used outside of ModalsProvider scope.');
	return context;
}

export { ModalsProvider, useModals };
