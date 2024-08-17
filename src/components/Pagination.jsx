export default function Pagination({ page, setPage, pages }) {
	const pageNumbers = Array.from({ length: pages }, (_, index) => index + 1);

	function handleDecreasePage() {
		if (page > 1) setPage(--page);
	}

	function handleIncreasePage() {
		if (page < pages) setPage(++page);
	}

	return (
		<div className="pagination">
			<span onClick={handleDecreasePage}>←</span>
			{pageNumbers.map((i) => (
				<span className={page === i ? 'active' : ''} key={i} onClick={() => setPage(i)}>
					{i}
				</span>
			))}
			<span onClick={handleIncreasePage}>→</span>
		</div>
	);
}
