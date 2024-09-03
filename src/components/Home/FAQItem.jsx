import { useTranslation } from '../../context/TranslationContext';
import styles from '../../styles/Home/FAQ.module.css';

function FAQItem({ index, selectedID, handleClick }) {
	const { translation } = useTranslation();

	return (
		<div className={`${styles.faqItem} ${selectedID === index ? styles.active : ''}`} onClick={handleClick}>
			<div className={`${styles.faqItemHeader} ${index === 0 ? 'rounded-top' : ''}`}>
				<h3>{translation[`faqItem${index + 1}Question`]}</h3>
				<i className={`${selectedID === index ? 'las la-minus' : 'las la-plus'} ${styles.faqIcon}`} />
			</div>
			<div className={`${styles.faqItemContent} ${selectedID === index ? '' : 'hidden'} `}>
				<p>{translation[`faqItem${index + 1}Answer`]}</p>
			</div>
		</div>
	);
}

export default FAQItem;
