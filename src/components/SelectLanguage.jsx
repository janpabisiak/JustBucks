import { useTheme } from '../context/ThemeContext';

export default function SelectLanguage({ language, onChangeLanguage }) {
	const { theme } = useTheme();

	return (
		<select value={language} className={`${theme === 'dark' && 'dark'}`} onChange={(e) => onChangeLanguage(e.target.value)}>
			<option value="english">English</option>
			<option value="polish">Polish</option>
		</select>
	);
}
