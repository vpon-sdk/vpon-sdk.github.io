---
layout: "ios"
title: "iOS - 進階設定"
lead: "幫助您取得更多廣告功能與資料收集"
description:
keywords: 'Keywords for this page, in the meta data'
permalink: /zh-tw/ios/advanced/
lang: "zh-tw"
---
# 自定參數
---
您可以在固定需要新增的 function(getTestIdentifiers) 中設定測試手機的識別碼 (在第一次發出 request 時會提示開發者要新增什麼識別碼)，讓 Vpon 以更精確的方式指定廣告。 在開發期間 建議將自己的手機識別碼加在 getTestIdentifiers 函式中以免產生不實曝光，造成您收益上的損失，並請在上架前將識別碼刪除，否則之後填入識別碼的手機將無法抓到正常廣告

## 增加測試手機的識別碼
您可以使用這些屬性來指定要接收測試廣告的裝置或裝置 Set。若要確認 SDK 是否已順利整合，請加入您的測試裝置並執行應用程式，然後按一下所顯示的測試廣告。

```objective-c
  // 請新增此function到您的程式內 如果為測試用 則在下方填入識別碼
  -(NSArray*)getTestIdentifiers
  {
      return [NSArray arrayWithObjects:
              // add your test Id
              @"XXXXXXXXXXXXXXXXXXXXX",
              nil];
  }
```
## 指定目標
您也可以指定位置和客層相關資訊。不過，為了保護使用者隱私，請只指定您的應用程式中現有的位置和客層資料。

   [vpadnAd setUserInfoAge:25];

   [vpadnAd setUserInfoKeyword:@"Game,RPG"];

   [vpadnAd setUserInfoGender:female];

   [vpadnAd setUserInfoBirthdayWithYear:1988 Month:6 andDay:9];


# Protocol
---
您可以在 ViewController 宣告時加入 VpadnBannerDelegate || VpadnInterstitialDelegate 此兩個 protocol，藉此追蹤請求失敗或「點擊」等廣告事件。



```objective-c
#pragma mark VpadnBannerDelegate  一般 Banner protocol
@protocol VpadnBannerDelegate <NSObject>
@optional

#pragma mark 通知拉取廣告成功 pre-fetch 完成
- (void)onVpadnAdReceived:(UIView *)bannerView;

#pragma mark 通知拉取廣告失敗
- (void)onVpadnAdFailed:(UIView *)bannerView didFailToReceiveAdWithError:(NSError *)error; // alan todo code need to add

#pragma mark 通知開啟 vpadn 廣告頁面
- (void)onVpadnPresent:(UIView *)bannerView;

#pragma mark 通知關閉vpadn廣告頁面
- (void)onVpadnDismiss:(UIView *)bannerView;

#pragma mark 通知離開 publisher application
- (void)onVpadnLeaveApplication:(UIView *)bannerView;
@end
```

```objective-c
pragma mark VpadnInterstitialDelegate Interstitial Ad protocol
@protocol VpadnInterstitialDelegate <VpadnBannerDelegate>
@optional

#pragma mark 通知取得插屏廣告成功pre-fetch完成
- (void)onVpadnInterstitialAdReceived:(UIView *)bannerView;

#pragma mark 通知取得插屏廣告失敗
- (void)onVpadnInterstitialAdFailed:(UIView *)bannerView;

#pragma mark 通知關閉vpadn廣告頁面
- (void)onVpadnInterstitialAdDismiss:(UIView *)bannerView;
@end
```

這些方法可用於個別的物件，例如

```objective-c
  #import "VpadnBanner.h"
  #import "VpadnInterstitial.h"
  @interface ViewController : UIViewController<VpadnBannerDelegate, VpadnInterstitialDelegate>
```

將要接收的物件傳給 VpadnBanner：

```objective-c
vpadnAd.delegate = self;
```
當 VpadnBanner 廣告抓取成功時傳送。

```objective-c
  - (void)onVpadnAdReceived:(UIView *)bannerView{}
```
當 VpadnBanner 失敗時傳送；失敗原因通常是網路連線失敗、應用程式設定錯誤或廣告空間不足。建議您將這些事件記錄下來以便偵錯：

```objective-c
  - (void)onVpadnAdFailed:(UIView *)bannerView didFailToReceiveAdWithError:(NSError *)error{}
```

當廣告因獲得使用者點擊，在您的應用程式之前webView 並呈現出全螢幕廣告使用者介面時呼叫。

```objective-c
  - (void)onVpadnPresent:(UIView *)bannerView{}
```
當使用者關閉與 onVpadnDismiss 一同顯示的webView，控制權也交還給應用程式時呼叫。

```objective-c
  - (void)onVpadnDismiss:(UIView *)bannerView;
```
當 Ad 點擊會啟動新的應用程式(out app)時呼叫。

```objective-c
  - (void)onVpadnLeaveApplication:(UIView *)bannerView{}
```

# Crazy Ad
---
會從banner自動展開成 Crazy Ad，全螢幕富媒體廣告的 Crazy Ad 呈現約 5~7 秒會自動關閉。
<img src="{{site.imgurl}}/Crazyad.png" alt="" class="img-300"/>


## 設定
---
在後台註冊申請流程中可選擇是否播放 Crazy Ad。<br>
進入 http://cn.adon.vpon.com/ 註冊中國區 License Key。<br>
進入 http://tw.adon.vpon.com/ 註冊台灣區 License Key。<br>
如圖:
![CrazyadSetting]



[CrazyadSetting]: {{site.imgurl}}/CrazyadSetting.png


# Corona User
---
如果您 App 使用 Corona 欲串接 Vpon 廣告，我們建議您用 web SDK 的方式串接，使用方法如下:
將 web SDK 裡的 html 寫進 local file 再讓 webview 去 load 這個 file (例如: webView:request( "localfile.html", system.ResourceDirectory ))。

HTML 內容可參考 Vpon SDK 的 web SDK 操作手冊: [Web SDK]({{site.baseurl}}/zh-tw/web/)

更多 Corona SDK 文件可參考: [Corona Document](http://docs.coronalabs.com/api/library/native/newWebView.html)
