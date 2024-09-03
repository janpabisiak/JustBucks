import { useModals } from '../../context/ModalsContext';
import { useTheme } from '../../context/ThemeContext';
import { useTranslation } from '../../context/TranslationContext';
import { useTransactions } from '../../context/TransactionsContext';
import TransactionsActions from './TransactionsActions';
import Search from './Search';
import SortTransactions from './SortTransactions';
import FilterTransactionsButton from './FilterTransactionsButton';
import AppliedFilters from './AppliedFilters';
import TransactionsTable from './TransactionsTable';
import TransactionsList from './TransactionsList';
import Pagination from './Pagination';
import styles from '../../styles/App/Transactions.module.css';

export default function Transactions() {
	const { paginatedTransactions, filters, pages } = useTransactions();
	const { translation } = useTranslation();
	const { theme } = useTheme();
	const { dispatch: dispatchModals } = useModals();

	return (
		<section className={`${styles.transactions} ${theme === 'dark' ? 'dark' : ''}`}>
			<div className={styles.transactionsMain}>
				<h2>{translation.transactions}</h2>
				<button className="btn btn-primary" onClick={() => dispatchModals({ type: 'toggleAdd' })}>
					{translation.newTransaction}
				</button>
			</div>
			<TransactionsActions>
				<Search />
				<SortTransactions />
				{paginatedTransactions.length > 0 && <FilterTransactionsButton />}
			</TransactionsActions>
			{filters && <AppliedFilters />}
			{paginatedTransactions.length > 0 ? (
				<TransactionsTable>
					<TransactionsList />
				</TransactionsTable>
			) : (
				<p>{translation.noTransactions}</p>
			)}
			{paginatedTransactions.length > 0 && <Pagination totalPages={pages} />}
		</section>
	);
}
