import { createContext, useState, useContext, useEffect } from 'react';

const ThemeContext = createContext();

function ThemeProvider({ children }) {
	const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light');

	function handleChangeTheme(theme) {
		setTheme(theme);

		localStorage.setItem('theme', theme);
	}

	useEffect(() => {
		theme === 'dark' ? document.body.classList.add('light-dark') : document.body.classList.remove('light-dark');
	}, [theme]);

	return <ThemeContext.Provider value={{ theme, handleChangeTheme }}>{children}</ThemeContext.Provider>;
}

function useTheme() {
	const context = useContext(ThemeContext);
	if (context === undefined) throw new Error('ThemeContext used outside of ThemeProvider scope.');
	return context;
}

export { ThemeProvider, useTheme };
