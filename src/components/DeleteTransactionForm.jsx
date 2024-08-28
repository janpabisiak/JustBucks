import { useModals } from '../context/ModalsContext';
import { useTransactions } from '../context/TransactionsContext';
import { useTranslation } from '../context/TranslationContext';
import { useTheme } from '../context/ThemeContext';

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
		<div className={`modal ${theme === 'dark' && 'light-dark'}`}>
			<div className="modal-header">
				<h1>{translation.deleteTransaction}</h1>
			</div>
			<div className="modal-body">
				<p>{translation.doYouWantDelete}</p>
			</div>
			<div className="modal-footer">
				<button className="btn" onClick={() => dispatchModals({ type: 'toggleDelete' })}>
					{translation.cancel}
				</button>
				<button className="btn btn-primary" onClick={handleConfirmClick}>
					{translation.confirm}
				</button>
			</div>
		</div>
	);
}
