import Logo from './Logo';
import SettingsButton from './SettingsButton';
import styles from '../../styles/App/Header.module.css';

export default function Header() {
	return (
		<header className={styles.header}>
			<Logo />
			<SettingsButton />
		</header>
	);
}
