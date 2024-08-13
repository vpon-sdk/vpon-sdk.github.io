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
若您尚未完成串接广告形式前的串接说明，请先前往[串接说明]完成相关设定，并由以下连结下载 Vpon Adapter，将其加入 App Project 中：

| Mediation Platform | Adapter | Compatible SDK Version|
|:------------------:|:-------:|:---:|
| AdMob <br> Google Ad Manager <br> (v2.1.1) | [download] | Vpon SDK 5.6.0 ↑ <br> GMA SDK 10.14.0 ↑ | 

# 支援的中介平台
---

| AdMob         | Ad Manager |
| :-----------: | :---------:|
| [![admob]][1] | [![dfp]][2]|


# 透过 Mediation 回传内容资讯
---
如果您是使用 Mediation 的方式来串接 Vpon SDK，您可以透过以下方式，将页面内容资讯发给 Vpon：

* [AdMob / Google Ad Manager][5]
* [MoPub][6]

## AdMob / Google Ad Manager {#admob}

若您是使用 AdMob / Google Ad Manager 来进行 Mediation，请确认您所使用的 SDK 及 Adapter 版本：

* `Vpon SDK v5.6.0` 及以上版本
* `Vpon AdMob Adapter v2.1.0` 及以上版本


若您串接的是横幅广告或插页广告，请参考以下范例：

### Objective-C

```objc
GADRequest *request = [GADRequest request];
GADExtras *extra = [[GADExtras alloc] init];
 extra.additionalParameters = @{
    @"contentURL": @"https://www.vpon.com",
    @"contentData": @{@"key1": @"Admob", @"key2": @(1.2), @"key3": @(YES)}
    };
[request registerAdNetworkExtras:extra];
// Set content page url and data with an array of key-value
```

### Swift

```swift
let extra = GADExtras()
extra.additionalParameters = ["contentURL":"https://www.vpon.com", "contentData": ["key1": "Admob", "key2": 1.2, "key3": true]]
request.register(extra)
// Set content page url and data with an array of key-value
```

若您串接的是原生广告，请留意在您设定自订事件时所设置的 Label，并参考以下范例传入对应资料：

<img src="{{site.imgurl}}/AdMob_ContentLabel01.PNG" alt=""/>
<!-- <img src="{{site.imgurl}}/AdMob_ContentLabel02.PNG" alt=""/> -->


### Objective-C

```objc
GADRequest *request = [GADRequest request];
GADCustomEventExtras *extra = [[GADCustomEventExtras alloc] init];
[extra setExtras:@{
       	@"contentURL": @"https://www.google.com.tw/",
        @"contentData": @{@"key1": @(1), @"key2": @(YES), @"key3": @"name", @"key4": @(123.31)}
    	} forLabel:@"vpon"];
[request registerAdNetworkExtras:extra];
// Set content page url and data with an array of key-value
// forLabel string must be the same as the one you set for AdMob / GAM custom event
```

### Swift

```swift
let extra = GADCustomEventExtras()
extra.setExtras(["contentURL":"https://www.vpon.com", "contentData": ["key1": "Admob", "key2": 1.2, "key3": true]], forLabel: "Vpon")
request.register(extra)
// Set content page url and data with an array of key-value
// forLabel string must be the same as the one you set for AdMob / GAM custom event
```

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