import { useTranslation } from '../../context/TranslationContext';
import styles from '../../styles/Home/Footer.module.css';

function Footer() {
	const { translation } = useTranslation();
	const currentYear = new Date().getFullYear();

	return (
		<footer className={styles.footer}>
			<div className={styles.footerContainer}>
				<a href="https://github.com/janpabisiak/JustBucks" className={`${styles.footerLink} ${styles.githubLink}`}>
					{translation.githubRepository}
				</a>
				<p>
					Copyright © {currentYear} |{' '}
					<a href="https://janpabisiak.com" className={styles.footerLink}>
						Jan Pabisiak
					</a>
				</p>
			</div>
		</footer>
	);
}

export default Footer;
