export default function ImportButton({ setIsImportOpen, translation }) {
	return (
		<button className="btn import-btn" onClick={() => setIsImportOpen(true)}>
			{translation.import}
		</button>
	);
}
