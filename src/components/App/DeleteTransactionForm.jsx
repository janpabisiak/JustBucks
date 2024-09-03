import { useModals } from '../../context/ModalsContext';
import { useTransactions } from '../../context/TransactionsContext';
import { useTranslation } from '../../context/TranslationContext';
import { useTheme } from '../../context/ThemeContext';
import styles from '../../styles/App/Modal.module.css';

export default function DeleteTransactionForm() {
	const { translation } = useTranslation();
	const { theme } = useTheme();
	const { dispatch: dispatchModals } = useModals();
	const { selectedID, dispatch: dispatchTransactions } = useTransactions();

	function handleConfirmClick() {
		dispatchTransactions({ type: 'transaction/remove', payload: selectedID });
		dispatchModals({ type: 'toggleDelete' });
	}

	return (
		<div className={`${styles.modal} ${theme === 'dark' ? 'dark' : ''} prevent-select`}>
			<div className={styles.modalHeader}>
				<h1>{translation.deleteTransaction}</h1>
			</div>
			<div>
				<p>{translation.doYouWantDelete}</p>
			</div>
			<div className={styles.modalFooter}>
				<button className={`btn ${theme === 'dark' ? 'light-dark' : ''}`} onClick={() => dispatchModals({ type: 'toggleDelete' })}>
					{translation.cancel}
				</button>
				<button className="btn btn-primary" onClick={handleConfirmClick}>
					{translation.confirm}
				</button>
			</div>
		</div>
	);
}
