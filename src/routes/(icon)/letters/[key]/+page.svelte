<script>
	import { afterNavigate } from '$app/navigation';
	import { backgroundColors } from '$lib/models/BackgroundColors';
	import { colors } from '$lib/models/Color';

	/**
	 * @type {{ letter: any; }}
	 */
	export let data;

	const letter = data.letter;

	const pen = colors.find((color) => color.name === data.letter.pen)?.colorCode;

	const background = backgroundColors.find(
		(color) => color.name === data.letter.background
	)?.colorCode;

	afterNavigate(() => {
		const target = document.querySelector('article');

		// @ts-ignore
		target.style.fontFamily = getFontFamily(letter.font);
		// @ts-ignore
		target.style.backgroundColor = background;
		// @ts-ignore
		target.style.color = pen;
		// @ts-ignore
		target.style.opacity = '1';
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
</script>

<svelte:head>
	<title>{letter.from_name}さんからのお手紙です。 | Okuletter</title>
	<meta name="description" content={`${letter.from_name}さんからOkuletterでお手紙が届きました！`} />
</svelte:head>

{#if letter.from_name === undefined}
<p>お手紙のURLが間違っている、もしくはメンテナンス中です。</p>
<p>お手数をお掛け致しますが、少し待ってからもう一度お手紙を開いてみてください。</p>
<p>ごめんなさい！！</p>
{:else}
<article>
	<p>
		{letter.to_name} へ
	</p>
	<p id="text">
		{letter.text}
	</p>
	<p class="align-right">{letter.from_name} より</p>
</article>
{/if}

<a href="/editor">Okuletterでお手紙を書いてみる！</a>

<style lang="scss">
	@import '../../../colors.scss';

	article {
		margin: 2rem 0 4rem;
		padding: 24px 16px;
		border-radius: 4px;
		opacity: 0;
		transition-property: opacity;
		transition-delay: 0.6s;
		transition-duration: 0.3s;
		box-shadow: 0 1px 16px rgba($navy, 0.1);
	}

	p {
		margin: 0;

		+ p {
			margin-top: 1.8rem;
		}
	}

	#text {
		white-space: pre-wrap;
	}

	a {
		display: block;
		width: fit-content;
		margin: 0 auto 4rem;
		background-color: $pink;
		color: $white;
		text-decoration: none;
		padding: 8px 16px;
		border-radius: 32px;
	}

	.align-right {
		text-align: right;
	}
</style>
