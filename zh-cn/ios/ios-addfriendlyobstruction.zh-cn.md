---
layout: "ios"
title: "iOS - addFriendlyObstruction"
lead: ""
description:
keywords: 'Keywords for this page, in the meta data'
permalink: /zh-cn/ios/addfriendlyobstruction/
lang: "zh-cn"
---
# 概览
---

为了确保每次的广告展示都有让广告素材确实露出，且符合 Interactive Advertising Bureau (IAB) 及 Media Rating Council (MRC) 提出的广告可视率标准，一般而言，Vpon SDK 不允许App 任何的view 以任何形式覆盖在 Vpon adview 之上。

考量到 App layout 设计所需，App 可能必须要透过透明或不可见的 view(s) 完成版面的设置。因此，Vpon 根据 OM (Open Measurement) SDK Framework 推出 addFriendlyObstruction 的新介面，在无法避免的状况下，您可以透过 addFriendlyObstruction 的介面，将`实作上必须存在且在视觉上不会影响广告展示的 view (alpha = 0, Hidden)` 设为 Friendly Obstruction。

本文将引导您完成 addFriendlyObstruction 的实作，请依您串接 SDK 的方式选择对应的说明。

* [直接串接 Vpon SDK 的设定方式]
* [透过 AdMob Mediation 的设定方式]
* [透过 MoPub Mediation 的设定方式]


## 直接串接 Vpon SDK 的设定方式 {#vponsdk}
---

* 本介面适用于 `Vpon SDK v5.1.7` 及以上版本

当 adview 因为被其它 view(s) 覆盖住而造成无法成功送出 Impression 时，您会看到类似以下的 Log 提示您覆盖住广告的 view(s)：

```
<VPON> [ERROR] [AD VIEWABILITY] 8a808182447617bf0144d414ff2a3db1: OnScreen ratio (2.67%) is not reach.
<VPON> [ERROR] [AD VIEWABILITY] 8a808182447617bf0144d414ff2a3db1: Visible ratio (40.00%) is not reach. Because: { OnScreen(100.00%) - Overlap(60.00%, <UIView: 0x10ec0d990; frame = (37.6667 465; 180 300); autoresize = RM+BM; layer = <CALayer: 0x283117a60>>) = 40.00%, }
```

请先根据以上 Log，确认覆盖住广告的 view(s) 是否可以进行调整，如果确实无法修改，请确认该 view 在视觉上不会影响广告展示 (alpha = 0, Hidden)，再参考以下范例，在建立 VpadnRequest 物件时，将该 view 设为Friendly Obstruction：


### Objective-C

```objc
VpadnAdRequest *request = [[VpadnAdRequest alloc] init];
[request addFriendlyObstruction:_obstructView purpose:VpadnFriendlyObstructionNotVisible description:@"not visible"];
// addFriendlyObstuction: insert the obstruction view that will be set as Friendly Obstruction
// purpose: define the purpose of Friendly Obstruction
// description: limit at 50 characters and characters contain only `A-z`,`0-9` or a space
```

### Swift

```swift
let request = VpadnAdRequest.init()
request.addFriendlyObstruction(_obstructView, purpose: .NotVisible, description: “not visible”)
// addFriendlyObstuction: insert the obstruction view that will be set as Friendly Obstruction
// purpose: define the purpose of Friendly Obstruction
// description: limit at 50 characters and characters contain only `A-z`,`0-9` or a space
```

设置完成后，请确认当广告露出在页面上并达到曝光标准后，有印出以下 Log 代表广告有成功曝光：

```
<VPON> [NOTE] Send impression successfully
```


## 透过 AdMob Mediation 的设定方式 {#admob}
---

* 本介面适用于 `Vpon SDK v5.1.7` 及以上版本
* 本介面适用于 `Vpon AdMob Adapter v2.0.2` 及以上版本

当 adview 因为被其它 view(s) 覆盖住而造成无法成功送出 Impression 时，您会看到类似以下的 Log 提示您覆盖住广告的 view(s)：

