---
layout: "ios"
title: "iOS - 原生廣告"
lead: ""
description:
keywords: 'Keywords for this page, in the meta data'
permalink: /zh-tw/ios/native/
lang: "zh-tw"
---

# 概要
--------
原生廣告不同於橫幅廣告、插頁廣告會直接提供可立即呈現的廣告內容，原生廣告 API 提供了標題、圖像等廣告內容的組合，您可以透過這些屬性的編排打造出最理想的原生廣告風格。原生廣告更打破以往對於廣告的刻板印象，以最自然的方式呈現，提供更符合需求的廣告體驗。

<img src="{{site.imgurl}}/Native_iOS.PNG" alt="" class="width-300"/>

# 完成串接準備
---
在開始串接廣告之前，請確認您已經將 Vpon SDK 導入您的 Xcode 專案中。若您尚未完成，請先參考[串接說明]完成相關設定。

# 開始撰寫 Native Ad
--------
在應用程式中建立原生廣告需要執行以下五個步驟：

1. Import VpadnSDKAdKit
2. 宣告 VponNativeAdView 及自定義 UI
3. 初始化 VponNativeAdLoader 物件，並請求廣告
4. 實作 VponNativeAdLoaderDelegate
5. 利用回傳的資料建置自訂的原生 UI
6. （進階）訂閱 Native Ad 事件通知
7. （進階）訂閱影片事件通知

建議您可以在應用程式的 ViewController 內執行上述步驟。


## Import VpadnSDKAdKit
---

