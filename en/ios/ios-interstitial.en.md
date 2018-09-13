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


# Start To Implement Interstitial
---
The richer, more heavyweight nature of Vpadn interstitial is reflected by its definition not as a UIView but rather an NSObject requiring more distinct instantiation, load and display steps.

Usage is nevertheless very similar to Vpadn banner:

1. Import `VpadnSDKAdKit`
2. Declare a VpadnInterstitial instance
3. Set up VpadnInterstitial object and indicate an License Key
4. Request for an interstitial ad
5. Show interstitial ad
6. Set up Delegate protocol

We strongly recommend that you can finish all the steps in ViewController of the application.

## Import VpadnSDKAdKit And Declare A VpadnInterstitial Instance
---
```objc
#import <ViewController.h>

// import Vpon SDK
@import VpadnSDKAdKit;

// Add a protocol to receive the status of Ads
@interface ViewController() <VpadnInterstitialDelegate>

// Declare VpadnInterstitial Instance
@property (strong, nonatomic) VpadnInterstitial *vpadnInterstitial;

@end
```

## Set Up VpadnInterstitial Object And Indicate A License Key
---
Please refer to the code snippet below to initialize Interstitial Ad in viewDidLoad of ViewController.

```objc
@implementation ViewController

- (void)viewDidLoad
{
    vpadnInterstitial = [[VpadnInterstitial alloc] init];
    vpadnInterstitial.strBannerId = @""; // Fill in with your License Key
    vpadnInterstitial.platform = @"TW"; // Fill in with "TW"
    vpadnInterstitial.delegate = self;
    [vpadnInterstitial getInterstitial:@[]]; // Start to request Interstitial Ad

    // Request test Interstitial Ad with below code snippet
    // [vpadnInterstitial getInterstitial:[self getTestIdentifiers]];
}
@end
```

> **Note**: Do not use the same License Key for Interstitial as the one for Banner.


## Show Interstitial Ad
---
You can only show the interstitial ad after ad initializaion and ad receviced. The simplest way is call `[vpadnInterstitial show]` after onVpadnInterstitialAdReceived be listened.


```objc
- (void)onVpadnInterstitialAdReceived:(UIView *)bannerView {
    [self.vpadnInterstitial show];
}
```

> **Note:** In order to optimize user experience, we recommend that you can load an ad first. Hold it until a certain event to triggered. Avoid showing interstitial ad immediately while getting it.


# Test Ads
---
<!-- //Use testDevices to enable test ads. You should utilize test ads during development to avoid generating false impressions. Here is a sample snippet: -->
Vpon SDK provide test ads. Please add following function to your application and fill in with your test UUID to get test ads.

```objc
-(NSArray*)getTestIdentifiers
{
  return [NSArray arrayWithObjects:
      // add your test UUID
      @"your_UUID",
      nil];
}
```


## Set Up Delegate Protocol
---
After finishing ad request, implement the deligate protocol as below to listen ad status.

```objc
#pragma mark VpadnInterstitial Delegate
- (void)onVpadnInterstitialAdReceived:(UIView *)bannerView{
    NSLog(@"VpadnInterstitialAdReceived");
    // Show interstitial Ads
    [vpadInterstitial show];
}

- (void)onVpadnInterstitialAdFailed:(UIView *)bannerView{
    NSLog(@"VpadnInterstitialAdFailed");
}

- (void)onVpadnInterstitialAdDismiss:(UIView *)bannerView{
    NSLog(@"VpadnintersittialAdDismiss %@",bannerView);
}
```

The interstitial then takes over the screen until the user dismisses it, at which point control returns to your app and the view controller passes to this method.
Vpadn Interstitial Delegate [advanced setting] provides many callback methods for you.



# Tips
---

### App Transport Security
Apple recently revised App Transport Security (ATS), to iOS9. Please refer to [iOS9 ATS] for some modification.


### Sample Code
Please refer to our [Sample Code] for a complete integration sample.

### Other Tips
Please refer to the link below to learn more about other ad types:

* [Banner Ad](../banner)
* [Native Ad](../native)
* [Mediation](../mediation)
* [Advanced](../advanced)

[Sample Code]: ../download/
[iOS9 ATS]: ../latest-news/ios9ats/
[advanced setting]: ../advanced/
