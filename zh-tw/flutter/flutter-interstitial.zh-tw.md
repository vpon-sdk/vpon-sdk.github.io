---
layout:         "flutter"
title:          "Flutter - 插頁廣告"
lead:           ""
description:    ""
keywords:       "Keywords for this page, in the meta data"
permalink:       /zh-tw/flutter/interstitial/
lang:           "zh-tw"
---

# 概覽
---

本篇將說明如何透過 Vpon Flutter Plugin 串接插頁廣告。

您也可以在 [pub.dev] 查看我們的串接文件與 Plugin 訊息。


# 插頁廣告串接 {#interstitial}

## 宣告 Interstitial Ad 物件
--- 

```dart
InterstitialAd? _interstitialAd;
```

## 請求插頁廣告
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

>**Note:** 您可以透過實作 `InterstitialAdLoadCallback` 來監聽廣告事件。

## 展示插頁廣告
---

```dart
_interstitialAd.show();
```

[pub.dev]: https://pub.dev/packages/vpon_mobile_ads/install