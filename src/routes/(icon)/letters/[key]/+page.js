export async function load({ params }) {
	const response = await fetch(`https://okltrbackend-1-q1172794.deta.app/letters/${params.key}`);
	return {
		letter: response.ok && (await response.json())
	};
}
