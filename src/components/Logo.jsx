export default function Logo({ appName }) {
	const appNameSplit = String(appName).match(/[A-Z][a-z]+/g);

	return (
		<h1 className="logo">
			{appNameSplit[0]}
			<span>{appNameSplit[1]}</span>
		</h1>
	);
}
