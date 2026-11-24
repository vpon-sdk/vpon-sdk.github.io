---
layout:         "ios"
title:          "iOS - Mediation"
lead:           ""
description:    ""
keywords:       "Keywords for this page, in the meta data"
permalink:       ios/mediation/
lang:            "en"
---

# Overview
---
Mediation is a feature that lets you serve ads to your apps from multiple sources, including AdMob Network, third-party ad networks and house ad campaigns.


## Install Vpon AdMob Adapter (Swift Package Manager)
---
If you haven't finished the previous integration guide, please check all the [settings here](../integration-guide/).

Vpon AdMob Mediation Adapter is distributed via **Swift Package Manager**:

1. In Xcode, select **File > Add Package Dependencies…**
2. Enter the repository URL:
   ```
   https://github.com/vpon-sdk/AdMobMediationAdapterVpadn-iOS-SPM
   ```
3. Choose the version rule based on your app's minimum deployment target (see the compatibility table below):
   * **iOS 16.0+**: Select **Up to Next Major Version** starting at `3.0.0`.
   * **iOS 12.0 – 15.x**: Select **Up to Next Major Version** starting at `2.2.1`.
4. Add `-ObjC` to your App Target's **Build Settings > Other Linker Flags**.

The adapter automatically pulls in `VpadnSDKAdKit` and `GoogleMobileAds`. Do not mix Swift Package Manager and CocoaPods for these dependencies in the same project.

### Version Compatibility

| Adapter | Minimum iOS | VpadnSDK | Google Mobile Ads | Notes |
|:-------:|:-----------:|:--------:|:-----------------:|:------|
| **3.0.0** | 16.0 | 5.8.x (≥ 5.8.2) | 12.x – 13.x | Recommended for iOS 16+ apps. Upgrading from 2.2.x requires updating the SPM rule to start at `3.0.0`. |
| **2.2.1** | 12.0 | 5.8.0 | 12.x | For apps that still support iOS 12–15. |
| 2.2.0 | 12.0 | ≥ 5.7.6 | 12.x | Final version on CocoaPods. SPM users should upgrade to `2.2.1` or `3.0.0` to avoid resolving to a VpadnSDK version that requires iOS 16.0. |

> **Note (CocoaPods)**: Adapter `2.2.0` is the last version on CocoaPods; `2.2.1` and later are distributed via Swift Package Manager only. If you currently use `pod 'AdMobMediationAdapterVpadn'`, remove it from your `Podfile`, run `pod install`, and migrate to Swift Package Manager.


# Support Mediation Platforms
---

| AdMob         | Ad Manager |
| :-----------: | :---------:|
| [![admob]][1] | [![dfp]][2]|



<!-- ## MoPub {#mopub}

Please check your SDK and Adapter version first if you are using Mopub, the SDK and Adapter version must be:

\#   | Vpon SDK | MoPub SDK | MoPub Adapter | 
|:--:|:--------:|:---------:|:-------------:|
1    | 5.1.1 ↑  | 5.12.0 ↓  | 2.0.2
|:--:|:--------:|:---------:|:-------------:|
2    | 5.1.1 ↑  | 5.13.0 ↑  | 2.0.3


Please refer to the sample below if you are integrating Banner Ad:

### Objective-C

```objc
self.mpBannerView = [[MPAdView alloc] initWithAdUnitId:MOPUB_BANNER_ID];
self.mpBannerView.delegate = self;
self.mpBannerView.localExtras = @{
    @"contentURL": @"https://www.google.com.tw/",
    @"contentData": @{@"key1": @(1), @"key2": @(YES), @"key3": @"name", @"key4": @(123.31)}
    };
[self.mpBannerView loadAd];
// Set content page url and data with an array of key-value
```

### Swift

```swift
mpBannerView = MPAdView(adUnitId: MOPUB_BANNER_ID)
mpBannerView.localExtras = ["contentURL":"https://www.vpon.com", "contentData": ["key1": "Mopub", "key2": 1.2, "key3": true]]
mpBannerView.delegate = self
mpBannerView.loadAd()
// Set content page url and data with an array of key-value
```

Please refer to the sample below if you are integrating Interstitial Ad:

### Objective-C

```objc
self.mpInterstitial = [MPInterstitialAdController interstitialAdControllerForAdUnitId:MOPUB_INTERSTITIAL_ID];
self.mpInterstitial.delegate = self;
self.mpInterstitial.localExtras = @{
    @"contentURL": @"https://www.google.com.tw/",
    @"contentData": @{@"key1": @(1), @"key2": @(YES), @"key3": @"name", @"key4": @(123.31)}
    };
[self.mpInterstitial loadAd];
// Set content page url and data with an array of key-value
```

### Swift

```swift
mpInterstitial = MPInterstitialAdController(forAdUnitId: MOPUB_INTERSTITIAL_ID)
mpInterstitial.localExtras = ["contentURL":"https://www.vpon.com", "contentData": ["key1": "Mopub", "key2": 1.2, "key3": true]]
mpInterstitial.delegate = self
mpInterstitial.loadAd()
// Set content page url and data with an array of key-value
```


Please refer to the sample below if you are integrating Native Ad:

### Objective-C

```objc
MPNativeAdRequestTargeting *targeting = [MPNativeAdRequestTargeting targeting];
targeting.desiredAssets = [NSSet setWithObjects:kAdTitleKey, kAdTextKey, kAdCTATextKey, kAdIconImageKey, kAdMainImageKey, kAdStarRatingKey, nil];
targeting.localExtras = @{
    @"contentURL": @"https://www.google.com.tw/",
    @"contentData": @{@"key1": @(1), @"key2": @(YES), @"key3": @"name", @"key4": @(123.31)}
    };
adRequest.targeting = targeting;
// Set content page url and data with an array of key-value
```

### Swift

```swift
let targeting = MPNativeAdRequestTargeting()
targeting?.localExtras = ["contentURL":"https://www.vpon.com", "contentData": ["key1": "Mopub", "key2": 1.2, "key3": true]]
// Set content page url and data with an array of key-value
``` -->



[admob]: {{site.imgurl}}/admob-logo2.png
[dfp]:   {{site.imgurl}}/GoogleAdManagerLogo.png
[mopub]: {{site.imgurl}}/mopub-logo.png
[smaato]: {{site.imgurl}}/smaato-logo.png

[1]: admob
[2]: dfp
[3]: mopub
[4]: smaato
[5]: {{site.baseurl}}/ios/mediation/#admob
[6]: {{site.baseurl}}/ios/mediation/#mopub
[download]: https://github.com/vpon-sdk/Vpon-mobile-ios-examples/tree/master/Adapter/AdMobAdapter