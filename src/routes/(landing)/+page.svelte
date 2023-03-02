<script>
	import logo from '$lib/images/logo.svg';
	import icon from '$lib/images/icon.svg';
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
		<p>
			近況報告、いつもの感謝、作品の感想……<br />
			住所は知らなくても「お手紙」を送りませんか？
		</p>
		<p>
			Okuletterは、リンクを知っている人だけが読める<br />
			お手紙を書くことができるサービスです。
		</p>

		
		<a href="/editor" class="button">手紙を書く！</a>
		<p class='note'>
			みなさんへ(2023.3.2)<br /><br />
			本日13時頃に発生していた「お手紙を作成・閲覧できない」不具合ですが、現在復旧が完了しています。<br />
			該当の時間にお手紙を作成していただいた方には本当に申し訳ございません。<br />
			このようなことがなるべく起きないよう、これからもできる限り頑張って開発をしていきますので、何卒よろしくお願いいたします。
			<br /><br />
			開発者より
		</p>
	</section>
	<section>
		<img src={icon} alt="dummy" />
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
		<!-- <img src={icon} alt="dummy" /> -->
		<p>
			お手紙の色や書体、添えるシールを選んで<br />
			1行からでも気軽なお手紙を送れます。
		</p>
	</section>
	<section>
		<!-- <img src={icon} alt="dummy" /> -->
		<p>
			いつもの文章じゃちょっと足りない気持ちを<br />
			あなたが選んだ色のお手紙で伝えてみませんか？
		</p>
		<a href="/editor" class="button">手紙を書く！</a>
	</section>
</main>

<footer>
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
			width: 300px;
			max-width: 40%;
		}
	}

	footer {
		text-align: center;
		margin-bottom: 32px;
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
