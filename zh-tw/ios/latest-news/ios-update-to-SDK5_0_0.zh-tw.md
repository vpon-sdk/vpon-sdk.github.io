---
layout: "ios"
title: "升級至 SDK 5.0.2"
lead: ""
description:
keywords: 'Keywords for this page, in the meta data'
permalink: /zh-tw/ios/latest-news/update-to-SDK5_0_2/
lang: "zh-tw"
---

# 概覽
---
本次的 SDK 版本更新，主要進行了以下架構調整：

* 移除過於厚重且使用率不高的 Cordova，改採原生的 Javascript 進行溝通
* 移除 UIWebView，將 Web Container 全面改為 WKWebView
* Banner / Interstitial / Native 等廣告類型的介面調整，使串接介面更為一致
* 調整 SDK 架構，以支援更多第三方追蹤方案
* 支援 mraid3 介面


# 系統要求
---

* 支援 iOS 9.0 及以上版本，建議運行在 iOS 10.0 以上版本
* 建議使用 Xcode 11 以上版本進行開發


# 版本差異
---

## Ad Instance Declaration

### Banner Ad

```objc
_vpadnBanner = [[VpadnBanner alloc] initWithAdSize:adSize origin:CGPointZero];
_vpadnBanner.strBannerId = @"License Key";
_vpadnBanner.platform = @"TW";
[_vpadnBanner setRootViewController:self];
[_vpadnBanner startGetAd:@[]];
// Declare Banner Ad instance in SDK v4.9.4 and below

_vpadnBanner = [[VpadnBanner alloc] initWithLicenseKey:@"License Key" adSize:adSize];
_vpadnBanner.delegate = self;
// Declare Banner Ad instance in SDK v5.0.2 and above
```

### Interstitial Ad

```objc
_vpadnInterstitial = [[VpadnInterstitial alloc] init];
_vpadnInterstitial.strBannerId = @"License Key";
_vpadnInterstitial.platform = @"TW";
[_vpadnInterstitial getInterstitial:@[]];
// Declare Interstitial Ad instance in SDK v4.9.4 and below

_vpadnInterstitial = [[VpadnInterstitial alloc] initWithLicenseKey:@"License Key"];
_vpadnInterstitial.delegate = self;
// Declare Interstitial Ad instance in SDK v5.0.2 and above
```

### Native Ad

```objc
_nativeAd = [[VpadnNativeAd alloc] initWithBannerID:@"License Key"];
_nativeAd.delegate = self;
[_nativeAd loadAdWithTestIdentifiers:@[]];
// Declare Native Ad instance in SDK v4.9.4 and below

_nativeAd = [[VpadnNativeAd alloc] initWithLicenseKey:@"License Key"];
_nativeAd.delegate = self;
// Declare Native Ad instance in SDK v5.0.2 and above
```

<!-- ```objc
// Native Ad Manager
_adsManager = [[VpadnNativeAdsManager alloc] initWithBannerID:@"License Key" forNumAdsRequested:kRowStrideForAdCell];
_adsManager.delegate = self;
[_adsManager loadAdsWithTestIdentifiers:@[]];
// Declare Native Ad instance in SDK v4.9.4 and below

_adsManager = [[VpadnNativeAdsManager alloc] initWithLicenseKey:@"License Key" forNumAdsRequested: kRowStrideForAdCell];
_adsManager.delegate = self;
// Declare Native Ad instance in SDK v5.0.2 and above
``` -->


<!-- ### Splash Ad

```objc
_vpadnSplash = [[VpadnSplash alloc] initWithSplashId:@"License Key" withTarget:self.splashView];
_vpadnSplash.delegate = self;
[_vpadnSplash loadSplashWithTestIdentifiers:@[]];
// Declare Splash Ad instance in SDK v4.9.4 and below

_vpadnSplash = [[VpadnSplash alloc] initWithLicenseKey:@"License Key" target:_loadSplashView];
_vpadnSplash.delegate = self;
// Declare Splash Ad instance in SDK v5.0.2 and above
``` -->

## VpadnRequest

```objc
VpadnAdRequest *request = [[VpadnAdRequest alloc] init];
[_vpadnBanner loadRequest:request];
// New interface in SDK v5.0.2
```


## Delegate Protocol

### Banner Ad

```objc
- (void) onVpadnAdReceived:(UIView *)bannerView;
- (void) onVpadnAdFailed:(UIView *)bannerView didFailToReceiveAdWithError:(NSError *)error
- (void) onVpadnLeaveApplication:(UIView *)bannerView;
- (void) onVpadnPresent:(UIView *)bannerView;
- (void) onVpadnDismiss:(UIView *)bannerView;
- (void) onVpadnAdWillRefresh:(VpadnBanner *)banner;
// Set Delegate Protocol in SDK v4.9.4 and below

- (void) onVpadnAdLoaded:(VpadnBanner *)banner;
- (void) onVpadnAd:(VpadnBanner *)banner failedToLoad:(NSError *)error
- (void) onVpadnAdWillLeaveApplication:(VpadnBanner *)banner;
- (void) onVpadnAdWillOpen:(VpadnBanner *)banner;
- (void) onVpadnAdClosed:(VpadnBanner *)banner;
- (void) onVpadnAdRefreshed:(VpadnBanner *)banner;
// Set Delegate Protocol in SDK v5.0.2 and above

- (void) onVpadnGetAd:(UIView *)bannerView;
- (void) onVpadnViewSizeChange:(CGRect)ViewSize;
- (void) onVpadnViewColorChange:(UIColor*)bgColor;
// Deprecated
```

### Interstitial Ad

