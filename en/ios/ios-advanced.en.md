---
layout:         "ios"
title:          "iOS - Advanced Setting"
lead:           ""
description:    ""
keywords:       "Keywords for this page, in the meta data"
permalink:       ios/advanced/
lang:            "en"

---
# Custom Variable
---
You can insert the test ID to your testDevices (first time, it'll give you a hint to add a uniqueID) in the function (getTestIdentifiers) in order to refine Vpadn tracking. We recommend you insert the test ID to your testDevices to avoid invalid impression and lost revenue during development. Please delete the test ID after testing your application so you do not receive test ads.

## Adding Test ID
It will receive test ads when you use this property to specify a device. To verify that you've integrated the SDK correctly, add your test device, run your application, and click on the displayed test ad.

```objc
// Add this function and test ID in your project to enable test ads.
-(NSArray*)getTestIdentifiers
{
    return [NSArray arrayWithObjects:
          // add your test Id
          @"XXXXXXXXXXXXXXXXXXXXX",
          nil];
}
```

## Targeting
You can also specify location and demographic targeting information. But to protect the user privacy, please you only specify location and demographic data if that information is already used by your app.

   [vpadnAd setUserInfoAge:25];

   [vpadnAd setUserInfoKeyword:@"Game,RPG"];

   [vpadnAd setUserInfoGender:female];

   [vpadnAd setUserInfoBirthdayWithYear:1988 Month:6 andDay:9];


# Protocol
---
You can add these two protocol when you declare ViewController to help you track ad events like request failures or click-through. (VpadnBannerDelegate || VpadnInterstitialDelegate)

```objc
#pragma mark VpadnBannerDelegate  general banner protocol
@protocol VpadnBannerDelegate <NSObject>
@optional
#pragma mark sent when ads has succeeded
- (void)onVpadnAdReceived:(UIView *)bannerView;
#pragma mark sent when ads has failed
- (void)onVpadnAdFailed:(UIView *)bannerView didFailToReceiveAdWithError:(NSError *)error; // alan todo code need to add
#pragma mark sent immediately before the user is presented with Vpadn ad
- (void)onVpadnPresent:(UIView *)bannerView;
#pragma mark sent when the Vpadn ad is dismissed
- (void)onVpadnDismiss:(UIView *)bannerView;
#pragma mark sent just before the application gets backgrounded or terminated
- (void)onVpadnLeaveApplication:(UIView *)bannerView;
@end
```

```objc
#pragma mark VpadnInterstitialDelegate Interstitial Ad protocol
@protocol VpadnInterstitialDelegate <VpadnBannerDelegate>
@optional
#pragma mark sent when interstitial ads has succeeded
- (void)onVpadnInterstitialAdReceived:(UIView *)bannerView;
#pragma mark sent when interstitial ads has failed
- (void)onVpadnInterstitialAdFailed:(UIView *)bannerView;
#pragma mark sent when the Vpadn ad is dismissed
- (void)onVpadnInterstitialAdDismiss:(UIView *)bannerView;
@end
```

These methods can be used for specific object like a ViewController:

```objc
#import "VpadnBanner.h"
#import "VpadnInterstitial.h"
@interface ViewController : UIViewController<VpadnBannerDelegate, VpadnInterstitialDelegate>
```

Received objects and pass to VpadnBanner：

```objc
vpadnAd.delegate = self;
```
sent when VpadnBanner ads has succeeded

```objc
- (void)onVpadnAdReceived:(UIView *)bannerView{}
```
sent when VpadnBanner has failed, typically because of network failure, an application configuration error, or a lack of ad inventory. You may wish to log these events for debugging:

```objc
- (void)onVpadnAdFailed:(UIView *)bannerView didFailToReceiveAdWithError:(NSError *)error{}
```

Sent immediately before the user is presented with a full-screen ad UI in response to their touching the sender.

```objc
- (void)onVpadnPresent:(UIView *)bannerView{}
```
Sent when the user has exited

```objc
- (void)onVpadnDismiss:(UIView *)bannerView;
```
Sent just before the application gets backgrounded or terminated

```objc
- (void)onVpadnLeaveApplication:(UIView *)bannerView{}
```



# Corona User
---
1. Please refer to [Vpon Web SDK Integration Guide]({{site.baseurl}}/web/) to prepare a HTML file with ad request
2. Load the HTML file in WebView, for example, webView:request("localfile.html", system.ResourceDirectory)

> **Note:** To know more about Corona, please refer to [Corona Document](http://docs.coronalabs.com/api/library/native/newWebView.html)

[Register as a Vpon Publisher]: {{ site.baseurl }}/ios/registration/