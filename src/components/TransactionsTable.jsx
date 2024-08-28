import { useContext } from 'react';
import TranslationContext from '../context/TranslationContext';

export default function TransactionsTable({ children }) {
	const translation = useContext(TranslationContext);

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
