export class Color {
	/**
	 * @param {string} name
	 * @param {string} colorCode
	 */
	constructor(name, colorCode) {
		this.name = name;
		this.colorCode = colorCode;
	}
}

const white = new Color('white', '#fff');
const yellow = new Color('yellow', '#FFFDF0');
const pink = new Color('pink', '#FFF0F4');
const lightblue = new Color('lightblue', '#F0FCFF');
const black = new Color('black', '#40445E');
const darkred = new Color('darkred', '#542929');
const darkgreen = new Color('darkgreen', '#233934');
const darkblue = new Color('darkblue', '#261A45');

export const lightColors = [white, yellow, pink, lightblue];

export const darkColors = [black, darkred, darkgreen, darkblue];

export const colors = lightColors.concat(darkColors);
