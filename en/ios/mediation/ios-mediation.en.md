---
layout:         "ios"
title:          "iOS - Mediation"
lead:           ""
description:    ""
keywords:       "Keywords for this page, in the meta data"
permalink:       ios/mediation/
lang:            "en"
---

## Finished Integration Guide
---
If you haven't finished the previous integration guide, please check all the [settings here](../integration-guide/).

# Overview
---
Mediation is a feature that lets you serve ads to your apps from multiple sources, including AdMob Network, Mopub Network, third-party ad networks and house ad campaigns.


# Mediation Platforms
---

| AdMob         | Ad Manager |
| :-----------: | :---------:|
| [![admob]][1] | [![dfp]][2]|



# Send Content Data To Vpon Via Mediation
---
Please follow the instruction below to send the content information to Vpon if you are trying to integrate Vpon SDK with below Mediation Platforms:

* [AdMob / Google Ad Manager][5]
* [MoPub][6]

## AdMob / Google Ad Manager {#admob}

Please check your SDK and Adapter version first if you are using AdMob / Google Ad Manager, the SDK and Adapter version must be:

* `Vpon SDK v5.6.0` and above
* `Vpon AdMob Adapter v2.1.0` and above


Please refer to the sample below if you are integrating Banner Ad or Interstitial Ad:

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

For Native Ad, please note the Label you set for the custom event and refer to the sample below to integrate the ads:

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
extra.setExtras(["contentURL":"https://www.vpon.com", "contentData": ["key1": "Admob", "key2": 1.2, "key3": true]], forLabel: "vpon")
request.register(extra)
// Set content page url and data with an array of key-value
// forLabel string must be the same as the one you set for AdMob / GAM custom event
```

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