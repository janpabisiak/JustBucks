import { useTransactions } from '../../context/TransactionsContext';
import { useTheme } from '../../context/ThemeContext';
import styles from '../../styles/App/DataBox.module.css';

export default function DataBox({ value, description }) {
	const { currency } = useTransactions();
	const { theme } = useTheme();

	return (
		<div className={`${styles.dataBox} ${theme === 'dark' ? 'dark' : ''} prevent-select`}>
			<h3 className={styles.dataValue}>
				{value} {currency}
			</h3>
			<p className={styles.dataTitle}>{description}</p>
		</div>
	);
}
