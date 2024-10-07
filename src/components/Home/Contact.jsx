import { useState } from 'react';
import { useTranslation } from '../../context/TranslationContext';
import styles from '../../styles/Home/Contact.module.css';

function Contact() {
	const { translation } = useTranslation();
	const [firstName, setFirstName] = useState('');
	const [lastName, setLastName] = useState('');
	const [phoneNumber, setPhoneNumber] = useState('');
	const [message, setMessage] = useState('');

	const parseMailHref = `mailto:contact@janpabisiak.com?subject=[SUPPORT] - JustBucks&body=${message}`;

	return (
		<section className={styles.contactSection} id="contact">
			<div className={styles.text}>
				<h2 className="section-title">{translation.contactTitle}</h2>
				<p>{translation.contactDescription}</p>
			</div>
			<form className={styles.contactForm}>
				<div className={styles.formDiv}>
					<input
						className={styles.formInput}
						type="text"
						placeholder={translation.firstName}
						value={firstName}
						onChange={(e) => setFirstName(e.target.value)}
					/>
					<input
						className={styles.formInput}
						type="text"
						placeholder={translation.lastName}
						value={lastName}
						onChange={(e) => setLastName(e.target.value)}
					/>
				</div>
				<div className={styles.formDiv}>
					<input className={styles.formInput} type="text" placeholder={translation.emailAddress} />
					<input
						className={styles.formInput}
						type="text"
						placeholder={translation.phoneNumber}
						value={phoneNumber}
						onChange={(e) => setPhoneNumber(e.target.value)}
					/>
				</div>
				<textarea
					className={styles.textarea}
					placeholder={translation.message}
					value={message}
					onChange={(e) => setMessage(e.target.value)}
				/>
				<a href={parseMailHref} className={`${styles.btn} btn btn-primary`}>
					{translation.send}
				</a>
			</form>
		</section>
	);
}

export default Contact;
