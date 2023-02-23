<script>
	import { beforeNavigate, afterNavigate } from '$app/navigation';
	import FromNameInput from './FromNameInput.svelte';
	import TextInput from './TextInput.svelte';
	import ToNameInput from './ToNameInput.svelte';
	import { emvelopeColors } from '$lib/models/EmvelopeColors';
	import { stamps } from '$lib/models/Stamp';
	import ToConfirmButton from './ToConfirmButton.svelte';

	import {
		toName,
		text,
		fromName,
		font,
		background,
		pen,
		emvelope,
		stamp,
		backgroundIsDark
	} from '../stores';
	import { backgroundColors } from '$lib/models/BackgroundColors.js';
	import { get } from 'svelte/store';

	/**
	 * @type {any[]}
	 */
	let penColors = [];

	/**
	 * @type {string}
	 */
	let fontValue;

	/**
	 * @type {string}
	 */
	let backgroundValue;

	/**
	 * @type {string}
	 */
	let penValue;

	/**
	 * @type {string}
	 */
	let emvelopeValue;

	/**
	 * @type {string}
	 */
	let stampValue;

	afterNavigate(() => {
		const backgroundColorButtons = document.getElementsByName('background_color');
		backgroundColorButtons.forEach((t) => {
			// @ts-ignore
			t.addEventListener('change', () => updatePenColors(t.value));
		});

		if (localStorage.getItem('toName')?.length !== 0) {
			// @ts-ignore
			document.getElementById('to_name').value = localStorage.getItem('toName');
		}

		if (localStorage.getItem('text')?.length !== 0) {
			// @ts-ignore
			document.getElementById('text').value = localStorage.getItem('text');
		}

		if (localStorage.getItem('fromName')?.length !== 0) {
			// @ts-ignore
			document.getElementById('from_name').value = localStorage.getItem('fromName');
		}

		if (localStorage.getItem('font')?.length !== 0) {
			// @ts-ignore
			document.getElementById(localStorage.getItem('font')).checked = true;
		}

		if (localStorage.getItem('background')?.length !== 0) {
			// @ts-ignore
			document.getElementById(`background-${localStorage.getItem('background')}`).checked = true;
		}

		if (localStorage.getItem('pen')?.length !== 0) {
			// @ts-ignore
			document.getElementById(`pen-${localStorage.getItem('pen')}`).checked = true;
		}

		if (localStorage.getItem('emvelope')?.length !== 0) {
			// @ts-ignore
			document.getElementById(`emvelope-${localStorage.getItem('emvelope')}`).checked = true;
		} else {
			// @ts-ignore
			document.getElementById('emvelope-white').checked = true;
			emvelopeValue = 'white';
			emvelope.update(() => emvelopeValue);
		}

		if (localStorage.getItem('stamp')?.length !== 0) {
			// @ts-ignore
			document.getElementById(`stamp-${localStorage.getItem('stamp')}`).checked = true;
		} else {
			// @ts-ignore
			document.getElementById('stamp-clover_bird').checked = true;
			stampValue = 'clover_bird';
			stamp.update(() => stampValue);
		}
	});

	beforeNavigate(({ to, cancel }) => {
		if (to?.url.pathname !== '/confirm') {
			const leaveEditor = window.confirm('お手紙の作成中です。中断してトップページに戻りますか？');

			if (!leaveEditor) {
				cancel();
			}
		}
	});

	if (typeof window !== 'undefined') {
		toName.subscribe((value) => {
			localStorage.setItem('toName', value);
		});

		fromName.subscribe((value) => {
			localStorage.setItem('fromName', value);
		});

		text.subscribe((value) => {
			localStorage.setItem('text', value);
		});

		font.subscribe((value) => {
			localStorage.setItem('font', value);
		});

		background.subscribe((value) => {
			localStorage.setItem('background', value);

			const backgroundIsDark =
				backgroundColors.find((color) => color.name === value)?.isDark || false;

			localStorage.setItem('backgroundIsDark', backgroundIsDark.toString());

			if (value.length !== 0) {
				updatePenColors(value);
			}
		});

		pen.subscribe((value) => {
			localStorage.setItem('pen', value);
		});

		emvelope.subscribe((value) => {
			localStorage.setItem('emvelope', value);
		});

		stamp.subscribe((value) => {
			localStorage.setItem('stamp', value);
		});
	}

	function toggleToNameHelp() {
		const target = document.getElementById('toNameHelp');
		if (target?.classList.contains('closed')) {
			target.classList.remove('closed');
		} else {
			target?.classList.add('closed');
		}
	}
	function toggleFromNameHelp() {
		const target = document.getElementById('fromNameHelp');
		if (target?.classList.contains('closed')) {
			target.classList.remove('closed');
		} else {
			target?.classList.add('closed');
		}
	}
	function toggleOptionHelp() {
		const target = document.getElementById('optionHelp');
		if (target?.classList.contains('closed')) {
			target.classList.remove('closed');
		} else {
			target?.classList.add('closed');
		}
	}

	/**
	 * @param {string} backgroundColorName
	 */
	function updatePenColors(backgroundColorName) {
		// @ts-ignore
		const backgroundColor = backgroundColors.find((color) => color.name === backgroundColorName);

		// @ts-ignore
		penColors = backgroundColor?.penColors || [];

		if (get(backgroundIsDark) !== backgroundColor?.isDark) {
			// @ts-ignore
			backgroundIsDark.update(() => backgroundColor?.isDark);
			penValue = penColors[0].name;
			pen.update(() => penValue);
		} else if (localStorage.getItem('pen')?.length !== 0) {
			// @ts-ignore
			penValue = localStorage.getItem('pen');
		}
	}

	function openOptions() {
		const options = document.getElementById('options');
		const optionsDescription = document.getElementById('options_description');
		options?.classList.remove('closed');
		optionsDescription?.classList.add('closed');
		setTimeout(() => {
			// @ts-ignore
			optionsDescription.style.display = 'none';
			// @ts-ignore
			options.style.transitionTimingFunction = 'step-start';
			// @ts-ignore
			options.style.marginTop = '0';
		}, 300);
	}
