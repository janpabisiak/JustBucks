import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import AppLayout from './pages/App';
import PageNotFound from './pages/PageNotFound';
import { TranslationProvider } from './context/TranslationContext';
import { ThemeProvider } from './context/ThemeContext';
import './styles/styles.css';

function App() {
	return (
		<TranslationProvider>
			<ThemeProvider>
				<BrowserRouter>
					<Routes>
						<Route index element={<Home />} />
						<Route path="login" element={<Login />} />
						<Route path="register" element={<Register />} />
						<Route path="app" element={<AppLayout />} />
						<Route path="*" element={<PageNotFound />} />
					</Routes>
				</BrowserRouter>
			</ThemeProvider>
		</TranslationProvider>
	);
}

export default App;
