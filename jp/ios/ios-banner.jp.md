---
layout:         "ios"
title:          "iOS - バナー広告"
lead:           ""
description:    ""
keywords:       "Keywords for this page, in the meta data"
permalink:       jp/ios/banner/
lang:            "jp"
---
## 実装ガイドを終了いたします
---
まだ以前の実装ガイドを終了していない場合は、[ここから全設定](../integration-guide)をご確認ください。

## 最新ニュース
---
Apple recently revised App Transport Security (ATS), to iOS10. Please refer to [this link] for some modification.

# バナー広告を表示させるためのコーディング
---
iOS アプリは、UIView オブジェクトで構成され、テキストエリアやボタン、その他のコントロールの形でユーザーに表示される Objective-C インスタンスです。VpadnBanner はユーザーのタップ操作に反応して HTML5 の小さな広告を表示するもう 1 つのUIView のサブクラスです。

全ての UIView と同じように、VpadnBanner もコードだけで作成できます。以下は、必要なステッ プとなります。

1. VpadnBanner.hとVpadnInterstitial.hをインポートする。
2. アプリの UIViewController 内で VpadnBanner を宣言する。
1. VpadnBanner オブジェクトを作成する。
1. BannerId、つまり Vponの登録済みプロパティIDを指定する。
1. window の rootViewController を設定する。
1. 対象View を ViewController 内に追加する。
1. 広告をロードする

これらすべての処理を最も簡単に実行できるのはアプリの UIViewController 内です。

```objc
#import <UIKit/UIKit.h>
//ヘッダーファイルを読み込む
#import "VpadnBanner.h"
#import "VpadnInterstitial.h"

//2つのプロトコルを追加して広告のステータスを受けとる
@interface ViewController : UIViewController<VpadnBannerDelegate, VpadnInterstitialDelegate>
{
    VpadnBanner*    vpadnAd; // VpadnBanner 広告のインスタンスを宣言する
    VpadnInterstitial*    vpadnInterstitial; //Vpadn インタースティシャル広告のインスタンスを宣言する
}
@end
```


## viewDidLoad 設定
---

以下のコードは viewControllerのviewDidLoad初期段階でバナー広告を設定します。

```objc
@implementation ViewController

- (void)dealloc
{
    if(nil != vpadnAd)
    {
        [vpadnAd release];
        vpadnAd = nil;
    }
    if(nil != vpadnInterstitial)
    {
        [vpadnInterstitial release];
        vpadnInterstitial = nil;
    }
    [super dealloc];
}

- (void)viewDidLoad
{
    [super viewDidLoad];
	// 通常、nibからビューをロードした後に追加の設定を行います。
    BOOL bStatusBarHide = [UIApplication sharedApplication].statusBarHidden;
    float screenHeight = [[UIScreen mainScreen] bounds].size.height;
    if(!bStatusBarHide)
        screenHeight -= 20;
    // 広告位置を設定する
    CGPoint origin = CGPointMake(0.0,screenHeight - CGSizeFromVpadnAdSize(VpadnAdSizeSmartBannerPortrait).height);
    vpadnAd = [[VpadnBanner alloc] initWithAdSize:VpadnAdSizeSmartBannerPortrait origin:origin];   // バナーのインスタンスを初期化する
    vpadnAd.strBannerId = @"";   //BannerId（=プロパティID） を記入する
    vpadnAd.delegate = self;       // delegate がプロトコルで返されるメッセージを受信するよう設定する
    vpadnAd.platform = @"TW";       //台湾エリアはTW 、中国エリアはCNを入力
    [vpadnAd setAdAutoRefresh:YES]; //mediation の場合、NOと入力
    [vpadnAd setRootViewController:self];  //広告をスムーズに実行するため、window の rootViewController をここに設定する
    [self.view addSubview:[vpadnAd getVpadnAdView]]; // VpadnBanner の View をこの ViewController 内に追加する
    [vpadnAd startGetAd:[self getTestIdentifiers]]; //Banner 広告を取得開始する

}

#pragma mark VpadnAdDelegateメソッドでバナー広告を取得する場合、追加してください。
- (void)onVpadnAdReceived:(UIView *)bannerView{
    NSLog(@"広告のフェッチに成功");
}

- (void)onVpadnAdFailed:(UIView *)bannerView didFailToReceiveAdWithError:(NSError *)error{
    NSLog(@"広告の取得に失敗");
}

- (void)onVpadnPresent:(UIView *)bannerView{
    NSLog(@"vpadn 広告ページ %を開く%@",bannerView);
}

- (void)onVpadnDismiss:(UIView *)bannerView{
    NSLog(@"vpadn 広告ページ %を閉じる %@",bannerView);
}

- (void)onVpadnLeaveApplication:(UIView *)bannerView{
    NSLog(@"publisher application を終了する");
}

#pragma mark VpadnInterstitial Delegate が Interstitial 広告を受信する場合、追加する
- (void)onVpadnInterstitialAdReceived:(UIView *)bannerView{
    NSLog(@"VpadnInterstitialAdReceived");
  //インタースティシャル広告を表示する
    [vpadInterstitial show];
}

- (void)onVpadnInterstitialAdFailed:(UIView *)bannerView{
    NSLog(@"インタースティシャル広告の取得に失敗");
}

- (void)onVpadnInterstitialAdDismiss:(UIView *)bannerView{
    NSLog(@"インタースティシャル広告ページ %を閉じる%@",bannerView);
}

#pragma mark vpadn スプラッシュ広告を閉じた際に通知される
- (void)onVpadnSplashAdDismiss{
    NSLog(@"vpadn スプラッシュ広告ページを閉じる");
}
@end
```

