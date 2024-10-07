import { useTranslation } from '../../context/TranslationContext';
import styles from '../../styles/Home/Header.module.css';

function Header() {
	const { translation } = useTranslation();

	return (
		<header className={styles.header}>
			<h1 className={styles.logo}>
				Just<span className="span">Bucks</span>
			</h1>
			<nav>
				<ul className={styles.navUl}>
					<li>
						<a href="#home">{translation.home}</a>
					</li>
					<li>
						<a href="#features">{translation.features}</a>
					</li>
					<li>
						<a href="#faq">FAQ</a>
					</li>
					<li>
						<a href="#contact">{translation.contact}</a>
					</li>
				</ul>
			</nav>
			<a href="/app" className="btn btn-primary">
				{translation.getStarted}
			</a>
		</header>
	);
}

export default Header;
