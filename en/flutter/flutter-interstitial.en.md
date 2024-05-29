---
layout:         "flutter"
title:          "Flutter - Interstitial Ad"
lead:           ""
description:    ""
keywords:       "Keywords for this page, in the meta data"
permalink:       /flutter/interstitial/
lang:           "en"
---

# Overview
---

This guideline will instruct you to integrate Vpon Interstitial Ad with Vpon Flutter Plugin. You can alse check this guideline and the information about the plugin on [pub.dev].

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