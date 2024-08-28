import { useTheme } from '../context/ThemeContext';
import { useTransactions } from '../context/TransactionsContext';

export default function Pagination({ pages }) {
	const pageNumbers = Array.from({ length: pages }, (_, index) => index + 1);
	const { theme } = useTheme();
	const { page, dispatchTransactions } = useTransactions();

	function handleDecreasePage() {
		if (page > 1) dispatchTransactions({ type: 'page/set', payload: page - 1 });
	}

	function handleIncreasePage() {
		if (page < pages) dispatchTransactions({ type: 'page/set', payload: page + 1 });
	}

	return (
		<div className="pagination">
			<span className={`${theme === 'dark' && 'dark'}`} onClick={handleDecreasePage}>
				←
			</span>
			{pageNumbers.map((i) => (
				<span
					className={page === i ? 'active' : ''`${theme === 'dark' && 'dark'}`}
					key={i}
					onClick={() => dispatchTransactions({ type: 'page/set', payload: i })}
				>
					{i}
				</span>
			))}
			<span className={`${theme === 'dark' && 'dark'}`} onClick={handleIncreasePage}>
				→
			</span>
		</div>
	);
}
