export async function load({ params }) {
	const response = await fetch(`https://okltrbackend-1-q1172794.deta.app/letters/${params.key}`
	, {
		headers: {
			"X-Space-App-Key": 'HprcHEzprBLrjN8xu6Dh5qqBAeWwz2Zc'
		},
		mode: 'cors'
	}
	);
	return {
		letter: response.ok && (await response.json())
	};
}
