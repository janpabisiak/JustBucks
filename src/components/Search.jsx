import { useTheme } from '../context/ThemeContext';
import { useTransactions } from '../context/TransactionsContext';
import { useTranslation } from '../context/TranslationContext';

export default function Search() {
	const { searchQuery, dispatch } = useTransactions();
	const translation = useTranslation();
	const theme = useTheme();

	return (
		<input
			type="text"
			className={`${theme === 'dark' && 'light-dark'}`}
			placeholder={translation.searchForTransaction}
			value={searchQuery}
			onChange={(e) => dispatch({ type: 'search', payload: e.target.value })}
		/>
	);
}
