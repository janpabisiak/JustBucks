import { useState, useEffect } from 'react';
import applyFilters from '../utils/applyFilters';
import applySorting from '../utils/applySorting';

export function useFiltersAndSorting(transactions, filters, searchQuery, sortType) {
	const [filteredTransactions, setFilteredTransactions] = useState(transactions);
	const [sortedTransactions, setSortedTransactions] = useState(filteredTransactions);

	useEffect(() => {
		const filtered = applyFilters(transactions, filters, searchQuery);
		setFilteredTransactions(filtered);
	}, [filters, searchQuery, transactions]);

	useEffect(() => {
		const sorted = applySorting(filteredTransactions, sortType);
		setSortedTransactions(sorted);
	}, [sortType, filteredTransactions]);

	return { filteredTransactions, sortedTransactions };
}
