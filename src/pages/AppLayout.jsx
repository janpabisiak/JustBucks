import * as CONFIG from '../config';

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
import TransactionList from '../components/TransactionsList';
import Pagination from '../components/Pagination';
import AddTransactionForm from '../components/AddTransactionForm';
import DeleteTransactionForm from '../components/DeleteTransactionForm';
import FilterTransactionForm from '../components/FilterTransactionForm';
import ImportTransactionsForm from '../components/ImportTransactionsForm';
import Footer from '../components/Footer';
import SelectTheme from '../components/SelectTheme';

import { useModals } from '../context/ModalsContext';
import { useTransactions } from '../context/TransactionsContext';
import { useTranslation } from '../context/TranslationContext';
import { useTheme } from '../context/ThemeContext';

export default function App() {
	const { transactions, paginatedTransactions, selectedID, pages } = useTransactions();
	const { isAddOpen, isDelOpen, isFilterOpen, isImportOpen } = useModals();
	const { language, handleChangeLanguage, translation } = useTranslation();
	const { theme, handleChangeTheme } = useTheme();

	const selectedTransaction = transactions.filter((transaction) => transaction.id === selectedID)[0];
	const categoriesTemp = transactions.map((transaction) => transaction.category);
	const categories = Array.from(new Set(categoriesTemp));

	return (
		<div className="container">
			<Header>
				<Logo appName={CONFIG.APP_NAME} />
				{CONFIG.ALLOW_EXPORT && <ExportButton />}
				{CONFIG.ALLOW_IMPORT && <ImportButton />}
				<SelectLanguage language={language} onChangeLanguage={handleChangeLanguage} />
			</Header>
			<main>
				<Summary />
				<Charts categories={categories} />
				<Transactions>
					<TransactionsActions>
						<Search />
						<SortTransactions />
						{paginatedTransactions.length > 0 && <FilterTransactionsButton />}
					</TransactionsActions>
					{paginatedTransactions.length > 0 ? (
						<TransactionsTable>
							<TransactionList />
						</TransactionsTable>
					) : (
						<p>{translation.noTransactions}</p>
					)}
					{paginatedTransactions.length > 0 && <Pagination pages={pages} />}
				</Transactions>
			</main>
			{isAddOpen && !selectedID && <AddTransactionForm />}
			{isAddOpen && selectedID && <AddTransactionForm transaction={selectedTransaction} />}
			{isDelOpen && <DeleteTransactionForm />}
			{isFilterOpen && <FilterTransactionForm categories={categories} />}
			{isImportOpen && <ImportTransactionsForm />}
			<Footer>
				<SelectTheme theme={theme} onThemeChange={handleChangeTheme} />
			</Footer>
		</div>
	);
}
