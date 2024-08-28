import { useModals } from '../context/ModalsContext';
import { useTranslation } from '../context/TranslationContext';
import { useTheme } from '../context/ThemeContext';

export default function FilterTransactionsButton() {
	const { translation } = useTranslation();
	const { theme } = useTheme();
	const { dispatch: dispatchModals } = useModals();

	return (
		<button className={`btn ${theme === 'dark' && 'light-dark'}`} onClick={() => dispatchModals({ type: 'toggleFilter' })}>
			{translation.filter}
		</button>
	);
}
