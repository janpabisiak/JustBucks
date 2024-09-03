import FeaturesItem from './FeaturesItem';
import featuresList from '../../data/featuresList';
import { useTranslation } from '../../context/TranslationContext';
import styles from '../../styles/Home/Features.module.css';

function Features() {
	const { translation } = useTranslation();

	return (
		<section className={styles.featuresSection} id="features">
			<h2 className="section-title">{translation.featuresTitle}</h2>
			<p className="section-description">{translation.featuresDescription}</p>
			<div className={styles.featuresContainer}>
				{featuresList.map((item, index) => {
					return <FeaturesItem key={item.id} item={item} index={index} />;
				})}
			</div>
		</section>
	);
}

export default Features;
