import Header from '../components/App/Header';
import Main from '../components/App/Main';
import Footer from '../components/App/Footer';
import { TransactionsProvider } from '../context/TransactionsContext';
import { ModalsProvider } from '../context/ModalsContext';
import { UserProvider } from '../context/UserContext';

export default function AppLayout() {
	return (
		<UserProvider>
			<TransactionsProvider>
				<ModalsProvider>
					<Header />
					<Main />
					<Footer />
				</ModalsProvider>
			</TransactionsProvider>
		</UserProvider>
	);
}
