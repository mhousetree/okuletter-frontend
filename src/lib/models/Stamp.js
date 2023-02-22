class Stamp {
	/**
	 * @param {string} name
	 * @param {string} image
	 */
	constructor(name, image) {
		this.name = name;
		this.image = image;
	}
}

import clover_bird from '$lib/images/stamps/clover_bird.png';
import heart_panda from '$lib/images/stamps/heart_panda.png';
import corgi from '$lib/images/stamps/corgi.png';
import latte from '$lib/images/stamps/latte.png';

export const stamps = [
	new Stamp('clover_bird', clover_bird),
	new Stamp('heart_panda', heart_panda),
	new Stamp('corgi', corgi),
	new Stamp('latte', latte)
];
