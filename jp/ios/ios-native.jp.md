---
layout:         "ios"
title:          "iOS - Native Ad"
lead:           ""
description:    ""
keywords:       "Keywords for this page, in the meta data"
permalink:       /jp/ios/native/
lang:            "jp"
---

## Finished Integration Guide
---
If you haven't finished the previous integration guide, please check all the [settings here].

## 最新ニュース
---
Apple recently revised App Transport Security (ATS), to iOS10. Please refer to [this link] for some modification.

# NativeAd Options
---
We support two kinds of Native Ad below:

1. [Basic Native Ad]
2. [Native Ad - Table View]

Here we use the first one as an example to show how to construct a Basic Native Ad. Click the link above to get more detail about the Basic Native.

# Overview
---
While using the Native Ad API, you will receive a group of ad properties such as a title, an image, and you will have to use them to construct a custom UIView where the ad is shown. The Native Ad, an innovated type of ad, allows you to build a customized experience for the ads you show in your app.

<img src="{{site.imgurl}}/Native_iOS.PNG" alt="" class="width-300"/>

# How to Implement Native Ad
---
There are five actions you will need to take to implement this in your app:

1. Import Vpon SDK
2. Declare a VpadnNativeAd instance
3. Set the License Key
4. Use the returned ad metadata to build a custom native UI
5. Register the ad's view with the nativeAd instance

The best place to do all this is in your app's UIViewController.

