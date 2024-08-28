export default function applySorting(transactions, sortType) {
	return [...transactions].sort((a, b) => {
		const dateA = new Date(a.date);
		const dateB = new Date(b.date);
		switch (sortType) {
			case 'typeASC':
				return a.type.localeCompare(b.type);
			case 'typeDESC':
				return b.type.localeCompare(a.type);
			case 'titleASC':
				return a.title.localeCompare(b.title);
			case 'titleDESC':
				return b.title.localeCompare(a.title);
			case 'categoryASC':
				return a.category.localeCompare(b.category);
			case 'categoryDESC':
				return b.category.localeCompare(a.category);
			case 'amountASC':
				return a.amount - b.amount;
			case 'amountDESC':
				return b.amount - a.amount;
			case 'dateASC':
				return dateA - dateB;
			default:
				return dateB - dateA;
		}
	});
}
