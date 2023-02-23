<script>
	import {
		toName,
		text,
		fromName,
		font,
		background,
		pen,
		emvelope,
		stamp,
		backgroundIsDark,
		letterId
	} from '../stores';
	import { afterNavigate, goto } from '$app/navigation';
	import { get } from 'svelte/store';
	import { colors } from '$lib/models/Color';
	import { emvelopeColors } from '$lib/models/EmvelopeColors';

	const toNameValue = get(toName);
	const textValue = get(text);
	const fromNameValue = get(fromName);

	afterNavigate(() => {
		const letter = document.getElementById('letter_preview');
		// @ts-ignore
		letter.style.fontFamily = getFontFamily(get(font));
		// @ts-ignore
		letter.style.backgroundColor = getColorCode(get(background));
		// @ts-ignore
		letter.style.color = getColorCode(get(pen));

		const emvelopeElements = document.getElementsByClassName('emvelope-color');

		let stroke = '#fff';

		if (['white', 'pink', 'yellow', 'lightblue'].includes(get(emvelope))) {
			// @ts-ignore
			document.getElementById('send_label').style.color = '#40445e';
			stroke = 'none';
		}

		for (const element of emvelopeElements) {
			const color = emvelopeColors.find((color) => color.name === get(emvelope))?.colorCode;
			// @ts-ignore
			element.style.fill = color;
			// @ts-ignore
			element.style.stroke = stroke;
			// @ts-ignore
			element.style.strokeWidth = '0.5px';
		}
	});

	/**
	 * @param {string} fontName
	 */
	function getFontFamily(fontName) {
		switch (fontName) {
			case 'gothic':
				return "'Noto Sans JP', sans-serif";
			case 'marugothic':
				return "'M PLUS Rounded 1c', sans-serif";
			case 'mincho':
				return "'Noto Serif JP', serif";
		}
	}

	/**
	 * @param {string} colorName
	 */
	function getColorCode(colorName) {
		return colors.find((color) => color.name === colorName)?.colorCode;
	}

	async function sendLetter() {
		const res = await fetch('https://87z0uz.deta.dev/letters', {
			method: 'POST',
			headers: { 'content-type': 'application/json' },
			body: JSON.stringify({
				from_name: get(fromName),
				to_name: get(toName),
				text: get(text),
				font: get(font),
				background: get(background),
				pen: get(pen),
				emvelope: get(emvelope),
				stamp: get(stamp)
			})
		});

		localStorage.clear();
		fromName.set('');
		toName.set('');
		text.set('');
		font.set('');
		background.set('');
		pen.set('');
		backgroundIsDark.set(false);

		const json = await res.json();

		// @ts-ignore
		letterId.set(json.key);

		goto('/send');
	}
</script>

<svelte:head>
	<title>お手紙の確認 | OKULETTER</title>
	<meta name="description" content="Svelte demo app" />
</svelte:head>

<section id="confirm">
	<article id="letter_preview">
		<p>{toNameValue} へ</p>
		<p style="white-space: pre-wrap;">{textValue}</p>
		<p>{fromNameValue} より</p>
	</article>
	<p>
		お手紙を完成させると、編集することはできません。<br />
		お手紙を完成させますか？
	</p>
</section>

<button type="button" id="send" on:click={sendLetter}>
	<svg
		id="emvelope"
		width="320"
		height="174"
		viewBox="0 0 320 174"
		fill="none"
		xmlns="http://www.w3.org/2000/svg"
	>
		<g>
			<rect
				class="emvelope-color"
				width="296"
				height="142"
				filter="url(#filter0_d_65_381)"
				transform="translate(12 15)"
			/>
			<path
				class="emvelope-color"
				filter="url(#filter1_d_65_381)"
				d="M160 104L12 15L308 15L160 104Z"
			/>
		</g>
		<defs>
			<filter
				id="filter0_d_65_381"
				x="-10"
				y="0"
				width="328"
				height="174"
				filterUnits="userSpaceOnUse"
				color-interpolation-filters="sRGB"
			>
				<feFlood flood-opacity="0" result="BackgroundImageFix" />
				<feColorMatrix
					in="SourceAlpha"
					type="matrix"
					values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
					result="hardAlpha"
				/>
				<feOffset dy="1" />
				<feGaussianBlur stdDeviation="8" />
				<feComposite in2="hardAlpha" operator="out" />
				<feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.1 0" />
				<feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_65_381" />
				<feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_65_381" result="shape" />
			</filter>
			<filter
				id="filter1_d_65_381"
				x="-4"
				y="0"
				width="328"
				height="121"
				filterUnits="userSpaceOnUse"
				color-interpolation-filters="sRGB"
			>
				<feFlood flood-opacity="0" result="BackgroundImageFix" />
				<feColorMatrix
					in="SourceAlpha"
					type="matrix"
					values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
					result="hardAlpha"
				/>
				<feOffset dy="1" />
				<feGaussianBlur stdDeviation="8" />
				<feComposite in2="hardAlpha" operator="out" />
				<feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.1 0" />
				<feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_65_381" />
				<feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_65_381" result="shape" />
			</filter>
		</defs>
	</svg>
	<p id="send_label">お手紙を完成させる！</p>
</button>

<a href="/editor">お手紙を修正する</a>

<style lang="scss">
	@import '../../colors.scss';
	#confirm {
		margin: 0;
		display: flex;
		flex-direction: column;
		gap: 32px;

		> p {
			text-align: center;
		}
	}

	#letter_preview {
		padding: 16px;
		box-shadow: 0 1px 16px rgba($navy, 0.1);
		border-radius: 4px;

		p {
			margin: 0;

			+ p {
				margin-top: 8px;
			}
		}
	}

	#send {
		position: relative;
		margin: 1rem auto 8rem;
		border: none;
		background-color: transparent;
		display: block;

		p {
			position: absolute;
			top: 40%;
			left: 50%;
			transform: translate(-50%, -50%);
			color: $white;
			font-size: 1.2rem;
		}
	}

	#emvelope {
		display: block;
		max-width: 100%;
	}

	.emvelope-color {
		fill: white;
	}

	a {
		position: absolute;
		bottom: 0;
		left: 0;
		width: 100%;
		max-width: 324px;
		box-sizing: border-box;
		padding: 12px;
		display: flex;
		justify-content: center;
		font-family: 'Noto Sans JP', sans-serif;
		text-decoration: none;
		border: none;
		color: $navy;
		background-color: rgba(mix(mix($navy, $white), $white), 0.8);
		backdrop-filter: blur(5px);
	}
</style>
