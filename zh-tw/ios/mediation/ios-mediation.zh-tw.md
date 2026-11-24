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

# 安裝 Vpon AdMob Adapter（Swift Package Manager）
---
若您尚未完成串接廣告形式前的串接說明，請先前往[串接說明]完成相關設定。

Vpon AdMob 中介 Adapter 透過 **Swift Package Manager** 發佈：

1. 在 Xcode 選單選擇 **File > Add Package Dependencies…**
2. 輸入套件網址：
   ```
   https://github.com/vpon-sdk/AdMobMediationAdapterVpadn-iOS-SPM
   ```
3. 依您的 App 最低支援版本選擇版本規則（詳見下方版本相容表）：
   * **最低支援 iOS 16.0 以上**：選擇 **Up to Next Major Version**，從 `3.0.0` 開始。
   * **仍需支援 iOS 12.0 – 15.x**：選擇 **Up to Next Major Version**，從 `2.2.1` 開始。
4. 在 App Target 的 **Build Settings > Other Linker Flags** 加入 `-ObjC`。

Adapter 會自動帶入 `VpadnSDKAdKit` 與 `GoogleMobileAds`。請勿在同一專案中混用 Swift Package Manager 與 CocoaPods 安裝這些套件。

### 版本相容表

| Adapter | 最低 iOS | VpadnSDK | Google Mobile Ads | 備註 |
|:-------:|:--------:|:--------:|:-----------------:|:-----|
| **3.0.0** | 16.0 | 5.8.x（≥ 5.8.2） | 12.x – 13.x | 建議 iOS 16+ App 使用；從 2.2.x 升級需手動將版本規則改為從 `3.0.0` 開始。 |
| **2.2.1** | 12.0 | 5.8.0 | 12.x | 適用於仍需支援 iOS 12–15 的 App。 |
| 2.2.0 | 12.0 | ≥ 5.7.6 | 12.x | CocoaPods 最終版本。SPM 使用者請改用 `2.2.1` 或 `3.0.0`，避免解析到需要 iOS 16.0 的 VpadnSDK 而導致建置失敗。 |

> **Note（CocoaPods 說明）**：`2.2.0` 為 CocoaPods 上的最終版本，`2.2.1` 起僅透過 Swift Package Manager 發佈。若專案目前使用 `pod 'AdMobMediationAdapterVpadn'`，請先從 `Podfile` 移除並執行 `pod install`，再改用 Swift Package Manager 安裝。


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