import { useRef } from 'react';

export default function ExportButton({ transactions, translation }) {
	const exportButton = useRef(null);

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
		<button className="btn export-btn" ref={exportButton} onClick={handleExportData}>
			{translation.export}
		</button>
	);
}
