---
layout: "ios"
title: "iOS - 開屏廣告"
lead: ""
description:
keywords: 'Keywords for this page, in the meta data'
permalink: /zh-tw/ios/splash/
lang: "zh-tw"
---
## 完成串接指示
---
若您尚未完成串接廣告形式前的串接說明，請先前往[串接說明]完成相關設定

## 最新消息
---
iOS10 更新了安全條款 App Transport Security (ATS)，請參考[這篇]來修改部份設定

# 概要
--------
在原先等待應用程式開啟的時間，以開屏廣告來作為完美的轉場效果，除了以自然且立即的方式呈現適合的廣告內容以提升使用者體驗，也可在此處結合應用程式商標，讓使用者產生印象並留下深刻記憶。

<img class="width-400" src="{{site.imgurl}}/Splash_iOS.png" alt="successful result example">

在應用程式中建立開屏廣告需要執行以下七個步驟：

1. 匯入 Vpon SDK
2. 於應用程式建立 UIViewController 類別，命名為 SplashViewController
3. 於 StoryBoard (or Xib) 建立 UIViewController，並指定 class 為 SplashViewController
4. 於 SplashViewController 頁面新增 UIView，命名為 splashView
5. 建立 VpadnSplash 物件，指定splashID、splashView，並請求廣告
6. 將應用程式開啟時的 UIWindow rootViewController 指定為 splashViewController
7. 應用程式重啟即可顯示開屏

# 開始撰寫 Splash Ad
--------
首先匯入 SDK ，宣告實作了 VpadnSplashDelegate protocol 以接收廣告狀態，並宣告 VpadnSplash 物件與 splashView。


```objc
@import VpadnSDKAdKit;
#import "VponSdkSplashViewController.h"

@interface VponSdkSplashViewController () <VpadnSplashDelegate>

@property (weak, nonatomic) IBOutlet UIView *splashView;
@property (strong, nonatomic) VpadnSplash *vpadnSplash;

@end
```

## 建立 VpadnSplash 物件
--------
在 SplashViewController 實作中初始化 vpadnSplash 物件，完成指定 splashID 及 splashView 後即可請求廣告。( 尚未申請 splashID 請先參考此[說明] )


```objc
- (void)viewDidAppear:(BOOL)animated {
    [super viewDidAppear:animated];
    self.vpadnSplash = [[VpadnSplash alloc] initWithSplashId:@"Key in License ID for Splash Ad" withTarget:self.splashView];
    self.vpadnSplash.delegate = self;
    [self.vpadnSplash setEndurableSecond:3];

    //  If you would like to show the test ad, please use the following codes to set 'Yes' as the value of setTestMode and key in your device's IDFA.
    [self.vpadnSplash setTestMode:YES];
    [self.vpadnSplash loadSplashWithTestIdentifiers:@[@"Key in your device's IDFA"]];
}
```

## 開屏廣告 Callback
--------
完成請求開屏廣告後，下述五個函數可回傳目前廣告的各式狀態，包含：

1. 請求成功並顯示
2. 請求失敗
3. 廣告被點擊
4. 即將離開應用程式
5. 廣告允許被關閉

當廣告`請求成功並顯示`會透過 `onVpadnSplashReceived` 通知；請求失敗會透過 `onVpadnSplash:didFailToReceiveAdWithError` 通知。
廣告會自動加載在指定的 splashView 上，應用程式無需做額外的處理。此外每則廣告皆獨立的顯示時間，當顯示時間到達標準會透過 `onVpadnSplashAllowToDismiss` 通知允許關閉廣告。

```objc
- (void)onVpadnSplashReceived:(nonnull VpadnSplash *)vpadnSplash {
    NSLog(@"onVpadnSplashReceived");
}

- (void)onVpadnSplash:(nonnull VpadnSplash *)vpadnSplash didFailToReceiveAdWithError:(nullable NSError *)error {
    NSLog(@"onVpadnSplash:didFailToReceiveAdWithError");
    [self backToMainPage]; //Back to the main page
}

- (void)onVpadnSplashClicked:(nonnull VpadnSplash *)vpadnSplash {
    NSLog(@"onVpadnSplashClicked");
}

- (void)onVpadnSplashLeaveApplication:(nonnull VpadnSplash *)vpadnSplash {
    NSLog(@"onVpadnSplashLeaveApplication");
}

- (void)onVpadnSplashAllowToDismiss:(nonnull VpadnSplash *)vpadnSplash {
    NSLog(@"onVpadnSplashDismiss");
    [self backToMainPage]; //Back to the main page
}
```

# 下載範例
--------
[前往下載][1]


[串接說明]: ../integration-guide/
[說明]: {{ site.baseurl }}/zh-tw/ios/registration/
[這篇]: {{site.baseurl}}/zh-tw/ios/latest-news/ios9ats/
[1]: {{ site.baseurl }}/zh-tw/ios/download/
