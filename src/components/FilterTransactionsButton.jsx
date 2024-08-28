import { useState, useContext } from 'react';
import TranslationContext from '../context/TranslationContext';
import ThemeContext from '../context/ThemeContext';

export default function FilterTransactionsButton({ setIsFilterOpen }) {
	const translation = useContext(TranslationContext);
	const theme = useContext(ThemeContext);

	return (
		<button className={`btn ${theme === 'dark' && 'light-dark'}`} onClick={() => setIsFilterOpen(true)}>
			{translation.filter}
		</button>
	);
}
