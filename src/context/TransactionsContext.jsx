import { createContext, useContext, useReducer } from 'react';

const TransactionsContext = createContext();

const initialState = {
	transactions: [],
	filteredTransactions: [],
	sortedTransactions: [],
	paginatedTransactions: [],
};

function TransactionsProvider({ children }) {
	const [state, dispatch] = useReducer(reducer, initialState);

	return <TransactionsContext.Provider>{children}</TransactionsContext.Provider>;
}

function useTransactions() {
	const context = useContext(TransactionsContext);
	if (context === undefined) throw new Error('TransactionsContext used outside of TransactionsProvider scope.');
	return context;
}

export { TransactionsProvider, useTransactions };
