import { useContext } from 'react';
import TranslationContext from '../context/TranslationContext';
import ThemeContext from '../context/ThemeContext';

export default function ImportButton({ setIsImportOpen }) {
	const translation = useContext(TranslationContext);
	const theme = useContext(ThemeContext);

	return (
		<button className={`btn import-btn ${theme === 'dark' && 'dark'}`} onClick={() => setIsImportOpen(true)}>
			{translation.import}
		</button>
	);
}
