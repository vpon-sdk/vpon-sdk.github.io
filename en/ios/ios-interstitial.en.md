---
layout:         "ios"
title:          "iOS - Interstitial Ad"
lead:           ""
description:    ""
keywords:       "Keywords for this page, in the meta data"
permalink:       ios/interstitial/
lang:            "en"
---

# Overview
---
Interstitials, on the other hand, immediately present rich HTML5 experiences or "web apps" at natural app transition points such as launch, video pre-roll or game level load. Web apps are in-app browsing experiences with a simple close button rather than any navigation bar—the content provides its own internal navigation scheme. Interstitial ads are typically more expensive and subject to impression constraints.
![]({{site.imgurl}}/Interstitial.png)

> **Note**:
> We recommend that the interstitial ads display in portrait mode for the best visual effects.

# Prerequisites
---
Please make sure you've imported Vpon SDK to your Xcode project. If not, please refer to our [Integration Guide]({{site.baseurl}}/ios/integration-guide/) to finish your setting.


# Start To Implement Interstitial Ad
---
Please follow the guideline below to implement Interstitial Ad:

1. Import VpadnSDKAdKit
2. Declare a VponInterstitialAd instance
3. Set up VponAdRequest object
4. Use VponInterstitialAd static method to request ad
5. Show interstitial ad
6. Set up Delegate protocol

We strongly recommend that you can finish all the steps in ViewController of the application.

## Import VpadnSDKAdKit And Declare A VponInterstitialAd Instance
---

### Objective-C

```objc
// Import Vpon SDK
@import VpadnSDKAdKit;

@interface ViewController() <VponFullScreenContentDelegate>
@property (strong, nonatomic) VponInterstitialAd *vponInterstitial;

@end
```

## Swift

```swift
// Import Vpon SDK
import VpadnSDKAdKit

class VponSdkInterstitialViewController: UIViewController {
    var interstitialAd: VponInterstitialAd?
}
```


## Set Up VponAdRequest Object
---
Set up VpadnAdRequest before you send ad request:

### Objective-C

```objc
VponAdRequest *request = [[VponAdRequest alloc] init];

// Set your test device's IDFA here if you're trying to get Vpon test ad
[VponAdRequestConfiguration.shared setTestDeviceIdentifiers:@[[ASIdentifierManager sharedManager].advertisingIdentifier.UUIDString]];
```

### Swift

```swift
let request = VponAdRequest()

// Set your test device's IDFA here if you're trying to get Vpon test ad
VponAdRequestConfiguration.shared.testDeviceIdentifiers = ([ASIdentifierManager.shared().advertisingIdentifier.uuidString])
```

>**Note:**
>
>* Besides of setting up VponAdRequest for each ad type, you can also set up a general VponAdRequest for all types of ad.
>* If you want to know more about target setting, please refer to [Advanced Setting](../advanced).

## Use VponInterstitialAd Static Method To Request Ad
---

Call `VponInterstitialAd` static function `load` to send ad request. And handle `VponInterstitialAd` or error in completion callback.

### Objective-C

```objc
[VponInterstitialAd loadWithLicenseKey:@"License Key"
					request:request
					completion:^(VponInterstitialAd *interstitial, NSError *error){
	if (error != nil) {
		NSLog(@"Failed to load ad with error: %@", error.localizedDescription);
		return;
	}
	self.interstitial = interstitial;
	self.interstitial.delegate = self;
}];
```

### Swift

```swift
VponInterstitialAd.load(licenseKey: "License Key", request: request) { [weak self] (ad, error) in
	if let error {
		print("Failed to load ad with error: \(error.localizedDescription)")
		return
	}
	if let ad {
		self?.interstitial = ad
		self?.interstitial?.delegate = self
	}
}
```


## Show Interstitial Ad
---
You can only show the interstitial ad after ad initializaion and ad receviced. For example, display ad when onVpadnInterstitialAdReceived triggered.


### Objective-C

```objc
if (_interstitial != nil) {
	[_interstitial presentFromRootViewController:self];
}
```

### Swift

```swift
if let interstitial {
	interstitial.present(fromRootViewController: self)
}
```

> **Note:** In order to optimize user experience, we recommend that you can load an ad first. Hold it until a certain event to triggered. Avoid showing interstitial ad immediately while getting it.



## Set Up Delegate Protocol
---
After finishing ad request, implement the delegate protocol as below to listen ad status.

### Objective-C

```objc
[VponInterstitialAd loadWithLicenseKey:@"License Key"
							   request:request
							completion:^(VponInterstitialAd *interstitial, NSError *error) {
	self.interstitial = interstitial;
	self.interstitial.delegate = self;
}];

// MARK: - VponFullScreenContentDelegate
- (void)adWillPresentScreen:(id<VponFullScreenContentAd>)ad {
	// Ad will present full screen content
}

- (void)ad:(id<VponFullScreenContentAd>)ad didFailToPresentFullScreenContentWithError:(NSError *)error {
	// Ad did fail to present full screen content
}

- (void)adWillDismissScreen:(id<VponFullScreenContentAd>)ad {
	// Ad will dismiss full screen content
}

- (void)adDidDismissScreen:(id<VponFullScreenContentAd>)ad {
	// Ad did dismiss full screen content
}

- (void)adDidRecordImpression:(id<VponFullScreenContentAd>)ad {
	// Ad did record an impression
}

- (void)adDidRecordClick:(id<VponFullScreenContentAd>)ad {
	// Ad did record a click
}
```

### Swift

```swift
VponInterstitialAd.load(licenseKey: "License Key", request: request) { [weak self] (ad, error) in
	self?.interstitial = ad
	self?.interstitial?.delegate = self
}

// MARK: - VponFullScreenContentDelegate
func adWillPresentScreen(_ ad: VponFullScreenContentAd) {
	// Ad will present full screen content
}

func ad(_ ad: VponFullScreenContentAd, didFailToPresentFullScreenContentWithError error: Error) {
	// Ad did fail to present full screen content
}

func adWillDismissScreen(_ ad: VponFullScreenContentAd) {
	// Ad will dismiss full screen content
}

func adDidDismissScreen(_ ad: VponFullScreenContentAd) {
	// Ad did dismiss full screen content
}

func adDidRecordImpression(_ ad: VponFullScreenContentAd) {
	// Ad did record an impression
}

func adDidRecordClick(_ ad: VponFullScreenContentAd) {
	// Ad did record a click
}
```


# Tips
---


### Make Sure If The Ad Display Successfully

Please note that following settings which might cause the ad invisible on the screen are not allowed:

* Set AdView as Hidden
* Set the Alpha value of AdView < 100%
* Overlays that cover the AdView

Please help to check if below log printed after the ad display and match the viewability standard:

```
<VPON> [NOTE] Send impression successfully
```


### Sample Code
Please refer to our [Sample Code] for a complete integration sample.

### Integration Guide For The Version Below Vpon SDK v5.6.0
Please refer to [Interstitial Ad Integration Guide](../interstitial-under560) if you want to know more about the integration compatible with the Vpon SDK version below v5.6.0.

[Sample Code]: ../download/
[iOS9 ATS]: ../latest-news/ios9ats/
[advanced setting]: ../advanced/
