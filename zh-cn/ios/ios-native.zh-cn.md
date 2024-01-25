---
layout: "ios"
title: "iOS - 原生广告"
lead: ""
description:
keywords: 'Keywords for this page, in the meta data'
permalink: /zh-cn/ios/native/
lang: "zh-cn"
---

# 概要
--------
原生广告不同于以往横幅广告、插页广告会直接提供可立即呈现的广告内容，原生广告 API 提供了标题、图像等广告内容的组合，您可以透过这些属性的编排打造出最理想的原生广告风格。原生广告更打破以往对于广告的刻板印象，以最自然的方式呈现，提供更符合需求的广告体验。

<img src="{{site.imgurl}}/Native_iOS.PNG" alt="" class="width-300"/>

# 完成串接准备
---
在开始串接广告之前，请确认您已经将 Vpon SDK 导入您的 Xcode 专案中。若您尚未完成，请先参考[串接说明]完成相关设定。

# 开始撰写 Native Ad
--------
在应用程式中建立原生广告需要执行以下五个步骤：

1. Import VpadnSDKAdKit
2. 宣告 VponNativeAdView 及自定义 UI
3. 初始化 VponNativeAdLoader 物件，并请求广告
4. 实作 VponNativeAdLoaderDelegate
5. 利用回传的资料建置自订的原生 UI
6. （进阶）订阅 Native Ad 事件通知
7. （进阶）订阅影片事件通知

建议您可以在应用程式的 ViewController 内执行上述步骤。


## Import VpadnSDKAdKit
---

