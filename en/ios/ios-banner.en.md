---
layout:         "ios"
title:          "iOS - Banner Ad"
lead:           ""
description:    ""
keywords:       "Keywords for this page, in the meta data"
permalink:       ios/banner/
lang:            "en"
---
# Overview
---
Vpon Banner can be embedded to part of your app layout. It consists of a multimedia object which can attract user. The ads will expand to show much richer content after clicking.

<img src="{{site.imgurl}}/iOS_Banner_Sample.png" alt="" class="width-300"/>


# Prerequisites
---
Please make sure you've imported Vpon SDK to your Xcode project. If not, please refer to our [Integration Guide]({{site.baseurl}}/ios/integration-guide/) to finish your setting.

# Start To Implement Banner Ad
---
iOS apps are composed of UIView objects which will present as text area, buttons or other controllers. VponAdRequestView is simply an UIView subclass that can display small HTML5 ads trigger by users' touch.

Just like all the other UIView, a VpadnBanner is easy to implement in code.

1. Import VpadnSDKAdKit
2. Declare a VponBannerView instance
3. Initialize VponBannerView and indicate a License Key
4. Set up VponAdRequest object and send ad request
5. Set up Delegate protocol

We strongly recommend that you can finish all the steps in ViewController of the application.

## Import VpadnSDKAdKit And Declare A VponBannerView Instance
---

### Obejctive-C

```objc
// Import Vpon SDK
@import VpadnSDKAdKit;

@interface ViewController() <VponBannerViewDelegate>
@property (strong, nonatomic) VponBannerView *bannerView;
@property (weak, nonatomic) IBOutlet UIView *loadBannerView;

@end
```

### Swift

```swift
// Import Vpon SDK
import VpadnSDKAdKit

class VponSdkBannerViewController: UIViewController {
	var bannerView: VponBannerView?
	@IBOutlet weak var loadBannerView: UIView!
}
```

## Initialize VponBannerView Object And Indicate A License Key
---
Please refer to the code snippet below to initialize Banner Ad in viewDidLoad of ViewController.

### Objective-C

```objc
// initWithAdSize: The Banner Ad size that will be displayed
_bannerView = [[VponBannerView alloc]initWithAdSize:[VponAdSize banner]];
// licenseKey: Vpon License Key to get ad, please replace with your own one
_bannerView.licenseKey = @"License Key";

// Only available for Banner Ad, will auto refresh ad if set YES
_bannerView.autoRefresh = NO;

_bannerView.rootViewController = self;
_bannerView.delegate = self;
```

### Swift

``` swift
// adSize: The Banner Ad size that will be displayed
bannerView = VponBannerView(adSize: .banner())
// licenseKey: Vpon License Key to get ad, please replace with your own one
bannerView?.licenseKey = "License Key"

// Only available for Banner Ad, will auto refresh ad if set true
bannerView?.autoRefresh = false

bannerView?.rootViewController = self
bannerView?.delegate = self
```


## Set Up VponAdRequest and Send Ad Request
---
Set up VponAdRequest before you send ad request:

### Objective-C

```objc
VponAdRequest *request = [[VponAdRequest alloc] init];
// Set your test device's IDFA here if you're trying to get Vpon test ad
VponAdRequestConfiguration *config = VponAdRequestConfiguration.shared;
[config setTestDeviceIdentifiers:@[[ASIdentifierManager sharedManager].advertisingIdentifier.UUIDString]];

// Start to load ad
[_bannerView load: request];
```

### Swift

```swift
let request = VponAdRequest()
// Set your test device's IDFA here if you're trying to get Vpon test ad
VponAdRequestConfiguration.shared.testDeviceIdentifiers = ([ASIdentifierManager.shared().advertisingIdentifier.uuidString])

// Start to load ad
bannerView?.load(request)
```

>**Note:**
>
>* Besides of setting up VponAdRequest for each ad type, you can also set up a general VpadnRequest for all types of ad.
>* If you want to know more about target setting, please refer to [Advanced Setting](../advanced).

## Set Up Delegate Protocol
---
After finishing ad request, implement the delegate protocol as below to listen ad status.

### Objective-C

