import { useContext } from 'react';
import ThemeContext from '../context/ThemeContext';

export default function SelectLanguage({ language, onChangeLanguage }) {
	const theme = useContext(ThemeContext);

	return (
		<select value={language} className={`${theme === 'dark' && 'dark'}`} onChange={(e) => onChangeLanguage(e.target.value)}>
			<option value="english">English</option>
			<option value="polish">Polish</option>
		</select>
	);
}