首先汇入 SDK ，宣告实作了 VpadnNativeAdDelegate, VpadnMediaViewDelegate protocol 以接收广告状态，同时也宣告了欲在原生广告中呈现的各种元件。 ( 原生广告呈现元件规范请参照[Native Ad Spec](#nativeAdSpec) )


### Objective-C

```objc
@import VpadnSDKAdKit;
```

### Swift

```swift
import VpadnSDKAdKit
```

## 宣告 VponNativeAdView 及自定义 UI
---

对于原生广告，Vpon 提供了继承 `UIView` 的 `VponNativeAdView` 型别作为 ad view，每个 `VponNativeAdView` 对应一个 `VponNativeAd` 物件。请使用 `VponNativeAdView` 来展示广告，并且每个欲呈现的 `UIView` 元件（如：headline、body⋯⋯）都必须是它的 subview。

请依序进行以下步骤来展示 native ad：

1. 创建一个 `UIView` xib 档案（以下用 `NativeAdView` 为范例），在右上角 Identity inspector 指定 Custom Class 为 `VponNativeAdView`、Module 指定为 `VpadnSDKAdKit`，如图：

<img src="{{site.imgurl}}/Native_iOS_NA_01.png" alt="" class="width-300"/>

2. 在 .xib 档案中布局您想要的 UI，并将各个 UI 元件（例如：欲呈现 headline 的 `UILabel`）连接 IBOutlet 到 `VponNativeAdView` 的对应属性，设定方式如图：
<img src="{{site.imgurl}}/Native_iOS_NA_02.png" alt="" class="width-300"/>
    *原生广告呈现元件规范请参照 [Native Ad Spec](https://wiki.vpon.com/zh-tw/ios/native/#nativeAdSpec)  

    如果无法顺利连接 IBOutlet 到 `VponNativeAdView` 的对应属性，我们提供一个解决方案供参：
    Objective-C 专案请新创一个 .h 档案 / Swift 专案请新创一个 .swift 档案，并把 `VponNativeAdView` header 内容贴上如下：

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
	@MainActor @objc public var nativeAd: VpadnSDKAdKit.VponNativeAd?
}
```

此时回到 xib 档案，应该就能在右侧栏 Outlets 面板看见 IBOutlet 并且连接。连结成功后即可视需求移除上述的 header copy 档案。

3. 确认欲作为 mediaView 的 `UIView` 于右上角 Custom Class 指定型别为 `VponMediaView`：
   <img src="{{site.imgurl}}/Native_iOS_NA_03.png" alt="" class="width-300"/>
4. 在您的 view controller 参考下方程式码让 `NativeAdView` 正确添加到画面上：

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

## 初始化 VponNativeAdLoader 物件，并请求广告
--------
要发出广告请求，请按照以下步骤：

  1. 宣告并初始化 `VponNativeAdLoader` 物件
  2. 设定 adLoader 的 `delegate` 属性，以便收到请求结果
  3. 呼叫 `load(_ request: VponAdRequest)` 方法，带入 `VponAdRequest` 参数

**请注意：`VponNativeAdLoader` 物件在广告载入过程一定要保持 strong reference 以免发生错误。**

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
let request = VpadnAdRequest()

request.setTestDevices([ASIdentifierManager.shared().advertisingIdentifier.uuidString])
// Set your test device's IDFA here if you're trying to get Vpon test ad

vpadnNative.loadRequest(request)
// start to load ad
```

>**Note**
>
>* 您可以为每种类型的广告都建立不同的 VpadnRequest 物件，或是在所有的广告请求中都使用同一个 VpadnRequest 物件
>* 如果您想要指定更多投放条件，请参考[进阶设定](../advanced)


## 实作 VponNativeAdLoaderDelegate
---

发出广告请求后，实作 `VponNativeAdLoaderDelegate` protocol 来处理请求成功与失败的情况。

* 请求成功时，Vpon SDK 会呼叫`adLoader(_ adLoader: VponNativeAdLoader, didReceive nativeAd: VponNativeAd)` 并回传native ad 物件，如想收到native ad 相关事件通知，可以设定`delegate` 属性，详情参考[订阅native ad 事件通知](#notifyNative) 。
* 请求失败时，Vpon SDK 会呼叫 `adLoader(_ adLoader: VponNativeAdLoader, didFailToReceiveAdWithError error: Error)` 并回传对应的 error。

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
## 利用回传的资料建置自订的原生 UI

当`adLoader(_ adLoader: VponNativeAdLoader, didReceive nativeAd: VponNativeAd)` 被触发时，即取得可用的广告资料，此时可利用回传的nativeAd 设定您原生广告的标题、内文等文案内容，将资料布局至自定义的UI。设定完广告资料后，**请务必设定您 nativeAdView 的 `nativeAd` 属性**，才能让广告正常展示、被点击。

以下为建议的实作方式：

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

## （进阶）订阅 Native Ad 事件通知 {#notifyNative}
---

要监听 Native Ad 事件，在 `adLoader(_ adLoader: VponNativeAdLoader, didReceive nativeAd: VponNativeAd)` 设定 nativeAd 的 `delegate` 属性，并实作 `VponNativeAdDelegate`：


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


## （进阶）订阅影片事件通知 {#notifyNativeVideo}

要监听 native ad 影片事件，在 `adLoader(_ adLoader: VponNativeAdLoader, didReceive nativeAd: VponNativeAd)` 时设定 videoController 的 `delegate` 属性，并实作 `VponVideoControllerDelegate`：

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
`红色`表示您必须显示的原生广告元件，其中 CoverImage 与 Icon 必须至少显示其中一个。


| Properties  |   Description | VponNativeAd Properties |
|:-----------:|:-----------:|:-----------:|
| <font color="red">AdLabel</font>      | 让使用者了解此为广告 (例如：赞助、广告 等等) | Publisher 自行实作 |
|:-----------:|:-----------:|:-----------:|
| <font color="red">Title</font>  | 最少需显示8个中文字, 放不下时须显示`...` | headline |
|:-----------:|:-----------:|:-----------:|
| CoverImage  | 1200 x 627px (可等比例缩放，不可变形，不可裁切) | coverImage |
|:-----------:|:-----------:|:-----------:|
| Icon        | 128 x 128px (可等比例缩放，不可变形，不可裁切) | icon |
|:-----------:|:-----------:|:-----------:|
| CallToAction| 需要完整显示 | callToAction |
|:-----------:|:-----------:|:-----------:|
| BodyText    | 最少显示20个中文字，或不要显示 | body |



# Tips
---

### 确认广告曝光是否成功发送
请注意，Vpon SDK 不允许广告以以下方式呈现，致使广告在画面上可能不可见：

* 将 AdView 设为 Hdden
* 将 AdView 的 Alpha 值设为 < 100%
* AdView 被其它 View(s) 遮盖住

当广告露出在页面上并达到曝光标准后，会印出以下的 Log 代表有送出广告曝光：

```
<VPON> [NOTE] Send impression successfully
```


### 下载范例
--------
本页以基本的 Native Ad 为例进行说明， [Sample Code] 中另有 Table View 的范例以供参考。<br>

### 适用于 Vpon SDK v5.6.0 以下版本的串接方法
如果您想了解 Vpon SDK v5.6.0 以下版本的串接方法，请参考[原生广告](../native-under560)

[串接说明]: ../integration-guide/
[说明]: {{ site.baseurl }}/zh-cn/ios/registration/
[Sample Code]: {{ site.baseurl }}/zh-cn/ios/download/
[使用 AdMob]: {{ site.baseurl }}/zh-cn/ios/mediation/admob/#customevent
[使用 MoPub]: {{ site.baseurl }}/zh-cn/ios/mediation/mopub
[使用 Smaato]: {{ site.baseurl }}/zh-cn/ios/native/mediation/smaato
[这篇]: {{site.baseurl}}/zh-cn/ios/latest-news/ios9ats/
