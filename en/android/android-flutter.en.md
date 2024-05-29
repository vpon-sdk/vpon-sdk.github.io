---
layout:         "android"
title:          "Android - Flutter"
lead:           ""
description:    ""
keywords:       "Keywords for this page, in the meta data"
permalink:       android/flutter/
lang:           "en"
---
# Overview
---

This guideline will instruct you to integrate Vpon SDK with Vpon Flutter Plugin. Please follow the steps below to finish your integration.

1. [Import and Initialize SDK](#initsdk)
2. [Banner Ad Implementation](#banner)
3. [Insterstitial Ad Implementation](#interstitial)

You can alse check this guideline and the information about the plugin on [pub.dev].

>**Note:** Support Vpon SDK `Android v5.6.4` and `iOS v5.6.2` above.


# Import and Initialize SDK {#initsdk}
---

## Import SDK
---

Add Vpon Flutter Plugin with below command:

```
$ flutter pub add vpon_plugin_poc
```

Check your package's pubspec.yaml to see if below dependency added:

```
dependencies:
  vpon_mobile_ads: ^0.0.1
```

## Initialize SDK
---

Please initialize Vpon SDK by calling `VponAdSDK.instance.initialize()` before loading ads:

```dart
import 'package:vpon_mobile_ads/vpon_ad_sdk.dart';

void main() {
  WidgetsFlutterBinding.ensureInitialized();
  VponAdSDK.instance.initialize();
  runApp(MyApp());
}
```

# Banner Ad Implementation {#banner}
---

## Declare a Banner Ad Object
---

```dart
BannerAd? _bannerAd;
```

## Load Banner Ad 
---

```dart
void _loadBannerAd() async {
    await _bannerAd?.dispose();
    setState(() {
    _bannerAd = null;
    });

    String key = 'Your License Key';
    VponAdRequest request = VponAdRequest();

    _bannerAd = BannerAd(
        licenseKey: key,
        size: BannerAdSize.banner,
        request: request,
        autoRefresh: false,
        listener: BannerAdListener(
            onAdLoaded: (Ad ad) async {
            BannerAd bannerAd = (ad as BannerAd);
                setState(() {
                    _bannerAd = bannerAd;
                    adWidgetKey = UniqueKey();
                });
            },
            onAdFailedToLoad: (Ad ad, Map error) {
                ad.dispose();
            },
            onAdImpression: (Ad ad) {
                // handle impression
            },
            onAdClicked: (Ad ad) {
                // handle click
            },
        ),
    );
    await _bannerAd?.load();
}
```

>**Note:** You can listen to ad events by implementing `BannerAdListener`.

## Vpon Banner Size
---
Vpon supports following Banner sizes:

|      Size (WxH)            | Description    |  VponAdSize Constant            |
  :------------------------: | :-------------:| :-----------------------------:
  320x50                     | Standard Banner| banner
  320x100                    | Large Banner   | largeBanner
  300x250                    |IAB Medium Rectangle| mediumRectangle
  320x480                    | Large Rectangle Banner| largeRectangle
  468x60                     |IAB Full-Size Banner| fullBanner
  728x90                     | IAB Leaderboard|  leaderBoard

# Interstitial Ad Implementation {#interstitial}

## Declare a Interstitial Ad Object
--- 

```dart
InterstitialAd? _interstitialAd;
```

## Load Interstitial Ad 
---

```dart
 void _loadInterstitialAd() {
    VponAdRequest request = VponAdRequest();

    InterstitialAd.load(
        licenseKey: 'Your license key',
        request: request,
        adLoadCallback: InterstitialAdLoadCallback(
            onAdLoaded: (InterstitialAd ad) {
                _interstitialAd = ad;
            },
            onAdFailedToLoad: (Map error) {
                _interstitialAd = null;
            },
            onAdImpression: (InterstitialAd ad) {
                // handle impression
            },
            onAdClicked: (InterstitialAd ad) {
                // handle click
            },
            onAdWillDismissFullScreenContent: (InterstitialAd ad) {
                // handle callback
            },
            onAdDismissedFullScreenContent: (InterstitialAd ad) {
                // handle callback
            },
            onAdWillShowFullScreenContent: (InterstitialAd ad) {
                // handle callback
            },
        ),
    );
  }
```

>**Note:** You can listen to ad events by implementing `InterstitialAdLoadCallback`.

## Show Interstitial Ad
---

```dart
_interstitialAd.show();
```

[pub.dev]: https://pub.dev/packages/vpon_mobile_ads/install