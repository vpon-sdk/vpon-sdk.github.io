---
layout:         "ios"
title:          "iOS - インタースティシャル広告"
lead:           ""
description:    ""
keywords:       "Keywords for this page, in the meta data"
permalink:       jp/ios/interstitial/
lang:            "jp"
---
## 実装ガイドを終了いたします
---
まだ以前の実装ガイドを終了していない場合は、[ここから全設定](../integration-guide)をご確認ください。

# インタースティシャル広告の概要
---
インタースティシャル広告は、インタラクティブなマルチメディア HTML5 もしくは「ネットワークアプリケーション」で、アプリの画面遷移時に表示されます (例えばアプリ起動・動画のプレロール・ゲームのレベル読み込時など)。 「ネットワークアプリケーション」とは、ナビゲーションバーの代わりにクローズボタンのみが配置されたアプリ内の画面です。この広告タイプはよりリッチで魅力的であるため、通常より高価となり、インプレッション機会は限られたものとなります。
![]({{site.imgurl}}/Interstitial.png)

> **ご注意**:
> インタースティシャル広告は、ベストな視覚効果を提供するためにポートレートモードで掲載されることを推奨します。


# Vponインタースティシャル広告
---
インタースティシャル広告は、インタラクティブでデータ量が多いため、View よりもインスタンス化・読み込み・表示の手順を より明確にしたObject として定義されます。
利用方法は、Vponバナー広告と非常によく似ています。

* lib ファイルとヘッダーファイルをインポートする
* オブジェクトを宣言する
* インタースティシャル用のBanner ID(=プロパティID。通常のバナー広告用のBanner IDと重複不可)を指定してオブジェクトを作成する。

この場合も、これらの処理に最も適しているのはアプリの ViewController 内です。



```objective-c
@implementation ViewController

- (void)viewDidLoad
{
    vpadnInterstitial = [[VpadnInterstitial alloc] init];
    vpadnInterstitial.strBannerId = @"";   //インタースティシャル広告用 BannerID を記入する
    vpadnInterstitial.platform = @"TW";       //台湾エリアはTW、中国エリアは CN を入力
    vpadnInterstitial.delegate = self;
    [vpadnInterstitial getInterstitial:[self getTestIdentifiers]];
}
@end
```

また、広告を表示するまでは保持しておくことが可能です。 最も簡単な方法は、onVpadnInterstitialAdReceived が通知を受信した時に [vpadnInterstitial show]を実行することです。 protocol に関する詳細な情報につきましては、中級編ガイドをご参照ください。 また、初級編ガイドにの更新項目についても併せてご確認ください。 初級編ガイドはこちら。

広告のロードに成功すると、インタースティシャルを表示することができます。

```objective-c
#pragma mark VpadnInterstitial Delegate が インタースティシャル広告を取得する場合、追加する必要があります。
- (void)onVpadnInterstitialAdReceived:(UIView *)bannerView{
     NSLog(@"インタースティシャル広告の取得に成功");
    [vpadnInterstitial show];
}
```

一度インタースティシャル広告が表示されると、ユーザが閉じるまでディスプレイ全体をカバーします。この時、制御権が アプリに渡されます。

# サンプルコードのダウンロード
---
[Go to Download Page]

<!-- # **Note**:
 ---
 > 1. <span style="line-height:2.5em">**我們不建議您在程式開啓時直接拉取 interstitial ad 並立即顯示**<br></span>
 如此將會拖慢程式開啓時的執行速度。因此我們建議您可以先 load interstitial 但不顯示，等待特定事件(e.g. 使用者過關、停留在某個畫面超過特定時間、按下某個 button 或離開 app 之前...)發生再顯示。
 > 2. <span style="line-height:2em"> **請避免沒有 load 就要求顯示廣告** <br> </span>
 `android:configChanges=“orientation|screenSize”`若您沒在 activity 裡沒有加上這句，請避免在 onCreate 時做 load interstitial 並立即顯示插頁廣告。
 -->



[Go to Download Page]:{{site.baseurl}}/jp/ios/download
[advanced setting]: ../advanced/
