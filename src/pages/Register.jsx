import Header from '../components/Home/Header';
import styles from '../styles/App/AuthPage.module.css';

function Register() {
	return (
		<>
			<Header />
			<main className={styles.authPage}>
				<form className={styles.authForm}>
					<h2>Sign up</h2>
					<input type="text" placeholder="E-mail address" />
					<input type="text" placeholder="Confirm e-mail address" />
					<input type="password" placeholder="Password" />
					<input type="password" placeholder="Confirm password" />
					<button className={`btn btn-primary ${styles.authBtn}`}>Sign up</button>
					<a href="" className={`btn ${styles.authBtn}`}>
						I already have an account
					</a>
				</form>
			</main>
		</>
	);
}

export default Register;
