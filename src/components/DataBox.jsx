import * as CONFIG from '../config';

export default function DataBox({ value, description, currency }) {
	return (
		<div className="dataBox">
			<h3 className="data-value">
				{value} {CONFIG.CURRENCY}
			</h3>
			<p className="data-title">{description}</p>
		</div>
	);
}
