import { useState, useContext } from 'react';
import TranslationContext from '../context/TranslationContext';
import ThemeContext from '../context/ThemeContext';

export default function DeleteTransactionForm({ setIsImportOpen, onImportData }) {
	const [data, setData] = useState(null);
	const translation = useContext(TranslationContext);
	const theme = useContext(ThemeContext);

	function handleConfirmClick() {
		const parsedData = JSON.parse(data);

		onImportData(parsedData);
		setIsImportOpen(false);
	}

	return (
		<div className={`modal ${theme === 'dark' && 'light-dark'}`}>
			<div className="modal-header">
				<h1>{translation.importTransactions}</h1>
			</div>
			<div className="modal-body">
				<textarea value={data} className={`${theme === 'dark' && 'dark'}`} onChange={(e) => setData(e.target.value)}></textarea>
			</div>
			<div className="modal-footer">
				<button className={`btn ${theme === 'dark' && 'dark'}`} onClick={() => setIsImportOpen(false)}>
					{translation.cancel}
				</button>
				<button className="btn btn-primary" onClick={handleConfirmClick}>
					{translation.confirm}
				</button>
			</div>
		</div>
	);
}
