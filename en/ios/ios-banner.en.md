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

# Start To Implement Banner
---
iOS apps are composed of UIView objects which will present as text area, buttons or other controllers. VpadnBanner is simply an UIView subclass that can display small HTML5 ads trigger by users' touch.

Just like all the other UIView, a VpadnBanner is easy to implement in code.

1. Import `VpadnSDKAdKit`
2. Declare a VpadnBanner instance
3. Set up VpadnBanner object and indicate a License Key
4. Request for a banner ad
5. Set up Delegate protocol

We strongly recommend that you can finish all the steps in ViewController of the application.

## Import VpadnSDKAdKit And Declare A VpadnBanner Instance
---
```objc
#import <ViewController.h>

// import Vpon SDK
@import VpadnSDKAdKit;

// Add a protocol to receive the status of Ads
@interface ViewController() <VpadnBannerDelegate>

// Declare VpadnBanner Instance
@property (strong, nonatomic) VpadnBanner *vpadnBanner;

@property (weak, nonatomic) IBOutlet UIView *loadBannerView;

@end
```

## Set Up VpadnBanner Object And Indicate A License Key
---
Please refer to the code snippet below to initialize Banner Ad in viewDidLoad of ViewController.

```objc
@implementation ViewController

- (void)viewDidLoad {
    [super viewDidLoad];

    if (self.vpadnBanner != nil) {
            [self.vpadnBanner.getVpadnAdView removeFromSuperview];
    }

vpadnBanner = [[VpadnBanner alloc] initWithAdSize:VpadnAdSizeFromCGSize(self.loadBannerView.frame.size) origin:CGPointZero];  // Initialize Banner Object
  vpadnBanner.strBannerId = @""; // Fill in with your License Key
  vpadnBanner.delegate = self; // Set up Delegate to receive protocol message
  vpadnBanner.platform = @"TW"; // Fill in with "TW"
  [vpadnBanner setAdAutoRefresh:YES]; // Set "YES" to enable Banner auto refresh. Set "NO" if you use mediation
  [vpadnBanner setRootViewController:self];
  [self.loadBannerView addSubview:bannerView]; // Add  VpadnBanner View to ViewController
  
  ...
}
```


## Request for Banner Ad
---
After finishing banner ad initialization, add the code snippet to request for ads:

```objc
- (void)viewDidLoad {
    ...

  // Start to request Banner Ad
  [vpadnBanner startGetAd:[]]; 

  // Start to request test Banner Ad with below code snippet
  // [vpadnBanner startGetAd:[self getTestIdentifiers]];
}
```

## Request for Test Ad
---
Please add the code snippet to your application and fill in with your test device's UUID as below to request for test ads.

```objc
-(NSArray*)getTestIdentifiers {
  return [NSArray arrayWithObjects:
    // Add your test device's UUID
    @"your_UUID",
    nil];
}
```

## Set Up Delegate Protocol
---
After finishing ad request, implement the delegate protocol as below to listen ad status.

```objc
#pragma mark - Vpadn Banner Delegate
- (void)onVpadnAdReceived:(UIView *)bannerView{
    NSLog(@"VpadnAdReceived");
}

- (void)onVpadnAdFailed:(UIView *)bannerView didFailToReceiveAdWithError:(NSError *)error{
    NSLog(@"VpadnAdFailed");
}

- (void)onVpadnPresent:(UIView *)bannerView{
    NSLog(@"VpadnPresent %@",bannerView);
}

- (void)onVpadnDismiss:(UIView *)bannerView{
    NSLog(@"VpadnDismiss %@",bannerView);
}

- (void)onVpadnLeaveApplication:(UIView *)bannerView{
    NSLog(@"Leave publisher application");
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
device width x auto height | Custom Banner Size     | VpadnAdSizeFromCGSize | iPhone<br>iPad

We recommend that you can use `VpadnAdSizeFromCGSize` as following example:

```objc
vpadnBanner = [[VpadnBanner alloc] initWithAdSize:VpadnAdSizeFromCGSize(self.loadBannerView.frame.size) origin:CGPointZero];
```

# Tips
---

### App Transport Security
Apple recently revised App Transport Security (ATS), to iOS9. Please refer to [iOS9 ATS] for some modification.


### Sample Code
Please refer to our [Sample Code] for a complete integration sample.

### More Ad Formats
Please refer to the link below to learn more about other ad types:

* [Interstitial Ad](../Interstitial)
* [Native Ad](../native)
* [Out-sream Video Ad](../outstream)
* [Mediation](../mediation)
* [Advanced](../advanced)

[Sample Code]: ../download/
[iOS9 ATS]: ../latest-news/ios9ats/
