export default function applySorting(transactions, sortType) {
	return [...transactions].sort((a, b) => {
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
				return a.date - b.date;
			default:
				return b.date - a.date;
		}
	});
}
