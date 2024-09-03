import DataBox from './DataBox';
import { useTransactions } from '../../context/TransactionsContext';
import { useTranslation } from '../../context/TranslationContext';
import styles from '../../styles/App/Summary.module.css';

export default function Summary() {
	const { filteredTransactions: transactions } = useTransactions();
	const { translation } = useTranslation();

	const incomeSum =
		transactions.length > 0
			? transactions.filter((transaction) => transaction.type === 'Income').reduce((sum, transaction) => sum + transaction.amount, 0)
			: 0;
	const expenseSum =
		transactions.length > 0
			? transactions.filter((transaction) => transaction.type === 'Expense').reduce((sum, transaction) => sum + transaction.amount, 0)
			: 0;

	return (
		<section className={styles.summaryBox}>
			<DataBox value={incomeSum.toFixed(2)} description={translation.incomes} />
			<DataBox value={expenseSum.toFixed(2)} description={translation.expenses} />
			<DataBox value={(incomeSum + expenseSum).toFixed(2)} description={translation.total} />
		</section>
	);
}
