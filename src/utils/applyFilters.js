export default function applyFilters(transactions, filters, searchQuery) {
	return transactions.filter((transaction) => {
		const matchesTypes = !filters || filters.types.includes(transaction.type);
		const matchesCategory = !filters || filters.categories.includes(transaction.category);
		const matchesAmount = !filters || (transaction.amount >= filters.amount.min && transaction.amount <= filters.amount.max);
		const matchesDate =
			!filters ||
			(new Date(transaction.date).getTime() >= new Date(filters.date.min).getTime() &&
				new Date(transaction.date).getTime() <= new Date(filters.date.max).getTime());
		const matchesSearch = searchQuery ? transaction.title.toLowerCase().includes(searchQuery.toLowerCase()) : true;

		return matchesTypes && matchesCategory && matchesAmount && matchesDate && matchesSearch;
	});
}
