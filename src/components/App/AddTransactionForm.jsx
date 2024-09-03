import { useState } from 'react';
import { useTranslation } from '../../context/TranslationContext';
import { useTheme } from '../../context/ThemeContext';
import { useTransactions } from '../../context/TransactionsContext';
import { useModals } from '../../context/ModalsContext';
import styles from '../../styles/App/Modal.module.css';

export default function AddTransactionForm({ categories, transaction }) {
	const [title, setTitle] = useState(transaction?.title || '');
	const [type, setType] = useState(transaction?.type || '');
	const [category, setCategory] = useState(transaction?.category || '');
	const [description, setDescription] = useState(transaction?.description || '');
	const [amount, setAmount] = useState(transaction?.amount || undefined);
	const [date, setDate] = useState(() => {
		const initialDate = transaction?.date ? new Date(transaction.date) : new Date();
		return isNaN(initialDate.getTime()) ? new Date() : initialDate;
	});
	const { translation } = useTranslation();
	const { theme } = useTheme();
	const { dispatch: dispatchTransactions } = useTransactions();
	const { dispatch: dispatchModals } = useModals();

	const formattedDate = date.toISOString().split('T')[0];

	function handleClose() {
		dispatchTransactions({ type: 'transaction/select', payload: null });
		dispatchModals({ type: 'toggleAdd' });
	}

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

		if (!transaction) dispatchTransactions({ type: 'transaction/add', payload: newTransaction });
		if (transaction) dispatchTransactions({ type: 'transaction/edit', payload: newTransaction });
		dispatchModals({ type: 'toggleAdd' });
	}

	return (
		<div className={`${styles.modal} ${theme === 'dark' ? 'dark' : ''} prevent-select`}>
			<div className={styles.modalHeader}>
				<h1>{translation.addNewTransaction}</h1>
				<div className={styles.closeBtn} onClick={handleClose}>
					&times;
				</div>
			</div>
			<div>
				<form onSubmit={handleSubmit}>
					<input
						type="text"
						className={theme === 'dark' ? 'light-dark' : ''}
						placeholder={translation.enterTitle}
						value={title}
						onChange={(e) => setTitle(e.target.value)}
						required
					/>
					<select
						value={type}
						className={theme === 'dark' ? 'light-dark' : ''}
						onChange={(e) => setType(e.target.value)}
						required
					>
						<option value="">{translation.selectType}</option>
						<option value="Expense">{translation.expense}</option>
						<option value="Income">{translation.income}</option>
					</select>
					<input
						type="text"
						className={theme === 'dark' ? 'light-dark' : ''}
						placeholder={translation.enterCategory}
						value={category}
						onChange={(e) => setCategory(e.target.value)}
						list="categories"
						required
					/>
					<datalist id="categories">
						{categories.map((category) => {
							return <option key={category}>{category}</option>;
						})}
					</datalist>

					<textarea
						className={theme === 'dark' ? 'light-dark' : ''}
						placeholder={translation.enterDescription}
						value={description}
						onChange={(e) => setDescription(e.target.value)}
					></textarea>
					<input
						type="number"
						className={theme === 'dark' ? 'light-dark' : ''}
						placeholder={translation.enterAmount}
						value={amount || ''}
						onChange={(e) => setAmount(parseFloat(e.target.value || 0))}
						required
					/>
					<input
						type="date"
						className={theme === 'dark' ? 'light-dark' : ''}
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
