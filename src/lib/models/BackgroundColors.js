import { Color, darkColors, lightColors } from './Color';

class BackgroundColor extends Color {
	/**
	 * @param {string} name
	 * @param {string} colorCode
	 * @param {Array<Color>} penColors
	 * @param {boolean} isDark
	 */
	constructor(name, colorCode, penColors, isDark) {
		super(name, colorCode);
		this.penColors = penColors;
		this.isDark = isDark;
	}
}

export const backgroundColors = [
	new BackgroundColor('white', '#fff', darkColors, false),
	new BackgroundColor('yellow', '#FFFDF0', darkColors, false),
	new BackgroundColor('pink', '#FFF0F4', darkColors, false),
	new BackgroundColor('lightblue', '#F0FCFF', darkColors, false),
	new BackgroundColor('black', '#40445E', lightColors, true),
	new BackgroundColor('darkred', '#542929', lightColors, true),
	new BackgroundColor('darkgreen', '#233934', lightColors, true),
	new BackgroundColor('darkblue', '#261A45', lightColors, true)
];
