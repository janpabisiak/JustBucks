import { useContext } from 'react';
import TranslationContext from '../context/TranslationContext';
import ThemeContext from '../context/ThemeContext';

export default function SortTransactions({ sortType, setSortType }) {
	const translation = useContext(TranslationContext);
	const theme = useContext(ThemeContext);

	return (
		<select
			className={`sort-transactions ${theme === 'dark' && 'light-dark'}`}
			value={sortType}
			onChange={(e) => setSortType(e.target.value)}
		>
			<option value="typeASC">
				{translation.sortByType} {translation.ASC}
			</option>
			<option value="typeDESC">
				{translation.sortByType} {translation.DESC}
			</option>
			<option value="titleASC">
				{translation.sortByTitle} {translation.ASC}
			</option>
			<option value="titleDESC">
				{translation.sortByTitle} {translation.DESC}
			</option>
			<option value="categoryASC">
				{translation.sortByCategory} {translation.ASC}
			</option>
			<option value="categoryDESC">
				{translation.sortByCategory} {translation.DESC}
			</option>
			<option value="amountASC">
				{translation.sortByAmount} {translation.ASC}
			</option>
			<option value="amountDESC">
				{translation.sortByAmount} {translation.DESC}
			</option>
			<option value="dateASC">
				{translation.sortByDate} {translation.ASC}
			</option>
			<option value="dateDESC">
				{translation.sortByDate} {translation.DESC}
			</option>
		</select>
	);
}
