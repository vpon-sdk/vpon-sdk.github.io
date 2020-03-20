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
Please make sure you've imported Vpon SDK to your Xcode project. If not, please refer to our [Integration Guide]({{site.baseurl}}/ios/integration-guide/) to finish your setting.

# Start To Implement Banner Ad
---
iOS apps are composed of UIView objects which will present as text area, buttons or other controllers. VpadnBanner is simply an UIView subclass that can display small HTML5 ads trigger by users' touch.

Just like all the other UIView, a VpadnBanner is easy to implement in code.

1. Import VpadnSDKAdKit
2. Declare a VpadnBanner instance
3. Initialize VpadnBanner and indicate a License Key
4. Set up VpadnRequest object and send ad request
5. Set up Delegate protocol

We strongly recommend that you can finish all the steps in ViewController of the application.

## Import VpadnSDKAdKit And Declare A VpadnBanner Instance
---

### Obejctive-C

```objc
@import VpadnSDKAdKit;
// Import Vpon SDK

@interface ViewController() <VpadnBannerDelegate>
@property (strong, nonatomic) VpadnBanner *vpadnBanner;
@property (weak, nonatomic) IBOutlet UIView *loadBannerView;

@end
```

### Swift

```swift
import VpadnSDKAdKit
// Import Vpon SDK

class VponSdkBannerViewController: UIViewController {
  @IBOutlet weak var requestButton: UIButton!
  @IBOutlet weak var loadBannerView: UIView!
}
```

## Initialize VpadnBanner Object And Indicate A License Key
---
Please refer to the code snippet below to initialize Banner Ad in viewDidLoad of ViewController.

### Objective-C

```objc
_vpadnBanner = [[VpadnBanner alloc] initWithLicenseKey:@"License Key" adSize: VpadnAdSizeBanner];
// initWithLicenseKey: Vpon License Key to get ad, please replace with your own one
// adSize: The Banner Ad size that will be displayed

_vpadnBanner.delegate = self;
```

### Swift

``` swift
vpadnBanner = VpadnBanner.init(licenseKey: "License Key", adSize: VpadnAdSizeBanner)
// licenseKey: Vpon License Key to get ad, please replace with your own one
// adSize: The Banner Ad size that will be displayed

vpadnBanner.delegate = self
```


## Set Up VpadnAdRequest and Send Ad Request
---
Set up VpadnAdRequest before you send ad request:

### Objective-C

```objc
VpadnAdRequest *request = [[VpadnAdRequest alloc] init];

[request setAutoRefresh:YES];
// Only available for Banner Ad, will auto refresh ad if set YES

[request setTestDevices:@[[ASIdentifierManager sharedManager].advertisingIdentifier.UUIDString]];
// Set your test device's IDFA here if you're trying to get Vpon test ad

[_vpadnBanner loadRequest:request];
// Start to load ad
```

### Swift

```swift
let request = VpadnAdRequest.init()

request.setAutoRefresh(true)
// Only available for Banner Ad, will auto refresh ad if set YES

request.setTestDevices([ASIdentifierManager.shared().advertisingIdentifier.uuidString])
// Set your test device's IDFA here if you're trying to get Vpon test ad

vpadnBanner.load(request)
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
- (void) onVpadnAdLoaded:(VpadnBanner *)banner {
    // Invoked if receive Banner Ad successfully

    [self.loadBannerView addSubview:banner.getVpadnAdView];
    // Add ad view to your layout
}
- (void) onVpadnAd:(VpadnBanner *)banner failedToLoad:(NSError *)error {
    // Invoked if received ad fail, check this callback to indicates what type of failure occurred
}
- (void) onVpadnAdWillLeaveApplication:(VpadnBanner *)banner {
    // Invoked if user leave the app and the current app was backgrounded
}
- (void) onVpadnAdRefreshed:(VpadnBanner *)banner {
   // Invoked if the Banner Ad will be refresh
}
```

### Swift

```swift
extension VponSdkBannerViewController : VpadnBannerDelegate {

    func onVpadnAdLoaded(_ banner: VpadnBanner) {
      // Invoked if receive Banner Ad successfully

      self.loadBannerView.addSubview(banner.getVpadnAdView())
      // Add ad view to your layout
    }
    func onVpadnAd(_ banner: VpadnBanner, failedToLoad error: Error) {
      // Invoked if received ad fail, check this callback to indicates what type of failure occurred
    }
    func onVpadnAdWillLeaveApplication(_ banner: VpadnBanner) {
      // Invoked if user leave the app and the current app was backgrounded
    }
    func onVpadnAdRefreshed(_ banner: VpadnBanner) {
      // Invoked if the Banner Ad will be refresh 
    }
}
```

# Banner Format
---
Besides the 320x50, Vpon supports the following ad formats:

Size (WxH)                 |Description             |  VponAdSize Constant           | Devices
:------------------------: | :---------------------:| :-----------------------------:|:-----------:
320x50                     | Standard Banner        | VpadnAdSizeBANNER              |iPhone<br>iPad
468x60                     | IAB Full-Size Banner   | VpadnAdSizeFullBanner           |iPad
728x90                     | IAB  Leaderboard       | VpadnAdSizeLeaderboard        |iPad
300x250                    | IAB Medium Recangle    | VpadnAdSizeMediumRectangle      |iPhone<br>iPad
device width x auto height | Smart Banner Portrait  | VpadnAdSizeSmartBannerPortrait |iPhone<br>iPad
device width x auto height | Smart Banner Landscape | VpadnAdSizeSmartBannerLandscape  |iPhone<br>iPad


<!-- device width x auto height | Custom Banner Size     | VpadnAdSizeFromCGSize | iPhone<br>iPad -->

<!-- We recommend that you can use `VpadnAdSizeFromCGSize` as following example:

```objc
vpadnBanner = [[VpadnBanner alloc] initWithAdSize:VpadnAdSizeFromCGSize(self.loadBannerView.frame.size) origin:CGPointZero];
``` -->

# Tips
---

### Sample Code
Please refer to our [Sample Code] for a complete integration sample.

### Integration Guide For Vpon SDK v4.9
Please refer to [Banner Ad Integration Guide](../banner-under5) if you want to know more about the integration that compatible with Vpon SDK v4.9 and below version.

[Sample Code]: ../download/
[iOS9 ATS]: ../latest-news/ios9ats/
