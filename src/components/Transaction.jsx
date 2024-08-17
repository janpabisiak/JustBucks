import * as CONFIG from '../config';

export default function Transaction({ transaction, setSelectedID, setIsAddOpen, setIsDelOpen, translation }) {
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
				<button className="btn" onClick={handleEditClick}>
					{translation.edit}
				</button>
				<button className="btn" onClick={handleDeleteClick}>
					{translation.delete}
				</button>
			</td>
		</tr>
	);
}
