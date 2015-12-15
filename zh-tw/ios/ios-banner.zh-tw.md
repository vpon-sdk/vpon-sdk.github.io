---
layout: "ios"
title: "iOS - 橫幅廣告"
lead: ""
description:
keywords: 'Keywords for this page, in the meta data'
permalink: /zh-tw/ios/banner/
lang: "zh-tw"
---
## 完成串接指示
---
若您尚未完成串接廣告形式前的串接說明，請先前往[串接說明]完成相關設定

# 概要
--------
Vpon 橫幅廣告 (banner) 利用畫面的一小部分來吸引使用者點擊，即可打開全螢幕享受更豐富的瀏覽體驗，例如網站或應用程式商店網頁。

# 開始撰寫 Banner
---
iOS 應用程式由 UIView 物件所組成，也就是以文字區域和按鈕等控制項的形式向使用者顯示的 Objective-C 執行個體。VpadnBanner 只是一種 UIView 子類別，用來顯示由使用者點擊觸發的小型 HTML5 廣告。

和所有的 UIView 一樣，用程式碼編寫 VpadnBanner 很簡單。以下為所需步驟:

1. 匯入 `VpadnBanner.h` 與 `VpadnInterstitial.h`
2. 在應用程式的 UIViewController 中宣告 `VpadnBanner`
3. 建立 VpadnBanner 物件
4. 指定 BannerId，也就是 Vpadn 申請的 BannerId
5. 設定 window 的rootViewController
6. 將該 View 加進 ViewController 內
7. 拉取廣告

建議您最好在應用程式的 UIViewController 內執行上述所有步驟。

```Objective-C
#import <UIKit/UIKit.h>
// 載入標頭檔
#import "VpadnBanner.h"
#import "VpadnInterstitial.h"

// 增加兩個protocol接收廣告狀態
@interface ViewController : UIViewController<VpadnBannerDelegate, VpadnInterstitialDelegate>
{
    VpadnBanner*    vpadnAd; // 宣告使用VpadnBanner廣告
    VpadnInterstitial*    vpadnInterstitial; // 宣告使用Vpadn插屏廣告
}
@end
```

## 初始化設定

以下程式碼會在 viewController的 viewDidLoad 初始化步驟中設定橫幅廣告。

```Objective-C
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
	// Do any additional setup after loading the view, typically from a nib.
  BOOL bStatusBarHide = [UIApplication sharedApplication].statusBarHidden;
  float screenHeight = [[UIScreen mainScreen] bounds].size.height;
  if(!bStatusBarHide)
      screenHeight -= 20;
  // 設定廣告位置
  CGPoint origin = CGPointMake(0.0,screenHeight - CGSizeFromVpadnAdSize(VpadnAdSizeSmartBannerPortrait).height);
  vpadnAd = [[VpadnBanner alloc] initWithAdSize:VpadnAdSizeSmartBannerPortrait origin:origin];  // 初始化Banner物件
  vpadnAd.strBannerId = @"";   // 填入您的BannerId
  vpadnAd.delegate = self;       // 設定delegate接收protocol回傳訊息
  vpadnAd.platform = @"TW";       // 台灣地區請填TW 大陸則填CN
  [vpadnAd setAdAutoRefresh:YES]; //如果為mediation則set NO
  [vpadnAd setRootViewController:self]; //請將window的rootViewController設定在此 以便廣告順利執行
  [self.view addSubview:[vpadnAd getVpadnAdView]]; // 將VpadnBanner的View加入此ViewController中
  [vpadnAd startGetAd:[self getTestIdentifiers]]; // 開始抓取Banner廣告

}
```


```Objective-C
#pragma mark VpadnAdDelegate method 接一般Banner廣告就需要新增
- (void)onVpadnAdReceived:(UIView *)bannerView{
    NSLog(@"廣告抓取成功");
}

- (void)onVpadnAdFailed:(UIView *)bannerView didFailToReceiveAdWithError:(NSError *)error{
    NSLog(@"廣告抓取失敗");
}

- (void)onVpadnPresent:(UIView *)bannerView{
    NSLog(@"開啟vpadn廣告頁面 %@",bannerView);
}

- (void)onVpadnDismiss:(UIView *)bannerView{
    NSLog(@"關閉vpadn廣告頁面 %@",bannerView);
}

- (void)onVpadnLeaveApplication:(UIView *)bannerView{
    NSLog(@"離開publisher application");
}

#pragma mark VpadnInterstitial Delegate 有接Interstitial的廣告才需要新增
- (void)onVpadnInterstitialAdReceived:(UIView *)bannerView{
    NSLog(@"插屏廣告抓取成功");
    // 顯示插屏廣告
    [vpadnInterstitial show];
}

- (void)onVpadnInterstitialAdFailed:(UIView *)bannerView{
    NSLog(@"插屏廣告抓取失敗");
}

- (void)onVpadnInterstitialAdDismiss:(UIView *)bannerView{
    NSLog(@"關閉插屏廣告頁面 %@",bannerView);
}

#pragma mark 通知關閉vpadn開屏廣告
- (void)onVpadnSplashAdDismiss{
    NSLog(@"關閉vpadn開屏廣告頁面");
}

@end
```

## 測試廣告

```objective-c
// 請新增此function到您的程式內 如果為測試用 則在下方填入UUID，即可看到測試廣告。
-(NSArray*)getTestIdentifiers
{
  return [NSArray arrayWithObjects:
    // add your test UUID
    @"your_UUID",
    nil];
}
```



# 橫幅廣告大小
---
除了支援手機上的 320x50 大小外，VPON還支援各種不同的橫幅廣告：

大小 (寬度x高度)             |     說明       |  VponAdSize 常數值              | 適用裝置
:------------------------: | :-------------:| :-----------------------------:|:-----------:
320x50                     | 標準橫幅廣告     | VpadnAdSizeBANNER                   |iPhone & iPad
468x60                     | IAB 全橫幅廣告   |VpadnAdSizeFullBanner              |iPad
728x90                     | IAB 超級橫幅廣告 |  VpadnAdSizeLeaderboard        |iPad
300x250                    |IAB 中矩形廣告    |VpadnAdSizeMediumRectangle            |iPad
device width x auto height |Smart Banner Portrait |  VpadnAdSizeSmartBannerPortrait |iPhone & iPad
device width x auto height |Smart Banner Landscape|VpadnAdSizeSmartBannerLandscape  |iPhone & iPad

如無特定需求，我們建議您直接使用上面 `smart banner`(portrait or landscape)即可

# 更新廣告
---
如果您在伺服器的 Vpon 帳戶中指定了更新速率，且需要使用下面的 sample 才會啟動 banner 自動更新

  [vpadnAd setAdAutoRefresh:YES];



# 下載 Sample code
---
[Go to download page]

# 結果
---
現在只要執行這個應用程式，您應該就會在畫面上看到橫幅廣告：
<img src="{{site.imgurl}}/IOS-Banner_result.png" alt="" class="width-300"/>


# App Transport Security
---
iOS9 多了安全條款 App Transport Security (ATS)，若您使用 Xcode 7 建立 iOS9 專案，請參考[這篇]來修改部份設定

# 其他訣竅
> 請參閱[插頁廣告](../Interstitial)、[中介服務](../mediation)、[進階設定](../advanced)中獲取更多簡介。


[串接說明]: ../integration-guide/
[Go to download page]: ../download/
[這篇]: {{site.baseurl}}/zh-tw/ios/latest-news/ios9ats/
