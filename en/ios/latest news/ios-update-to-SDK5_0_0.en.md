---
layout: "ios"
title: "How To Update To Vpon SDK v5.0.2"
lead: ""
description:
keywords: 'Keywords for this page, in the meta data'
permalink: /ios/latest-news/update-to-SDK5_0_2/
lang: "en"
---

# Overview
---
Here are the major changes in SDK v5.0.2:

* Replace Cordova framework with self-maintenance Javascript for communicating
* Replace UIWebView with WKWebView
* Revise the interface of Banner / Interstitial / Native Ad
* Revise the framework to make it more compatible with 3rd-party tracking solution
* Support mraid3 when display Banner and Interstitial Ad

# System Requirement
---

* Support iOS 9.0 and above version, super recommend to deploy on iOS 10.0 and above version
* Recommend to develop on Xcode 11 and above version


# Difference Between SDK v4 and v5
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


# How To Check Current Version
---
You can find the log in your Xcode Console:

```
<VPON> [INFO] SDK Version: v5.0.2
<VPON> [INFO] Build Date: 20200203
```


# How To Update To SDK v5.0.2
---
Since that the SDK v5.0.2 is backward compatible, you don't have to apply any code change if you are going to update the it.

> **Note:** You will see some warnings to instruct you how to migrate to SDK v5.0.2 in your Xcode if you already updated the SDK. Please verify if you can request and display ad successfully after your update.
>
> If you are trying to migrate your intergration with new interface, please refer to :
>
> * [Banner Ad]
> * [Interstitial Ad]
> * [Native Ad]


You can update SDK with following two ways:

* [Update SDK with Cocoapods](#cocoapods)
* [Download and update SDK manually](#manual-sdk)

## Update SDK With Cocoapods {#cocoapods}
---
Please follow the instruction below to add target version in your Podfile:

```
pod 'VpadnSDK', '~> 5.0.2’
```

>**Note:** If you can't update to the latest version, please update your Pod Spec with `pod repo update` first.


## Download And Update SDK Manually {#manual-sdk}
---
[Download the latest SDK here][1].



[1]:{{ site.baseurl }}/ios/download/
[Banner Ad]:{{site.baseurl}}/ios/banner
[Interstitial Ad]:{{site.baseurl}}/ios/interstitial
[Native Ad]:{{site.baseurl}}/ios/native