## Test Ads

```objc
//テスト用に、この function をプログラム内に追加することができます。下方に UUID を記入するとテスト広告が見えます。
-(NSArray*)getTestIdentifiers
{
  return [NSArray arrayWithObjects:
    // テスト端末のUUIDを追加
    @"your_UUID",
    nil];
}
```

# バナー広告のサイズ
---
スマートフォン用の 320x50 以外に、タブレット向けの広告サイズもサポート しています。

サイズ (幅 x 高さ)          |説明                         |  VponAdSize 定数値              | 適用デバイス
:------------------------: | :-------------------------:| :-----------------------------:|:-----------:
320x50                     | 標準のバナー広告             | VpadnAdSizeBANNER              |iPhone & iPad
468x60                     | IAB フルサイズバナー広告     |VpadnAdSizeFullBanner           |iPad
728x90                     | IAB ビッグバナー広告         |  VpadnAdSizeLeaderboard        |iPad
300x250                    |IAB ミディアムレクタングル広告 |VpadnAdSizeMediumRectangle      |iPhone & iPad
device width x auto height |Smart Banner Portrait       |  VpadnAdSizeSmartBannerPortrait |iPhone & iPad
device width x auto height |Smart Banner Landscape       |VpadnAdSizeSmartBannerLandscape  |iPhone & iPad

特定のニーズがない場合、Smart bannerr(portrait or landscape)の使用で十分です

# 広告の自動リフレッシュ
---
Vpon アカウントで更新頻度を指定し、以下のサンプルコードを使用するとバナーの自動リフレッシュがオンとなります。

`[vpadnAd setAdAutoRefresh:YES];`


# サンプルコードのダウンロード
---
[Go to download page]

# 結果
---
実行すると、ディスプレイの上方にバナー広告が表示されます。
<img src="{{site.imgurl}}/IOS-Banner_result.png" alt="" class="width-300"/>


# App Transport Security
---
Apple recently revised App Transport Security (ATS), to iOS10. Please refer to [this link] for some modification.

# ヒント
---
より詳細な情報は[ンタースティシャル広告](../interstitial)、[メディエーション](../mediation)、[詳細設定](../advanced)をご確認 ください。



[Go to download page]: ../download/
[this link]: {{site.baseurl}}/jp/ios/latest-news/ios9ats/
