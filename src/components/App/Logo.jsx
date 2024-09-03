import { APP_NAME } from '../../config';
import { useTheme } from '../../context/ThemeContext';
import styles from '../../styles/App/Logo.module.css';

const appNameSplit = String(APP_NAME).match(/[A-Z][a-z]+/g);

export default function Logo() {
	const { theme } = useTheme();

	return (
		<h1 className={`${styles.logo} prevent-select`}>
			{appNameSplit[0]}
			<span className={`${styles.logoSpan} ${theme === 'dark' ? styles.logoSpanDark : ''}`}>{appNameSplit[1]}</span>
		</h1>
	);
}
