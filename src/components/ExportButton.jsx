import { useRef, useContext } from 'react';
import TranslationContext from '../context/TranslationContext';
import ThemeContext from '../context/ThemeContext';

export default function ExportButton({ transactions }) {
	const exportButton = useRef(null);
	const translation = useContext(TranslationContext);
	const theme = useContext(ThemeContext);

	function handleExportData() {
		const blob = new Blob([JSON.stringify(transactions)], { type: 'application/json' });
		const url = URL.createObjectURL(blob);
		const el = document.createElement('a');
		el.href = url;
		el.download = 'transactions.json';
		document.body.appendChild(el);
		el.click();

		document.body.removeChild(el);
		URL.revokeObjectURL(url);
	}

	return (
		<button className={`btn export-btn ${theme === 'dark' && 'dark'}`} ref={exportButton} onClick={handleExportData}>
			{translation.export}
		</button>
	);
}
