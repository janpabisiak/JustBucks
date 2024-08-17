export default function Search({ searchQuery, setSearchQuery, translation }) {
	return (
		<input
			type="text"
			placeholder={translation.searchForTransaction}
			value={searchQuery}
			onChange={(e) => setSearchQuery(e.target.value)}
		/>
	);
}
