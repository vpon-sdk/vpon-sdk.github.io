---
layout: "ios"
title: "升级至 SDK 5.0.2"
lead: ""
description:
keywords: 'Keywords for this page, in the meta data'
permalink: /zh-cn/ios/latest-news/update-to-SDK5_0_2/
lang: "zh-cn"
---

# 概览
---
本次的 SDK 版本更新，主要进行了以下架构调整：

* 移除过于厚重且使用率不高的 Cordova，改采原生的 Javascript 进行沟通
* 移除 UIWebView，将 Web Container 全面改为 WKWebView
* Banner / Interstitial / Native 等广告类型的介面调整，使串接介面更为一致
* 支援 mraid3 介面
* 第三方追踪支援


# 系统要求
---

* 支援 iOS 9.0 及以上版本，建议运行在 iOS 10.0 以上版本
* 建议使用 Xcode 11 以上版本进行开发


# 版本差异
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


# 如何确认当前使用的版本
---
您可以在 Xcode 的 Console 中，看到以下版本讯息：

```
<VPON> [INFO] SDK Version: v5.0.2
<VPON> [INFO] Build Date: 20200203
```


# 如何更新至 SDK v5.0.2
---
由于 SDK v5.0.2 对于旧版本 SDK 有向下相容的设计，您在更新 SDK 后，不需对原有的串接程式码做任何调整即可执行。

> **Note:** 如果您已经开始使用 SDK v5.0.2，当您在 Xcode 上编译时，在使用旧有介面的部份，会提示您如何使用新的介面，请务必在更新 SDK 御，测试是否能正常取得、展示广告。
>
> 如果您计划将广告请求及展示程式码调整为新的介面，请参考：
>
> * [横幅广告]
> * [插页广告]
> * [原生广告]


您可以透过以下两种方式更新 SDK：

* [从 Cocoapods 更新 SDK](#cocoapods)
* [手动下载并更新 SDK](#manual-sdk)

## 从 Cocoapods 更新 SDK {#cocoapods}
---
如果您原先是使用 Cocoapods 来安装 Vpon SDK，您可以在 Podfile 中指定版本来更新 SDK：

```
pod 'VpadnSDK', '~> 5.0.2’
```

>**Note:** 如果无法更新至最新版本，建议先执行 `pod repo update` 更新 Pod Spec，再执行 `pod install` 安装


## 手动下载并更新 SDK {#manual-sdk}
---
如果您原先是手动下载 SDK 来安装的话，请：

* [由此下载][1]最新版本的 SDK，将旧版本的 SDK 替换掉



[1]:{{ site.baseurl }}/ios/download/
[横幅广告]:{{site.baseurl}}/zh-cn/ios/banner
[插页广告]:{{site.baseurl}}/zh-cn/ios/interstitial
[原生广告]:{{site.baseurl}}/zh-cn/ios/native