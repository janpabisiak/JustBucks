import { Chart as ChartJS } from 'chart.js/auto';
import { Bar } from 'react-chartjs-2';
import { useState } from 'react';
import { useTheme } from '../../context/ThemeContext';
import { useTranslation } from '../../context/TranslationContext';
import styles from '../../styles/App/Charts.module.css';

function Chart({ title, data }) {
	const [yType, setYType] = useState('logarithmic');
	const { translation } = useTranslation();
	const { theme } = useTheme();

	return (
		<div className={styles.chartContainer}>
			<div className={styles.chartHeader}>
				<p className={styles.chartTitle}>{title}</p>
				<select className={theme === 'dark' ? 'light-dark' : ''} value={yType} onChange={(e) => setYType(e.target.value)}>
					<option value="logarithmic">{translation.logarithmic}</option>
					<option value="linear">{translation.linear}</option>
				</select>
			</div>
			<div className={styles.chartBody}>
				<Bar
					data={{
						labels: Array.from(data.categories),
						datasets: [
							{
								data: Array.from(data.values),
								backgroundColor: ['#08916a'],
							},
						],
					}}
					options={{
						responsive: true,
						maintainAspectRatio: false,
						plugins: {
							animation: false,
							legend: {
								display: false,
							},
						},
						scales: {
							x: {
								display: true,
							},
							y: {
								display: true,
								type: yType,
							},
						},
					}}
				/>
			</div>
		</div>
	);
}

export default Chart;
