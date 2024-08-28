import { useContext } from 'react';
import TranslationContext from '../context/TranslationContext';
import ThemeContext from '../context/ThemeContext';

export default function Transactions({ children, isAddOpen, setIsAddOpen }) {
	const translation = useContext(TranslationContext);
	const theme = useContext(ThemeContext);

	return (
		<section className={`transactions ${theme === 'dark' && 'dark'}`}>
			<div className="transactions-main">
				<h2>{translation.transactions}</h2>
				<button className="btn btn-primary" onClick={() => setIsAddOpen(!isAddOpen)}>
					{translation.newTransaction}
				</button>
			</div>
			{children}
		</section>
	);
}
