<script>
	import { goto } from '$app/navigation';
	import { get } from 'svelte/store';
	import { toName, fromName, text, font, background, pen, emvelope, stamp } from '../stores';

	let buttonMessage = 'お手紙の内容を書いてください<br />（宛名、送り主の名前も必須です）';
	let buttonStatus = true;

	let toNameValue;
	let fromNameValue;
	let textValue;
	let fontValue;
	let backgroundValue;
	let penValue;

	toName.subscribe((value) => {
		toNameValue = value;
		updateButtonText();
	});

	fromName.subscribe((value) => {
		fromNameValue = value;
		updateButtonText();
	});

	text.subscribe((value) => {
		textValue = value;
		updateButtonText();
	});

	font.subscribe((value) => {
		fontValue = value;
		updateButtonText();
	});

	background.subscribe((value) => {
		backgroundValue = value;
		updateButtonText();
	});

	pen.subscribe((value) => {
		penValue = value;
		updateButtonText();
	});

	function updateButtonText() {
		if (toNameValue?.length !== 0 && fromNameValue?.length !== 0 && textValue?.length !== 0) {
			const emptyContent = [];
			if (fontValue?.length === 0) {
				emptyContent.push('字体');
			}
			if (backgroundValue?.length === 0) {
				emptyContent.push('便箋');
			}
			if (penValue?.length === 0) {
				emptyContent.push('ペン');
			}
			if (emptyContent.length === 0) {
				buttonMessage = '確認する！';
				buttonStatus = false;
			} else {
				buttonMessage = `${emptyContent.join('・')}を選んでください`;
			}
		} else {
			buttonMessage = 'お手紙の内容を書いてください<br />（宛名、送り主の名前も必須です）';
		}
	}

	function gotoConfirm() {
		goto('/confirm');
	}
</script>

<button type="button" id="toConfirmButton" disabled={buttonStatus} on:click={gotoConfirm}>
	{@html buttonMessage}
</button>

<style lang="scss">
	@import '../../colors.scss';

	button {
		position: fixed;
		bottom: 0;
		width: 100%;
		padding: 12px;
		display: flex;
		justify-content: center;
		font-family: 'Noto Sans JP', sans-serif;
		border: none;
		color: $white;
		background-color: $pink;

		&:disabled {
			color: $navy;
			background-color: rgba(mix(mix($navy, $white), $white), 0.8);
			backdrop-filter: blur(5px);
		}
	}
</style>
