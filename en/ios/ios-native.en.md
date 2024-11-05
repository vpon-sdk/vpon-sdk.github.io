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
Please make sure you've imported Vpon SDK to your Xcode project. If not, please refer to our [Integration Guide]({{site.baseurl}}/ios/integration-guide/) to finish your setting.


# Start To Implement Native Ad
--------
There are five actions you will need to take to implement this in your app:

1. Import VpadnSDKAdKit
2. Declare VponNativeAdView and Customize UI
3. Initialize VponNativeAdLoader Object and Request ad
4. Implement VponNativeAdLoaderDelegate
5. Custom Native Ad Layout with Returned Data
6. (Advanced) Implement Native Ad Event Listener
7. (Advanced) Implement Native Ad (Video) Event Listener

The best place to do all this is in your app's ViewController.

## Import VpadnSDKAdKit
---

Firstly, import SDK and declare VpadnNativeAdDelegate and VpadnMediaViewDelegate protocols to receive ad status. At the same time, declare various components you intend to present in the Native Ad.
(For specifications on components for Native Ad presentation, please refer to [Native Ad Spec](#nativeAdSpec))


### Objective-C

```objc
@import VpadnSDKAdKit;
```

### Swift

```swift
import VpadnSDKAdKit
```

## Declare VponNativeAdView and Customize UI
---

For native ads, Vpon provides the `VponNativeAdView`, which inherits from UIView, to serve as the ad view. Each `VponNativeAdView` corresponds to a `VponNativeAd` object. Please use the `VponNativeAdView` to display the ad, and ensure that every desired UIView component you wish to present (such as headline, body, etc.) must be its subview.

Please follow these steps sequentially to display the Native Ad:

1. Create a `UIView` XIB file (using `NativeAdView` as an example). In the Identity inspector, specify the Custom Class as `VponNativeAdView` and set the Module to `VpadnSDKAdKit`, as shown in the image:

<img src="{{site.imgurl}}/Native_iOS_NA_01.png" alt="" class="width-500"/>


2. Arrange UI you desire within the .xib file and connect each UI component (e.g., a `UILabel` intended to display the headline) to the corresponding property of `VponNativeAdView` using IBOutlet. Set it up as illustrated in the image:

<img src="{{site.imgurl}}/Native_iOS_NA_02.png" alt="" class="width-500"/>
    * For specifications on components for Native Ad presentation, please refer to [Native Ad Spec](#nativeAdSpec)

    If you are unable to successfully connect IBOutlet to the corresponding properties of `VponNativeAdView`, we provide a solution for your reference:

    For Objective-C projects, create a new .h file. For Swift projects, create a new .swift file. Copy and paste the header content of `VponNativeAdView` as follows:

### Obejctive-C (VponNativeAdViewCopy.h)

```objc
#ifndef VponNativeAdViewCopy_h
#define VponNativeAdViewCopy_h
#endif /* VponNativeAdViewCopy_h */

SWIFT_CLASS("_TtC13VpadnSDKAdKit16VponNativeAdView")
@interface  VponNativeAdView : UIView
@property (nonatomic, weak) IBOutlet UIView * _Nullable iconView;
@property (nonatomic, weak) IBOutlet UIView * _Nullable coverImageView;
@property (nonatomic, weak) IBOutlet UIView * _Nullable ratingValueView;
@property (nonatomic, weak) IBOutlet UIView * _Nullable ratingScaleView;
@property (nonatomic, weak) IBOutlet UIView * _Nullable headlineView;
@property (nonatomic, weak) IBOutlet UIView * _Nullable bodyView;
@property (nonatomic, weak) IBOutlet UIView * _Nullable callToActionView;
@property (nonatomic, weak) IBOutlet UIView * _Nullable socialContextView;
@property (nonatomic, weak) IBOutlet VponMediaView * _Nullable mediaView;
@property (nonatomic, weak) IBOutlet UIView * _Nullable advertiseView;
@property (nonatomic, strong) VponNativeAd * _Nullable nativeAd;

- (nonnull instancetype)initWithFrame:(CGRect)frame OBJC_DESIGNATED_INITIALIZER;
- (nullable instancetype)initWithCoder:(NSCoder * _Nonnull)coder OBJC_DESIGNATED_INITIALIZER;

@end
```

### Swift (VponNativeAdViewCopy.swift)

```swift
import UIKit
import VpadnSDKAdKit

@MainActor @objc @objcMembers open class VponNativeAdView: UIView {
	@MainActor @objc @IBOutlet weak public var iconView: UIView?
	@MainActor @objc @IBOutlet weak public var coverImageView: UIView?
	@MainActor @objc @IBOutlet weak public var ratingValueView: UIView?
	@MainActor @objc @IBOutlet weak public var ratingScaleView: UIView?
	@MainActor @objc @IBOutlet weak public var headlineView: UIView?
	@MainActor @objc @IBOutlet weak public var bodyView: UIView?
	@MainActor @objc @IBOutlet weak public var callToActionView: UIView?
	@MainActor @objc @IBOutlet weak public var socialContextView: UIView?
	@MainActor @objc @IBOutlet weak public var mediaView: VpadnSDKAdKit.VponMediaView?
	@MainActor @objc @IBOutlet weak public var advertiseView: UIView?
	@MainActor @objc public var nativeAd: VpadnSDKAdKit.VponNativeAd?
}
```

At this point, return to the .xib file, and you should be able to see the IBOutlet in the Outlets panel on the right side. Once successfully connected, you can remove the aforementioned header copy file as needed.

3. Ensure that the `UIView` you intend to use as the mediaView has its type specified as `VponMediaView` in the Custom Class section at the top right corner:
   <img src="{{site.imgurl}}/Native_iOS_NA_03.png" alt="" class="width-500"/>
4. In your view controller, refer to the following code to correctly add `NativeAdView` to the screen:

### Objective-C

```objc
#import "VponSdkNativeViewController.h"
#import <VpadnSDKAdKit/VpadnSDKAdKit.h>

@interface VponSdkNativeViewController () <VponNativeAdLoaderDelegate, VponNativeAdDelegate, VponVideoControllerDelegate>
@property (weak, nonatomic) IBOutlet UIView *adContainerView;
@property(nonatomic, strong) VponNativeAdView *nativeAdView;
@end

@implementation  VponSdkNativeViewController

- (void)viewDidLoad {
	[super viewDidLoad];
	_nativeAdView = [[NSBundle mainBundle] loadNibNamed:@"NativeAdView" owner:nil options:nil].firstObject;
	[_adContainerView addSubview:_nativeAdView];
	_nativeAdView.translatesAutoresizingMaskIntoConstraints = NO;
	[NSLayoutConstraint activateConstraints:@[
		[_nativeAdView.heightAnchor constraintEqualToAnchor: _adContainerView.heightAnchor],
		[_nativeAdView.widthAnchor constraintEqualToAnchor: _adContainerView.widthAnchor]
	]];
}
```

### Swift

```swift
class VponSdkNativeViewController: UIViewController {

var nativeAdView: VponNativeAdView!
@IBOutlet weak var adContainer: UIView!

override func viewDidLoad() {
	super.viewDidLoad()

	guard let nibObjects = Bundle.main.loadNibNamed("NativeAdView", owner: nil, options: nil),
		  let adView = nibObjects.first as? VponNativeAdView else {
		fatalError("Could not load nib file for nativeAdView")
	}

	nativeAdView = adView
	adContainer.addSubview(adView)
	nativeAdView.translatesAutoresizingMaskIntoConstraints = false
	NSLayoutConstraint.activate([
		nativeAdView.widthAnchor.constraint(equalTo: adContainer.widthAnchor),
		nativeAdView.heightAnchor.constraint(equalTo: adContainer.heightAnchor)
	])
}
```

## Initialize VponNativeAdLoader Object and Request ad
--------
Follow the steps below to make ad request

  1. Declare and initialize the `VponNativeAdLoader` object
  2. Set the `delegate` property of the `adLoader` to receive the request results
  3. Call the `load(_ request: VponAdRequest)` method, passing in the `VponAdRequest` parameter.

**Note：Ensure that the `VponNativeAdLoader` object maintains a strong reference throughout the ad loading process to prevent errors.**

### Objective-C

```objc
// Must keep a strong reference
@property(nonatomic, strong) VponNativeAdLoader *adLoader;
_adLoader = [[VponNativeAdLoader alloc] initWithLicenseKey:@"License Key" 				
										rootViewController:self];
_adLoader.delegate = self;
[_adLoader load:request];
```

### Swift

```swift
// Must keep a strong reference
var adLoader: VponNativeAdLoader?
adLoader = VponNativeAdLoader(licenseKey: "License Key", rootViewController: self)
adLoader?.delegate = self
adLoader?.load(request)
```

>**Note**
>
>* You can create `VponAdRequest` object for each type of ad, or use the same `VponAdRequest` object for all ad requests.
>* If you wish to specify addtional targeting criteria, please refer to [Advanced](../advanced)



## Implement VponNativeAdLoaderDelegate
---

After sending the ad request, implement the `VponNativeAdLoaderDelegate` protocol to handle both successful and unsuccessful request scenarios.


* When the request is successful, the Vpon SDK will call `adLoader(_ adLoader: VponNativeAdLoader, didReceive nativeAd: VponNativeAd)` and return the native ad object. If you wish to receive notifications for native ad-related events, you can set the `delegate` property. For more details, refer to [Implement Native Ad Event Listener](#notifyNative).
* When the request fails, the Vpon SDK will call `adLoader(_ adLoader: VponNativeAdLoader, didFailToReceiveAdWithError error: Error)` and return the corresponding error.

### Objective-C

```objc
- (void)adLoader:(VponNativeAdLoader *)adLoader didReceive:(VponNativeAd *)nativeAd {
	nativeAd.delegate = self;
}

- (void)adLoader:(VponNativeAdLoader *)adLoader didFailToReceiveAdWithError:(NSError *)error {
	// Handle error
}
```

### Swift

```swift
extension VponSdkNativeViewController: VponNativeAdLoaderDelegate {
	func adLoader(_ adLoader: VponNativeAdLoader, didReceive nativeAd: VponNativeAd) {
		nativeAd.delegate = self
	}

	func adLoader(_ adLoader: VponNativeAdLoader, didFailToReceiveAdWithError error: Error) {
		// Handle error
	}
}
```
## Custom Native Ad Layout with Returned Data


When `adLoader(_ adLoader: VponNativeAdLoader, didReceive nativeAd: VponNativeAd)` is triggered, it means you have obtained the available ad data. At this point, you can use the returned nativeAd to set up the content of your native ad such as the title, description, and other textual elements. Arrange this data within your custom UI layout. After configuring the ad content, it is essential to set the nativeAd property of your nativeAdView to ensure the ad displays correctly and can be clicked on.

The following is the suggested implementation approach:

### Objective-C

```objc
- (void)adLoader:(VponNativeAdLoader *)adLoader didReceive:(VponNativeAd *)nativeAd {
	nativeAd.delegate = self;

	((UILabel *)_nativeAdView.headlineView).text = nativeAd.headline;
	_nativeAdView.mediaView.mediaContent = nativeAd.mediaContent;
	if (nativeAd.mediaContent.hasVideoContent) {
		nativeAd.mediaContent.videoController.delegate = self;
	}
	((UILabel *)_nativeAdView.bodyView).text = nativeAd.body;
	[((UIButton *)_nativeAdView.callToActionView) setTitle:nativeAd.callToAction
	forState:UIControlStateNormal];
	((UIImageView *)_nativeAdView.iconView).image = nativeAd.icon.image;
	// Necessary to show media content and make it clickable!
	_nativeAdView.nativeAd = nativeAd;
}
```

### Swift

```swift
extension VponSdkNativeViewController: VponNativeAdLoaderDelegate {
	func adLoader(_ adLoader: VponNativeAdLoader, didReceive nativeAd: VponNativeAd) {
		nativeAd.delegate = self

		(nativeAdView.headlineView as? UILabel)?.text = nativeAd.headline
		(nativeAdView.bodyView as? UILabel)?.text = nativeAd.body
		(nativeAdView.callToActionView as? UIButton)?.setTitle(nativeAd.callToAction, for: .normal)
		(nativeAdView.iconView as? UIImageView)?.image = nativeAd.icon?.image
		nativeAdView.callToActionView?.isUserInteractionEnabled = false
		nativeAdView.mediaView?.mediaContent = nativeAd.mediaContent
		if nativeAd.mediaContent?.hasVideoContent ?? false {
			nativeAd.mediaContent?.videoController?.delegate = self
		}
		// Necessary to show media content and make it clickable!
		nativeAdView.nativeAd = nativeAd
	}
}
```

## (Advanced) Implement Native Ad Event Listener {#notifyNative}
---

To listen to Native Ad events, set the `delegate` property of the nativeAd within the `adLoader(_ adLoader: VponNativeAdLoader, didReceive nativeAd: VponNativeAd)` method and implement the `VponNativeAdDelegate`.


### Objective-C

```objc
// MARK: - VponNativeAdLoaderDelegate
- (void)adLoader:(VponNativeAdLoader *)adLoader didReceive:(VponNativeAd *)nativeAd {
	nativeAd.delegate = self;
}

// MARK: - VponNativeAdDelegate

- (void)nativeAdDidRecordImpression:(VponNativeAd *)nativeAd {
	// Invoked if an impression has been recorded for an ad.
}

- (void)nativeAdDidRecordClick:(VponNativeAd *)nativeAd {
	// Invoked if an click has been recorded for an ad.
}
```

### Swift

```swift
// MARK: - VponNativeAdLoaderDelegate
func adLoader(_ adLoader: VponNativeAdLoader, didReceive nativeAd: VponNativeAd) {
	nativeAd.delegate = self
}

// MARK: - VponNativeAdDelegate
func nativeAdDidRecordImpression(_ nativeAd: VponNativeAd) {
	// Invoked if an impression has been recorded for an ad.
}

func nativeAdDidRecordClick(_ nativeAd: VponNativeAd) {
	// Invoked if an click has been recorded for an ad.
}
```


## （Advanced）Implement Native Ad (Video) Event Listener {#notifyNativeVideo}

To listen to native ad video events, set the `delegate` property of the videoController within the `adLoader(_ adLoader: VponNativeAdLoader, didReceive nativeAd: VponNativeAd)` method and implement the `VponVideoControllerDelegate`.


### Objective-C

```objc
// MARK: - VponNativeAdLoaderDelegate
- (void)adLoader:(VponNativeAdLoader *)adLoader didReceive:(VponNativeAd *)nativeAd {
	nativeAd.mediaContent.videoController.delegate = self;
}

// MARK: - VponVideoControllerDelegate
- (void)videoControllerDidPlayVideo:(VponVideoController *)videoController {
}
- (void)videoControllerDidPauseVideo:(VponVideoController *)videoController {
}
- (void)videoControllerDidMuteVideo:(VponVideoController *)videoController {
}
- (void)videoControllerDidUnmuteVideo:(VponVideoController *)videoController {
}
- (void)videoControllerDidEndVideoPlayback:(VponVideoController *)videoController {
}
```

### Swift

```swift
// MARK: - VponNativeAdLoaderDelegate
func adLoader(_ adLoader: VponNativeAdLoader, didReceive nativeAd: VponNativeAd) {
	nativeAd.mediaContent?.videoController?.delegate = self
}

// MARK: - VponVideoControllerDelegate
func videoControllerDidPlayVideo(_ videoController: VponVideoController) {
}
func videoControllerDidPauseVideo(_ videoController: VponVideoController) {
}
func videoControllerDidEndVideoPlayback(_ videoController: VponVideoController) {
}
func videoControllerDidMuteVideo(_ videoController: VponVideoController) {
}
func videoControllerDidUnmuteVideo(_ videoController: VponVideoController) {
}
```


# Native Ad Spec {#nativeAdSpec}
--------
Please check to table below to find the Native Ad component provided by Vpon.


| Properties  |   Description | VponNativeAd Properties |
|:-----------:|:-----------:|:-----------:|
| <font color="red">AdLabel</font>      | Let user know it is ad ( Sponsor, Ad, and so on ). | advertise |
|:-----------:|:-----------:|:-----------:|
| <font color="red">Title</font>  | Show at least 16 English alphabets. <br>Show `...` while it's out of space. | headline |
|:-----------:|:-----------:|:-----------:|
| CoverImage  | 1200 x 627px <br>(enable scaling in proportion, without distortion and clipping) | coverImage |
|:-----------:|:-----------:|:-----------:|
| Icon        | 128 x 128px <br>(enable scaling in proportion, without distortion and clipping) | icon |
|:-----------:|:-----------:|:-----------:|
| CallToAction| Show completely | callToAction |
|:-----------:|:-----------:|:-----------:|
| BodyText    | Show at least 20 English characters or unshow it. | body |



# Tips
---

### Make Sure If The Ad Display Successfully

Please note that following settings which might cause the ad invisible on the screen are not allowed:

* Set AdView as Hidden
* Set the Alpha value of AdView < 100%
* Overlays that cover the AdView


Please help to check if below log printed after the ad display and match the viewability standard:

```
<VPON> [NOTE] Send impression successfully
```


### Sample Code
Please refer to our [Sample Code] for a complete integration sample.

### Integration Guide For The Version Below Vpon SDK v5.6.0
Please refer to [Native Ad Integration Guide](../native-under560) if you want to know more about the integration that compatible with the Vpon SDK version below v5.5.0.

### Mediation
---
Mediation is a feature that lets you serve ads to your apps from multiple sources. Please refer to the reference below to get the complete description about the Native Ad Mediation setting.<br>
- [AdMob]


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
