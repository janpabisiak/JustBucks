import { useContext, useState } from 'react';
import TranslationContext from '../context/TranslationContext';
import ThemeContext from '../context/ThemeContext';

export default function AddTransactionForm({ onCancelAdd, onAddTransaction, onEditTransaction, transaction }) {
	const [title, setTitle] = useState(transaction?.title || '');
	const [type, setType] = useState(transaction?.type || '');
	const [category, setCategory] = useState(transaction?.category || '');
	const [description, setDescription] = useState(transaction?.description || '');
	const [amount, setAmount] = useState(transaction?.amount || undefined);
	const [date, setDate] = useState(() => {
		const initialDate = transaction?.date ? new Date(transaction.date) : new Date();
		return isNaN(initialDate.getTime()) ? new Date() : initialDate;
	});
	const translation = useContext(TranslationContext);
	const theme = useContext(ThemeContext);

	const formattedDate = date.toISOString().split('T')[0];

	function handleSubmit(e) {
		e.preventDefault();

		const newTransaction = {
			id: transaction?.id || new Date().getTime(),
			title,
			amount,
			date,
			category,
			type,
			description,
		};

		if (!transaction) onAddTransaction(newTransaction);
		if (transaction) onEditTransaction(newTransaction);
		onCancelAdd();
	}

	return (
		<div className={`modal ${theme === 'dark' && 'dark'}`}>
			<div className="modal-header">
				<h1>{translation.addNewTransaction}</h1>
				<div className="close-btn" onClick={onCancelAdd}>
					&times;
				</div>
			</div>
			<div className="modal-body">
				<form onSubmit={handleSubmit}>
					<input
						type="text"
						className={`${theme === 'dark' && 'light-dark'}`}
						placeholder={translation.enterTitle}
						value={title}
						onChange={(e) => setTitle(e.target.value)}
						required
					/>
					<select
						value={type}
						className={`${theme === 'dark' && 'light-dark'}`}
						onChange={(e) => setType(e.target.value)}
						required
					>
						<option value="">{translation.selectType}</option>
						<option value="Expense">{translation.expense}</option>
						<option value="Income">{translation.income}</option>
					</select>
					<input
						type="text"
						className={`${theme === 'dark' && 'light-dark'}`}
						placeholder={translation.enterCategory}
						value={category}
						onChange={(e) => setCategory(e.target.value)}
						required
					/>
					<textarea
						className={`${theme === 'dark' && 'light-dark'}`}
						placeholder={translation.enterDescription}
						value={description}
						onChange={(e) => setDescription(e.target.value)}
					></textarea>
					<input
						type="number"
						className={`${theme === 'dark' && 'light-dark'}`}
						placeholder={translation.enterAmount}
						value={amount}
						onChange={(e) => setAmount(+e.target.value)}
						required
					/>
					<input
						type="date"
						className={`${theme === 'dark' && 'light-dark'}`}
						value={formattedDate}
						onChange={(e) => setDate(new Date(e.target.value))}
						required
					/>
					<input type="submit" className="btn btn-primary" value={translation.addTransaction} />
				</form>
			</div>
		</div>
	);
}
