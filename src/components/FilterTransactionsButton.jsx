export default function FilterTransactionsButton({ setIsFilterOpen, translation }) {
	return (
		<button className="btn" onClick={() => setIsFilterOpen(true)}>
			{translation.filter}
		</button>
	);
}