```objc
- (void)bannerViewDidReceiveAd:(VponBannerView *)bannerView {
	// Invoked if receive Banner Ad successfully
	// Add ad view to your layout
	bannerView.translatesAutoresizingMaskIntoConstraints = NO;
	[self.loadBannerView addSubview:bannerView];
	[NSLayoutConstraint activateConstraints:@[
		[bannerView.centerXAnchor constraintEqualToAnchor: _loadBannerView.centerXAnchor],
		[bannerView.centerYAnchor constraintEqualToAnchor: _loadBannerView.centerYAnchor]
	]];
}

- (void)bannerView:(VponBannerView *)bannerView didFailToReceiveAdWithError:(NSError *)error {
	// Invoked if received ad fail, check this callback to indicates what type of failure occurred
}

- (void)bannerViewDidRecordImpression:(VponBannerView *)bannerView {
	// Invoked if an impression has been recorded for an ad.
}

- (void)bannerViewDidRecordClick:(VponBannerView *)bannerView {
	// Invoked if an click has been recorded for an ad.
}
```

### Swift

```swift
func bannerViewDidReceiveAd(_ bannerView: VponBannerView) {
	// Invoked if receive Banner Ad successfully
	// Add ad view to your layout
	bannerView.translatesAutoresizingMaskIntoConstraints = false
	loadBannerView.addSubview(bannerView)
	NSLayoutConstraint.activate([
		bannerView.centerXAnchor.constraint(equalTo: loadBannerView.centerXAnchor),
		bannerView.centerYAnchor.constraint(equalTo: loadBannerView.centerYAnchor)
	])
}

func bannerView(_ bannerView: VponBannerView, didFailToReceiveAdWithError error: Error) {
	// Invoked if received ad fail, check this callback to indicates what type of failure occurred
}

func bannerViewDidRecordImpression(_ bannerView: VponBannerView) {
	// Invoked if an impression has been recorded for an ad.
}

func bannerViewDidRecordClick(_ bannerView: VponBannerView) {
	// Invoked if an click has been recorded for an ad.
}
```

# Banner Format
---
Besides the 320x50, Vpon supports the following ad formats:

Size (WxH)                 |Description             |  VponAdSize Constant           | Devices
:------------------------: | :---------------------:| :-----------------------------:|:-----------:
320x50                     | Standard Banner        | banner              |iPhone<br>iPad
468x60                     | IAB Full-Size Banner   | fullBanner          |iPad
728x90                     | IAB  Leaderboard       | leaderBoard         |iPad
300x250                    | IAB Medium Recangle    | mediumRectangle     |iPhone<br>iPad
320x480                    | Large Rectangle Banner | largeRectangle      |iPhone<br>iPad


Besides, you can all use VponAdSize as the parameter of `VponBannerView`: 

### Objective-C

```objc
_bannerView = [[VponBannerView alloc] initWithAdSize:[VponAdSize mediumRectangle]];
```

### Swift

```swift
bannerView = VponBannerView(adSize: .mediumRectangle())
```
<!-- 320x100                    | Large Banner           | VpadnAdSizeLARGEBANNER         |iPhone<br>iPad -->
<!-- device width x auto height | Custom Banner Size     | VpadnAdSizeFromCGSize | iPhone<br>iPad -->

<!-- We recommend that you can use `VpadnAdSizeFromCGSize` as following example:

```objc
vpadnBanner = [[VpadnBanner alloc] initWithAdSize:VpadnAdSizeFromCGSize(self.loadBannerView.frame.size) origin:CGPointZero];
``` -->

# Tips
---

### Make Sure If The Ad Display Successfully

Please note that following settings which might cause the ad invisible on the screen are not allowed:

* Set AdView as Hidden
* Set the Alpha value of AdView < 1.0
* Overlays that cover the AdView


Please help to check if below log printed after the ad display and match the viewability standard:

```
<VPON> [NOTE] Send impression successfully
```


### Sample Code
Please refer to our [Sample Code] for a complete integration sample.

### Integration Guide For The Version Below Vpon SDK v5.6.0
Please refer to [Banner Ad Integration Guide](../banner-under560) if you want to know more about the integration that compatible with the Vpon SDK version below v5.5.0.

[Sample Code]: ../download/
[iOS9 ATS]: ../latest-news/ios9ats/
