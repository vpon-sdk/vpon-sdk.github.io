---
layout:         "ios"
title:          "iOS - Native Ad"
lead:           ""
description:    ""
keywords:       "Keywords for this page, in the meta data"
permalink:       ios/native/
lang:            "en"
---

# Overview
---
While using the Native Ad API, you will receive a group of ad properties such as a title, an image, and you will have to use them to construct a custom UIView where the ad is shown. The Native Ad, an innovated type of ad, allows you to build a customized experience for the ads you show in your app.

<img src="{{site.imgurl}}/Native_iOS.PNG" alt="" class="width-300"/>


# Prerequisites
---
Please make sure you've imported Vpon SDK to your Xcode project. If not, please refer to our [Integration Guide]({{site.baseurl}}/ios/integration-guide/) to finish your setting.


# Start To Implement Interstitial Ad
---
There are five actions you will need to take to implement this in your app:

1. Import VpadnSDKAdKit
2. Declare a VpadnNativeAd instance
3. Initialize VpadnNativeAd object and indicate an License Key
4. Set up VpadnRequest object and send ad request
5. Set up custom Native Ad layout
6. Set up Delegate protocol

The best place to do all this is in your app's ViewController.

## Import VpadnSDKAdKit And Declare A VpadnNativeAd Instance
---
First, in your View Controller header file, import Vpon SDK and declare that you implement the VpadnNativeAdDelegate protocol as well as declare and connect instance variables to your UI. (Please follow the [Natie Ad Spec](#nativeAdSpec))

### Objective-C

```objc
@import VpadnSDKAdKit;
// Import Vpon SDK

@interface ViewController () <VpadnMediaViewDelegate, VpadnNativeAdDelegate>

@property (strong, nonatomic) VpadnNativeAd *nativeAd;

@property (weak, nonatomic) IBOutlet UIView *contentView;

@property (weak, nonatomic) IBOutlet UIImageView *adIcon;
@property (weak, nonatomic) IBOutlet UILabel *adTitle;
@property (weak, nonatomic) IBOutlet UILabel *adBody;
@property (weak, nonatomic) IBOutlet UILabel *adSocialContext;
@property (weak, nonatomic) IBOutlet UIButton *adAction;
@property (weak, nonatomic) IBOutlet VpadnMediaView *adMediaView;

@end
```

### Swift

```swift
import VpadnSDKAdKit
// Import Vpon SDK

class VponSdkNativeViewController: UIViewController {
    
    var vpadnNative: VpadnNativeAd!
    @IBOutlet weak var contentView: UIView!
    @IBOutlet weak var adIcon: UIImageView!
    @IBOutlet weak var adTitle: UILabel!
    @IBOutlet weak var adBody: UILabel!
    @IBOutlet weak var adSocialContext: UILabel!
    @IBOutlet weak var adAction: UIButton!
    @IBOutlet weak var adMediaView: VpadnMediaView!
}
```


## Initialize VpadnNativeAd Object And Indicate A License Key
---
Please follow the instrcution below to initialize VpadnNativeAd and indicate a License Key for it.

### Objective-C

```objc
_nativeAd = [[VpadnNativeAd alloc] initWithLicenseKey:@"License Key"];
// initWithLicenseKey: Vpon License Key to get ad, please replace with your own one

_nativeAd.delegate = self;
```

### Swift

```swift
vpadnNative = VpadnNativeAd.init(licenseKey: "License Key")
// initWithLicenseKey: Vpon License Key to get ad, please replace with your own one

vpadnNative.delegate = self
```

## Set Up VpadnAdRequest and Send Ad Request
---
Set up VpadnAdRequest before you send ad request:

### Objective-C

```objc
VpadnAdRequest *request = [[VpadnAdRequest alloc] init];

[request setTestDevices:@[[ASIdentifierManager sharedManager].advertisingIdentifier.UUIDString]];
// Set your test device's IDFA here if you're trying to get Vpon test ad

[_nativeAd loadRequest:request];
// Start to load ad
```

### Swift

```swift
let request = VpadnAdRequest.init()

request.setTestDevices([ASIdentifierManager.shared().advertisingIdentifier.uuidString])
// Set your test device's IDFA here if you're trying to get Vpon test ad

vpadnNative.load(request())
// start to load ad
```

>**Note:**
>
>* Besides of setting up VpadnRequest for each ad type, you can also set up a general VpadnRequest for all types of ad.
>* If you want to know more about target setting, please refer to [Advanced Setting](../advanced).


## Set Up Custom Native Ad Layout
---
Please refer to the sample below to set up custom Native Ad Layout when onVpadnNativeAdReceived triggered:


### Objective-C

```objc
- (void)setNativeAd {
    _adIcon.image = nil;
    
    __block typeof(self) safeSelf = self;
    [_nativeAd.icon loadImageAsyncWithBlock:^(UIImage * _Nullable image) {
        safeSelf.adIcon.image = image;
    }];
    
    [_adMediaView setNativeAd:_nativeAd];
    _adMediaView.delegate = self;
    
    _adTitle.text = [_nativeAd.title copy];
    _adBody.text = [_nativeAd.body copy];
    _adSocialContext.text = [_nativeAd.socialContext copy];
    [_adAction setTitle:[_nativeAd.callToAction copy] forState:UIControlStateNormal];
    [_adAction setTitle:[_nativeAd.callToAction copy] forState:UIControlStateHighlighted];
    
    [_nativeAd registerViewForInteraction:_contentView withViewController:self];
    // You must register the Ad View to make the ad clickable

    // [_nativeAd registerViewForInteraction:withViewController:withClickableViews:self._adAction];
    // You can also register a specific ad component to make the Ad View to be clickable partly
}
```

### Swift

```swift
func setNativeAd() {
        adIcon.image = nil
            
        vpadnNative.icon.loadAsync { (image) in
            self.adIcon.image = image
        }
        
        adMediaView.nativeAd = vpadnNative
        adMediaView.delegate = self
            
        adTitle.text = vpadnNative.title
        adBody.text = vpadnNative.body
        adSocialContext.text = vpadnNative.socialContext
        adAction.setTitle(vpadnNative.callToAction, for: .normal)
        adAction.setTitle(vpadnNative.callToAction, for: .highlighted)
        
        vpadnNative.registerView(forInteraction: contentView, with: self)
        // You must register the Ad View to make the ad clickable

        vpadnNative.registerView(forInteraction: withViewController, with: self.adAction)
        // You can also register a specific ad component to make the Ad View to be clickable partly
    }

```

## Set Up Delegate Protocol
---
After finishing ad request, implement the delegate protocol as below to listen ad status.

### Objective-C

```objc
- (void) onVpadnNativeAdLoaded:(VpadnNativeAd *)nativeAd {
    // Invoked if receive Banner Ad successfully

    [self setNativeAd];
    // Construct Native Ad with returned components
}
- (void) onVpadnNativeAd:(VpadnNativeAd *)nativeAd failedToLoad:(NSError *)error {
    // Invoked if received ad fail, check this callback to indicates what type of failure occurred
}
- (void) onVpadnNativeAdClicked:(VpadnNativeAd *)nativeAd {
    // Invoked if the Banner Ad was clicked
}
- (void) onVpadnNativeAdWillLeaveApplication:(VpadnNativeAd *)nativeAd {
    // Invoked if user leave the app and the current app was backgrounded
}
- (void) mediaViewDidLoad:(VpadnMediaView *)mediaView {
    // Invoked if the media creatives load sucessfully
}
- (void) mediaViewDidFailed:(VpadnMediaView *)mediaView error:(NSError *)error {
    // Invoked if the media creatives load fail
}
```

### Swift

```swift
extension VponSdkNativeViewController: VpadnNativeAdDelegate, VpadnMediaViewDelegate {
    
    func onVpadnNativeAdLoaded(_ nativeAd: VpadnNativeAd) {
        // Invoked if receive Banner Ad successfully

        self.setNativeAd()
        // Construct Native Ad with returned components
    }
    func onVpadnNativeAd(_ nativeAd: VpadnNativeAd, failedToLoad error: Error) {
        // Invoked if received ad fail, check this callback to indicates what type of failure occurred
    }
    func onVpadnNativeAdClicked(_ nativeAd: VpadnNativeAd) {
        // Invoked if the Banner Ad was clicked
    }
    func onVpadnNativeAdWillLeaveApplication(_ nativeAd: VpadnNativeAd) {
        // Invoked if user leave the app and the current app was backgrounded
    }
    func mediaViewDidLoad(_ mediaView: VpadnMediaView) {
        // Invoked if the media creatives load sucessfully
    }
    func mediaViewDidFailed(_ mediaView: VpadnMediaView, error: Error) {
        // Invoked if the media creatives load fail  
    }
}
```


<!-- # Native Ads Manager
---
The `Native Ad Manager` is supported by Vpon SDK. Use the Native Ads Manager when your user experience involves displaying multiple ads within a short amount of time, such as a vertical feed or horizontal scroll. An app can also use Native Ads Manager to automatically refresh and deliver ads. Please follow the [Sample Code] to realize how to use the Native Ads Manager. -->

# Navive Ad Spec {#nativeAdSpec}
--------
Please check to table below to find the Native Ad component provided by Vpon.

* Components in red are required to show in Native Ad layout. 
* Show at least one image (CoverImage or Icon) in Native Ad layout.

Properties   |   Description
:-----------:|:-----------:|
<font color="red">AdLabel</font>      | Let user know it is ad ( Sponsor, Ad, and so on ).
:-----------:|:-----------:|
<font color="red">Title</font>  | Show at least 16 English alphabets. <br>Show `...` while it's out of space.
:-----------:|:-----------:|
CoverImage   | 1200 x 627px <br>(enable scaling in proportion, without distortion and clipping)
:-----------:|:-----------:|
Icon         | 128 x 128px <br>(enable scaling in proportion, without distortion and clipping)
:-----------:|:-----------:|
CallToAction | Show completely
:-----------:|:-----------:|
BodyText     | Show at least 20 English alphabets or unshow it.
:-----------:|:-----------:|
SocialContext| Show completely
:-----------:|:-----------:|
RatingScale  | 5, might be null
:-----------:|:-----------:|
Rating Min/Max| 1/5, might be null
:-----------:|:-----------:|


# Tips
---

### Sample Code
Please refer to our [Sample Code] for a complete integration sample.

### Integration Guide For Vpon SDK v4.9
Please refer to [Native Ad Integration Guide](../native-under5) if you want to know more about the integration that compatible with Vpon SDK v4.9 and below version.

### Mediation
---
Mediation is a feature that lets you serve ads to your apps from multiple sources. Please refer to the reference below to get the complete description about the Native Ad Mediation setting.<br>
- [AdMob]<br>
- [Mopub]<br>
- [Smaato]


[settings here]: ../integration-guide/
[here]: {{ site.baseurl }}/ios/registration/
[Sample Code]: {{ site.baseurl }}/ios/download/
[Click here]: {{ site.baseurl }}/ios/mediation/mopub
[AdMob]: {{ site.baseurl }}/ios/mediation/admob/#customevent
[MoPub]: {{ site.baseurl }}/ios/mediation/mopub
[Smaato]: {{ site.baseurl }}/ios/native/mediation/smaato
[Basic Native Ad]: #
[Native Ad - Table View]: {{ site.baseurl }}/ios/native/table/
[this link]: ../latest-news/ios9ats/
