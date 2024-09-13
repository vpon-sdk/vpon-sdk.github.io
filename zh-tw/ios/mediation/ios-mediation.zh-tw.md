---
layout: "ios"
title: "iOS - 中介服務"
lead: ""
description:
keywords: 'Keywords for this page, in the meta data'
permalink: /zh-tw/ios/mediation/
lang: "zh-tw"
---
# 概要
---
透過中介服務，您的應用程式就能放送眾多來源 (包括 AdMob 聯播網、第三方廣告聯播網和內部廣告活動) 的廣告。

# 完成串接指示
---
若您尚未完成串接廣告形式前的串接說明，請先前往[串接說明]完成相關設定，並由以下連結下載 Vpon Adapter，將其加入 App Project 中：

| Mediation Platform | Adapter | Compatible SDK Version|
|:------------------:|:-------:|:---:|
| AdMob <br> Google Ad Manager <br> (v2.1.1) | [download] | Vpon SDK 5.6.0 ↑ <br> GMA SDK 10.14.0 ↑ | 

# 支援的中介平台
---

| AdMob         | Ad Manager |
| :-----------: | :---------:|
| [![admob]][1] | [![dfp]][2]|




<!-- ## MoPub {#mopub}

若您是使用 MoPub 來進行 Mediation，請務必依據您使用的 MoPub SDK 版本選擇對應的 Adapter 版本：


\#   | Vpon SDK | MoPub SDK | MoPub Adapter | 
|:--:|:--------:|:---------:|:-------------:|
1    | 5.1.1 ↑  | 5.12.0 ↓  | 2.0.2
|:--:|:--------:|:---------:|:-------------:|
2    | 5.1.1 ↑  | 5.13.0 ↑  | 2.0.3

若您串接的是橫幅廣告，請參考以下範例：

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

若您串接的是插頁廣告，請參考以下範例：

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

若您串接的是原生廣告，請參考以下範例：

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



[串接說明]: ../integration-guide/

[admob]: {{site.imgurl}}/admob-logo2.png
[dfp]:   {{site.imgurl}}/GoogleAdManagerLogo.png
[mopub]: {{site.imgurl}}/mopub-logo.png
[smaato]: {{site.imgurl}}/smaato-logo.png

[1]: admob
[2]: dfp
[3]: mopub
[4]: smaato
[5]: {{site.baseurl}}/zh-tw/ios/mediation/#admob
[6]: {{site.baseurl}}/zh-tw/ios/mediation/#mopub
[download]: https://github.com/vpon-sdk/Vpon-mobile-ios-examples/tree/master/Adapter/AdMobAdapter