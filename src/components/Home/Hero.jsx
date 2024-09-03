import { useTranslation } from '../../context/TranslationContext';
import styles from '../../styles/Home/Hero.module.css';

function Hero() {
	const { translation } = useTranslation();

	return (
		<section className={styles.heroSection} id="home">
			<div className={styles.heroText}>
				<h2 className="section-title">
					{translation.heroTitle1} <span className="span">{translation.heroTitle2}</span>
				</h2>
				<p>{translation.heroDescription}</p>
				<div className={styles.heroBtns}>
					<a href="/app" className="btn btn-primary">
						{translation.getStarted}
					</a>
					<a href="#features" className="btn">
						{translation.readMore}
					</a>
				</div>
			</div>
			<img src="/app.png" />
		</section>
	);
}

export default Hero;
