import { useModals } from '../context/ModalsContext';
import { useTranslation } from '../context/TranslationContext';
import { useTheme } from '../context/ThemeContext';

export default function ImportButton() {
	const { translation } = useTranslation();
	const { theme } = useTheme();
	const { dispatch: dispatchModals } = useModals();

	return (
		<button className={`btn import-btn ${theme === 'dark' && 'dark'}`} onClick={() => dispatchModals({ type: 'toggleImport' })}>
			{translation.import}
		</button>
	);
}