```objc
- (void) onVpadnInterstitialAdReceived:(nullable UIView *)bannerView;
- (void) onVpadnInterstitialAdFailed:(nullable UIView *)bannerView;
- (void) onVpadnInterstitialAdWillLeaveApplication:(nullable UIView *)bannerView;
- (void) onVpadnInterstitialAdWillPresent:(nullable UIView *)bannerView;
- (void) onVpadnInterstitialAdDismiss:(nullable UIView *)bannerView;
- (void) onVpadnInterstitialAdClicked;
// Set Delegate Protocol in SDK v4.9.4 and below

- (void) onVpadnInterstitialLoaded:(VpadnInterstitial *)interstitial;
- (void) onVpadnInterstitial:(VpadnInterstitial *)interstitial failedToLoad:(NSError *)error;
- (void) onVpadnInterstitialWillLeaveApplication:(VpadnInterstitial *)interstitial;
- (void) onVpadnInterstitialWillOpen:(VpadnInterstitial *)interstitial;
- (void) onVpadnInterstitialClosed:(VpadnInterstitial *)interstitial;
- (void) onVpadnInterstitialClicked:(VpadnInterstitial *)interstitial;
// Set Delegate Protocol in SDK v5.0.2 and above

- (void) onVpadnInterstitialAdWillDismiss:(nullable UIView *)bannerView;
- (void) onVpadnInterstitialAdDidFailToPresent:(nullable UIView *)bannerView;
// Deprecated
```


### Native Ad

```objc
- (void) onVpadnNativeAdReceived:(VpadnNativeAd *)nativeAd;
- (void) onVpadnNativeAd:(VpadnNativeAd *)nativeAd didFailToReceiveAdWithError:(NSError *)error;
- (void) onVpadnNativeAdLeaveApplication:(VpadnNativeAd *)nativeAd;
- (void) onVpadnNativeAdDidClicked:(VpadnNativeAd *)nativeAd;
// Set Delegate Protocol in SDK v4.9.4 and below

- (void) onVpadnNativeAdLoaded:(VpadnNativeAd *)nativeAd;
- (void) onVpadnNativeAd:(VpadnNativeAd *)nativeAd failedToLoad:(NSError *)error;
- (void) onVpadnNativeAdWillLeaveApplication:(VpadnNativeAd *)nativeAd;
- (void) onVpadnNativeAdClicked:(VpadnNativeAd *)nativeAd;
// Set Delegate Protocol in SDK v5.0.2 and above

- (void) onVpadnNativeGetAd:(VpadnNativeAd *)nativeAd;
- (void) onVpadnNativeAdPresent:(VpadnNativeAd *)nativeAd;
- (void) onVpadnNativeAdDismiss:(VpadnNativeAd *)nativeAd;
// Deprecated
```

### Splash Ad

```objc
- (void) onVpadnSplashReceived:(VpadnSplash *)vpadnSplash;
- (void) onVpadnSplash:(VpadnSplash *)vpadnSplash didFailToReceiveAdWithError:(nullable NSError *)error;
- (void) onVpadnSplashLeaveApplication:(VpadnSplash *)vpadnSplash;
- (void) onVpadnSplashAllowToDismiss:(VpadnSplash *)vpadnSplash;
// Set Delegate Protocol in SDK v4.9.4 and below

- (void) onVpadnSplashLoaded:(VpadnSplash *)vpadnSplash;
- (void) onVpadnSplash:(VpadnSplash *)vpadnSplash failedToLoad:(NSError *)error;
- (void) onVpadnSplashWillLeaveApplication:(VpadnSplash *)vpadnSplash;
- (void) onVpadnSplashAllowToClose:(VpadnSplash *)vpadnSplash;
// Set Delegate Protocol in SDK v5.0.2 and above
```


# 如何確認當前使用的版本
---
您可以在 Xcode 的 Console 中，看到以下版本訊息：

```
<VPON> [INFO] SDK Version: v5.0.2
<VPON> [INFO] Build Date: 20200203
```


# 如何更新至 SDK v5.0.2
---
由於 SDK v5.0.2 對於舊版本 SDK 有向下相容的設計，您在更新 SDK 後，不需對原有的串接程式碼做任何調整即可執行。

> **Note:** 如果您已經開始使用 SDK v5.0.2，當您在 Xcode 上編譯時，在使用舊有介面的部份，會提示您如何使用新的介面，請務必在更新 SDK 後，測試是否能正常取得、展示廣告。
>
> 如果您計劃將廣告請求及展示的程式碼調整為新的介面，請參考：
>
> * [橫幅廣告]
> * [插頁廣告]
> * [原生廣告]


您可以透過以下兩種方式更新 SDK：

* [從 Cocoapods 更新 SDK](#cocoapods)
* [手動下載並更新 SDK](#manual-sdk)

## 從 Cocoapods 更新 SDK {#cocoapods}
---
如果您原先是使用 Cocoapods 來安裝 Vpon SDK，您可以在 Podfile 中指定版本來更新 SDK：

```
pod 'VpadnSDK', '~> 5.0.2’
```

>**Note:** 如果無法更新至最新版本，建議先執行 `pod repo update` 更新 Pod Spec，再執行 `pod install` 安裝。


## 手動下載並更新 SDK {#manual-sdk}
---
如果您原先是手動下載 SDK 來安裝的話，請:

* [由此下載][1]最新版本的 SDK，將舊版本的 SDK 替換掉



[1]:{{ site.baseurl }}/ios/download/
[橫幅廣告]:{{site.baseurl}}/zh-tw/ios/banner
[插頁廣告]:{{site.baseurl}}/zh-tw/ios/interstitial
[原生廣告]:{{site.baseurl}}/zh-tw/ios/native