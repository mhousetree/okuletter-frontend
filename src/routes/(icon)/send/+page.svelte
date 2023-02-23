<script>
	import { afterNavigate, beforeNavigate } from '$app/navigation';
	import { emvelopeColors } from '$lib/models/EmvelopeColors';
	import { get } from 'svelte/store';
	import { emvelope, letterId, stamp } from '../../(icon-title)/stores';
	import { stamps } from '$lib/models/Stamp';

	const shareData = {
		title: 'Okuletter',
		text: 'Okuletterでお手紙を書きました！',
		url: `http://127.0.0.1:5173/letter/${get(letterId)}`
	};

	async function shareButtonClick() {
		if (navigator.share !== undefined) {
			try {
				await navigator.share(shareData);
			} catch (err) {}
		} else {
			if (navigator.clipboard) {
				return navigator.clipboard.writeText(`${shareData.text} | ${shareData.url}`);
			}
		}
	}

	afterNavigate(() => {
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

		const image = document.createElement('img');
		const selectedStamp = stamps.find((s) => s.name === get(stamp));

		image.src = selectedStamp?.image || '';
		image.alt = selectedStamp?.name || '';
		image.style.width = '100%';

		document.getElementById('stamp')?.appendChild(image);
	});

	beforeNavigate(() => {
		emvelope.set('');
		stamp.set('');
	});
</script>

<section>
	<div id="emvelope_wrapper">
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
					<feBlend
						mode="normal"
						in="SourceGraphic"
						in2="effect1_dropShadow_65_381"
						result="shape"
					/>
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
					<feBlend
						mode="normal"
						in="SourceGraphic"
						in2="effect1_dropShadow_65_381"
						result="shape"
					/>
				</filter>
			</defs>
		</svg>
		<div id="stamp" />
	</div>
	<h1>お手紙を作成しました！</h1>
	<p>お手紙のリンクを伝えることで、<br />相手にお手紙を届けましょう。</p>
	<button type="button" on:click={shareButtonClick}>お手紙が読めるリンクを共有</button>
	<p class="sub">
		共有に対応していない環境の場合、<br />お手紙のリンクがクリップボードにコピーされます。
	</p>
</section>

<style lang="scss">
	@import '../../colors.scss';

	section {
		text-align: center;
	}

	h1 {
		font-weight: normal;
	}

	button {
		padding: 8px 16px;
		border: none;
		border-radius: 48px;
		color: $white;
		background-color: $pink;
	}

	#emvelope_wrapper {
		position: relative;
	}

	#stamp {
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		width: 20%;

		img {
			display: block;
			width: 100%;
		}
	}

	.sub {
		font-size: 0.9rem;
		opacity: 0.9;
	}
</style>