import formatDateString from '../../utils/formatDateString';
import { useModals } from '../../context/ModalsContext';
import { useTheme } from '../../context/ThemeContext';
import { useTransactions } from '../../context/TransactionsContext';
import { useTranslation } from '../../context/TranslationContext';
import styles from '../../styles/App/TransactionsTable.module.css';

export default function Transaction({ transaction }) {
	const { translation } = useTranslation();
	const { theme } = useTheme();
	const { currency, dispatch: dispatchTransactions } = useTransactions();
	const { dispatch: dispatchModals } = useModals();

	function handleEditClick() {
		dispatchTransactions({ type: 'transaction/select', payload: transaction.id });
		dispatchModals({ type: 'toggleAdd' });
	}

	function handleDeleteClick() {
		dispatchTransactions({ type: 'transaction/select', payload: transaction.id });
		dispatchModals({ type: 'toggleDelete' });
	}

	return (
		<tr className={theme === 'dark' ? 'dark' : ''}>
			<td>
				<p className={`${transaction.type === 'Income' ? styles.badgeIncome : styles.badgeExpense} prevent-select`}>
					{transaction.type}
				</p>
			</td>
			<td>{transaction.title}</td>
			<td>{transaction.category}</td>
			<td>
				{transaction.amount} {currency}
			</td>
			<td>{formatDateString(transaction.date, 'string')}</td>
			<td>
				<button className={`btn ${theme === 'dark' ? 'light-dark' : ''}`} onClick={handleEditClick}>
					{translation.edit}
				</button>
				<button className={`btn ${theme === 'dark' ? 'light-dark' : ''}`} onClick={handleDeleteClick}>
					{translation.delete}
				</button>
			</td>
		</tr>
	);
}
