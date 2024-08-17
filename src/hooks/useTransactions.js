import { useState, useEffect } from 'react';

export function useTransactions() {
	const [transactions, setTransactions] = useState(() => {
		const storedValue = localStorage.getItem('transactions');
		return storedValue ? JSON.parse(storedValue) : [];
	});

	useEffect(() => {
		localStorage.setItem('transactions', JSON.stringify(transactions));
	}, [transactions]);

	const handleAddTransaction = (transaction) => {
		const updatedTransactions = [...transactions, transaction];
		setTransactions(updatedTransactions);
	};

	const handleRemoveTransaction = (id) => {
		const updatedTransactions = transactions.filter((transaction) => transaction.id !== id);
		setTransactions(updatedTransactions);
	};

	const handleEditTransaction = (updatedTransaction) => {
		const updatedTransactions = transactions.map((transaction) =>
			transaction.id === updatedTransaction.id ? updatedTransaction : transaction
		);
		setTransactions(updatedTransactions);
	};

	const handleImportData = (importedTransactions) => {
		const updatedTransactions = [...transactions, ...importedTransactions];
		setTransactions(updatedTransactions);
	};

	return { transactions, handleAddTransaction, handleRemoveTransaction, handleEditTransaction, handleImportData };
}
