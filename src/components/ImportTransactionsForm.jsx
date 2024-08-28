import { useState } from 'react';
import { useModals } from '../context/ModalsContext';
import { useTransactions } from '../context/TransactionsContext';
import { useTranslation } from '../context/TranslationContext';
import { useTheme } from '../context/ThemeContext';

export default function DeleteTransactionForm() {
	const [data, setData] = useState(null);
	const { translation } = useTranslation();
	const { theme } = useTheme();
	const { dispatch: dispatchTransactions } = useTransactions();
	const { dispatch: dispatchModals } = useModals();

	function handleConfirmClick() {
		const parsedData = JSON.parse(data);

		dispatchTransactions({ type: 'transactions/import', payload: parsedData });
		dispatchModals({ type: 'toggleImport' });
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
				<button className={`btn ${theme === 'dark' && 'dark'}`} onClick={() => dispatchModals({ type: 'toggleImport' })}>
					{translation.cancel}
				</button>
				<button className="btn btn-primary" onClick={handleConfirmClick}>
					{translation.confirm}
				</button>
			</div>
		</div>
	);
}
