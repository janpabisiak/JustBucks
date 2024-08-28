import { useContext } from 'react';
import TranslationContext from '../context/TranslationContext';
import * as CONFIG from '../config';
import ThemeContext from '../context/ThemeContext';

export default function Transaction({ transaction, setSelectedID, setIsAddOpen, setIsDelOpen }) {
	const translation = useContext(TranslationContext);
	const theme = useContext(ThemeContext);
	const date = new Date(transaction.date);

	function handleEditClick() {
		setSelectedID(transaction.id);
		setIsAddOpen(true);
	}

	function handleDeleteClick() {
		setSelectedID(transaction.id);
		setIsDelOpen(true);
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
