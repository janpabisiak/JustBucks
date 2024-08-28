import { useModals } from '../context/ModalsContext';
import { useTheme } from '../context/ThemeContext';
import { useTranslation } from '../context/TranslationContext';

export default function Transactions({ children }) {
	const { translation } = useTranslation();
	const { theme } = useTheme();
	const { dispatch: dispatchModals } = useModals();

	return (
		<section className={`transactions ${theme === 'dark' && 'dark'}`}>
			<div className="transactions-main">
				<h2>{translation.transactions}</h2>
				<button className="btn btn-primary" onClick={() => dispatchModals({ type: 'toggleAdd' })}>
					{translation.newTransaction}
				</button>
			</div>
			{children}
		</section>
	);
}
