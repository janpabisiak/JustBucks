import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Summary from './Summary';
import Charts from './Charts';
import Transactions from './Transactions';
import AddTransactionForm from './AddTransactionForm';
import DeleteTransactionForm from './DeleteTransactionForm';
import FilterTransactionForm from './FilterTransactionForm';
import ImportTransactionsForm from './ImportTransactionsForm';
import SettingsForm from './SettingsForm';
import { useTransactions } from '../../context/TransactionsContext';
import { useModals } from '../../context/ModalsContext';
import { useUser } from '../../context/UserContext';

function Main() {
	const { transactions, selectedID } = useTransactions();
	const { isAddOpen, isDelOpen, isFilterOpen, isImportOpen, isSettingsOpen } = useModals();
	const { isAuthenticated } = useUser();
	const navigate = useNavigate();

	const selectedTransaction = transactions.filter((transaction) => transaction.id === selectedID)[0];
	const categoriesTemp = transactions.map((transaction) => transaction.category);
	const categories = Array.from(new Set(categoriesTemp));

	useEffect(() => {
		if (!isAuthenticated) navigate('/login');
	}, [isAuthenticated]);

	return (
		<main style={{ flex: 1 }}>
			<Summary />
			<Charts categories={categories} />
			<Transactions />
			{isAddOpen && !selectedID && <AddTransactionForm categories={categories} />}
			{isAddOpen && selectedID && <AddTransactionForm categories={categories} transaction={selectedTransaction} />}
			{isDelOpen && <DeleteTransactionForm />}
			{isFilterOpen && <FilterTransactionForm categories={categories} />}
			{isImportOpen && <ImportTransactionsForm />}
			{isSettingsOpen && <SettingsForm />}
		</main>
	);
}

export default Main;
