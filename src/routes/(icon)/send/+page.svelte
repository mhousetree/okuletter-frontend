<script>
	import { afterNavigate, beforeNavigate } from '$app/navigation';
	import { emvelopeColors } from '$lib/models/EmvelopeColors';
	import { get } from 'svelte/store';
	import { emvelope, letterId, stamp } from '../../(icon-title)/stores';
	import { stamps } from '$lib/models/Stamp';

	const shareData = {
		title: 'Okuletter',
		text: 'Okuletterでお手紙を書きました！',
		url: `https://okuletter.vercel.app/letters/${get(letterId)}`
	};

	async function shareButtonClick() {
		if (navigator.share !== undefined) {
			try {
				await navigator.share(shareData);
			} catch (err) {}
		} else {
			if (navigator.clipboard) {
				// @ts-ignore
				document.getElementById('info').textContent = 'リンクをコピーしました！';
				return navigator.clipboard.writeText(`${shareData.text} | ${shareData.url}`);
			}
		}
	}

	afterNavigate(() => {
		const emvelopeElements = document.getElementsByClassName('emvelope-color');

		let stroke = '#fff';

		if (['white', 'pink', 'yellow', 'lightblue'].includes(get(emvelope))) {
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

<svelte:head>
	<title>お手紙を作成しました！ | Okuletter</title>
	<meta name="description" content="お手紙の作成が完了しました。早速相手に届けましょう！" />
</svelte:head>

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
	<p id="info" />
	<p class="sub">
		共有に対応していない環境の場合、<br />お手紙のリンクがクリップボードにコピーされます。
	</p>
	<a href="/editor">もっとお手紙を書く！</a>
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

	a {
		margin: 0 auto;
		display: block;
		width: fit-content;
		padding: 8px 16px;
		border-radius: 48px;
		color: $white;
		text-decoration: none;
		background-color: $pink;
	}

	#emvelope_wrapper {
		position: relative;
	}

	#emvelope {
		max-width: 100%;
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
