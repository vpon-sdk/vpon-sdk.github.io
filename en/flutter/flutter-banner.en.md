---
layout:         "flutter"
title:          "Flutter - Banner Ad"
lead:           ""
description:    ""
keywords:       "Keywords for this page, in the meta data"
permalink:       /flutter/banner/
lang:           "en"
---

# Overview
---

This guideline will instruct you to integrate Vpon Banner Ad with Vpon Flutter Plugin. You can alse check this guideline and the information about the plugin on [pub.dev].

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


[pub.dev]: https://pub.dev/packages/vpon_mobile_ads/install