```
<VPON> [ERROR] [AD VIEWABILITY] 8a808182447617bf0144d414ff2a3db1: OnScreen ratio (2.67%) is not reach.
<VPON> [ERROR] [AD VIEWABILITY] 8a808182447617bf0144d414ff2a3db1: Visible ratio (40.00%) is not reach. Because: { OnScreen(100.00%) - Overlap(60.00%, <UIView: 0x10ec0d990; frame = (37.6667 465; 180 300); autoresize = RM+BM; layer = <CALayer: 0x283117a60>>) = 40.00%, }
```

请先根据以上 Log，确认覆盖住广告的 view(s) 是否可以进行调整，如果确实无法修改，请确认该 view 在视觉上不会影响广告展示 (alpha = 0, Hidden)，再参考以下范例，将该 view 设为 Friendly Obstruction。如果您请求的是横幅广告或插页广告：

### Objective-C

```objc
GADRequest *request = [GADRequest request];
GADExtras *extra = [[GADExtras alloc] init];
extra.additionalParameters = @{
    @"friendlyObstructions": @[@{ @"view": _obstructView, @"purpose": @(2), @"desc": @"not_visible"}]
};
[request registerAdNetworkExtras:extra];
// friendlyObstructions: insert the obstruction view that will be set as Friendly Obstruction
// purpose: define the purpose of Friendly Obstruction
// description: limit at 50 characters and characters contain only `A-z`,`0-9` or a space
```

### Swift

```swift
let extra = GADExtras()
extra.additionalParameters = [
    "friendlyObstructions": [["view": UIView(), "purpose": 2, "desc": "not_visible"]]
    ]
request.register(extra)
// friendlyObstructions: insert the obstruction view that will be set as Friendly Obstruction
// purpose: define the purpose of Friendly Obstruction
```

如果您请求的是原生广告，请先参考[透过 AdMob 串接 Vpon Native Ad] 完成自订事件设定，再参考以下范例，完成实作：

### Objective-C

```objc
GADRequest *request = [GADRequest request];
GADCustomEventExtras *extra = [[GADCustomEventExtras alloc] init];
extra.additionalParameters = @{
    @"friendlyObstructions": @[@{ @"view": _obstructView, @"purpose": @(2), @"desc": @"not_visible"}]
};
[request registerAdNetworkExtras:extra];
// friendlyObstructions: insert the obstruction view that will be set as Friendly Obstruction
// purpose: define the purpose of Friendly Obstruction
// description: limit at 50 characters and characters contain only `A-z`,`0-9` or a space
```

### Swift

```swift
let extra = GADCustomEventExtras()
extra.additionalParameters = [
    "friendlyObstructions": [["view": UIView(), "purpose": 2, "desc": "not_visible"]]
    ]
request.register(extra)
// friendlyObstructions: insert the obstruction view that will be set as Friendly Obstruction
// purpose: define the purpose of Friendly Obstruction
// description: limit at 50 characters and characters contain only `A-z`,`0-9` or a space
```

设置完成后，请确认当广告露出在页面上并达到曝光标准后，有印出以下 Log 代表广告有成功曝光：

```
<VPON> [NOTE] Send impression successfully
```


## 透过 MoPub Mediation 的设定方式 {#mopub}
---

* 本介面适用于 `Vpon SDK v5.1.7` 及以上版本
* 本介面适用于 `MoPub SDK v5.13.0` 及以上版本
* 本介面适用于 `Vpon MoPub Adapter v2.0.4` 及以上版本

当 adview 因为被其它 view(s) 覆盖住而造成无法成功送出 Impression 时，您会看到类似以下的 Log 提示您覆盖住广告的 view(s)：

```
<VPON> [ERROR] [AD VIEWABILITY] 8a808182447617bf0144d414ff2a3db1: OnScreen ratio (2.67%) is not reach.
<VPON> [ERROR] [AD VIEWABILITY] 8a808182447617bf0144d414ff2a3db1: Visible ratio (40.00%) is not reach. Because: { OnScreen(100.00%) - Overlap(60.00%, <UIView: 0x10ec0d990; frame = (37.6667 465; 180 300); autoresize = RM+BM; layer = <CALayer: 0x283117a60>>) = 40.00%, }
```

