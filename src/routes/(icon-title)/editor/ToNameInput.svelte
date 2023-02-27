<script>
	import { toName } from '../stores.js';

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
		const target = document.getElementById('to_name');
		// @ts-ignore
		toName.update(() => target.value);
	}
</script>

<input type="text" id="to_name" on:input={inputChecker} />

<style>
	input {
		flex-grow: 1;
		height: 24px;
		min-width: 0;
	}
</style>
