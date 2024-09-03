import { useTranslation } from '../../context/TranslationContext';
import styles from '../../styles/Home/Features.module.css';

function FeaturesItem({ item, index }) {
	const { translation } = useTranslation();

	return (
		<div className={styles.featuresItem}>
			<i className={`${item.icon} ${styles.featureIcon}`}></i>
			<h3>{translation[`featuresItem${index + 1}Title`]}</h3>
			<p>{translation[`featuresItem${index + 1}Content`]}</p>
		</div>
	);
}

export default FeaturesItem;