</script>

<svelte:head>
	<title>お手紙エディタ | OKULETTER</title>
	<meta name="description" content="Svelte demo app" />
</svelte:head>

<section id="edit_letter">
	<div id="wrapper_to_name">
		<ToNameInput />
		<span>へ</span>
		<button type="button" on:click={toggleToNameHelp}>
			<span class="material-symbols-rounded"> help </span>
		</button>
	</div>
	<p id="toNameHelp" class="helptext closed">
		宛名の最後に「へ」が自動で追加されます。<br />
		敬称（さん、様など）は自動では追加されませんので、必要に応じて入力してください。
	</p>
	<TextInput />
	<div id="wrapper_from_name">
		<FromNameInput />
		<span>より</span>
		<button type="button" on:click={toggleFromNameHelp}>
			<span class="material-symbols-rounded"> help </span>
		</button>
	</div>
	<p id="fromNameHelp" class="helptext closed">
		送り主の名前の最後に「より」が自動で追加されます。
	</p>
</section>
<section id="select_styles">
	<section>
		<h2>字体（フォント）</h2>
		<div id="select_font">
			<div id="wrapper_gothic">
				<input
					type="radio"
					bind:group={fontValue}
					on:input={() => setTimeout(() => font.update(() => fontValue), 1)}
					name="font"
					id="gothic"
					value="gothic"
				/>
				<label for="gothic">
					あア亜Aa<br />
					<span>ゴシック</span>
				</label>
			</div>
			<div id="wrapper_marugothic">
				<input
					type="radio"
					bind:group={fontValue}
					on:input={() => setTimeout(() => font.update(() => fontValue), 1)}
					name="font"
					id="marugothic"
					value="marugothic"
				/>
				<label for="marugothic">
					あア亜Aa<br />
					<span>丸ゴシック</span>
				</label>
			</div>
			<div id="wrapper_mincho">
				<input
					type="radio"
					bind:group={fontValue}
					on:input={() => setTimeout(() => font.update(() => fontValue), 1)}
					name="font"
					id="mincho"
					value="mincho"
				/>
				<label for="mincho">
					あア亜Aa<br />
					<span>明朝</span>
				</label>
			</div>
		</div>
	</section>
	<section>
		<h2>便箋（背景色）</h2>
		<div id="select_background_color">
			{#each backgroundColors as color}
				<div id={`wrapper_background_${color.name}`}>
					<input
						type="radio"
						bind:group={backgroundValue}
						on:input={() => setTimeout(() => background.update(() => backgroundValue), 1)}
						name="background_color"
						id={`background-${color.name}`}
						value={color.name}
					/>
					<label for={`background-${color.name}`} style={`background-color: ${color.colorCode};`} />
				</div>
			{/each}
		</div>
	</section>
	<section>
		<h2>ペン（文字色）</h2>
		<div id="select_pen_color">
			{#if penColors.length === 0}
				<p id="penColorHelp" class="helptext">便箋を選ぶとおすすめの色が表示されます。</p>
			{/if}
			{#each penColors as color}
				<div id={`wrapper_pen_${color.name}`}>
					<input
						type="radio"
						bind:group={penValue}
						on:input={() => setTimeout(() => pen.update(() => penValue), 1)}
						name="pen_color"
						id={`pen-${color.name}`}
						value={color.name}
					/>
					<label for={`pen-${color.name}`} style={`background-color: ${color.colorCode};`} />
				</div>
			{/each}
		</div>
	</section>
	<section id="options_description">
		<h2>
			<button type="button" on:click={openOptions}>オプション項目をえらぶ</button>
			<button type="button" on:click={toggleOptionHelp}>
				<span class="material-symbols-rounded"> help </span>
			</button>
		</h2>
		<p id="optionHelp" class="helptext closed">
			<button type="button" on:click={openOptions}>
				封筒、シールを選ぶことができます。<br />
				選ばなくてもお手紙を作成できます。<br />
				選ばなかった場合、白封筒・鳥のシールになります。
			</button>
		</p>
		<button type="button" on:click={openOptions}>
			<span class="material-symbols-rounded"> expand_more </span>
		</button>
	</section>
	<section id="options" class="closed">
		<section>
			<h2>封筒</h2>
			<div id="select_emvelope_color">
				{#each emvelopeColors as color}
					<div id={`wrapper_emvelope_${color.name}`}>
						<input
							type="radio"
							bind:group={emvelopeValue}
							on:input={() => setTimeout(() => emvelope.update(() => emvelopeValue), 1)}
							name="emvelope_color"
							id={`emvelope-${color.name}`}
							value={color.name}
						/>
						<label for={`emvelope-${color.name}`} style={`background-color: ${color.colorCode};`} />
					</div>
				{/each}
			</div>
		</section>
		<section>
			<h2>シール</h2>
			<div id="select_stamp">
				{#each stamps as s}
					<div id={`wrapper_stamp_${s.name}`}>
						<input
							type="radio"
							bind:group={stampValue}
							on:input={() => setTimeout(() => stamp.update(() => stampValue), 1)}
							name="stamp"
							id={`stamp-${s.name}`}
							value={s.name}
						/>
						<label for={`stamp-${s.name}`}>
							<img src={s.image} alt={s.name} />
						</label>
					</div>
				{/each}
			</div>
		</section>
	</section>
</section>
<ToConfirmButton />

<style lang="scss">
	@import '../../colors.scss';

	h2 {
		font-weight: 500;
		font-size: 14px;
		margin: 0 0 8px;

		button {
			font-family: 'Noto Sans JP', sans-serif;
			font-weight: 500;
		}
	}

	button {
		border: none;
		background-color: transparent;
		color: inherit;
		padding: 0;
		display: inline-flex;
		vertical-align: bottom;
		font-size: inherit;
	}

	#edit_letter {
		padding: 0;
		display: flex;
		flex-direction: column;
		row-gap: 8px;
		margin-bottom: 32px;
	}

	#wrapper_to_name,
	#wrapper_from_name {
		display: flex;
		gap: 8px;
		align-items: center;

		span {
			display: block;
			width: fit-content;
		}
	}

	#select_styles {
		margin-bottom: 8rem;
		text-align: center;
		display: flex;
		flex-direction: column;
		gap: 24px;

		input[type='radio'] {
			width: 0;
			height: 0;
			opacity: 0;
			margin: 0;
		}
	}

	#options {
		margin-top: -16px;
		display: flex;
		flex-direction: column;
		gap: 24px;
		transition: 0.3s;
	}

	#select_font {
		display: flex;
		justify-content: center;
		gap: 12px;

		> div {
			display: flex;
		}

		input[type='radio']:checked + label span {
			color: $pink;
		}

		label {
			display: flex;
			flex-direction: column;
			align-items: center;
			font-size: 14px;

			span {
				font-size: 9px;
			}
		}

		#wrapper_marugothic {
			font-family: 'M PLUS Rounded 1c', sans-serif;
		}
		#wrapper_mincho {
			font-family: 'Noto Serif JP', serif;
		}
	}

	#select_background_color,
	#select_pen_color,
	#select_emvelope_color {
		display: flex;
		justify-content: center;
		gap: 12px;

		> div {
			display: flex;
		}

		input[type='radio']:checked + label {
			border: 2px solid $pink;
		}

		label {
			box-sizing: border-box;
			display: block;
			width: 24px;
			height: 24px;
			border-radius: 12px;
			border: 1px solid rgba($navy, 0.3);
		}
	}

	#select_emvelope_color {
		display: grid;
		grid-template-columns: repeat(8, max-content);
	}

	#select_stamp {
		margin: 0 auto;
		display: grid;
		width: fit-content;
		max-width: 60%;
		grid-template-columns: repeat(2, 1fr);

		> div {
			display: flex;
			width: 100%;

			label {
				display: flex;
				width: 100%;
				transition: 0.3s;

				img {
					max-width: 120px;
					width: 100%;
				}
			}
		}

		input[type='radio']:checked + label {
			filter: drop-shadow(0 0 5px $pink);
		}

		input[type='radio']:not(:checked) + label {
			opacity: 0.5;
		}
	}

	#optionHelp.helptext {
		margin: 1em 0 1em;
		&.closed {
			margin: 0;
		}
	}

	.material-symbols-rounded {
		font-variation-settings: 'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 20;
		font-size: 20px;
		color: rgba($navy, 0.5);
	}

	.helptext {
		font-size: 9px;
		color: rgba($navy, 0.8);
		margin: 0 0 1em;
		max-height: 5rem;
		transition: 0.3s;
	}

	#options_description {
		transition: 0.3s;

		* {
			transition: 0.3s;
		}
	}

	@keyframes none {
		from {
			display: block;
		}
		to {
			display: none;
		}
	}

	.closed {
		margin: -8px 0 0;
		max-height: 0;
		opacity: 0;
		/* display: none; */

		* {
			max-height: 0;
			margin: 0;
			display: none;
		}
	}
</style>
