export async function load({ params }) {
	const response = await fetch(`https://87z0uz.deta.dev/letters/${params.key}`);
	return {
		letter: response.ok && (await response.json())
	};
}
