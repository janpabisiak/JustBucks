import { useTransactions } from '../context/TransactionsContext';
import Transaction from './Transaction';

function TransactionsList() {
	const { paginatedTransactions } = useTransactions();

	return paginatedTransactions.map((transaction) => <Transaction key={transaction.id} transaction={transaction} />);
}

export default TransactionsList;
