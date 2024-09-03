import { createContext, useContext, useState } from 'react';
import translations from '../locales';

const TranslationContext = createContext();

function TranslationProvider({ children }) {
	const [language, setLanguage] = useState(() => localStorage.getItem('language') || 'english');
	const translation = translations[language];

	function handleChangeLanguage(language) {
		setLanguage(language);
		localStorage.setItem('language', language);
	}

	return <TranslationContext.Provider value={{ language, handleChangeLanguage, translation }}>{children}</TranslationContext.Provider>;
}

function useTranslation() {
	const context = useContext(TranslationContext);
	if (context === undefined) throw new Error('TranslationContext used outside of TranslationProvider scope.');
	return context;
}

export { TranslationProvider, useTranslation };
