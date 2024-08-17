import DataBox from './DataBox';

export default function Summary({ transactions, translation }) {
	const incomeSum =
		transactions.length > 0
			? transactions.filter((transaction) => transaction.type === 'Income').reduce((sum, transaction) => sum + transaction.amount, 0)
			: 0;
	const expenseSum =
		transactions.length > 0
			? transactions.filter((transaction) => transaction.type === 'Expense').reduce((sum, transaction) => sum + transaction.amount, 0)
			: 0;

	return (
		<section className="summaryBox">
			<DataBox value={incomeSum.toFixed(2)} description={translation.incomes} />
			<DataBox value={expenseSum.toFixed(2)} description={translation.expenses} />
			<DataBox value={(incomeSum + expenseSum).toFixed(2)} description={translation.total} />
		</section>
	);
}
