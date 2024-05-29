---
layout:         "flutter"
title:          "Flutter - 插页广告"
lead:           ""
description:    ""
keywords:       "Keywords for this page, in the meta data"
permalink:       /zh-cn/flutter/interstitial/
lang:           "zh-cn"
---

# 概览
---

本篇将说明如何透过 Vpon Flutter Plugin 串接插页广告，您也可以在 [pub.dev] 查看我们的串接文件与 Plugin 讯息。


# 插页广告串接 {#interstitial}

## 宣告 Interstitial Ad 物件
---

```dart
InterstitialAd? _interstitialAd;
```

## 请求插页广告
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

>**Note:** 您可以透过实作 `InterstitialAdLoadCallback` 来监听广告事件。

## 展示插页广告
---

```dart
_interstitialAd.show();
```

[pub.dev]: https://pub.dev/packages/vpon_mobile_ads/install