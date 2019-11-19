---
layout: "ios"
title: "iOS - 橫幅廣告"
lead: ""
description:
keywords: 'Keywords for this page, in the meta data'
permalink: /zh-tw/ios/banner/
lang: "zh-tw"
---
# 概要
---
Vpon 橫幅廣告 (Banner) 是利用畫面的一小部分展示廣告來吸引使用者點擊，廣告被點擊後即可打開全螢幕呈現更豐富的內容，例如網站或應用程式商店網頁。

<!-- <img src="{{site.imgurl}}/IOS-Banner_result.png" alt="" class="width-300"/> -->
<img src="{{site.imgurl}}/iOS_Banner_Sample.png" alt="" class="width-300"/>

# 完成串接準備
---
在開始串接廣告之前，請確認您已經將 Vpon SDK 導入您的 Xcode 專案中。若您尚未完成，請先參考[串接說明]完成相關設定。

# 開始撰寫 Banner
---
iOS 應用程式由 UIView 物件所組成，也就是以文字區域和按鈕等控制項的形式向使用者顯示的 Objective-C 執行個體。VpadnBanner 是一種 UIView 子類別，用來顯示由使用者點擊觸發的小型 HTML5 廣告。

和所有的 UIView 一樣，用程式碼編寫 VpadnBanner 很簡單。以下為所需步驟：

1. Import `VpadnSDKAdKit`
2. 在應用程式的 ViewController 中宣告 `VpadnBanner`
3. 建立 VpadnBanner 物件，並指定 License Key
4. 拉取廣告
5. 實作 Delegate protocol

建議您可以在應用程式的 ViewController 內執行上述步驟。

## Import VpadnSDKAdKit 並宣告 VpadnBanner
---
```objc
#import <ViewController.h>

// import Vpon SDK
@import VpadnSDKAdKit;

// 增加一個 protocol 接收廣告狀態
@interface ViewController() <VpadnBannerDelegate>

// 宣告使用 VpadnBanner 廣告
@property (strong, nonatomic) VpadnBanner *vpadnBanner;

@property (weak, nonatomic) IBOutlet UIView *loadBannerView;

@end
```

## 建立 VpadnBanner 物件
---
請參考以下程式碼，在 ViewController 的 viewDidLoad 中初始化橫幅廣告，並指定 License Key

```objc
@implementation ViewController

- (void)viewDidLoad {
    [super viewDidLoad];

    if (self.vpadnBanner != nil) {
            [self.vpadnBanner.getVpadnAdView removeFromSuperview];
    }

  vpadnBanner = [[VpadnBanner alloc] initWithAdSize:VpadnAdSizeFromCGSize(self.loadBannerView.frame.size) origin:CGPointZero];  // 初始化 Banner 物件
  vpadnBanner.strBannerId = @""; // 填入您的 License Key for Banner AD
  vpadnBanner.delegate = self; // 設定 Delegate 接收 protocol 回傳訊息
  vpadnBanner.platform = @"TW"; // 請一律填寫 "TW"
  [vpadnBanner setAdAutoRefresh:YES]; // set "YES" 啟動 Banner 自動更新，若為 mediation 則 set "NO"
  [vpadnBanner setRootViewController:self];
  [self.loadBannerView addSubview:bannerView]; // 將 VpadnBanner 的 View 加入此 ViewController 中
  
  ...
}
```

## 拉取廣告
---
完成 Banner 廣告初始化設定後，請加入以下程式片段拉取廣告：

```objc
- (void)viewDidLoad {
    ...

  // 開始拉取 Banner 廣告
  [vpadnBanner startGetAd:[]]; 

  // 若要拉取測試 Banner 廣告，請使用以下程式碼
  // [vpadnBanner startGetAd:[self getTestIdentifiers]];
}
```

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

<!-- ## 更新廣告
---
如果想讓 Banner 廣告自動更新，請加入以下程式片段啟動 Banner 自動更新

```objc
- (void)viewDidLoad {
    ...

  [vpadnBanner setAdAutoRefresh:YES];
}
``` -->

## 實作 Delegate protocol
---
完成廣告請求後，您可以實作以下函數監聽廣告狀態

```objc
#pragma mark - Vpadn Banner Delegate
- (void)onVpadnAdReceived:(UIView *)bannerView {
    NSLog(@"廣告抓取成功");
}

- (void)onVpadnAdFailed:(UIView *)bannerView didFailToReceiveAdWithError:(NSError *)error {
    NSLog(@"廣告抓取失敗");
}

- (void)onVpadnPresent:(UIView *)bannerView {
    NSLog(@"開啟vpadn廣告頁面 %@",bannerView);
}

- (void)onVpadnDismiss:(UIView *)bannerView {
    NSLog(@"關閉vpadn廣告頁面 %@",bannerView);
}

- (void)onVpadnLeaveApplication:(UIView *)bannerView {
    NSLog(@"離開publisher application");
}
```

# 橫幅廣告尺吋
---
除了標準尺吋 (320x50) 的橫幅廣告外，Vpon 還支援多種不同尺吋的橫幅廣告：

尺吋<br>(寬x高)             |     說明       |  VponAdSize 常數值              | 適用裝置
:------------------------: | :-------------:| :-----------------------------:|:-----------:
320x50                     | 標準橫幅廣告     | VpadnAdSizeBANNER                   |iPhone<br>iPad
468x60                     | IAB 全橫幅廣告   | VpadnAdSizeFullBanner              |iPad
728x90                     | IAB 超級橫幅廣告 | VpadnAdSizeLeaderboard        |iPad
300x250                    | IAB 中矩形廣告   | VpadnAdSizeMediumRectangle            |iPhone<br>iPad
device width x auto height | Smart Banner Portrait | VpadnAdSizeSmartBannerPortrait |iPhone<br>iPad
device width x auto height | Smart Banner Landscape | VpadnAdSizeSmartBannerLandscape  |iPhone<br>iPad


<!-- device width x auto height | Custom Banner Size | VpadnAdSizeFromCGSize | iPhone<br>iPad -->

如無特定需求，我們建議您直接使用上面 `VpadnAdSizeFromCGSize`，例：

```objc
vpadnBanner = [[VpadnBanner alloc] initWithAdSize:VpadnAdSizeFromCGSize(self.loadBannerView.frame.size) origin:CGPointZero];
```

# Tips
---

### App Transport Security
iOS9 更新了安全條款 App Transport Security (ATS)，請參考 [iOS9 ATS] 來修改部份設定

### Sample Code
如果您想看到完整的串接實例，請參考我們的 [Sample Code]

### 其它廣告形式
如果您想了解其它廣告形式的串接，請參考以下內容：

* [插頁廣告](../interstitial)
* [原生廣告](../native)
* [Out-stream 影音廣告](../outstream)
* [中介服務](../mediation)
* [進階設定](../advanced)

[串接說明]: ../integration-guide/
[Sample Code]: ../download/
[iOS9 ATS]: {{site.baseurl}}/zh-tw/ios/latest-news/ios9ats/