import { useState } from 'react';
import faqList from '../../data/faqList';
import FAQItem from './FAQItem';
import { useTranslation } from '../../context/TranslationContext';
import styles from '../../styles/Home/FAQ.module.css';

function FAQ() {
	const { translation } = useTranslation();
	const [selectedID, setSelectedID] = useState(null);

	function handleItemClick(id) {
		selectedID === id ? setSelectedID(null) : setSelectedID(id);
	}

	return (
		<section className={styles.faqSection} id="faq">
			<h2 className="section-title">{translation.faqTitle}</h2>
			<p className="section-description">{translation.faqDescription}</p>
			<div className={styles.faqContainer}>
				{faqList.map((item, index) => {
					return <FAQItem key={item.id} index={index} selectedID={selectedID} handleClick={() => handleItemClick(item.id)} />;
				})}
			</div>
		</section>
	);
}

export default FAQ;