首先匯入 SDK ，宣告實作了 VpadnNativeAdDelegate, VpadnMediaViewDelegate protocol 以接收廣告狀態，同時也宣告了欲在原生廣告中呈現的各種元件。( 原生廣告呈現元件規範請參照[Native Ad Spec](#nativeAdSpec) )


### Objective-C

```objc
@import VpadnSDKAdKit;
```

### Swift

```swift
import VpadnSDKAdKit
```

## 宣告 VponNativeAdView 及自定義 UI
---

對於原生廣告，Vpon 提供了繼承 `UIView` 的 `VponNativeAdView` 型別作為 ad view，每個 `VponNativeAdView` 對應一個 `VponNativeAd` 物件。請使用 `VponNativeAdView` 來展示廣告，並且每個欲呈現的 `UIView` 元件（如：headline、body⋯⋯）都必須是它的 subview。

請依序進行以下步驟來展示 native ad：

1. 創建一個 `UIView` xib 檔案（以下用 `NativeAdView` 為範例），在右上角 Identity inspector 指定 Custom Class 為 `VponNativeAdView`、Module 指定為 `VpadnSDKAdKit`，如圖：

<img src="{{site.imgurl}}/Native_iOS_NA_01.png" alt="" class="width-300"/>

2. 在 .xib 檔案中佈局您想要的 UI，並將各個 UI 元件（例如：欲呈現 headline 的 `UILabel`）連接 IBOutlet 到 `VponNativeAdView` 的對應屬性，設定方式如圖：
<img src="{{site.imgurl}}/Native_iOS_NA_02.png" alt="" class="width-300"/>
    *原生廣告呈現元件規範請參照 [Native Ad Spec](https://wiki.vpon.com/zh-tw/ios/native/#nativeAdSpec)  

    如果無法順利連接 IBOutlet 到 `VponNativeAdView` 的對應屬性，我們提供一個解決方案供參：
    Objective-C 專案請新創一個 .h 檔案 / Swift 專案請新創一個 .swift 檔案，並把 `VponNativeAdView` header 內容貼上如下：

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

此時回到 xib 檔案，應該就能在右側欄 Outlets 面板看見 IBOutlet 並且連接。連結成功後即可視需求移除上述的 header copy 檔案。

3. 確認欲作為 mediaView 的 `UIView` 於右上角 Custom Class 指定型別為 `VponMediaView`：
   <img src="{{site.imgurl}}/Native_iOS_NA_03.png" alt="" class="width-300"/>
4. 在您的 view controller 參考下方程式碼讓 `NativeAdView` 正確添加到畫面上：

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

## 初始化 VponNativeAdLoader 物件，並請求廣告
--------
要發出廣告請求，請按照以下步驟：

  1. 宣告並初始化 `VponNativeAdLoader` 物件
  2. 設定 adLoader 的 `delegate` 屬性，以便收到請求結果
  3. 呼叫 `load(_ request: VponAdRequest)` 方法，帶入 `VponAdRequest` 參數

**請注意：`VponNativeAdLoader` 物件在廣告載入過程一定要保持 strong reference 以免發生錯誤。**

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
>* 您可以為每種類型的廣告都建立不同的 VponRequest 物件，或是在所有的廣告請求中都使用同一個 VponRequest 物件
>* 如果您想要指定更多投放條件，請參考[進階設定](../advanced)


## 實作 VponNativeAdLoaderDelegate
---

發出廣告請求後，實作 `VponNativeAdLoaderDelegate` protocol 來處理請求成功與失敗的情況。

* 請求成功時，Vpon SDK 會呼叫 `adLoader(_ adLoader: VponNativeAdLoader, didReceive nativeAd: VponNativeAd)` 並回傳 native ad 物件，如想收到 native ad 相關事件通知，可以設定 `delegate` 屬性，詳情參考 [訂閱 native ad 事件通知](#notifyNative)。
* 請求失敗時，Vpon SDK 會呼叫 `adLoader(_ adLoader: VponNativeAdLoader, didFailToReceiveAdWithError error: Error)` 並回傳對應的 error。

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
## 利用回傳的資料建置自訂的原生 UI

當 `adLoader(_ adLoader: VponNativeAdLoader, didReceive nativeAd: VponNativeAd)` 被觸發時，即取得可用的廣告資料，此時可利用回傳的 nativeAd 設定您原生廣告的標題、內文等文案內容，將資料佈局至自定義的 UI。設定完廣告資料後，**請務必設定您 nativeAdView 的 `nativeAd` 屬性**，才能讓廣告正常展示、被點擊。

以下為建議的實作方式：

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

## （進階）訂閱 Native Ad 事件通知 {#notifyNative}
---

要監聽 Native Ad 事件，在 `adLoader(_ adLoader: VponNativeAdLoader, didReceive nativeAd: VponNativeAd)` 設定 nativeAd 的 `delegate` 屬性，並實作 `VponNativeAdDelegate`：


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


## （進階）訂閱影片事件通知 {#notifyNativeVideo}

要監聽 native ad 影片事件，在 `adLoader(_ adLoader: VponNativeAdLoader, didReceive nativeAd: VponNativeAd)` 時設定 videoController 的 `delegate` 屬性，並實作 `VponVideoControllerDelegate`：

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
`紅色`表示您必須顯示的原生廣告元件，其中 CoverImage 與 Icon 必須至少顯示其中一個。


| Properties  |   Description | VponNativeAd Properties |
|:-----------:|:-----------:|:-----------:|
| <font color="red">AdLabel</font>      | 讓使用者了解此為廣告 (例如：贊助、廣告 等等) | Publisher 自行實作 |
|:-----------:|:-----------:|:-----------:|
| <font color="red">Title</font>  | 最少需顯示8個中文字, 放不下時須顯示`...` | headline |
|:-----------:|:-----------:|:-----------:|
| CoverImage  | 1200 x 627px (可等比例縮放，不可變形，不可裁切) | coverImage |
|:-----------:|:-----------:|:-----------:|
| Icon        | 128 x 128px (可等比例縮放，不可變形，不可裁切) | icon |
|:-----------:|:-----------:|:-----------:|
| CallToAction| 需要完整顯示 | callToAction |
|:-----------:|:-----------:|:-----------:|
| BodyText    | 最少顯示20個中文字，或不要顯示 | body |


# Tips
---

### 確認廣告曝光是否成功發送
請注意，Vpon SDK 不允許廣告以以下方式呈現，致使廣告在畫面上可能不可見：

* 將 AdView 設為 Hidden
* 將 AdView 的 Alpha 值設為 < 100%
* AdView 被其它 View(s) 遮蓋住

當廣告露出在頁面上並達到曝光標準後，會印出以下的 Log 代表有送出廣告曝光：

```
<VPON> [NOTE] Send impression successfully
```


### Sample Code
本頁以基本的 Native Ad 為例進行說明，如果您想看到完整的串接實例或 `Table View` 的範例，請參考我們的 [Sample Code]

### 中介服務
透過中介服務，您的應用程式就能放送眾多來源的廣告，詳細請見說明：<br>
- [使用 AdMob] <br>
<!-- - [使用 MoPub] <br>
- [使用 Smaato] -->

### 適用於 Vpon SDK v5.6.0 以下版本的串接方法
如果您想了解 Vpon SDK v5.6.0 以下版本的串接方法，請參考[原生廣告](../native-under560)

[串接說明]: ../integration-guide/
[Vpon PDMKT Team]: mailto:partner.service@vpon.com
[Sample Code]: ../download/
[iOS9 ATS]: {{site.baseurl}}/zh-tw/ios/latest-news/ios9ats/


[說明]: {{ site.baseurl }}/zh-tw/ios/registration/
[使用 AdMob]: {{ site.baseurl }}/zh-tw/ios/mediation/admob/#customevent
[使用 MoPub]: {{ site.baseurl }}/zh-tw/ios/mediation/mopub
[使用 Smaato]: {{ site.baseurl }}/zh-tw/ios/native/mediation/smaato
[原生廣告 - Table View]: {{site.baseurl}}/zh-tw/ios/native/table/
[基本原生廣告]: #
