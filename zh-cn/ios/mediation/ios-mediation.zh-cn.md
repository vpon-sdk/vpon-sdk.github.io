---
layout: "ios"
title: "iOS - 中介服务"
lead: ""
description:
keywords: 'Keywords for this page, in the meta data'
permalink: /zh-cn/ios/mediation/
lang: "zh-cn"
---
概要
---
透过中介服务，您的应用程式就能放送众多来源 (包括 AdMob 联播网、第三方广告联播网和内部广告活动) 的广告。

# 完成串接指示
---
若您尚未完成串接广告形式前的串接说明，请先前往[串接说明]完成相关设定，再透过 CocoaPods 将 Vpon AdMob Adapter 加入 App Project 中：

```
pod 'AdMobMediationAdapterVpadn'
```


# 支援的中介平台
---

| AdMob         | Ad Manager |
| :-----------: | :---------:|
| [![admob]][1] | [![dfp]][2]|




<!-- ## MoPub {#mopub}

若您是使用 MoPub 来进行 Mediation，请务必依据您使用的 MoPub SDK 版本选择对应的 Adapter 版本：


\#   | Vpon SDK | MoPub SDK | MoPub Adapter | 
|:--:|:--------:|:---------:|:-------------:|
1    | 5.1.1 ↑  | 5.12.0 ↓  | 2.0.2
|:--:|:--------:|:---------:|:-------------:|
2    | 5.1.1 ↑  | 5.13.0 ↑  | 2.0.3

若您串接的是横幅广告，请参考以下范例：

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

若您串接的是插页广告，请参考以下范例：

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

若您串接的是原生广告，请参考以下范例：

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


[串接说明]: ../integration-guide/

[admob]: {{site.imgurl}}/admob-logo2.png
[dfp]:   {{site.imgurl}}/GoogleAdManagerLogo.png
[mopub]: {{site.imgurl}}/mopub-logo.png
[smaato]: {{site.imgurl}}/smaato-logo.png

[1]: admob
[2]: dfp
[3]: mopub
[4]: smaato
[5]: {{site.baseurl}}/zh-cn/ios/mediation/#admob
[6]: {{site.baseurl}}/zh-cn/ios/mediation/#mopub
[download]: https://github.com/vpon-sdk/Vpon-mobile-ios-examples/tree/master/Adapter/AdMobAdapter