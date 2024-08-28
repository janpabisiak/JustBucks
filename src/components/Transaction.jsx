import * as CONFIG from '../config';
import { useModals } from '../context/ModalsContext';
import { useTheme } from '../context/ThemeContext';
import { useTransactions } from '../context/TransactionsContext';
import { useTranslation } from '../context/TranslationContext';

export default function Transaction({ transaction }) {
	const { translation } = useTranslation();
	const { theme } = useTheme();
	const { dispatch: dispatchTransactions } = useTransactions();
	const { dispatch: dispatchModals } = useModals();
	const date = new Date(transaction.date);

	function handleEditClick() {
		dispatchTransactions({ type: 'transaction/select', payload: transaction.id });
		dispatchModals({ type: 'toggleAdd' });
	}

	function handleDeleteClick() {
		dispatchTransactions({ type: 'transaction/select', payload: transaction.id });
		dispatchModals({ type: 'toggleDelete' });
	}

	return (
		<tr>
			<td>
				<p className={transaction.type === 'Income' ? 'badge-income' : 'badge-expense'}>{transaction.type}</p>
			</td>
			<td>{transaction.title}</td>
			<td>{transaction.category}</td>
			<td>
				{transaction.amount} {CONFIG.CURRENCY}
			</td>
			<td>{date.toLocaleDateString()}</td>
			<td>
				<button className={`btn ${theme === 'dark' && 'light-dark'}`} onClick={handleEditClick}>
					{translation.edit}
				</button>
				<button className={`btn ${theme === 'dark' && 'light-dark'}`} onClick={handleDeleteClick}>
					{translation.delete}
				</button>
			</td>
		</tr>
	);
}
