<script>
	import logo from '$lib/images/logo.svg';
	import landingLine from '$lib/images/landing/landing-line.png';
	import landing01 from '$lib/images/landing/landing01.png';
	import landing02 from '$lib/images/landing/landing02.png';
	import landing03 from '$lib/images/landing/landing03.png';
</script>

<svelte:head>
	<title>Okuletter | インターネットお手紙作成サービス</title>
	<meta
		name="description"
		content="Okuletterは、リンクを知っている人だけが読めるお手紙を書くことができるサービスです。"
	/>
</svelte:head>

<header>
	<p>手紙を書くように思いを伝える</p>
	<h1>
		<img src={logo} alt="OKULETTER" />
	</h1>
</header>

<main>
	<section id="intro">
		<img src={landingLine} alt="イラスト" class="landing-image" />

		<p>
			近況報告、いつもの感謝、作品の感想……<br />
			住所は知らなくても「お手紙」を送りませんか？
		</p>
		<p>
			Okuletterは、リンクを知っている人だけが読める<br />
			お手紙を書くことができるサービスです。
		</p>
		<a href="/editor" class="button">手紙を書く！</a>
	</section>
	<section>
		<img src={landing02} alt="登録・連携一切無しで、お手軽にはじめられます。" class="landing-image" />
		<p>
			会員登録は不要です。<br />
			お手紙は記名制、リンクを自分で<br />
			相手に届ける仕組みなので<br />
			直接思いを届けることができます。
		</p>
		<p>
			Okuletterは、SNSでお手紙を送る場合<br />
			普段から利用しているアカウントで<br />
			送ることを想定しています。
		</p>
	</section>
	<section>
		<img src={landing03} alt="色や書体などをカスタマイズして、自分色のお手紙を作れます。" class="landing-image" />
		<p>
			お手紙の色や書体、添えるシールを選んで<br />
			1行からでも気軽なお手紙を作ることができます。
		</p>
	</section>
	<section>
		<!-- <img src={icon} alt="dummy" /> -->
		<p>
			いつもの文章じゃちょっと足りない気持ちを<br />
			あなたが選んだ色のお手紙で伝えてみませんか？
		</p>
		<a href="/editor" class="button">手紙を書く！</a>
		<img src={landing01} alt="サービス名は「おくれた〜」と読みます。マスコットキャラの名前はえんぴつ生命体です。" class="landing-image" />
	</section>
</main>

<footer>
	<ul>
		<li>
			<a href="/updates">更新履歴</a>
		</li>
		<li>
			<a href="https://note.com/kanadechankawai/n/n31491f3d9e8e" target="_blank" rel="noopener noreferrer">Okuletterについて</a>
		</li>
	</ul>
	<small
		>&copy; 2023 <a href="https://twitter.com/mhousetree" target="_blank" rel="noopener noreferrer"
			>mhousetree</a
		></small
	>
</footer>

<style lang="scss">
	@import '../colors.scss';

	.note {
		color: #ab3c3c;
		text-align: left;
	}

	header {
		margin: 32px 0;
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 8px;

		* {
			margin: 0;
		}

		h1 {
			width: fit-content;
		}

		img {
			display: block;
			height: 48px;
		}
	}

	main {
		text-align: center;

		section {
			margin-bottom: 24px;
		}

		p {
			margin: 0;
			&:not(:first-child) {
				margin-top: 24px;
			}
		}

		img {
			display: block;
			width: 300px;
			max-width: 80%;
			margin: 24px auto;
		}
	}

	footer {
		text-align: center;
		margin-bottom: 32px;

		ul {
			list-style: none;
			padding: 0;
			display: flex;
			justify-content: center;
			gap: 1rem;
		}

		a {
			color: inherit;
		}
	}

	.button {
		margin: 24px auto;
		display: block;
		width: fit-content;
		padding: 12px 24px 14px;
		color: $white;
		background-color: $pink;
		text-decoration: none;
		font-size: 14px;
		font-weight: 500;
		border-radius: 24px;
		line-height: 1;
	}
</style>
