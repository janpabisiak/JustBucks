import { useState, useEffect } from 'react';
import * as CONFIG from '../config';

export function usePagination(sortedTransactions, page) {
	const [paginatedTransactions, setPaginatedTransactions] = useState(sortedTransactions);

	useEffect(() => {
		const paginated = sortedTransactions.slice((page - 1) * CONFIG.TRANSACTIONS_PER_PAGE, page * CONFIG.TRANSACTIONS_PER_PAGE);
		setPaginatedTransactions(paginated);
	}, [page, sortedTransactions]);

	return { paginatedTransactions };
}