请先根据以上 Log，确认覆盖住广告的 view(s) 是否可以进行调整，如果确实无法修改，请确认该 view 在视觉上不会影响广告展示 (alpha = 0, Hidden)，再参考以下范例，将该 view 设为 Friendly Obstruction：

### Objective-C

```objc
// For Banner Ads
self.mpBannerView = [[MPAdView alloc] initWithAdUnitId:MOPUB_BANNER_ID];
self.mpBannerView.delegate = self;
self.mpBannerView.localExtras = @{
    @"friendlyObstructions": @[@{ @"view": _obstructView, @"purpose": @(2), @"desc": @"not_visible"}]
};
[self.mpBannerView loadAd];

// For Interstitial Ads
self.mpInterstitial = [MPInterstitialAdController interstitialAdControllerForAdUnitId:MOPUB_INTERSTITIAL_ID];
self.mpInterstitial.delegate = self;
self.mpInterstitial.localExtras = @{
    @"friendlyObstructions": @[@{ @"view": _obstructView, @"purpose": @(2), @"desc": @"not_visible"}]
};
[self.mpInterstitial loadAd];

// For Native Ads
MPNativeAdRequestTargeting *targeting = [MPNativeAdRequestTargeting targeting];
targeting.desiredAssets = [NSSet setWithObjects:kAdTitleKey, kAdTextKey, kAdCTATextKey, kAdIconImageKey, kAdMainImageKey, kAdStarRatingKey, nil];
targeting.localExtras = @{
    @"friendlyObstructions": @[@{ @"view": _obstructView, @"purpose": @(2), @"desc": @"not_visible"}]
};
adRequest.targeting = targeting;

// friendlyObstructions: insert the obstruction view that will be set as Friendly Obstruction
// purpose: define the purpose of Friendly Obstruction
// description: limit at 50 characters and characters contain only `A-z`,`0-9` or a space
```

### Swift

```swift
// For Banner Ads
mpBannerView = MPAdView(adUnitId: "e036eb60cb694fe7b987f1af41a76eb9")
mpBannerView.localExtras = [
    "friendlyObstructions": [["view": UIView(), "purpose": 2, "desc": "not_visible"]]
]
mpBannerView.delegate = self
mpBannerView.loadAd()

// For Interstitial Ads
mpInterstitial = MPInterstitialAdController(forAdUnitId: "848bf4d03e7b4fdda02be232f8e6b4d1")
mpInterstitial.localExtras = [
    "friendlyObstructions": [["view": UIView(), "purpose": 2, "desc": "not_visible"]]
]
mpInterstitial.delegate = self
mpInterstitial.loadAd()

// For Native Ads
let targeting = MPNativeAdRequestTargeting()
targeting?.localExtras = [
    "friendlyObstructions": [["view": UIView(), "purpose": 2, "desc": "not_visible"]]
]

// friendlyObstructions: insert the obstruction view that will be set as Friendly Obstruction
// purpose: define the purpose of Friendly Obstruction
// description: limit at 50 characters and characters contain only `A-z`,`0-9` or a space
```

设置完成后，请确认当广告露出在页面上并达到曝光标准后，有印出以下 Log 代表广告有成功曝光：

```
<VPON> [NOTE] Send impression successfully
```


## Purpose of Friendly Obstruction
---
以下为可以选择的 Friendly Obstruction 类型：

| Constant| Purpose |
|:--------|:--------|
| 0 | VpadnFriendlyObstructionMediaControls |
| 1 | VpadnFriendlyObstructionCloseAd |
| 2 | VpadnFriendlyObstructionNotVisible |
| 3 | VpadnFriendlyObstructionOther |



---
[直接串接 Vpon SDK 的设定方式]: {{ site.baseurl }}/zh-cn/ios/addfriendlyobstruction/#vponsdk
[透过 AdMob Mediation 的设定方式]: {{ site.baseurl }}/zh-cn/ios/addfriendlyobstruction/#admob
[透过 AdMob 串接 Vpon Native Ad]: {{ site.baseurl }}/zh-cn/ios/mediation/admob/#customevent
[透过 MoPub Mediation 的设定方式]: {{ site.baseurl }}/zh-cn/ios/addfriendlyobstruction/#mopub