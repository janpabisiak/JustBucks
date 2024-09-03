import styles from '../../styles/App/TransactionsActions.module.css';

export default function TransactionsActions({ children }) {
	return <div className={styles.transactionsActions}>{children}</div>;
}
