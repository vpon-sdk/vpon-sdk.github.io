---
layout:         "android"
title:          "Android - Flutter"
lead:           ""
description:    ""
keywords:       "Keywords for this page, in the meta data"
permalink:       /zh-cn/android/flutter/
lang:           "zh-cn"
---


# 概览
---

本篇将说明如何透过 Vpon Flutter Plugin 串接 Vpon SDK，请根据您计划串接的广告类型完成串接

1. [引入及初始化 SDK](#initsdk)
2. [横幅广告串接](#banner)
3. [插页广告串接](#interstitial)

您也可以在 [pub.dev] 查看我们的串接文件与 Plugin 讯息。


>**Note:** 支援 Vpon SDK `Android v5.6.4` 及 `iOS v5.6.2` 以上版本。


# 引入及初始化 SDK {#initsdk}
---

## 引入 SDK
---

请透过以下指令加入 Vpon Flutter Plugin:

```
$ flutter pub add vpon_plugin_poc
```

确认在您专案的 pubspec.yaml 是否有加入以下 dependency:

```
dependencies:
  vpon_mobile_ads: ^0.0.1
```

## 初始化 SDK
---

请在请求广告之前，呼叫 `VponAdSDK.instance.initialize()` 完成 SDK 初始化：

```dart
import 'package:vpon_mobile_ads/vpon_ad_sdk.dart';

void main() {
  WidgetsFlutterBinding.ensureInitialized();
  VponAdSDK.instance.initialize();
  runApp(MyApp());
}
```

# 横幅广告串接 {#banner}
---

## 宣告 Banner Ad 物件
---

```dart
BannerAd? _bannerAd;
```

## 请求横幅广告
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

>**Note:** 您可以透过实作 `BannerAdListener` 来监听广告事件。

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