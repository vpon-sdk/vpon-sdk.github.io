---
layout:         "android"
title:          "Android - インタースティシャル広告"
lead:           ""
description:    ""
keywords:       "Keywords for this page, in the meta data"
permalink:       jp/android/interstitial/
lang:            "jp"
---

## 実装ガイドを終了いたします
---
まだ以前の実装ガイドを終了していない場合は、[ここから全設定](../integration-guide)をご確認ください。

# インタースティシャル広告の概要
---
インタースティシャル広告は、インタラクティブなマルチメディア HTML5 もしくは「ネットワークアプリケーション」で、アプリの画面遷移時に表示されます (例えばアプリ起動・動画のプレロール・ゲームのレベル読み込時など)。 「ネットワークアプリケーション」とは、ナビゲーションバーの代わりにクローズボタンのみが配置されたアプリ内の画面です。この広告タイプはよりリッチで魅力的であるため、通常より高価となり、インプレッション機会は限られたものとなります。 ￼￼￼￼￼￼￼￼￼￼￼￼￼￼￼￼￼￼￼￼￼￼￼￼￼￼
![]({{site.imgurl}}/Interstitial.png)

> **ご注意:**
> インタースティシャル広告は、ベストな視覚効果を提供するためにポートレートモードで掲載されることを推奨します。


# Vponインタースティシャル広告
---
インタースティシャル広告は、インタラクティブでデータ量が多いため、View よりもインスタンス化・読み込み・表示の手順を より明確にしたObject として定義されます。
利用方法は、バナー広告と非常によく似ています。

* com.vpadn.ads.\*をインポートする
* インスタンスを宣言する
* プロパティIDを指定してインスタンスを作成する。（インタースティシャル広告とバナー広告のプロパティIDは重複不可です）

上記ステップをアプリのアクティビティ内で実行してください。


```java
public class MainActivity extends Activity implements VpadnAdListener {
//TODO: 登録済みプロパティID （注意：バナー広告用のプロパティIDとは異なるものを使用）
	private String interstitialBannerId = "License ID";
	private VpadnInterstitialAd interstitialAd;

  @Override
	protected void onCreate(Bundle savedInstanceState) {
		super.onCreate(savedInstanceState);
		setContentView(R.layout.activity_main);
		// インタースティシャルのインスタンスを作成する
		interstitialAd = new VpadnInterstitialAd(this, interstitialBannerId, "TW");
		//listener を追加する。
		interstitialAd.setAdListener(this);
		// 広告リクエストを作成する。
		VpadnAdRequest request = new VpadnAdRequest();
		//インタースティシャル広告の読み込みを開始する
		interstitialAd.loadAd(request);
  }

	@Override
	protected void onDestroy() {
		super.onDestroy();
		// インタースティシャルを表示する準備ができたら、 destroy を呼び出す。
		if (interstitialAd != null) {
			interstitialAd.destroy();
			interstitialAd = null;
		}
	}
```


また、広告を表示するまでは保持しておくことが可能です。 最も簡単な方法は、AdListenerを実行する、もしくはブー ル属性 isReady を直接使用することです。

広告のロードに成功すると、インタースティシャルを表示することができます。`(In order to maintain the quality of user experience, we recommend that you can load an ad first. Hold it until a certain event is triggered. Please try to avoid showing interstitial ad directly while getting it)`

```java
@Override
public void onVpadnReceiveAd(VpadnAd ad) {
	if (ad == this.interstitialAd) {
		 //インタースティシャル広告を表示する もしくは表示する準備が完了するまで保留する
	 	 //interstitialAd.show();
		 //in order to maintain the quality of user experience, please try to avoid showing interstitial ad directly while getting it.
	}
}

...
if ( certain event is triggered ) {
	if ( interstitialAd.isReady()) {
		interstitialAd.show();
	}
}

```

一度インタースティシャル広告が表示されると、ユーザが閉じるまでディスプレイ全体をカバーします。この時、制御権が アプリに渡されます。

# サンプルコードのダウンロード
---
SDK 4 JAR ファイルは、Sample code libs folder 内にあります。

[Go to Download Page]

# 注意事項
---
> 1. インタースティシャル広告をロードする際にユーザーを長時間待たせてしまうため、アプリ起動時にただちに広告を取得・表示させることはお奨めしません。まずインタースティシャル広告を取得し、適切なイベントまで保持していただくことをお奨めします。（例えば、ゲームクリア・ある画面で特定の時間を経過した場合・ボタンをクリックする・アプリを終了する前など）
> 2. マニフェストファイルに android: configChanges="orientation|screenSize"を 追加しなかった場合、onCreateメソッドでインタースティシャル広告をただちにロード・表示させないでください。



[Go to Download Page]:{{site.baseurl}}/zh-tw/ios/download
[advanced setting]: ../advanced/
