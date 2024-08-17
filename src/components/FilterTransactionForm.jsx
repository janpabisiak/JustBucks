import { useState } from 'react';

const types = ['Income', 'Expense'];

export default function FilterTransactionForm({ setIsFilterOpen, transactions, onFilterTransactions, translation }) {
	const categoriesTemp = transactions.map((transaction) => transaction.category);
	const categories = Array.from(new Set(categoriesTemp));

	const [selectedTypes, setSelectedTypes] = useState(new Array(2).fill(true));
	const [selectedCategories, setSelectedCategories] = useState(new Array(categories.length).fill(true));
	const [amountRange, setAmountRange] = useState(function () {
		const minAmount = transactions.reduce((prev, curr) => (prev.amount < curr.amount ? prev : curr)).amount;
		const maxAmount = transactions.reduce((prev, curr) => (prev.amount > curr.amount ? prev : curr)).amount;
		return {
			min: minAmount,
			max: maxAmount,
		};
	});
	const [dateRange, setDateRange] = useState(function () {
		const minDate = transactions.reduce((prev, curr) => (prev.date.getTime() < curr.date.getTime() ? prev : curr)).date;
		const maxDate = transactions.reduce((prev, curr) => (prev.date.getTime() > curr.date.getTime() ? prev : curr)).date;
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

		onFilterTransactions(filters);
		setIsFilterOpen(false);
	}

	return (
		<div className="modal">
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
						value={amountRange.min}
						onChange={(e) => setAmountRange({ min: +e.target.value, max: amountRange.max })}
					/>
					<input
						type="number"
						value={amountRange.max}
						onChange={(e) => setAmountRange({ min: amountRange.min, max: +e.target.value })}
					/>
				</div>
				<p>{translation.selectDate}</p>
				<div className="range-container">
					<input
						type="date"
						value={formatDate(dateRange.min)}
						onChange={(e) => setDateRange({ min: new Date(e.target.value), max: dateRange.max })}
					/>
					<input
						type="date"
						value={formatDate(dateRange.max)}
						onChange={(e) => setDateRange({ min: dateRange.min, max: new Date(e.target.value) })}
					/>
				</div>
			</div>
			<div className="modal-footer">
				<button className="btn" onClick={() => setIsFilterOpen(false)}>
					{translation.cancel}
				</button>
				<button className="btn btn-primary" onClick={handleSubmit}>
					{translation.confirm}
				</button>
			</div>
		</div>
	);
}
