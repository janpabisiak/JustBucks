import Chart from './Chart';
import { useTransactions } from '../../context/TransactionsContext';
import { useTheme } from '../../context/ThemeContext';
import { useTranslation } from '../../context/TranslationContext';
import styles from '../../styles/App/Charts.module.css';

export default function Charts({ categories }) {
	const { filteredTransactions: transactions } = useTransactions();
	const { translation } = useTranslation();
	const { theme } = useTheme();

	function calculateSums(type) {
		const sums = categories.map((category) => {
			return transactions
				.filter((transaction) => transaction.category === category && transaction.type === type)
				.reduce((acc, curr) => acc + curr.amount, 0);
		});

		const filteredCategories = [];
		const filteredSums = [];

		sums.forEach((sum, i) => {
			if (sum > 0) {
				filteredCategories.push(categories[i]);
				filteredSums.push(sum);
			}
		});

		return {
			categories: filteredCategories,
			values: filteredSums,
		};
	}

	const data = {
		expenses: calculateSums('Expense'),
		incomes: calculateSums('Income'),
	};

	return (
		<section className={`${styles.charts} ${theme === 'dark' ? 'dark' : ''}`}>
			<div className={styles.chartsMain}>
				<h2>{translation.charts}</h2>
			</div>
			{data.expenses.values.filter((amount) => amount > 0).length > 0 && (
				<Chart title={translation.expenseByCategories} data={data.expenses} />
			)}
			{data.incomes.values.filter((amount) => amount > 0).length > 0 && (
				<Chart title={translation.incomeByCategories} data={data.incomes} />
			)}
		</section>
	);
}
