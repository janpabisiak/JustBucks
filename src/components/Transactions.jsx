export default function Transactions({ children, isAddOpen, setIsAddOpen, translation }) {
	return (
		<section className="transactions">
			<div className="transactions-main">
				<h2>{translation.transactions}</h2>
				<button className="btn btn-primary" onClick={() => setIsAddOpen(!isAddOpen)}>
					{translation.newTransaction}
				</button>
			</div>
			{children}
		</section>
	);
}
