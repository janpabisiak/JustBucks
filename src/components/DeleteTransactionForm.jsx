import { useContext } from 'react';
import TranslationContext from '../context/TranslationContext';
import ThemeContext from '../context/ThemeContext';

export default function DeleteTransactionForm({ setIsDelOpen, selectedID, onRemoveTransaction }) {
	const translation = useContext(TranslationContext);
	const theme = useContext(ThemeContext);

	function handleConfirmClick() {
		onRemoveTransaction(selectedID);
		setIsDelOpen(false);
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
				<button className="btn" onClick={() => setIsDelOpen(false)}>
					{translation.cancel}
				</button>
				<button className="btn btn-primary" onClick={handleConfirmClick}>
					{translation.confirm}
				</button>
			</div>
		</div>
	);
}
