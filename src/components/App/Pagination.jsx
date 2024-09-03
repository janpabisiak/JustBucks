import { useTheme } from '../../context/ThemeContext';
import { useTransactions } from '../../context/TransactionsContext';
import styles from '../../styles/App/Pagination.module.css';

export default function Pagination({ totalPages }) {
	const { theme } = useTheme();
	const { page, dispatch: dispatchTransactions } = useTransactions();

	const getPageNumbers = () => {
		const pageNumbers = [];
		const maxPagesToShow = 5; // Maximum number of page links to show
		const halfMaxPagesToShow = Math.floor(maxPagesToShow / 2);

		let startPage = Math.max(2, page - halfMaxPagesToShow);
		let endPage = Math.min(totalPages - 1, page + halfMaxPagesToShow);

		if (page - halfMaxPagesToShow <= 1) {
			endPage = Math.min(totalPages - 1, maxPagesToShow);
		}

		if (page + halfMaxPagesToShow >= totalPages) {
			startPage = Math.max(2, totalPages - maxPagesToShow + 1);
		}

		for (let i = startPage; i <= endPage; i++) {
			pageNumbers.push(i);
		}

		if (startPage > 2) {
			pageNumbers.unshift('...');
		}

		if (endPage < totalPages - 1) {
			pageNumbers.push('...');
		}

		return pageNumbers;
	};

	const pageNumbers = getPageNumbers();

	function handleDecreasePage() {
		if (page > 1) dispatchTransactions({ type: 'page/set', payload: page - 1 });
	}

	function handleIncreasePage() {
		if (page < totalPages) dispatchTransactions({ type: 'page/set', payload: page + 1 });
	}

	return (
		<div className={`${styles.pagination} prevent-select`}>
			<span key={0} className={`${styles.paginationSpan} ${theme === 'dark' ? 'dark' : ''}`} onClick={handleDecreasePage}>
				←
			</span>
			<span
				key={1}
				className={`${styles.paginationSpan} ${page === 1 ? styles.paginationSpanActive : ''} ${theme === 'dark' ? 'dark' : ''}`}
				onClick={() => dispatchTransactions({ type: 'page/set', payload: 1 })}
			>
				1
			</span>
			{pageNumbers.map((i, index) =>
				i === '...' ? (
					<span key={`ellipsis-${index}`} className={`${styles.paginationSpan} ${theme === 'dark' ? 'dark' : ''}`}>
						...
					</span>
				) : (
					<span
						className={`${styles.paginationSpan} ${page === i ? styles.paginationSpanActive : ''} ${
							theme === 'dark' && 'dark'
						}`}
						key={i}
						onClick={() => dispatchTransactions({ type: 'page/set', payload: i })}
					>
						{i}
					</span>
				)
			)}
			{totalPages > 1 && (
				<span
					key={totalPages}
					className={`${styles.paginationSpan} ${page === totalPages ? styles.paginationSpanActive : ''} ${
						theme === 'dark' && 'dark'
					}`}
					onClick={() => dispatchTransactions({ type: 'page/set', payload: totalPages })}
				>
					{totalPages}
				</span>
			)}
			<span
				key={totalPages + 1}
				className={`${styles.paginationSpan} ${theme === 'dark' ? 'dark' : ''}`}
				onClick={handleIncreasePage}
			>
				→
			</span>
		</div>
	);
}
