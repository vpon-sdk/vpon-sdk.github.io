---
layout: "ios"
title: "iOS - addFriendlyObstruction"
lead: ""
description:
keywords: 'Keywords for this page, in the meta data'
permalink: /zh-tw/ios/addfriendlyobstruction/
lang: "zh-tw"
---
# 概覽
---

為了確保每次的廣告展示都有讓廣告素材確實露出，且符合 Interactive Advertising Bureau (IAB) 及 Media Rating Council (MRC) 提出的廣告可視率標準，一般而言，Vpon SDK 不允許 App 任何的 view 以任何形式覆蓋在 Vpon adview 之上。

考量到 App layout 設計所需，App 可能必須要透過透明或不可見的 view(s) 完成版面的設置。因此，Vpon 根據 OM (Open Measurement) SDK Framework 推出 addFriendlyObstruction 的新介面，在無法避免的狀況下，您可以透過 addFriendlyObstruction 的介面，將`實作上必須存在且在視覺上不會影響廣告展示的 view (alpha = 0, Hidden)` 設為 Friendly Obstruction。

本文將引導您完成 addFriendlyObstruction 的實作，請依您串接 SDK 的方式選擇對應的說明。

* [直接串接 Vpon SDK 的設定方式]
* [透過 AdMob Mediation 的設定方式]



## 直接串接 Vpon SDK 的設定方式 {#vponsdk}
---

* 本介面適用於 `Vpon SDK v5.1.7` 及以上版本

當 adview 因為被其它 view(s) 覆蓋住而造成無法成功送出 Impression 時，您會看到類似以下的 Log 提示您覆蓋住廣告的 view(s)：

```
<VPON> [ERROR] [AD VIEWABILITY] 8a808182447617bf0144d414ff2a3db1: OnScreen ratio (2.67%) is not reach.
<VPON> [ERROR] [AD VIEWABILITY] 8a808182447617bf0144d414ff2a3db1: Visible ratio (40.00%) is not reach. Because: { OnScreen(100.00%) - Overlap(60.00%, <UIView: 0x10ec0d990; frame = (37.6667 465; 180 300); autoresize = RM+BM; layer = <CALayer: 0x283117a60>>) = 40.00%, }
```

請先根據以上 Log，確認覆蓋住廣告的 view(s) 是否可以進行調整，如果確實無法修改，請確認該 view 在視覺上不會影響廣告展示 (alpha = 0, Hidden)，再參考以下範例，在建立 VpadnRequest 物件時，將該 view 設為 Friendly Obstruction：


### Objective-C

```objc
VpadnAdRequest *request = [[VpadnAdRequest alloc] init];
[request addFriendlyObstruction:_obstructView purpose:VpadnFriendlyObstructionTypeNotVisible description:@"not visible"];
// addFriendlyObstuction: insert the obstruction view that will be set as Friendly Obstruction
// purpose: define the purpose of Friendly Obstruction
// description: limit at 50 characters and characters contain only `A-z`,`0-9` or a space
```

### Swift

```swift
let request = VpadnAdRequest.init()
request.addFriendlyObstruction(obstructView, purpose: .notVisible, description: “not visible”)
// addFriendlyObstuction: insert the obstruction view that will be set as Friendly Obstruction
// purpose: define the purpose of Friendly Obstruction
// description: limit at 50 characters and characters contain only `A-z`,`0-9` or a space
```


設置完成後，請確認當廣告露出在頁面上並達到曝光標準後，有印出以下的 Log 代表廣告有成功曝光：

```
<VPON> [NOTE] Send impression successfully
```


## 透過 AdMob Mediation 的設定方式 {#admob}
---

* 本介面適用於 `Vpon SDK v5.1.7` 及以上版本
* 本介面適用於 `Vpon AdMob Adapter v2.0.2` 及以上版本

當 adview 因為被其它 view(s) 覆蓋住而造成無法成功送出 Impression 時，您會看到類似以下的 Log 提示您覆蓋住廣告的 view(s)：

```
<VPON> [ERROR] [AD VIEWABILITY] 8a808182447617bf0144d414ff2a3db1: OnScreen ratio (2.67%) is not reach.
<VPON> [ERROR] [AD VIEWABILITY] 8a808182447617bf0144d414ff2a3db1: Visible ratio (40.00%) is not reach. Because: { OnScreen(100.00%) - Overlap(60.00%, <UIView: 0x10ec0d990; frame = (37.6667 465; 180 300); autoresize = RM+BM; layer = <CALayer: 0x283117a60>>) = 40.00%, }
```

請先根據以上 Log，確認覆蓋住廣告的 view(s) 是否可以進行調整，如果確實無法修改，請確認該 view 在視覺上不會影響廣告展示 (alpha = 0, Hidden)，再參考以下範例，將該 view 設為 Friendly Obstruction。如果您請求的是橫幅廣告或插頁廣告：

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
// description: limit at 50 characters and characters contain only `A-z`,`0-9` or a space
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
// description: limit at 50 characters and characters contain only `A-z`,`0-9` or a space
```

如果您請求的是原生廣告，請先參考[透過 AdMob 串接 Vpon Native Ad] 完成自訂事件設定，再參考以下範例，完成實作：

### Objective-C

```objc
GADRequest *request = [GADRequest request];
GADCustomEventExtras *extra = [[GADCustomEventExtras alloc] init];
[extra setExtras:@{
    @"friendlyObstructions": @[@{ @"view": _obstructView, @"purpose": @(2), @'desc": @"not_visible"|]
} forLabel:@"Vpon"];
[request registerAdNetworkExtras:extra];
// friendlyObstructions: insert the obstruction view that will be set as Friendly Obstruction
// purpose: define the purpose of Friendly Obstruction
// description: limit at 50 characters and characters contain only `A-z`,`0-9` or a space
```

### Swift

```swift
let extra = GADCustomEventExtras()
extra.setExtras([
    "friendly Obstructions": [["view": UIView(), "purpose": 2, "desc": "not_visible"1] ], forLabel: "Vpon")
request.register(extra)
// friendlyObstructions: insert the obstruction view that will be set as Friendly Obstruction
// purpose: define the purpose of Friendly Obstruction
// description: limit at 50 characters and characters contain only `A-z`,`0-9` or a space
```

設置完成後，請確認當廣告露出在頁面上並達到曝光標準後，有印出以下的 Log 代表廣告有成功曝光：

```
<VPON> [NOTE] Send impression successfully
```


## Purpose of Friendly Obstruction
---
以下為可以選擇的 Friendly Obstruction 類型：

| Constant| Purpose |
|:--------|:--------|
| 0 | VpadnFriendlyObstructionMediaControls |
| 1 | VpadnFriendlyObstructionCloseAd |
| 2 | VpadnFriendlyObstructionNotVisible |
| 3 | VpadnFriendlyObstructionOther |



---
[直接串接 Vpon SDK 的設定方式]: {{ site.baseurl }}/zh-tw/ios/addfriendlyobstruction/#vponsdk
[透過 AdMob Mediation 的設定方式]: {{ site.baseurl }}/zh-tw/ios/addfriendlyobstruction/#admob
[透過 AdMob 串接 Vpon Native Ad]: {{ site.baseurl }}/zh-tw/ios/mediation/admob/#customevent
[透過 MoPub Mediation 的設定方式]: {{ site.baseurl }}/zh-tw/ios/addfriendlyobstruction/#mopub