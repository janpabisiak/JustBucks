import { useContext } from 'react';
import ThemeContext from '../context/ThemeContext';

export default function Pagination({ page, setPage, pages }) {
	const pageNumbers = Array.from({ length: pages }, (_, index) => index + 1);
	const theme = useContext(ThemeContext);

	function handleDecreasePage() {
		if (page > 1) setPage(--page);
	}

	function handleIncreasePage() {
		if (page < pages) setPage(++page);
	}

	return (
		<div className="pagination">
			<span className={`${theme === 'dark' && 'dark'}`} onClick={handleDecreasePage}>
				←
			</span>
			{pageNumbers.map((i) => (
				<span className={page === i ? 'active' : ''`${theme === 'dark' && 'dark'}`} key={i} onClick={() => setPage(i)}>
					{i}
				</span>
			))}
			<span className={`${theme === 'dark' && 'dark'}`} onClick={handleIncreasePage}>
				→
			</span>
		</div>
	);
}
