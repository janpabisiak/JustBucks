import { useState, useEffect } from 'react';
import * as CONFIG from '../config';
import translations from '../locales';

import Header from './Header';
import Logo from './Logo';
import ExportButton from './ExportButton';
import ImportButton from './ImportButton';
import SelectLanguage from './SelectLanguage';
import Summary from './Summary';
import Transactions from './Transactions';
import TransactionsActions from './TransactionsActions';
import Search from './Search';
import SortTransactions from './SortTransactions';
import FilterTransactionsButton from './FilterTransactionsButton';
import TransactionsTable from './TransactionsTable';
import Transaction from './Transaction';
import Pagination from './Pagination';
import AddTransactionForm from './AddTransactionForm';
import DeleteTransactionForm from './DeleteTransactionForm';
import FilterTransactionForm from './FilterTransactionForm';
import ImportTransactionsForm from './ImportTransactionsForm';
import Footer from './Footer';

import { useTransactions } from '../hooks/useTransactions';
import { useFiltersAndSorting } from '../hooks/useFiltersAndSorting';
import { usePagination } from '../hooks/usePagination';

export default function App() {
	const { transactions, handleAddTransaction, handleRemoveTransaction, handleEditTransaction, handleImportData } = useTransactions();
	const [isAddOpen, setIsAddOpen] = useState(false);
	const [isDelOpen, setIsDelOpen] = useState(false);
	const [isFilterOpen, setIsFilterOpen] = useState(false);
	const [isImportOpen, setIsImportOpen] = useState(false);
	const [filters, setFilters] = useState(null);
	const [sortType, setSortType] = useState(CONFIG.DEFAULT_SORT);
	const [selectedID, setSelectedID] = useState(null);
	const [searchQuery, setSearchQuery] = useState('');
	const [page, setPage] = useState(1);
	const { sortedTransactions } = useFiltersAndSorting(transactions, filters, searchQuery, sortType);
	const { paginatedTransactions } = usePagination(sortedTransactions, page);
	const [language, setLanguage] = useState('english');

	const translation = translations[language];

	useEffect(() => {
		document.title = 'TransactionTracker';
	}, []);

	return (
		<div className="container">
			<Header>
				<Logo appName={CONFIG.APP_NAME} />
				{CONFIG.ALLOW_EXPORT && <ExportButton transactions={transactions} translation={translation} />}
				{CONFIG.ALLOW_IMPORT && <ImportButton setIsImportOpen={setIsImportOpen} translation={translation} />}
				<SelectLanguage language={language} setLanguage={setLanguage} />
			</Header>
			<main>
				<Summary transactions={sortedTransactions} translation={translation} />
				<Transactions isAddOpen={isAddOpen} setIsAddOpen={setIsAddOpen} translation={translation}>
					<TransactionsActions>
						<Search searchQuery={searchQuery} setSearchQuery={setSearchQuery} translation={translation} />
						<SortTransactions sortType={sortType} setSortType={setSortType} translation={translation} />
						{paginatedTransactions.length > 0 && (
							<FilterTransactionsButton setIsFilterOpen={setIsFilterOpen} translation={translation} />
						)}
					</TransactionsActions>
					{paginatedTransactions.length > 0 ? (
						<TransactionsTable translation={translation}>
							{paginatedTransactions.map((transaction) => (
								<Transaction
									key={transaction.id}
									transaction={transaction}
									setSelectedID={setSelectedID}
									setIsAddOpen={setIsAddOpen}
									setIsDelOpen={setIsDelOpen}
									translation={translation}
								/>
							))}
						</TransactionsTable>
					) : (
						<p>{translation.noTransactions}</p>
					)}
					{paginatedTransactions.length > 0 && (
						<Pagination
							page={page}
							setPage={setPage}
							pages={Math.ceil(sortedTransactions.length / CONFIG.TRANSACTIONS_PER_PAGE)}
						/>
					)}
				</Transactions>
			</main>
			{isAddOpen && !selectedID && (
				<AddTransactionForm setIsAddOpen={setIsAddOpen} onAddTransaction={handleAddTransaction} translation={translation} />
			)}
			{isAddOpen && selectedID && (
				<AddTransactionForm
					setIsAddOpen={setIsAddOpen}
					onAddTransaction={handleAddTransaction}
					onEditTransaction={handleEditTransaction}
					transaction={transactions.filter((transaction) => transaction.id === selectedID)[0]}
					translation={translation}
				/>
			)}
			{isDelOpen && (
				<DeleteTransactionForm
					setIsDelOpen={setIsDelOpen}
					selectedID={selectedID}
					onRemoveTransaction={handleRemoveTransaction}
					translation={translation}
				/>
			)}
			{isFilterOpen && (
				<FilterTransactionForm
					setIsFilterOpen={setIsFilterOpen}
					transactions={transactions}
					onFilterTransactions={(filters) => setFilters(filters)}
					translation={translation}
				/>
			)}
			{isImportOpen && (
				<ImportTransactionsForm setIsImportOpen={setIsImportOpen} onImportData={handleImportData} translation={translation} />
			)}
			<Footer />
		</div>
	);
}
