import { useState } from 'react';

export default function DeleteTransactionForm({ setIsImportOpen, onImportData, translation }) {
	const [data, setData] = useState(null);

	function handleConfirmClick() {
		const parsedData = JSON.parse(data);

		onImportData(parsedData);
		setIsImportOpen(false);
	}

	return (
		<div className="modal">
			<div className="modal-header">
				<h1>{translation.importTransactions}</h1>
			</div>
			<div className="modal-body">
				<textarea value={data} onChange={(e) => setData(e.target.value)}></textarea>
			</div>
			<div className="modal-footer">
				<button className="btn" onClick={() => setIsImportOpen(false)}>
					{translation.cancel}
				</button>
				<button className="btn btn-primary" onClick={handleConfirmClick}>
					{translation.confirm}
				</button>
			</div>
		</div>
	);
}
