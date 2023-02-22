<script>
	import { afterNavigate } from '$app/navigation';
	import icon from '$lib/images/icon.svg';
	let pageTitle = '';

	afterNavigate(async () => {
		pageTitle = document.title.split(' ')[0];
	});
</script>

<header>
	<a href="/">
		<img src={icon} alt="icon" />
	</a>
	<h1>{pageTitle}</h1>
</header>

<main>
	<slot />
</main>

<style lang="scss">
	header {
		display: flex;
		justify-content: center;
		align-items: center;
		gap: 12px;
		padding: 12px 0;
		width: 100%;

		a {
			display: block;
			line-height: 1;
		}

		h1 {
			margin: 0;
			font-size: 14px;
			font-weight: normal;
		}

		img {
			width: 32px;
			height: 32px;
		}
	}
</style>
