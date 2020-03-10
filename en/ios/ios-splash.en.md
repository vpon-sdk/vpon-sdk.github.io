---
layout: "ios"
title: "iOS - Splash Ad"
lead: ""
description:
keywords: 'Keywords for this page, in the meta data'
permalink: ios/splash/
lang: "en"
---

# Overview
--------
While waiting for the open of the app, Splash ad can not only be shown naturally and immediately to prompte user experience, but also impresses user with the great combination of suitable ad content and the app logo.

<img class="width-400" src="{{site.imgurl}}/Splash_iOS.png" alt="successful result example">


# Prerequisites
---
Please make sure you've imported Vpon SDK to your Xcode project. If not, please refer to our [Integration Guide]({{site.baseurl}}/ios/integration-guide/) to finish your setting.


# Start To Implement Splash Ad
---

There are seven actions you will need to take to implement this in your app:

1. Import VpadnSDKAdKit
2. Declare a VpadnSplash instance
3. Initialize VpadnSplash object and indicate an License Key
4. Set up endurable time for Splash Ad
5. Set up VpadnRequest object and send ad request
6. Set up Delegate protocol


## Import VpadnSDKAdKit And Declare A VpadnSplash Instance
--------
First, in your View Controller header file, import Vpon SDK and declare the VpadnSplash and splashView.

### Objective-C

```objc
@import VpadnSDKAdKit;
// Import Vpon SDK

@interface ViewController () <VpadnSplashDelegate>

@property (weak, nonatomic) IBOutlet UIView *loadSplashView;
@property (strong, nonatomic) VpadnSplash *vpadnSplash;

@end
```

### Swift

```swift
import VpadnSDKAdKit
// Import Vpon SDK

class VponSdkBannerViewController: UIViewController {

@IBOutlet weak var loadSplashView: UIView!
    var vpadnSplash: VpadnSplash!
}
```

## Initialize VpadnSplash Object And Indicate A License Key
--------
Initialize VpadnSplashAd while implementing ViewController. After filling your License Key and setting splashView, let's start to request an Splash Ad. (Please click [here] if you still do not get the License Key)


### Objective-C

```objc
_vpadnSplash = [[VpadnSplash alloc] initWithLicenseKey:@"License Key" target:_loadSplashView];
// licenseKey: Vpon License Key to get ad, please replace with your own one

_vpadnSplash.delegate = self;
```

### Swift

```swift
vpadnSplash = VpadnSplash.init(licenseKey: "License Key", target: loadSplashView)
// licenseKey: Vpon License Key to get ad, please replace with your own one

vpadnSplash.delegate = self
```

## Set Up Endurable Time For Splash Ad
---
Set up the max endurable waiting time with setEndurableSeconde before sending ad request.

### Objective-C

```objc
[_vpadnSplash setEndurableSecond:3];
```

### Swift

```swift
vpadnSplash.setEndurableSecond(3)
```

>**Note:** The default value of the endurable time is 3s. If set 0, it will display the ad cache from previous request.

## Set Up VpadnAdRequest and Send Ad Request
---
Set up VpadnAdRequest before you send ad request:

### Objective-C

```objc
VpadnAdRequest *request = [[VpadnAdRequest alloc] init];

[request setTestDevices:@[[ASIdentifierManager sharedManager].advertisingIdentifier.UUIDString]];
// Set your test device's IDFA here if you're trying to get Vpon test ad

[_vpadnSplash loadRequest:request];
// Start to load ad
```

### Swift

```swift
let request = VpadnAdRequest.init()

request.setTestDevices([ASIdentifierManager.shared().advertisingIdentifier.uuidString])
// Set your test device's IDFA here if you're trying to get Vpon test ad

vpadnSplash.load(request)
// start to load ad
```

>**Note:**
>
>* Besides of setting up VpadnRequest for each ad type, you can also set up a general VpadnRequest for all types of ad.
>* If you want to know more about target setting, please refer to [Advanced Setting](../advanced).

## Set Up Delegate Protocol
---
After finishing ad request, implement the delegate protocol as below to listen ad status.

### Objective-C

```objc
- (void)onVpadnSplashReceived:(nonnull VpadnSplash *)vpadnSplash {
    // Invoked if the Splash Ad received and displayed successfully
}
- (void)onVpadnSplash:(nonnull VpadnSplash *)vpadnSplash didFailToReceiveAdWithError:(nullable NSError *)error {
    // Invoked if received ad fail, check this callback to indicates what type of failure occurred
}
- (void)onVpadnSplashAllowToDismiss:(nonnull VpadnSplash *)vpadnSplash {
    // Invoked if the ad is able to be dismissed
}
- (void)onVpadnSplashClicked:(nonnull VpadnSplash *)vpadnSplash {
    // Invoked if the Banner Ad was clicked
}
- (void)onVpadnSplashLeaveApplication:(nonnull VpadnSplash *)vpadnSplash {
    // Invoked if user leave the app and the current app was backgrounded
}
```

### Swift

```swift
extension VponSdkSplashViewController: VpadnSplashDelegate {

    func onVpadnSplashReceived(_ vpadnSplash: VpadnSplash) {
      // Invoked if the Splash Ad received and displayed successfully
    }
    func onVpadnSplash(_ vpadnSplash: VpadnSplash, didFailToReceiveAdWithError error: Error?) {
      // Invoked if received ad fail, check this callback to indicates what type of failure occurred
    }
    func onVpadnSplashAllow(toDismiss vpadnSplash: VpadnSplash) {
      // Invoked if the ad is able to be dismissed  
    }
    func onVpadnSplashClicked(_ vpadnSplash: VpadnSplash) {
      // Invoked if the Banner Ad was clicked
    }
    func onVpadnSplashLeaveApplication(_ vpadnSplash: VpadnSplash) {
      // Invoked if user leave the app and the current app was backgrounded
    }
}
```

# Tips
---

### Sample Code
Please refer to our [Sample Code] for a complete integration sample.

### Integration Guide For Vpon SDK v4.9
Please refer to [Splash Ad Integration Guide](../splash-under5) if you want to know more about the integration that compatible with Vpon SDK v4.9 and below version.


[settings here]: {{site.baseurl}}/ios/integration-guide/
[this link]: {{site.baseurl}}/ios/latest-news/ios9ats/
[here]: {{site.baseurl}}/ios/registration/
[Go to Download Page]: {{site.baseurl}}/ios/download
[Sample Code]: {{ site.baseurl }}/ios/download/