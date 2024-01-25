---
layout: "ios"
title: "iOS - 插页广告"
lead: ""
description:
keywords: 'Keywords for this page, in the meta data'
permalink: /zh-cn/ios/interstitial/
lang: "zh-cn"
---
# 总览
---
插页式广告是互动式多媒体 HTML5 或「网络应用程式」，在应用程式的正常转换点显示 (例如启动、影片播放前或游戏关卡载入时)。网路应用程式使用上就像在应用程式内浏览一样，只有简单的关闭按钮，而没有任何导览列，因为导览配置就包含在内容本身。这类广告由于内容更丰富、更吸引人，因此製作起来更昂贵，而曝光机会相对有限。

![]({{site.imgurl}}/Interstitial.png)

# 完成串接准备
---
在开始串接广告之前，请确认您已经将 Vpon SDK 导入您的 Xcode 专案中。若您尚未完成，请先参考[串接说明]完成相关设定。

# 开始撰写 interstitial
---
Interstitial Ad 的内容更加丰富精彩，因为它是需要更多不同实例化、载入和显示步骤的 Object，而不是 View。


1. Import VpadnSDKAdKit
2. 宣告 VponInterstitialAd
3. 建立 VpadnRequest 物件
4. 使用 VponInterstitialAd 静态方法请求广告
5. 展示广告
6. 实作 Delegate protocol

建议您在应用程式的 ViewController 内执行上述步骤。

## Import VpadnSDKAdKit 并宣告 VpadnInterstitial
---

### Objective-C

```objc
// Import Vpon SDK
@import VpadnSDKAdKit;

@interface ViewController() <VponFullScreenContentDelegate>
@property (strong, nonatomic) VponInterstitialAd *vponInterstitial;

@end
```

## Swift

```swift
// Import Vpon SDK
import VpadnSDKAdKit

class VponSdkInterstitialViewController: UIViewController {
    var interstitialAd: VponInterstitialAd?
}
```

## 建立 VponAdRequest 物件
---
在发出广告请求前，请先建立 VponAdRequest 物件：

### Objective-C

```objc
VponAdRequest *request = [[VponAdRequest alloc] init];

// Set your test device's IDFA here if you're trying to get Vpon test ad
[VponAdRequestConfiguration.shared setTestDeviceIdentifiers:@[[ASIdentifierManager sharedManager].advertisingIdentifier.UUIDString]];
```

### Swift

```swift
let request = VponAdRequest()

// Set your test device's IDFA here if you're trying to get Vpon test ad
VponAdRequestConfiguration.shared.testDeviceIdentifiers = ([ASIdentifierManager.shared().advertisingIdentifier.uuidString])
```

>**Note**
>
>* 您可以为每种类型的广告都建立不同的 VponAdRequest 物件，或是在所有的广告请求中都使用同一个 VpadnRequest 物件
>* 如果您想要指定更多投放条件，请参考[进阶设定](../advanced)


## 使用 VponInterstitialAd 静态方法请求广告
---

准备好 License key 和 VponAdRequest 物件后，呼叫 `VponInterstitialAd` 的静态方法（static func） `load` 发出广告请求。

待请求完毕，在 completion callback 处理请求成功的 `VponInterstitialAd` 物件与请求失败的 error。范例如下：

### Objective-C

```objc
[VponInterstitialAd loadWithLicenseKey:@"License Key"
					request:request
					completion:^(VponInterstitialAd *interstitial, NSError *error){
	if (error != nil) {
		NSLog(@"Failed to load ad with error: %@", error.localizedDescription);
		return;
	}
	self.interstitial = interstitial;
	self.interstitial.delegate = self;
}];
```

### Swift

```swift
VponInterstitialAd.load(licenseKey: "License Key", request: request) { [weak self] (ad, error) in
	if let error {
		print("Failed to load ad with error: \(error.localizedDescription)")
		return
	}
	if let ad {
		self?.interstitial = ad
		self?.interstitial?.delegate = self
	}
}
```


## 展示广告
---
在您完成 Interstitial 广告初始化设定并拉取广告后，在您的 view controller 呼叫 `VponInterstitialAd` 物件的 `present(fromRootViewController: UIViewController)` 方法来展示广告：

### Objective-C

```objc
if (_interstitial != nil) {
	[_interstitial presentFromRootViewController:self];
}
```

### Swift

```swift
if let interstitial {
	interstitial.present(fromRootViewController: self)
}
```

> **Note**：为了维持良好的用户体验，我们建议可先抓取插页广告，待特定时机再将其显示，尽量避免抓取后立即显示

## 实作 Delegate protocol
---
完成广告请求后，您可以实作以下函数监听广告状态

### Objective-C

```objc
[VponInterstitialAd loadWithLicenseKey:@"License Key"
							   request:request
							completion:^(VponInterstitialAd *interstitial, NSError *error) {
	self.interstitial = interstitial;
	self.interstitial.delegate = self;
}];

// MARK: - VponFullScreenContentDelegate
- (void)adWillPresentScreen:(id<VponFullScreenContentAd>)ad {
	// Ad will present full screen content
}

- (void)ad:(id<VponFullScreenContentAd>)ad didFailToPresentFullScreenContentWithError:(NSError *)error {
	// Ad did fail to present full screen content
}

- (void)adWillDismissScreen:(id<VponFullScreenContentAd>)ad {
	// Ad will dismiss full screen content
}

- (void)adDidDismissScreen:(id<VponFullScreenContentAd>)ad {
	// Ad did dismiss full screen content
}

- (void)adDidRecordImpression:(id<VponFullScreenContentAd>)ad {
	// Ad did record an impression
}

- (void)adDidRecordClick:(id<VponFullScreenContentAd>)ad {
	// Ad did record a click
}
```

### Swift

```swift
VponInterstitialAd.load(licenseKey: "License Key", request: request) { [weak self] (ad, error) in
	self?.interstitial = ad
	self?.interstitial?.delegate = self
}

// MARK: - VponFullScreenContentDelegate
func adWillPresentScreen(_ ad: VponFullScreenContentAd) {
	// Ad will present full screen content
}

func ad(_ ad: VponFullScreenContentAd, didFailToPresentFullScreenContentWithError error: Error) {
	// Ad did fail to present full screen content
}

func adWillDismissScreen(_ ad: VponFullScreenContentAd) {
	// Ad will dismiss full screen content
}

func adDidDismissScreen(_ ad: VponFullScreenContentAd) {
	// Ad did dismiss full screen content
}

func adDidRecordImpression(_ ad: VponFullScreenContentAd) {
	// Ad did record an impression
}

func adDidRecordClick(_ ad: VponFullScreenContentAd) {
	// Ad did record a click
}
```

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


### Sample Code
如果您想看到完整的串接实例，请参考我们的 [Sample Code]

### 适用于 Vpon SDK v5.6.0 以下版本的串接方法
如果您想了解 Vpon SDK v5.6.0 以下版本的串接方法，请参考[插页广告](../interstitial-under560)

[串接说明]: ../integration-guide/
[Sample Code]: ../download/
[iOS9 ATS]: {{site.baseurl}}/zh-cn/ios/latest-news/ios9ats/
[进阶设定]: ../advanced/