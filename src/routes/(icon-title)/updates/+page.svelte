<svelte:head>
	<title>更新履歴 | Okuletter</title>
	<meta name="description" content="Okuletterの更新履歴です。" />
</svelte:head>

<section>
	<dl>
		<dt>2023.3.5</dt>
		<dd>
			<h2>
				お手紙のデザインをアップデートしました。
			</h2>
			<p>お手紙を読むページとお手紙の作成前確認のページで、</p>
			<ul>
				<li>宛名と本文、本文と送り主の名前の間隔を少し広くして、本文との区別がつきやすいようにしました。</li>
				<li>便箋の余白を少し大きくしました。</li>
				<li>送り主の名前が、右揃えになるようにしました。</li>
			</ul>
		</dd>
		<dd>
			<h2>
				トップページを更新しました。
			</h2>
			<ul>
				<li>サービスの読みを追加しました。Okuletterは「おくれた〜」と読みます。</li>
				<li>イラストを追加しました。</li>
				<li>えんぴつ生命体（仮称）が、正式にえんぴつ生命体という名前になったので書いておきました。</li>
				<li>
					フッターを更新し、更新履歴ページと、Okuletterについてのnote記事へのリンクを追加しました。
				</li>
			</ul>
		</dd>
		<dd>
			<h2>更新履歴ページを追加しました。</h2>
			<p>このページのことです。</p>
		</dd>
		
		<dd>
			<h2>
				全ページの背景色を変更しました。
			</h2>
			<p>
				みなさんが選んでくださった便箋や封筒の色の邪魔にならないよう、一旦とりあえずちょっと明るい色になりました。<br />
				「一旦とりあえずちょっと」という表現からご推測いただけます通り、これからもまた変わる可能性があります。
			</p>
		</dd>
		<dd>
			<p>
				ありがたいことに、Okuletterでやりとりしていただいたお手紙の数が200件を超えました。<br />
				これからもみなさんにとって素敵なサービスであれるように頑張りますので、よろしくお願いいたします！
			</p>
		</dd>
		<dt>2023.2.23</dt>
		<dd>
			<h2>β版サービス開始</h2>
		</dd>
	</dl>
</section>

<style lang="scss">
	@import "../../colors.scss";

	dt {
		font-size: 1.5rem;
		font-weight: 700;
		color: mix($navy, $white);
	}

	dd {
		margin: .5rem 0 1.5rem;

		+ dt {
			margin-top: 2rem;
		}
	}

	h2 {
		font-weight: 500;
		font-size: 1.2rem;
		margin: 0 0 .5em;
	}
	p {
		margin: 0.5em 0;
	}
	ul {
		padding-left: 1.5rem;
		margin: 0.5em 0;
	}
	li {
		margin: .4em 0;
	}
</style>