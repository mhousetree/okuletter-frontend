<script>
	import icon from '$lib/images/icon.svg';
</script>

<header>
	<a href="/">
		<img src={icon} alt="icon" />
	</a>
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

		img {
			width: 32px;
			height: 32px;
		}
	}
</style>
