import { useTranslation } from '../../context/TranslationContext';
import styles from '../../styles/Home/Contact.module.css';

function Contact() {
	const { translation } = useTranslation();

	return (
		<section className={styles.contactSection} id="contact">
			<div className={styles.text}>
				<h2 className="section-title">{translation.contactTitle}</h2>
				<p>{translation.contactDescription}</p>
			</div>
			<form className={styles.contactForm}>
				<div className={styles.formDiv}>
					<input className={styles.formInput} type="text" placeholder={translation.firstName} />
					<input className={styles.formInput} type="text" placeholder={translation.lastName} />
				</div>
				<div className={styles.formDiv}>
					<input className={styles.formInput} type="text" placeholder={translation.emailAddress} />
					<input className={styles.formInput} type="text" placeholder={translation.phoneNumber} />
				</div>
				<textarea className={styles.textarea} placeholder={translation.message} />
				<button className={`${styles.btn} btn btn-primary`}>{translation.send}</button>
			</form>
		</section>
	);
}

export default Contact;
