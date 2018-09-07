---
layout: "ios"
title: "iOS - Splash Ad"
lead: ""
description:
keywords: 'Keywords for this page, in the meta data'
permalink: /jp/ios/splash/
lang: "jp"
---
## Finished Integration Guide
---
If you haven't finished the previous integration guide, please check all the [settings here].

## Latest News
---
Apple recently revised App Transport Security (ATS), to iOS10. Please refer to [this link] for some modification.

# Overview
--------
While waiting for the open of the app, Splash ad can not only be shown naturally and immediately to prompte user experience, but also impresses user with the great combination of suitable ad content and the app logo.

<img class="width-400" src="{{site.imgurl}}/Splash_iOS.png" alt="successful result example">

There are seven actions you will need to take to implement this in your app:

1. Import Vpon SDK.
2. Create a UIViewController class named `SplashViewController`.
3. Create UIViewController in StoryBoard (or Xib) and assign `SplashViewController` as the class.
4. Add a UIView named `splashView` on SplashViewController.
5. Declare a VpadnSplash instance, set the License ID and splashView, and request an ad.
6. Assgin `splashViewController` as the `UIWindow rootViewController`
7. Restart the App and a Splash ad will be shown.

# Coding for Showing Splash Ad
--------
First, in your View Controller header file, import Vpon SDK and declare that you implement the VpadnSplashDelegate protocol as well as declare VpadnSplash and splashView.


```objc
@import VpadnSDKAdKit;
#import "VponSdkSplashViewController.h"

@interface VponSdkSplashViewController () <VpadnSplashDelegate>

@property (weak, nonatomic) IBOutlet UIView *splashView;
@property (strong, nonatomic) VpadnSplash *vpadnSplash;

@end
```

## Declare VpadnSplashAd Instance & Send Request
--------
Initialize VpadnSplashAd while implementing ViewController. After filling your License ID and setting splashView, let's start to request an Splash Ad. (Please click [here] if you still do not get the License ID)


```objc
- (void)viewDidAppear:(BOOL)animated {
    [super viewDidAppear:animated];
    self.vpadnSplash = [[VpadnSplash alloc] initWithSplashId:@"License ID" withTarget:self.splashView];
    self.vpadnSplash.delegate = self;
    [self.vpadnSplash setEndurableSecond:3];

    //  If you would like to show the test ad, please use the following codes to set 'Yes' as the value of setTestMode and key in your device's IDFA.
    [self.vpadnSplash setTestMode:YES];
    [self.vpadnSplash loadSplashWithTestIdentifiers:@[@"Key in your device's IDFA"]];
}
```

## Splash Ad Callback
--------
After adding the code to load a Splash ad, the following 5 functions can handle loading failures, and callback the ad status:

1. onVpadnSplashReceived
2. onVpadnFailedToReceiveAd
3. onVpadnSplashClicked
4. onVpadnSplashLeaveApplication
5. onVpadnSplashAllowToDismiss

While the Splash ad is received successfully, the callback `onVpadnSplashReceived` will be triggered simultaneously. When it received unsuccessfully, however, the callback `onVpadnSplash:didFailToReceiveAdWithError` will be triggered. In addition, the callback `onVpadnSplashAllowToDismiss`, which will be triggered when the display of the ad reaches the standard, will allow you to close the ad.

```objc
- (void)onVpadnSplashReceived:(nonnull VpadnSplash *)vpadnSplash {
    NSLog(@"onVpadnSplashReceived");
}

- (void)onVpadnSplash:(nonnull VpadnSplash *)vpadnSplash didFailToReceiveAdWithError:(nullable NSError *)error {
    NSLog(@"onVpadnSplash:didFailToReceiveAdWithError");
    [self backToMainPage]; //Back to the main page
}

- (void)onVpadnSplashClicked:(nonnull VpadnSplash *)vpadnSplash {
    NSLog(@"onVpadnSplashClicked");
}

- (void)onVpadnSplashLeaveApplication:(nonnull VpadnSplash *)vpadnSplash {
    NSLog(@"onVpadnSplashLeaveApplication");
}

- (void)onVpadnSplashAllowToDismiss:(nonnull VpadnSplash *)vpadnSplash {
    NSLog(@"onVpadnSplashDismiss");
    [self backToMainPage]; //Back to the main page
}
```

# Download Sample Code
--------
[Go to Download Page]



[settings here]: {{site.baseurl}}/jp/ios/integration-guide/
[this link]: {{site.baseurl}}/jp/ios/latest-news/ios9ats/
[here]: {{site.baseurl}}/jp/ios/registration/
[Go to Download Page]: {{site.baseurl}}/jp/ios/download
