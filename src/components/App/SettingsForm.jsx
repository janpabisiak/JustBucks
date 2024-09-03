import { useRef } from 'react';
import currencies from '../../data/currencies';
import { useModals } from '../../context/ModalsContext';
import { useTheme } from '../../context/ThemeContext';
import { useTransactions } from '../../context/TransactionsContext';
import { useTranslation } from '../../context/TranslationContext';
import styles from '../../styles/App/Modal.module.css';

export default function SettingsForm() {
	const exportButton = useRef(null);
	const { language, translation, handleChangeLanguage } = useTranslation();
	const { transactions, currency, dispatch: dispatchTransactions } = useTransactions();
	const { theme, handleChangeTheme } = useTheme();
	const { dispatch: dispatchModals } = useModals();

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
		<div className={`${styles.modal} ${theme === 'dark' ? 'dark' : ''} prevent-select`}>
			<div className={styles.modalHeader}>
				<h1>User Settings</h1>
				<div className={styles.closeBtn} onClick={() => dispatchModals({ type: 'toggleSettings' })}>
					&times;
				</div>
			</div>
			<div>
				<form>
					<select
						value={currency}
						className={theme === 'dark' ? 'light-dark' : ''}
						onChange={(e) => dispatchTransactions({ type: 'currency/set', payload: e.target.value })}
					>
						{currencies.map((currency) => (
							<option key={currency} value={currency}>
								{currency}
							</option>
						))}
					</select>
					<select
						value={language}
						className={theme === 'dark' ? 'light-dark' : ''}
						onChange={(e) => handleChangeLanguage(e.target.value)}
					>
						<option value="english">{translation.english}</option>
						<option value="polish">{translation.polish}</option>
					</select>
					<select
						value={theme}
						className={theme === 'dark' ? 'light-dark' : ''}
						onChange={(e) => handleChangeTheme(e.target.value)}
					>
						<option value="light">{translation.light}</option>
						<option value="dark">{translation.dark}</option>
					</select>
					<button className={`btn ${theme === 'dark' ? 'light-dark' : ''}`} ref={exportButton} onClick={handleExportData}>
						{translation.exportTransactionData}
					</button>
					<button
						className={`btn btn-primary ${theme === 'dark' ? 'light-dark' : ''}`}
						onClick={() => {
							dispatchModals({ type: 'toggleImport' });
						}}
					>
						{translation.importTransactionData}
					</button>
				</form>
			</div>
		</div>
	);
}
