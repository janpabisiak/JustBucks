import { useRef } from 'react';
import { useTranslation } from '../context/TranslationContext';
import { useTheme } from '../context/ThemeContext';
import { useTransactions } from '../context/TransactionsContext';

export default function ExportButton() {
	const exportButton = useRef(null);
	const { transactions } = useTransactions();
	const { translation } = useTranslation();
	const { theme } = useTheme();

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
