import { createContext, useContext, useEffect, useReducer } from 'react';
import * as CONFIG from '../config';

import applyFilters from '../utils/applyFilters';
import applySorting from '../utils/applySorting';

const TransactionsContext = createContext();

const initialState = {
	transactions: JSON.parse(localStorage.getItem('transactions')) || [],
	currency: JSON.parse(localStorage.getItem('currency')) || 'USD',
	filters: null,
	sortType: CONFIG.DEFAULT_SORT,
	selectedID: null,
	searchQuery: '',
	page: 1,
	filteredTransactions: [],
	sortedTransactions: [],
	paginatedTransactions: [],
};

function reducer(state, action) {
	switch (action.type) {
		case 'transaction/select':
			return {
				...state,
				selectedID: action.payload,
			};
		case 'transaction/add':
			return {
				...state,
				transactions: [...state.transactions, action.payload],
			};
		case 'transaction/remove':
			return {
				...state,
				transactions: state.transactions.filter((transaction) => transaction.id !== action.payload),
			};
		case 'transaction/edit':
			return {
				...state,
				transactions: state.transactions.map((transaction) =>
					transaction.id === action.payload.id ? action.payload : transaction
				),
				selectedID: null,
			};
		case 'transactions/import':
			return {
				...state,
				transactions: [...state.transactions, ...action.payload],
			};
		case 'transactions/filter':
			return {
				...state,
				filteredTransactions: action.payload,
			};
		case 'transactions/sort':
			return {
				...state,
				sortedTransactions: action.payload,
			};
		case 'transactions/paginate':
			return {
				...state,
				paginatedTransactions: action.payload,
				pages: Math.ceil(state.sortedTransactions.length / CONFIG.TRANSACTIONS_PER_PAGE),
			};
		case 'filter':
			return {
				...state,
				filters: action.payload,
			};
		case 'sort':
			return {
				...state,
				sortType: action.payload,
			};
		case 'search':
			return {
				...state,
				searchQuery: action.payload,
			};
		case 'page/set':
			return {
				...state,
				page: action.payload,
			};
		case 'currency/set':
			return {
				...state,
				currency: action.payload,
			};
		default:
			throw new Error('Wrong operation.');
	}
}

function TransactionsProvider({ children }) {
	const [state, dispatch] = useReducer(reducer, initialState);
	const {
		transactions,
		currency,
		filteredTransactions,
		sortedTransactions,
		paginatedTransactions,
		filters,
		sortType,
		selectedID,
		searchQuery,
		page,
	} = state;

	const pages = Math.ceil(sortedTransactions.length / CONFIG.TRANSACTIONS_PER_PAGE);

	useEffect(() => {
		localStorage.setItem('currency', JSON.stringify(currency));
	}, [currency]);

	useEffect(() => {
		localStorage.setItem('transactions', JSON.stringify(transactions));
	}, [transactions]);

	useEffect(() => {
		const filtered = applyFilters(transactions, filters, searchQuery);
		dispatch({ type: 'transactions/filter', payload: filtered });
	}, [filters, searchQuery, transactions]);

	useEffect(() => {
		const sorted = applySorting(filteredTransactions, sortType);
		dispatch({ type: 'transactions/sort', payload: sorted });
	}, [sortType, filteredTransactions]);

	useEffect(() => {
		const paginated = sortedTransactions.slice((page - 1) * CONFIG.TRANSACTIONS_PER_PAGE, page * CONFIG.TRANSACTIONS_PER_PAGE);
		dispatch({ type: 'transactions/paginate', payload: paginated });
	}, [page, sortedTransactions]);

	return (
		<TransactionsContext.Provider
			value={{
				transactions,
				currency,
				filteredTransactions,
				sortedTransactions,
				paginatedTransactions,
				filters,
				sortType,
				selectedID,
				searchQuery,
				page,
				pages,
				dispatch,
			}}
		>
			{children}
		</TransactionsContext.Provider>
	);
}

function useTransactions() {
	const context = useContext(TransactionsContext);
	if (context === undefined) throw new Error('TransactionsContext used outside of TransactionsProvider scope.');
	return context;
}

export { TransactionsProvider, useTransactions };
