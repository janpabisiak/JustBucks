export default function formatDate(date, type) {
	const dateObj = new Date(date);
	const year = dateObj.getFullYear();
	const month = String(dateObj.getMonth() + 1).padStart(2, '0');
	const day = String(dateObj.getDate()).padStart(2, '0');
	if (type === 'HTMLValue') {
		return `${year}-${month}-${day}`;
	}
	if (type === 'string') {
		return `${day}.${month}.${year}`;
	}
}
