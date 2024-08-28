export default function SelectTheme({ theme, onThemeChange }) {
	return (
		<select value={theme} className={`${theme === 'dark' && 'dark'}`} onChange={(e) => onThemeChange(e.target.value)}>
			<option value="light">Light mode</option>
			<option value="dark">Dark mode</option>
		</select>
	);
}
