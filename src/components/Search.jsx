import { useContext } from 'react';
import TranslationContext from '../context/TranslationContext';
import ThemeContext from '../context/ThemeContext';

export default function Search({ searchQuery, setSearchQuery }) {
	const translation = useContext(TranslationContext);
	const theme = useContext(ThemeContext);

	return (
		<input
			type="text"
			className={`${theme === 'dark' && 'light-dark'}`}
			placeholder={translation.searchForTransaction}
			value={searchQuery}
			onChange={(e) => setSearchQuery(e.target.value)}
		/>
	);
}
