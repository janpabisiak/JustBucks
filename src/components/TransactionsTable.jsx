export default function TransactionsTable({ children, translation }) {
	return (
		<table>
			<thead>
				<tr>
					<th>{translation.type}</th>
					<th>{translation.title}</th>
					<th>{translation.category}</th>
					<th>{translation.amount}</th>
					<th>{translation.date}</th>
					<th />
				</tr>
			</thead>
			<tbody>{children}</tbody>
		</table>
	);
}
