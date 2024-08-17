export default function SelectLanguage({ language, setLanguage }) {
	return (
		<select value={language} onChange={(e) => setLanguage(e.target.value)}>
			<option value="english">English</option>
			<option value="polish">Polish</option>
		</select>
	);
}
