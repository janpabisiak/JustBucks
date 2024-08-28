import { useContext } from 'react';
import ThemeContext from '../context/ThemeContext';
import * as CONFIG from '../config';

export default function DataBox({ value, description }) {
	const theme = useContext(ThemeContext);

	return (
		<div className={`dataBox ${theme === 'dark' && 'dark'}`}>
			<h3 className="data-value">
				{value} {CONFIG.CURRENCY}
			</h3>
			<p className="data-title">{description}</p>
		</div>
	);
}
