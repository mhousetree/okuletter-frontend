<script>
	import { text } from '../stores.js';

	/**
	 * @type {string | number | NodeJS.Timeout | undefined}
	 */
	let timer;
	function inputChecker() {
		if (timer) {
			clearTimeout(timer);
		}
		timer = setTimeout(inputEnd, 700);
	}
	function inputEnd() {
		const target = document.getElementById('text');
		// @ts-ignore
		text.update(() => target.value);
	}
</script>

<textarea name="text" id="text" rows="10" on:input={inputChecker} />

<style>
	textarea {
		resize: vertical;
	}
</style>
