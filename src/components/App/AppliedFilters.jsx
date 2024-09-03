import { useTransactions } from '../../context/TransactionsContext';
import { CURRENCY } from '../../config';
import formatDate from '../../utils/formatDateString';
import styles from '../../styles/App/AppliedFilters.module.css';

function AppliedFilters() {
	const { filters } = useTransactions();
	console.log(filters);

	function formatFilterStrings(type) {
		let string;

		switch (type) {
			case 'type':
				string = filters.types.map((type) => type).join(', ');
				break;
			case 'categories':
				string = filters.categories.map((category) => category).join(', ');
				break;
			case 'amount':
				string = `${filters.amount.min} ${CURRENCY} - ${filters.amount.max} ${CURRENCY}`;
				break;
			case 'date':
				string = `${formatDate(filters.date.min, 'string')} - ${formatDate(filters.date.max, 'string')}`;
				break;
			default:
				throw new Error('Invalid operation.');
		}

		return string;
	}

	return (
		<div className={styles.appliedFiltersBox}>
			<p>Applied Filters</p>
			<ul>
				{<li>Types: {filters.types.length > 0 ? formatFilterStrings('type') : 'Show nothing'}</li>}
				{<li>Categories: {filters.categories.length > 0 ? formatFilterStrings('categories') : 'Show nothing'}</li>}
				{<li>Amount range: {formatFilterStrings('amount')}</li>}
				{<li>Date range: {formatFilterStrings('date')}</li>}
			</ul>
		</div>
	);
}

export default AppliedFilters;
