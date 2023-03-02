/** @type {import('./$types').PageLoad} */
export async function load({ params, fetch }) {
	const response = await fetch(`https://okltrbackend-1-q1172794.deta.app/letters/${params.key}`
	, {
		method: "GET",
		mode: 'cors'
	}
	);
	return {
		letter: response.ok && (await response.json())
	};
}
