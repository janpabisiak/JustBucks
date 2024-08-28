import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Homepage from './pages/Homepage';
import Login from './pages/Login';
import Register from './pages/Register';
import AppLayout from './pages/AppLayout';
import PageNotFound from './pages/PageNotFound';
import { TranslationProvider } from './context/TranslationContext';
import { TransactionsProvider } from './context/TransactionsContext';
import { ThemeProvider } from './context/ThemeContext';
import { ModalsProvider } from './context/ModalsContext';

function App() {
	return (
		<TranslationProvider>
			<ThemeProvider>
				<TransactionsProvider>
					<ModalsProvider>
						<BrowserRouter>
							<Routes>
								<Route index element={<Homepage />} />
								<Route path="login" element={<Login />} />
								<Route path="register" element={<Register />} />
								<Route path="app" element={<AppLayout />} />
								<Route path="*" element={<PageNotFound />} />
							</Routes>
						</BrowserRouter>
					</ModalsProvider>
				</TransactionsProvider>
			</ThemeProvider>
		</TranslationProvider>
	);
}

export default App;
