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
Please make sure you've imported Vpon SDK to your Xcode project. If not, please refer to our [Integration Guide]({{site.baseurl}}/ios/integration-guide/) to finish your setting.


# Start To Implement Interstitial Ad
---
The richer, more heavyweight nature of Vpadn interstitial is reflected by its definition not as a UIView but rather an NSObject requiring more distinct instantiation, load and display steps.

Usage is nevertheless very similar to Vpadn banner:

1. Import VpadnSDKAdKit
2. Declare a VpadnInterstitial instance
3. Initialize VpadnInterstitial object and indicate an License Key
4. Set up VpadnRequest object and send ad request
5. Show interstitial ad
6. Set up Delegate protocol

We strongly recommend that you can finish all the steps in ViewController of the application.

## Import VpadnSDKAdKit And Declare A VpadnInterstitial Instance
---

### Objective-C

```objc
@import VpadnSDKAdKit;
// Import Vpon SDK

@interface ViewController() <VpadnInterstitialDelegate>
@property (strong, nonatomic) VpadnInterstitial *vpadnInterstitial;

@end
```

## Swift

```swift
import VpadnSDKAdKit
// Import Vpon SDK

class VponSdkInterstitialViewController: UIViewController {
    var vpadnInterstitial : VpadnInterstitial!
}
```

## Initialize VpadnInterstitial Object And Indicate A License Key
---
Please refer to the code snippet below to initialize Interstitial Ad in viewDidLoad of ViewController.

### Objective-C

```objc
_vpadnInterstitial = [[VpadnInterstitial alloc] initWithLicenseKey:@"License Key"];
// initWithLicenseKey: Vpon License Key to get ad, please replace with your own one

_vpadnInterstitial.delegate = self;
```

### Swift

```swift
vpadnInterstitial = VpadnInterstitial.init(licenseKey:"License Key")
// licenseKey: Vpon License Key to get ad, please replace with your own one

vpadnInterstitial.delegate = self
```

## Set Up VpadnAdRequest and Send Ad Request
---
Set up VpadnAdRequest before you send ad request:

### Objective-C

```objc
VpadnAdRequest *request = [[VpadnAdRequest alloc] init];

[request setTestDevices:@[[ASIdentifierManager sharedManager].advertisingIdentifier.UUIDString]];
// Set your test device's IDFA here if you're trying to get Vpon test ad

[_vpadnInterstitial loadRequest:request];
// Start to load ad
```

### Swift

```swift
let request = VpadnAdRequest.init()

request.setTestDevices([ASIdentifierManager.shared().advertisingIdentifier.uuidString])
// Set your test device's IDFA here if you're trying to get Vpon test ad

vpadnInterstitial.load(request)
// start to load ad
```

>**Note:**
>
>* Besides of setting up VpadnRequest for each ad type, you can also set up a general VpadnRequest for all types of ad.
>* If you want to know more about target setting, please refer to [Advanced Setting](../advanced).


## Show Interstitial Ad
---
You can only show the interstitial ad after ad initializaion and ad receviced. For example, display ad when onVpadnInterstitialAdReceived triggered.


### Objective-C

```objc
- (void) onVpadnInterstitialAdReceived:(UIView *)bannerView {
    [self.vpadnInterstitial showFromRootViewController:self];
}
```

### Swift

```swift
func onVpadnInterstitialAdReceived(_ bannerView: UIView!) {
    vpadnInterstitial.show(fromRootViewController: self)
}
```

> **Note:** In order to optimize user experience, we recommend that you can load an ad first. Hold it until a certain event to triggered. Avoid showing interstitial ad immediately while getting it.



## Set Up Delegate Protocol
---
After finishing ad request, implement the delegate protocol as below to listen ad status.

### Objective-C

```objc
- (void) onVpadnInterstitialLoaded:(VpadnInterstitial *)interstitial {
    // Invoked if receive Banner Ad successfully
}
- (void) onVpadnInterstitial:(VpadnInterstitial *)interstitial failedToLoad:(NSError *)error {
    // Invoked if received ad fail, check this callback to indicates what type of failure occurred
}
- (void) onVpadnInterstitialWillOpen:(VpadnInterstitial *)interstitial {
    // Invoked if the Interstitial Ad is going to be displayed
}
- (void) onVpadnInterstitialClosed:(VpadnInterstitial *)interstitial {
    // Invoked if the Interstitial Ad was dismissed
}
- (void) onVpadnInterstitialWillLeaveApplication:(VpadnInterstitial *)interstitial {
    // Invoked if user leave the app and the current app was backgrounded
}
```

### Swift

```swift
extension VponSdkInterstitialViewController : VpadnInterstitialDelegate {

    func onVpadnInterstitialLoaded(_ interstitial: VpadnInterstitial) {
        // Invoked if receive Banner Ad successfully
    }
    func onVpadnInterstitial(_ interstitial: VpadnInterstitial, failedToLoad error: Error) {
        // Invoked if received ad fail, check this callback to indicates what type of failure occurred
    }
    func onVpadnInterstitialWillOpen(_ interstitial: VpadnInterstitial) {
        // Invoked if the Interstitial Ad is going to be displayed
    }
    func onVpadnInterstitialWillLeaveApplication(_ interstitial: VpadnInterstitial) {
        // Invoked if user leave the app and the current app was backgrounded
    }
    func onVpadnInterstitialClicked(_ interstitial: VpadnInterstitial) {
        // Invoked if the Banner Ad was clicked
    }
}
```



# Tips
---


### Sample Code
Please refer to our [Sample Code] for a complete integration sample.

### Integration Guide For Vpon SDK v4.9
Please refer to [Interstitial Ad Integration Guide](../interstitial-under5) if you want to know more about the integration that compatible with Vpon SDK v4.9 and below version.

[Sample Code]: ../download/
[iOS9 ATS]: ../latest-news/ios9ats/
[advanced setting]: ../advanced/
