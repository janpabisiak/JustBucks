import { useState } from 'react';
import { useModals } from '../../context/ModalsContext';
import { useTransactions } from '../../context/TransactionsContext';
import { useTranslation } from '../../context/TranslationContext';
import { useTheme } from '../../context/ThemeContext';
import styles from '../../styles/App/Modal.module.css';

export default function ImportTransactionsForm() {
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
		<div className={`${styles.modal} ${theme === 'dark' ? 'dark' : ''}`}>
			<div className={styles.modalHeader}>
				<h1>{translation.importTransactions}</h1>
			</div>
			<div>
				<textarea
					value={data}
					className={`${theme === 'dark' && 'light-dark'}`}
					onChange={(e) => setData(e.target.value)}
					placeholder={translation.enterTransactionsData}
				></textarea>
			</div>
			<div className={styles.modalFooter}>
				<button className={`btn ${theme === 'dark' ? 'light-dark' : ''}`} onClick={() => dispatchModals({ type: 'toggleImport' })}>
					{translation.cancel}
				</button>
				<button className="btn btn-primary" onClick={handleConfirmClick}>
					{translation.confirm}
				</button>
			</div>
		</div>
	);
}
