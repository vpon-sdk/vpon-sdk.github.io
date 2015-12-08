---
layout:         "ios"
title:          "iOS - Banner Ad"
lead:           ""
description:    ""
keywords:       "Keywords for this page, in the meta data"
permalink:       ios/banner/
lang:            "en"

---
## Finished Integration Guide
---
If you haven't finished the previous integration guide, please check all the [settings here]({{site.baseurl}}/ios/integration-guide/).

# Coding for showing Banner
---
iOS apps are composed of UIView objects, Objective-C instances the user sees as text areas, buttons and others controls. VpadnBanner is simply a UIView subclass displaying small HTML5 ads that respond to user touch.

Like any UIView, a VpadnBanner is easy to create in code.


1. Import `VpadnBanner.h` and `VpadnInterstitial.h`
2. Declare a VpadnBanner instance
4. Set the Banner ID which is from Vpadn
5. Set the "root view controller"
6. Add the view to the UI
6. Load it with an ad

The best place to do all this is in your app's UIViewController.

```Objective-C
#import <UIKit/UIKit.h>
// Import header files from the SDK
#import "VpadnBanner.h"
#import "VpadnInterstitial.h"

// Add two protocol to receive the status of Ads
@interface ViewController : UIViewController<VpadnBannerDelegate, VpadnInterstitialDelegate>
{
    VpadnBanner*    vpadnAd; // Declare the instance of Vpadn's banner Ads
    VpadnInterstitial*    vpadnInterstitial; // Declare the instance of Vpadn's interstitial Ads
}
@end
```

```Objective-C
The following performs setup in the view controller's viewDidLoad initialization hook.
@implementation ViewController

- (void)dealloc
{
    if(nil != vpadnAd)
    {
        [vpadnAd release];
        vpadnAd = nil;
    }
    if(nil != vpadnInterstitial)
    {
        [vpadnInterstitial release];
        vpadnInterstitial = nil;
    }
    [super dealloc];
}

- (void)viewDidLoad
{
    [super viewDidLoad];
	// Do any additional setup after loading the view, typically from a nib.
    BOOL bStatusBarHide = [UIApplication sharedApplication].statusBarHidden;
    float screenHeight = [[UIScreen mainScreen] bounds].size.height;
    if(!bStatusBarHide)
        screenHeight -= 20;
    // Set the coordinate
    CGPoint origin = CGPointMake(0.0,screenHeight - CGSizeFromVpadnAdSize(VpadnAdSizeSmartBannerPortrait).height);
    vpadnAd = [[VpadnBanner alloc] initWithAdSize:VpadnAdSizeSmartBannerPortrait origin:origin];  //initialize the instance of banner
    vpadnAd.strBannerId = @"";   // Specify the Banner ID
    vpadnAd.delegate = self;       // Set delegate to receive messages from protocol
    vpadnAd.platform = @"TW";       // Taiwan: TW, China: CN
    [vpadnAd setAdAutoRefresh:YES]; //if it is mediation then set NO
    [vpadnAd setRootViewController:self]; //Set the window's rootViewController here so that the Ads can execute successfully
    [self.view addSubview:[vpadnAd getVpadnAdView]]; // Add the VpadnBanner's view in this ViewController
    [vpadnAd startGetAd:[self getTestIdentifiers]]; // start to get banner Ads

}

//Use testDevices to enable test ads. You should utilize test ads during development to avoid generating false impressions. Here is a sample snippet:
-(NSArray*)getTestIdentifiers
{
    return [NSArray arrayWithObjects:
            // add your test UUID
            nil];
}

#pragma mark VpadAdDelegate method. Add this when use banner Ads
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

#pragma mark VpadnInterstitial Delegate. Add this when use interstitial Ads
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

#pragma mark inform close the Vpadn Ads
- (void)onVpadnSplashAdDismiss{
    NSLog(@"VpadnSplashAdDismiss");
}

@end
```

# Banner Sizes
---
Besides the 320x50, Vpon supports the following ad formats:

Size (WxH)                 |Description             |  VponAdSize Constant           | Devices
:------------------------: | :---------------------:| :-----------------------------:|:-----------:
320x50                     | Standard Banner        | VpadnAdSizeBANNER              |iPhone & iPad
468x60                     | IAB Full-Size Banner   |VpadnAdSizeFullBanner           |iPad
728x90                     | IAB  Leaderboard       |  VpadnAdSizeLeaderboard        |iPad
300x250                    |IAB Medium Recangle     |VpadnAdSizeMediumRectangle      |iPad
device width x auto height |Smart Banner Portrait   |  VpadnAdSizeSmartBannerPortrait |iPhone & iPad
device width x auto height |Smart Banner Landscape  |VpadnAdSizeSmartBannerLandscape  |iPhone & iPad

We recommend that you can use the smart banner constant.

# Ad Refresh
---
You need to use the following sample code to enable auto refresh banner.
  [vpadnAd setAdAutoRefresh:YES];


# Download Sample Code
---
[Go to download page]

# Result
---
The outcome should be a banner at the top of your app:
![IOS-Banner_result]


# App Transport Security
---
Apple recently brought a new security feature, App Transport Security (ATS), to iOS9. If you are using the latest Xcode 7 to build or migrate to an iOS9 project, please refer to [this link] for some modification.

# Other Tips
---
Please refer to [Interstitial Ad](../Interstitial)、[Mediation](../mediation) for more information.


[IOS-Banner_result]: {{site.imgurl}}/IOS-Banner_result.png
[Go to download page]: ../download/
[this link]: {{site.baseurl}}/zh-tw/ios/latest-news/ios9ats/
