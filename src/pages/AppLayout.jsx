import { useState, useEffect } from 'react';
import * as CONFIG from '../config';
import translations from '../locales';

import Header from '../components/Header';
import Logo from '../components/Logo';
import ExportButton from '../components/ExportButton';
import ImportButton from '../components/ImportButton';
import SelectLanguage from '../components/SelectLanguage';
import Summary from '../components/Summary';
import Charts from '../components/Charts';
import Transactions from '../components/Transactions';
import TransactionsActions from '../components/TransactionsActions';
import Search from '../components/Search';
import SortTransactions from '../components/SortTransactions';
import FilterTransactionsButton from '../components/FilterTransactionsButton';
import TransactionsTable from '../components/TransactionsTable';
import Transaction from '../components/Transaction';
import Pagination from '../components/Pagination';
import AddTransactionForm from '../components/AddTransactionForm';
import DeleteTransactionForm from '../components/DeleteTransactionForm';
import FilterTransactionForm from '../components/FilterTransactionForm';
import ImportTransactionsForm from '../components/ImportTransactionsForm';
import Footer from '../components/Footer';
import SelectTheme from '../components/SelectTheme';

import applyFilters from '../utils/applyFilters';
import applySorting from '../utils/applySorting';

import TranslationContext from '../context/TranslationContext';
import ThemeContext from '../context/ThemeContext';

export default function App() {
	const [transactions, setTransactions] = useState(() => {
		const storedValue = localStorage.getItem('transactions');
		return storedValue ? JSON.parse(storedValue) : [];
	});
	const [isAddOpen, setIsAddOpen] = useState(false);
	const [isDelOpen, setIsDelOpen] = useState(false);
	const [isFilterOpen, setIsFilterOpen] = useState(false);
	const [isImportOpen, setIsImportOpen] = useState(false);
	const [filters, setFilters] = useState(null);
	const [sortType, setSortType] = useState(CONFIG.DEFAULT_SORT);
	const [selectedID, setSelectedID] = useState(null);
	const [searchQuery, setSearchQuery] = useState('');
	const [page, setPage] = useState(1);
	const [filteredTransactions, setFilteredTransactions] = useState(transactions);
	const [sortedTransactions, setSortedTransactions] = useState(filteredTransactions);
	const [paginatedTransactions, setPaginatedTransactions] = useState(sortedTransactions);
	const [language, setLanguage] = useState(() => localStorage.getItem('language') || 'english');
	const [theme, setTheme] = useState(() => localStorage.getItem('theme') || 'light');

	const categoriesTemp = transactions.map((transaction) => transaction.category);
	const categories = Array.from(new Set(categoriesTemp));
	const translation = translations[language];

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

	function handleChangeLanguage(language) {
		setLanguage(language);

		localStorage.setItem('language', language);
	}

	function handleChangeTheme(theme) {
		setTheme(theme);

		localStorage.setItem('theme', theme);
	}

	function handleCancelAddTransaction() {
		setIsAddOpen(false);
		setSelectedID(null);
	}

	useEffect(() => {
		localStorage.setItem('transactions', JSON.stringify(transactions));
	}, [transactions]);

	useEffect(() => {
		theme === 'dark' ? document.body.classList.add('light-dark') : document.body.classList.remove('light-dark');
	}, [theme]);

	useEffect(() => {
		document.title = 'TransactionTracker';
	}, []);

	useEffect(() => {
		const paginated = sortedTransactions.slice((page - 1) * CONFIG.TRANSACTIONS_PER_PAGE, page * CONFIG.TRANSACTIONS_PER_PAGE);
		setPaginatedTransactions(paginated);
	}, [page, sortedTransactions]);

	useEffect(() => {
		const filtered = applyFilters(transactions, filters, searchQuery);
		setFilteredTransactions(filtered);
	}, [filters, searchQuery, transactions]);

	useEffect(() => {
		const sorted = applySorting(filteredTransactions, sortType);
		setSortedTransactions(sorted);
	}, [sortType, filteredTransactions]);

	return (
		<div className="container">
			<ThemeContext.Provider value={theme}>
				<TranslationContext.Provider value={translation}>
					<Header>
						<Logo appName={CONFIG.APP_NAME} />
						{CONFIG.ALLOW_EXPORT && <ExportButton transactions={transactions} />}
						{CONFIG.ALLOW_IMPORT && <ImportButton setIsImportOpen={setIsImportOpen} />}
						<SelectLanguage language={language} onChangeLanguage={handleChangeLanguage} />
					</Header>
					<main>
						<Summary transactions={sortedTransactions} />
						<Charts categories={categories} transactions={transactions} />
						<Transactions isAddOpen={isAddOpen} setIsAddOpen={setIsAddOpen}>
							<TransactionsActions>
								<Search searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
								<SortTransactions sortType={sortType} setSortType={setSortType} />
								{paginatedTransactions.length > 0 && <FilterTransactionsButton setIsFilterOpen={setIsFilterOpen} />}
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
						<AddTransactionForm onCancelAdd={handleCancelAddTransaction} onAddTransaction={handleAddTransaction} />
					)}
					{isAddOpen && selectedID && (
						<AddTransactionForm
							onCancelAdd={handleCancelAddTransaction}
							onAddTransaction={handleAddTransaction}
							onEditTransaction={handleEditTransaction}
							transaction={transactions.filter((transaction) => transaction.id === selectedID)[0]}
						/>
					)}
					{isDelOpen && (
						<DeleteTransactionForm
							setIsDelOpen={setIsDelOpen}
							selectedID={selectedID}
							onRemoveTransaction={handleRemoveTransaction}
						/>
					)}
					{isFilterOpen && (
						<FilterTransactionForm
							setIsFilterOpen={setIsFilterOpen}
							categories={categories}
							transactions={transactions}
							onFilterTransactions={(filters) => setFilters(filters)}
						/>
					)}
					{isImportOpen && <ImportTransactionsForm setIsImportOpen={setIsImportOpen} onImportData={handleImportData} />}
					<Footer>
						<SelectTheme theme={theme} onThemeChange={handleChangeTheme} />
					</Footer>
				</TranslationContext.Provider>
			</ThemeContext.Provider>
		</div>
	);
}
