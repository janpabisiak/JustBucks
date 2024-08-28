import { useState } from 'react';
import { useModals } from '../context/ModalsContext';
import { useTransactions } from '../context/TransactionsContext';
import { useTheme } from '../context/ThemeContext';
import { useTranslation } from '../context/TranslationContext';

const types = ['Income', 'Expense'];

export default function FilterTransactionForm({ categories }) {
	const { translation } = useTranslation();
	const { theme } = useTheme();
	const { dispatch: dispatchModals } = useModals();
	const { transactions, dispatch: dispatchTransactions } = useTransactions();

	const [selectedTypes, setSelectedTypes] = useState(new Array(2).fill(true));
	const [selectedCategories, setSelectedCategories] = useState(new Array(categories.length).fill(true));
	const [amountRange, setAmountRange] = useState(() => {
		const minAmount = transactions.reduce((prev, curr) => (prev.amount < curr.amount ? prev : curr)).amount;
		const maxAmount = transactions.reduce((prev, curr) => (prev.amount > curr.amount ? prev : curr)).amount;
		return {
			min: minAmount,
			max: maxAmount,
		};
	});
	const [dateRange, setDateRange] = useState(() => {
		const minDate = new Date(transactions.reduce((prev, curr) => (new Date(prev.date) < new Date(curr.date) ? prev : curr)).date);
		const maxDate = new Date(transactions.reduce((prev, curr) => (new Date(prev.date) > new Date(curr.date) ? prev : curr)).date);
		return {
			min: minDate,
			max: maxDate,
		};
	});

	const formatDate = (date) => {
		const year = date.getFullYear();
		const month = String(date.getMonth() + 1).padStart(2, '0');
		const day = String(date.getDate()).padStart(2, '0');
		return `${year}-${month}-${day}`;
	};

	function handleUpdateTypes(i) {
		const updatedState = selectedTypes.map((type, index) => (index === i ? !type : type));
		setSelectedTypes(updatedState);
	}

	function handleUpdateCategories(i) {
		const updatedState = selectedCategories.map((category, index) => (index === i ? !category : category));
		setSelectedCategories(updatedState);
	}

	function handleSubmit() {
		const includedTypes = [];
		selectedTypes.forEach((bool, i) => {
			if (bool === true) includedTypes.push(types[i]);
		});

		const includedCategories = [];
		selectedCategories.forEach((bool, i) => {
			if (bool === true) includedCategories.push(categories[i]);
		});

		const filters = {
			types: includedTypes,
			categories: includedCategories,
			amount: {
				min: amountRange.min,
				max: amountRange.max,
			},
			date: {
				min: dateRange.min,
				max: dateRange.max,
			},
		};

		dispatchTransactions({ type: 'filter', payload: filters });
		dispatchModals({ type: 'toggleFilter' });
	}

	return (
		<div className={`modal ${theme === 'dark' && 'light-dark'}`}>
			<div className="modal-header">
				<h1>{translation.filterTransactions}</h1>
			</div>
			<div className="modal-body">
				<p>{translation.selectType}</p>
				<div className="checkbox-container">
					{types.map((type, i) => {
						return (
							<div className="checkbox" key={i}>
								<input type="checkbox" checked={selectedTypes[i]} onChange={() => handleUpdateTypes(i)} />
								<p>{type}</p>
							</div>
						);
					})}
				</div>
				<p>{translation.selectCategories}</p>
				<div className="checkbox-container">
					{categories.map((category, i) => {
						return (
							<div className="checkbox" key={i}>
								<input type="checkbox" checked={selectedCategories[i]} onChange={() => handleUpdateCategories(i)} />
								<p>{category}</p>
							</div>
						);
					})}
				</div>
				<p>{translation.selectAmount}</p>
				<div className="range-container">
					<input
						type="number"
						className={`${theme === 'dark' && 'light-dark'}`}
						value={amountRange.min}
						onChange={(e) => setAmountRange({ min: +e.target.value, max: amountRange.max })}
					/>
					<input
						type="number"
						className={`${theme === 'dark' && 'light-dark'}`}
						value={amountRange.max}
						onChange={(e) => setAmountRange({ min: amountRange.min, max: +e.target.value })}
					/>
				</div>
				<p>{translation.selectDate}</p>
				<div className="range-container">
					<input
						type="date"
						className={`${theme === 'dark' && 'light-dark'}`}
						value={formatDate(dateRange.min)}
						onChange={(e) => setDateRange({ min: new Date(e.target.value), max: dateRange.max })}
					/>
					<input
						type="date"
						className={`${theme === 'dark' && 'light-dark'}`}
						value={formatDate(dateRange.max)}
						onChange={(e) => setDateRange({ min: dateRange.min, max: new Date(e.target.value) })}
					/>
				</div>
			</div>
			<div className="modal-footer">
				<button className={`btn ${theme === 'dark' && 'dark'}`} onClick={() => dispatchModals({ type: 'toggleFilter' })}>
					{translation.cancel}
				</button>
				<button className="btn btn-primary" onClick={handleSubmit}>
					{translation.confirm}
				</button>
			</div>
		</div>
	);
}
