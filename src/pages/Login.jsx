import Header from '../components/Home/Header';
import styles from '../styles/App/AuthPage.module.css';

function Login() {
	return (
		<>
			<Header />
			<main className={styles.authPage}>
				<form className={styles.authForm}>
					<h2>Login</h2>
					<input type="text" placeholder="E-mail address" />
					<input type="password" placeholder="Password" />
					<button className={`btn btn-primary ${styles.authBtn}`}>Login</button>
					<a href="" className={`btn ${styles.authBtn}`}>
						Create an account
					</a>
				</form>
			</main>
		</>
	);
}

export default Login;
