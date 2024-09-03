import { useModals } from '../../context/ModalsContext';
import { useTranslation } from '../../context/TranslationContext';
import { useTheme } from '../../context/ThemeContext';

export default function SettingsButton() {
	const { translation } = useTranslation();
	const { theme } = useTheme();
	const { dispatch: dispatchModals } = useModals();

	return (
		<button className={`btn settings-btn ${theme === 'dark' ? 'dark' : ''}`} onClick={() => dispatchModals({ type: 'toggleSettings' })}>
			{translation.settings}
		</button>
	);
}