# Coding for Showing Native Ad
---
First, in your View Controller header file, import Vpon SDK and declare that you implement the VpadnNativeAdDelegate protocol as well as declare and connect instance variables to your UI. (Please follow the [Natie Ad Spec](#nativeAdSpec))


```objc
@import VpadnSDKAdKit;
#import "ViewController.h"

@interface ViewController ()<VpadnNativeAdDelegate>
/* For SDK version 4.7.1 or above */
@interface ViewController ()<VpadnNativeAdDelegate, VpadnMediaViewDelegate>

@property (strong, nonatomic) VpadnNativeAd *nativeAd;
@property (weak, nonatomic) IBOutlet UILabel *statusLabel;
@property (weak, nonatomic) IBOutlet UIView *adView;
@property (weak, nonatomic) IBOutlet UIImageView *adIcon;
@property (weak, nonatomic) IBOutlet UIImageView *adCoverMedia;
@property (weak, nonatomic) IBOutlet UILabel *adTitle;
@property (weak, nonatomic) IBOutlet UILabel *adBody;
@property (weak, nonatomic) IBOutlet UIButton *adAction;
@property (weak, nonatomic) IBOutlet UILabel *adSocialContext;
/* For SDK version 4.7.1 or above */
@property (weak, nonatomic) IBOutlet VpadnMediaView *adMediaView;

@end
```

## Declare a VpadnNativeAd Instance
---
Initializes VpadnNativeAd and request an ad to load in your View Controller's implementation file. Function `removePreviousAd` can follow [Clear Native Ad](#clearNativeAd).<br>
(Please click [here] if you still do not get the Native Ad ID)


```objc
- (IBAction)loadNativeAd:(id)sender {
    if(self.nativeAd) {
        [self removePreviousAd];
    }
    self.nativeAd = [[VpadnNativeAd alloc] initWithBannerID:@"License Key"];
    self.nativeAd.delegate = self;
    //The testing device will show the testing Ad while input its IDFA. Declare it as a empty string and the device will laod the actula Ad.
    [self.nativeAd loadAdWithTestIdentifiers:@[@"Input the device's IDFA"]];
}
```

## Native Ad Callback
---
After adding the code to load the ad, the following 5 functions can handle loading failures, and callback the ad status:

1. onVpadnNativeAdReceived
2. didFailToReceiveAdWithError
3. onVpadnNativeAdPresent
4. onVpadnNativeAdDismiss
5. onVpadnNativeAdLeaveApplication

While the Native ad is received successfully, the function will also construct the ad into a custom UI. In order to enable the the SDK to log the impression and handle the click automatically you must register the ad's view with the nativeAd instance. Additionally, registering the view using `registerViewForInteraction:withViewController:` will make the whole view clickable. If you are looking for finer control you can specify the clickable subviews using `registerViewForInteraction:withViewController:withClickableViews:`.

```objc
- (void)onVpadnNativeAdReceived:(VpadnNativeAd *)nativeAd {
    NSLog(@"VpadnNativeAd onVpadnNativeAdReceived");

    [self.statusLabel setHidden:YES];

    // icon
    __block typeof(self) safeSelf = self;
    [nativeAd.icon loadImageAsyncWithBlock:^(UIImage * _Nullable image) {
        safeSelf.adIcon.image = image;
    }];
    // media cover
    /* For SDK version 4.7.0 or below
    [nativeAd.coverImage loadImageAsyncWithBlock:^(UIImage * _Nullable image) {
        safeSelf.adCoverMedia.image = image;
    }];
    */
    /* For SDK version 4.7.1 or above */
    self.adMediaView.delegate = self;
    [self.adMediaView setNativeAd:nativeAd];
    // text
    self.adTitle.text = nativeAd.title;
    self.adBody.text = nativeAd.body;
    [self.adAction setHidden:NO];
    [self.adAction setTitle:nativeAd.callToAction forState:UIControlStateNormal];
    self.adSocialContext.text = nativeAd.socialContext;
    //whole view clickable:
    [self.nativeAd registerViewForInteraction:self.adView withViewController:self];
    //finer control:
    //[self.nativeAd registerViewForInteraction:self.adView withViewController:self withClickableViews:@[self.adAction]];
    [self.adView setHidden:NO];
}

- (void)onVpadnNativeAd:(VpadnNativeAd *)nativeAd didFailToReceiveAdWithError:(NSError *)error {
    NSLog(@"VpadnNativeAd didFailToReceiveAdWithError: %@", error);
    [self.statusLabel setHidden:NO];
    [self.statusLabel setText:[NSString stringWithFormat:@"Request failed with error: %d %@", (int)error.code, error.domain]];
}

- (void)onVpadnNativeAdPresent:(VpadnNativeAd *)nativeAd {
    NSLog(@"VpadnNativeAd onVpadnNativeAdPresent");
}

- (void)onVpadnNativeAdDismiss:(VpadnNativeAd *)nativeAd {
    NSLog(@"VpadnNativeAd onVpadnNativeAdDismiss");
}

- (void)onVpadnNativeAdLeaveApplication:(VpadnNativeAd *)nativeAd {
    NSLog(@"NativeAdViewController onVpadnNativeAdLeaveApplication");
}

/* For SDK version 4.7.1 or above */
- (void) mediaViewDidLoad:(VpadnMediaView *)mediaView {
    NSLog(@"mediaViewDidLoad");
}
```

# Clear Native Ad {#clearNativeAd}
---
If you want to re-use the view to show different ads over time, make sure to call `removePreviousAd` before registering the same view with a different instance of VpadnNativeAd.

```objc
- (void)removePreviousAd {
    [self.nativeAd unregisterView];
    self.nativeAd.delegate = nil;
    self.adIcon.image = nil;
    self.adCoverMedia.image = nil;
    self.adView.hidden = YES;
}
```

# Native Ads Manager
---
The `Native Ad Manager` is supported by Vpon SDK. Use the Native Ads Manager when your user experience involves displaying multiple ads within a short amount of time, such as a vertical feed or horizontal scroll. An app can also use Native Ads Manager to automatically refresh and deliver ads. Please follow the [Sample Code] to realize how to use the Native Ads Manager.

# Navive Ad Spec {#nativeAdSpec}
--------
`Red Color` indicates the required element in the Native Ad. CoverImage and Icon, at least one of them must be shown.

Properties   |   Description
:-----------:|:-----------:|
<font color="red">AdLabel</font>      | Let user know it is ad ( Sponsor, Ad, and so on ).
:-----------:|:-----------:|
<font color="red">Title</font>  | Show at least 16 English alphabets. <br>Show `...` while it's out of space.
:-----------:|:-----------:|
<font color="red">CoverImage</font>   | 1200 x 627px <br>(enable scaling in proportion, without distortion and clipping)
:-----------:|:-----------:|
<font color="red">Icon</font>     | 128 x 128px <br>(enable scaling in proportion, without distortion and clipping)
:-----------:|:-----------:|
CallToAction | Show completely
:-----------:|:-----------:|
BodyText     | Show at least 20 English alphabets or unshow it.
:-----------:|:-----------:|
SocialContext| Show completely
:-----------:|:-----------:|
RatingScale  | 5
:-----------:|:-----------:|
Rating Min/Max| 1/5
:-----------:|:-----------:|

# Download Sample Code
---
Here we use Basic Native Ad as an example. A Native Ad sample in table view is also in the [Sample Code] <br>

# Mediation
---
Mediation is a feature that lets you serve ads to your apps from multiple sources. Please refer to the reference below to get the complete description about the Native Ad Mediation setting.<br>
- [Mopub]<br>
- [Smaato]

[settings here]: ../integration-guide/
[here]: {{ site.baseurl }}/jp/ios/registration/
[Sample Code]: {{ site.baseurl }}/jp/android/download/
[MoPub]: {{ site.baseurl }}/jp/ios/mediation/mopub
[Smaato]: {{ site.baseurl }}/jp/ios/native/mediation/smaato
[Basic Native Ad]: #
[Native Ad - Table View]: {{ site.baseurl }}/jp/ios/native/table/
[this link]: {{site.baseurl}}/jp/ios/latest-news/ios9ats/
