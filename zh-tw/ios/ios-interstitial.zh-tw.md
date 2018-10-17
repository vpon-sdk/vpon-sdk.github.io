---
layout: "ios"
title: "iOS - 插頁廣告"
lead: ""
description:
keywords: 'Keywords for this page, in the meta data'
permalink: /zh-tw/ios/interstitial/
lang: "zh-tw"
---

# 總覽
---
插頁式廣告是互動式多媒體 HTML5 或「網路應用程式」，在應用程式的正常轉換點顯示 (例如啟動、影片播放前或遊戲關卡載入時)。網路應用程式使用上就像在應用程式內瀏覽一樣，只有簡單的關閉按鈕，而沒有任何導覽列，因為導覽配置就包含在內容本身。這類廣告由於內容更豐富、更吸引人，因此製作起來更昂貴，而曝光機會相對有限。

![]({{site.imgurl}}/Interstitial.png)

# 完成串接準備
---
在開始串接廣告之前，請確認您已經將 Vpon SDK 導入您的 Xcode 專案中。若您尚未完成，請先參考[串接說明]完成相關設定。

# 開始撰寫 Interstitial
---
Interstitial Ad 的內容更加豐富精彩，因為它是需要更多不同實例化、載入和顯示步驟的 Object，而不是 View。
不過，它的用法與 Vpadn Banner 非常類似：

1. Import `VpadnSDKAdKit`
2. 在應用程式的 ViewController 中宣告 `VpadnInterstitial`
3. 建立 VpadnInterstitial 物件，並指定 License Key
4. 拉取廣告
5. 展示廣告
6. 實作 Delegate protocol

建議您在應用程式的 ViewController 內執行上述步驟。

## Import VpadnSDKAdKit 並宣告 VpadnInterstitial
---
```objc
#import <ViewController.h>

// import Vpon SDK
@import VpadnSDKAdKit;

// 增加一個 protocol 接收廣告狀態
@interface ViewController() <VpadnInterstitialDelegate>

// 宣告使用 VpadnInterstitial 廣告
@property (strong, nonatomic) VpadnInterstitial *vpadnInterstitial;

@end
```

## 建立 VpadnInterstitial 物件
---
請參考以下程式碼，在 ViewController 的 viewDidLoad 中初始化插頁廣告，並指定 License Key

```objc
@implementation ViewController

- (void)viewDidLoad {
    vpadnInterstitial = [[VpadnInterstitial alloc] init];
    vpadnInterstitial.strBannerId = @""; // 填入您的 Interstitial License Key
    vpadnInterstitial.platform = @"TW"; // 請一律填寫 "TW"
    vpadnInterstitial.delegate = self;
    [vpadnInterstitial getInterstitial:@[]]; // 開始拉取 Interstitial 廣告

    // 若要拉取測試 Interstitial 廣告，請使用以下程式碼
    // [vpadnInterstitial getInterstitial:[self getTestIdentifiers]];
}
@end
```

> **Note**：插頁廣告所使用的 License Key 不能與橫幅廣告所用的 License Key 重複


## 展示廣告
---
在您完成 Interstitial 廣告初始化設定並拉取廣告後，您需要在廣告請求成功後才能嘗試顯示廣告。最簡單的作法是當 onVpadnInterstitialAdReceived 收到通知時，執行 `[vpadnInterstitial show]`。

```objc
- (void)onVpadnInterstitialAdReceived:(UIView *)bannerView {
    [self.vpadnInterstitial show];
}
```

> **Note**：為了維持良好的使用者體驗，我們建議可先抓取插頁廣告，待特定時機再將其顯示，盡量避免抓取後立即顯示

## 測試廣告
---
Vpon SDK 提供測試廣告。請新增此 function 到您的程式內，並填入測試裝置的 UUID，即可拉取測試廣告

```objc
-(NSArray*)getTestIdentifiers {
  return [NSArray arrayWithObjects:
    // Add your test device's UUID
    @"your_UUID",
    nil];
}
```

## 實作 Delegate protocol
---
完成廣告請求後，您可以實作以下函數監聽廣告狀態

```objc
#pragma mark VpadnInterstitial Delegate
- (void)onVpadnInterstitialAdReceived:(UIView *)bannerView{
    NSLog(@"插頁廣告抓取成功");
    // 顯示插頁廣告
    [vpadnInterstitial show];
}

- (void)onVpadnInterstitialAdFailed:(UIView *)bannerView{
    NSLog(@"插頁廣告抓取失敗");
}

- (void)onVpadnInterstitialAdDismiss:(UIView *)bannerView{
    NSLog(@"關閉插頁廣告頁面 %@",bannerView);
}
```

> **Note**： 若想進一步瞭解 protocol 相關詳情，請參閱[進階設定]。

# Tips
---

### App Transport Security
iOS9 更新了安全條款 App Transport Security (ATS)，請參考 [iOS9 ATS] 來修改部份設定

### Sample Code
如果您想看到完整的串接實例，請參考我們的 [Sample Code]

### 其它廣告形式
如果您想了解其它廣告形式的串接，請參考以下內容：

* [橫幅廣告](../banner)
* [原生廣告](../native)
* [Out-stream 影音廣告](../outstream)
* [中介服務](../mediation)
* [進階設定](../advanced)

[串接說明]: ../integration-guide/
[Sample Code]: ../download/
[iOS9 ATS]: {{site.baseurl}}/zh-tw/ios/latest-news/ios9ats/
[進階設定]: ../advanced/
