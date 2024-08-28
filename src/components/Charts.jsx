import { Chart as ChartJS } from 'chart.js/auto';
import { Bar } from 'react-chartjs-2';
import { useTransactions } from '../context/TransactionsContext';

export default function Charts({ categories }) {
	const { sortedTransactions: transactions } = useTransactions();

	function calculateExpenses() {
		const expenses = categories.map((category) => {
			return transactions
				.filter((transaction) => transaction.category === category && transaction.type == 'Expense')
				.reduce((acc, curr) => acc + curr.amount, 0);
		});
		return expenses;
	}

	function calculateIncomes() {
		const incomes = categories.map((category) => {
			return transactions
				.filter((transaction) => transaction.category === category && transaction.type == 'Income')
				.reduce((acc, curr) => acc + curr.amount, 0);
		});
		return incomes;
	}

	const data = {
		expenses: {
			categories,
			values: calculateExpenses(),
		},
		incomes: {
			categories,
			values: calculateIncomes(),
		},
	};

	return (
		<section className="charts">
			<div className="transactions-main">
				<h2>Charts</h2>
			</div>
			{data.expenses.values.filter((amount) => amount > 0).length > 0 && (
				<div className="chart">
					<p>Expense by categories</p>
					<Bar
						data={{
							labels: Array.from(data.expenses.categories),
							datasets: [
								{
									data: Array.from(data.expenses.values),
									backgroundColor: ['#08916a'],
								},
							],
						}}
						options={{
							plugins: {
								animation: false,
								legend: {
									display: false,
								},
							},
						}}
					/>
				</div>
			)}
			{data.incomes.values.filter((amount) => amount > 0).length > 0 && (
				<div className="chart">
					<p>Income by categories</p>
					<Bar
						data={{
							labels: Array.from(data.incomes.categories),
							datasets: [
								{
									data: Array.from(data.incomes.values),
									backgroundColor: ['#08916a'],
								},
							],
						}}
						options={{
							plugins: {
								animation: false,
								legend: {
									display: false,
								},
							},
						}}
					/>
				</div>
			)}
		</section>
	);
}
