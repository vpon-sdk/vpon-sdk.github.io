---
layout:         "ios"
title:          "iOS - addFriendlyObstruction"
lead:           ""
description:    ""
keywords:       "Keywords for this page, in the meta data"
permalink:       ios/addfriendlyobstruction/
lang:            "en"

---
# Overview
---

To make sure the ad display successfully and meet the Advertising Viewability Standards created by Interactive Advertising Bureau (IAB) and Media Rating Council (MRC), Vpon SDK would not allow any views in the app cover the adview.

Since that it might be necessary for Publishers to construct their App layout via some transparent or invisible view(s), Vpon SDK release a new interface addFriendlyObstruction that base on OM (Open Measurement) SDK Framework. In some inevitable scenario, you can set up `the view(s) which is necessary for the App but but won't coever the ad visually (the attribute of the cover view should be alpha = 0, Hidden)` as Friendly Obstruction.

Please select the instruction base on the way you integrate Vpon SDK to finish the implementation of addFriendlyObstruction.

* [Integrate Vpon SDK Directly]
* [Integrate Vpon SDK Via AdMob]


## Integrate Vpon SDK Directly {#vponsdk}
---

* Available in `Vpon SDK v5.6.0` and above

When the ad can't send impression successfully after displayed since that the adview is cover by other view(s), you might see the log as below. This log will tell you the view(s) info which covered the adview.

```
<VPON> [ERROR] [AD VIEWABILITY] 8a808182447617bf0144d414ff2a3db1: OnScreen ratio (2.67%) is not reach.
<VPON> [ERROR] [AD VIEWABILITY] 8a808182447617bf0144d414ff2a3db1: Visible ratio (40.00%) is not reach. Because: { OnScreen(100.00%) - Overlap(60.00%, <UIView: 0x10ec0d990; frame = (37.6667 465; 180 300); autoresize = RM+BM; layer = <CALayer: 0x283117a60>>) = 40.00%, }
```

Please check the log above to see if the cover view(s) can be adjusted. If not, please make sure that the adview won't be covered by the view visually (the attribute of the cover view should be alpha = 0, Hidden) and follow the instruction below to set the view as Friendly Obstruction when you create VpadnRequest.


### Objective-C

```objc
VponAdRequest *request = [[VponAdRequest alloc] init];
[request addFriendlyObstruction:_obstructView purpose:VponFriendlyObstructionTypeNotVisible description:@"not visible"];

// addFriendlyObstuction: insert the obstruction view that will be set as Friendly Obstruction
// purpose: define the purpose of Friendly Obstruction
// description: limit at 50 characters and characters contain only `A-z`,`0-9` or a space
```

### Swift

```swift
let request = VponAdRequest()
request.addFriendlyObstruction(obstructView, purpose: .notVisible, description: “not visible”)

// addFriendlyObstuction: insert the obstruction view that will be set as Friendly Obstruction
// purpose: define the purpose of Friendly Obstruction
// description: limit at 50 characters and characters contain only `A-z`,`0-9` or a space
```

Please help to check if below log printed after you implement addFriendlyObstruction and the ad display on the screen:

```
<VPON> [NOTE] Send impression successfully
```


## Integrate Vpon SDK Via AdMob {#admob}
---

* Available in `Vpon SDK v5.1.7` and above
* Available in `Vpon AdMob Adapter v2.0.2` and above

When the ad can't send impression successfully after displayed since that the adview is cover by other view(s), you might see the log as below. This log will tell you the view(s) info which covered the adview.

```
<VPON> [ERROR] [AD VIEWABILITY] 8a808182447617bf0144d414ff2a3db1: OnScreen ratio (2.67%) is not reach.
<VPON> [ERROR] [AD VIEWABILITY] 8a808182447617bf0144d414ff2a3db1: Visible ratio (40.00%) is not reach. Because: { OnScreen(100.00%) - Overlap(60.00%, <UIView: 0x10ec0d990; frame = (37.6667 465; 180 300); autoresize = RM+BM; layer = <CALayer: 0x283117a60>>) = 40.00%, }
```

Please check the log above to see if the cover view(s) can be adjusted. If not, please make sure that the adview won't be covered by the view visually (the attribute of the cover view should be alpha = 0, Hidden) and follow the instruction below to set the view as Friendly Obstruction. If you are trying to request Banner Ad or Interstitial Ad:

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

If you are trying to request Native ad, please refer to [Integrate Vpon Native Ad via AdMob] to finish the setting of custom event first and follow the instruction below to set the view as Friendly Obstruction.

### Objective-C

```objc
GADRequest *request = [GADRequest  request];
GADCustomEventExtras *extra = [[GADCustomEventExtras  alloc] init];
[extra setExtras:@{
	@"friendlyObstructions": @[@{@"view": _obstructView, @"purpose": @(2), @"desc": @"not_visible"}]
} forLabel:@"Vpon"];
[request registerAdNetworkExtras:extra];

// friendlyObstructions: insert the obstruction view that will be set as Friendly Obstruction
// purpose: define the purpose of Friendly Obstruction
// description: limit at 50 characters and characters contain only `A-z`,`0-9` or a space
```

### Swift

```swift
let request = GADRequest()
let extra = GADCustomEventExtras()
extra.setExtras([
	"friendlyObstructions": [
			["view": UIView(), "purpose": 2, "desc": "not_visible"]
		]
	], forLabel: "Vpon")
request.register(extra)

// friendlyObstructions: insert the obstruction view that will be set as Friendly Obstruction
// purpose: define the purpose of Friendly Obstruction
// description: limit at 50 characters and characters contain only `A-z`,`0-9` or a space
```

Please help to check if below log printed after you implement addFriendlyObstruction and the ad display on the screen:

```
<VPON> [NOTE] Send impression successfully
```


## Purpose of Friendly Obstruction
---
Please refer to the table below for the type of Friendly Obstruction:

| Constant| Purpose |
|:--------|:--------|
| 0 | VpadnFriendlyObstructionMediaControls |
| 1 | VpadnFriendlyObstructionCloseAd |
| 2 | VpadnFriendlyObstructionNotVisible |
| 3 | VpadnFriendlyObstructionOther |



---
[Integrate Vpon SDK Directly]: {{ site.baseurl }}/ios/addfriendlyobstruction/#vponsdk
[Integrate Vpon Native Ad via AdMob]: {{ site.baseurl }}/ios/mediation/admob/#customevent
[Integrate Vpon SDK Via AdMob]: {{ site.baseurl }}/ios/addfriendlyobstruction/#admob
[Integrate Vpon SDK Via MoPub]: {{ site.baseurl }}/ios/addfriendlyobstruction/#mopub