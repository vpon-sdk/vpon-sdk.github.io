---
layout:         "flutter"
title:          "Flutter - 横幅广告"
lead:           ""
description:    ""
keywords:       "Keywords for this page, in the meta data"
permalink:       /zh-cn/flutter/banner/
lang:           "zh-cn"
---

# 概览
---

本篇将说明如何透过 Vpon Flutter Plugin 串接横幅广告，您也可以在 [pub.dev] 查看我们的串接文件与 Plugin 讯息。

# 横幅广告串接
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

[pub.dev]: https://pub.dev/packages/vpon_mobile_ads/install